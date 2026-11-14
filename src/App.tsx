import { useCallback, useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import SettingsModal from '@/components/SettingsModal';
import WelcomeScreen from '@/components/WelcomeScreen';
import EditorScreen from '@/components/EditorScreen';
import QuestionCard from '@/components/QuestionCard';
import ProgressBar from '@/components/ProgressBar';
import ResultScreen from '@/components/ResultScreen';
import ErrorScreen from '@/components/ErrorScreen';
import DrownedScreen from '@/components/DrownedScreen';
import UnderwaterOverlay from '@/components/UnderwaterOverlay';
import RunBanner from '@/components/RunBanner';
import RunSidebar from '@/components/RunSidebar';
import { fetchQuestions } from '@/lib/openrouter';
import { getApiKey, getSoundOn, saveSoundOn, recordBestRun } from '@/lib/storage';
import { pickMockQuestions } from '@/data/mockQuestions';
import { SUBJECTS, type Element } from '@/data/subjects';
import { CustomSet, decodeSet, upsertSet } from '@/lib/customSets';
import { playSound, setSoundEnabled, unlockAudio, refreshSfxVolume } from '@/lib/sounds';
import { playMusic, pauseMusic, unlockMusic } from '@/lib/music';
import type { Question, Screen, SubjectId, Difficulty } from '@/types';

const QUESTION_COUNT = 15;
// Per-question time limit (auto-lock if exceeded). Flood rises across the whole test.
const TIME_PER_QUESTION = 18;
// Total seconds for flood to reach 100% across the whole run.
const FLOOD_MAX_SECONDS = QUESTION_COUNT * TIME_PER_QUESTION; // ~140s
const MAX_AIR = 100;
// Air drain rates per difficulty (per second while flooded)
const DRAIN_RATES: Record<Difficulty, number> = { easy: 2, normal: 4, hard: 10 };
// Wrong answer adds this much flood (20% of the total flood timeline).
const FLOOD_WRONG_PENALTY = FLOOD_MAX_SECONDS * 0.2;

function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [source, setSource] = useState<'openrouter' | 'mock' | 'custom' | null>(null);

  // config
  const [subject, setSubject] = useState<SubjectId>('english');
  const [mode, setMode] = useState<'topic' | 'sprint'>('sprint');
  const [topicId, setTopicId] = useState<string>('tenses');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');

  // test state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [soundOn, setSoundOn] = useState(getSoundOn);
  const [editorInitialSet, setEditorInitialSet] = useState<CustomSet | null>(null);
  const [importedToast, setImportedToast] = useState<string | null>(null);

  // flood / air
  const [elapsed, setElapsed] = useState(0); // global elapsed seconds (counts up)
  const [air, setAir] = useState(MAX_AIR);
  const [questionElapsed, setQuestionElapsed] = useState(0); // per-question countdown

  const activeSubject = SUBJECTS.find((s) => s.id === subject) ?? SUBJECTS[0];
  const activeElement: Element = activeSubject.element;

  const floodPct = Math.min(100, (elapsed / FLOOD_MAX_SECONDS) * 100);
  const flooded = screen === 'test' && elapsed >= FLOOD_MAX_SECONDS;
  // The tide keeps rising through the run; the drowned screen stays underwater too.
  const underwater = floodPct >= 100 && (screen === 'test' || screen === 'drowned');
  const tideLevel = screen === 'test' || screen === 'drowned' ? floodPct : 0;

  useEffect(() => {
    setSoundEnabled(soundOn);
  }, [soundOn]);

  // Import a shared set from the URL (?set=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const encoded = params.get('set');
      if (!encoded) return;
      const decoded = decodeSet(encoded);
      if (!decoded) return;
      upsertSet(decoded);
      setImportedToast(`Додано набір «${decoded.title}» з посилання.`);
      // clean URL
      const url = new URL(window.location.href);
      url.searchParams.delete('set');
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
  }, []);

  function toggleSound() {
    setSoundOn((prev) => {
      const next = !prev;
      saveSoundOn(next);
      if (next) unlockAudio();
      return next;
    });
  }

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  const startTimer = useCallback(() => {
    clearTimer();
    setQuestionElapsed(TIME_PER_QUESTION);
    timerRef.current = setInterval(() => {
      setElapsed((e) => e + 1);
      setQuestionElapsed((q) => {
        if (q <= 1) return 0;
        return q - 1;
      });
    }, 1000);
  }, []);

  // Flood is full → drain air. Air hits 0 → instant drown.
  useEffect(() => {
    if (screen !== 'test') return;
    const flooded = elapsed >= FLOOD_MAX_SECONDS;
    if (!flooded) return;

    setAir((a) => {
      const next = Math.max(0, a - DRAIN_RATES[difficulty]);
      return next;
    });
    // heartbeat when air is critically low, tick otherwise
    if (air <= 30 && air > 0) {
      playSound('heartbeat');
    } else {
      playSound('tickLow');
    }
  }, [elapsed, screen]);

  // drown the moment air hits 0
  useEffect(() => {
    if (screen === 'test' && air <= 0) {
      clearTimer();
      recordBestRun(score, correctCount, questions.length);
      setAnswered(true);
      setSelected((s) => s);
      setScreen('drowned');
      pauseMusic();
      playSound('splash');
      setTimeout(() => playSound('drown'), 200);
    }
  }, [air, screen]);

  // per-question timeout auto-lock (if not answered)
  useEffect(() => {
    if (screen === 'test' && questionElapsed === 0 && !answered) {
      setAnswered(true);
      playSound('wrong');
      setSelected((s) => s);
      // Timeout counts as a wrong answer: raise the flood by 20%
      setElapsed((e) => Math.min(FLOOD_MAX_SECONDS, e + FLOOD_WRONG_PENALTY));
    }
  }, [questionElapsed, answered, screen]);

  useEffect(() => () => clearTimer(), []);

  function handleSubject(id: SubjectId) {
    setSubject(id);
    setMode('sprint');
    setTopicId('');
  }

  function beginTest(qs: Question[], src: 'openrouter' | 'mock' | 'custom') {
    setQuestions(qs);
    setSource(src);
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setCorrectCount(0);
    setElapsed(0);
    setAir(MAX_AIR);
    setQuestionElapsed(TIME_PER_QUESTION);
    setScreen('test');
    playSound('start');
    playMusic();
    startTimer();
  }

  async function handleStart() {
    setLoading(true);
    setErrorMsg('');
    unlockAudio();
    unlockMusic();
    const apiKey = getApiKey();
    try {
      const res = await fetchQuestions(subject, mode === 'sprint' ? undefined : topicId, QUESTION_COUNT, apiKey);
      if (!res.questions.length) throw new Error('Не вдалося згенерувати питання.');
      beginTest(res.questions, res.source);
    } catch (err) {
      console.error(err);
      setErrorMsg('Не вдалося завантажити питання. Спробуй локальний режим.');
      setScreen('error');
    } finally {
      setLoading(false);
    }
  }

  function handlePlayCustom(set: CustomSet) {
    const firstSubject = (set.questions[0]?.subject as SubjectId) ?? 'english';
    setSubject(firstSubject);
    beginTest(set.questions, 'custom');
  }

  function handleSelect(index: number) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    clearTimer();
    const q = questions[current];
    if (index === q.correctIndex) {
      setCorrectCount((c) => c + 1);
      const pts = questionElapsed > 12 ? 7 : questionElapsed > 6 ? 6 : 5;
      setScore((s) => s + pts);
      playSound('correct');
      // breathing room: correct answer gives back a little air if flooded
      setAir((a) => Math.min(MAX_AIR, a + 10));
    } else {
      playSound('wrong');
      playSound('floodRise');
      // Wrong answer raises the flood by 20%
      setElapsed((e) => Math.min(FLOOD_MAX_SECONDS, e + FLOOD_WRONG_PENALTY));
    }
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      recordBestRun(score, correctCount, questions.length);
      setScreen('result');
      pauseMusic();
      playSound('complete');
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setAnswered(false);
    playSound('pageTurn');
    startTimer();
  }

  function handleRestartLocal() {
    const qs = pickMockQuestions(subject, mode === 'sprint' ? undefined : topicId, QUESTION_COUNT);
    beginTest(qs, 'mock');
  }

  function handleRetry() {
    if (questions.length) {
      beginTest(questions, (source as 'openrouter' | 'mock' | 'custom') ?? 'mock');
    } else {
      handleStart();
    }
  }

  function handleHome() {
    clearTimer();
    pauseMusic();
    setScreen('welcome');
    setSource(null);
    setQuestions([]);
    setEditorInitialSet(null);
  }

  function handleOpenEditor(set: CustomSet | null = null) {
    setEditorInitialSet(set);
    setScreen('editor');
  }

  return (
    <div className="min-h-screen">
      <UnderwaterOverlay
        active={underwater}
        floodPct={tideLevel}
        air={air}
        element={activeElement}
      />
      <Header onOpenSettings={() => setSettingsOpen(true)} onOpenEditor={() => handleOpenEditor(null)} source={source} soundOn={soundOn} onToggleSound={toggleSound} />
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSaved={() => {}}
      />

      <main className={`mx-auto px-4 py-6 sm:px-6 sm:py-8 ${screen === 'test' ? 'max-w-5xl' : 'max-w-3xl'}`}>
        {screen === 'welcome' && (
          <WelcomeScreen
            subject={subject}
            mode={mode}
            topicId={topicId}
            difficulty={difficulty}
            loading={loading}
            onSubject={handleSubject}
            onMode={setMode}
            onTopic={setTopicId}
            onDifficulty={setDifficulty}
            onStart={handleStart}
            onOpenEditor={() => handleOpenEditor(null)}
          />
        )}

        {screen === 'test' && questions[current] && (
          <div className="run-layout">
            <div className={`run-panel fe-panel ${flooded ? 'uw-content-warp' : ''}`}>
              <div className="hazard-strip relative z-10 h-2 w-full" aria-hidden="true" />
              <div className="run-wall" aria-hidden="true" />
              <div className="relative z-10 px-3.5 py-4 sm:px-5 sm:py-5">
                <RunBanner
                  current={current}
                  total={questions.length}
                  subjectLabel={activeSubject.label}
                  icon={activeSubject.icon}
                  element={activeElement}
                  floodPct={floodPct}
                  flooded={flooded}
                  questionElapsed={questionElapsed}
                  maxSeconds={TIME_PER_QUESTION}
                />
                <div className="mt-4">
                  <ProgressBar
                    current={current}
                    total={questions.length}
                    score={score}
                    elapsed={elapsed}
                    floodMax={FLOOD_MAX_SECONDS}
                    air={air}
                    element={activeElement}
                  />
                </div>
                <QuestionCard
                  key={questions[current].id}
                  question={questions[current]}
                  index={current}
                  total={questions.length}
                  selectedIndex={selected}
                  answered={answered}
                  element={activeElement}
                  floodPct={Math.min(100, floodPct)}
                  onSelect={handleSelect}
                  onNext={handleNext}
                />
              </div>
              <div className="hazard-strip relative z-10 h-1.5 w-full opacity-60" aria-hidden="true" />
            </div>

            <RunSidebar
              current={current}
              total={questions.length}
              score={score}
              correct={correctCount}
              floodPct={floodPct}
              flooded={flooded}
              air={air}
              questionElapsed={questionElapsed}
              maxSeconds={TIME_PER_QUESTION}
              element={activeElement}
            />
          </div>
        )}

        {screen === 'result' && (
          <ResultScreen
            correct={correctCount}
            total={questions.length}
            score={score}
            onRetry={handleRetry}
            onHome={handleHome}
          />
        )}

        {screen === 'drowned' && (
          <DrownedScreen onRetry={handleRetry} onHome={handleHome} />
        )}

        {screen === 'error' && (
          <ErrorScreen
            message={errorMsg}
            onRestartLocal={handleRestartLocal}
            onHome={handleHome}
          />
        )}

        {screen === 'editor' && (
          <EditorScreen
            onHome={handleHome}
            onPlay={handlePlayCustom}
            initialSet={editorInitialSet}
          />
        )}
      </main>

      {importedToast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-slide-up rounded-xl bg-cave-400/95 px-4 py-2.5 text-xs font-bold text-white ring-1 ring-steel-500/60 shadow-lg">
          {importedToast}
          <button onClick={() => setImportedToast(null)} className="ml-3 text-steel-100 hover:text-white" aria-label="Закрити">✕</button>
        </div>
      )}

      <footer className="mx-auto max-w-3xl px-4 pb-6 text-center text-xs text-steel-100/70 sm:px-6">
        NMT FLOOD RUN · втечи від потопу · питання від AI або з вбудованої бази
      </footer>
    </div>
  );
}

export default App;
