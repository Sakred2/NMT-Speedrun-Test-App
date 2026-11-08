import { useCallback, useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import SettingsModal from '@/components/SettingsModal';
import WelcomeScreen from '@/components/WelcomeScreen';
import QuestionCard from '@/components/QuestionCard';
import ProgressBar from '@/components/ProgressBar';
import ResultScreen from '@/components/ResultScreen';
import ErrorScreen from '@/components/ErrorScreen';
import DrownedScreen from '@/components/DrownedScreen';
import UnderwaterOverlay from '@/components/UnderwaterOverlay';
import { fetchQuestions } from '@/lib/openrouter';
import { getApiKey, getSoundOn, saveSoundOn } from '@/lib/storage';
import { pickMockQuestions } from '@/data/mockQuestions';
import { SUBJECTS, type Element } from '@/data/subjects';
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
  const [source, setSource] = useState<'openrouter' | 'mock' | null>(null);

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

  // flood / air
  const [elapsed, setElapsed] = useState(0); // global elapsed seconds (counts up)
  const [air, setAir] = useState(MAX_AIR);
  const [questionElapsed, setQuestionElapsed] = useState(0); // per-question countdown

  const activeElement: Element =
    (SUBJECTS.find((s) => s.id === subject)?.element) ?? 'water';

  const flooded = screen === 'test' && elapsed >= FLOOD_MAX_SECONDS;

  useEffect(() => {
    setSoundEnabled(soundOn);
  }, [soundOn]);

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

  async function handleStart() {
    setLoading(true);
    setErrorMsg('');
    unlockAudio();
    unlockMusic();
    const apiKey = getApiKey();
    try {
      const res = await fetchQuestions(subject, mode === 'sprint' ? undefined : topicId, QUESTION_COUNT, apiKey);
      if (!res.questions.length) throw new Error('Не вдалося згенерувати питання.');
      setQuestions(res.questions);
      setSource(res.source);
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
    } catch (err) {
      console.error(err);
      setErrorMsg('Не вдалося завантажити питання. Спробуй локальний режим.');
      setScreen('error');
    } finally {
      setLoading(false);
    }
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
    setQuestions(qs);
    setSource('mock');
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

  function handleRetry() {
    if (questions.length) {
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
  }

  return (
    <div className="min-h-screen">
      <UnderwaterOverlay active={flooded} />
      <Header onOpenSettings={() => setSettingsOpen(true)} source={source} soundOn={soundOn} onToggleSound={toggleSound} />
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSaved={() => {}}
      />

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
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
          />
        )}

        {screen === 'test' && questions[current] && (
          <div className={`fe-panel p-5 sm:p-7 ${flooded ? 'uw-content-warp' : ''}`}>
            <ProgressBar
              current={current}
              total={questions.length}
              score={score}
              elapsed={elapsed}
              floodMax={FLOOD_MAX_SECONDS}
              air={air}
              element={activeElement}
            />
            <QuestionCard
              key={questions[current].id}
              question={questions[current]}
              index={current}
              total={questions.length}
              selectedIndex={selected}
              answered={answered}
              element={activeElement}
              floodPct={Math.min(100, (elapsed / FLOOD_MAX_SECONDS) * 100)}
              onSelect={handleSelect}
              onNext={handleNext}
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
      </main>

      <footer className="mx-auto max-w-3xl px-4 pb-6 text-center text-xs text-steel-100/70 sm:px-6">
        NMT FLOOD RUN · втечи від потопу · питання від AI або з вбудованої бази
      </footer>
    </div>
  );
}

export default App;
