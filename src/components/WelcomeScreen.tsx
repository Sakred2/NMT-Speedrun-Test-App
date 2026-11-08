import type { CSSProperties, ReactNode } from 'react';
import { BookOpen, Check, Clock, Layers, Play, Wind, Zap } from 'lucide-react';
import FlyingText from '@/components/FlyingText';
import SubjectCard from '@/components/SubjectCard';
import { SUBJECTS, ELEMENT_COLOR, TOPICS, type SubjectExtra } from '@/data/subjects';
import { readableTextOn } from '@/lib/color';
import type { Difficulty, SubjectId } from '@/types';

interface Props {
  subject: SubjectId;
  mode: 'topic' | 'sprint';
  topicId: string;
  difficulty: Difficulty;
  loading: boolean;
  onSubject: (id: SubjectId) => void;
  onMode: (m: 'topic' | 'sprint') => void;
  onTopic: (id: string) => void;
  onDifficulty: (d: Difficulty) => void;
  onStart: () => void;
}

const DIFFICULTY_OPTIONS: { id: Difficulty; label: string; desc: string; color: string }[] = [
  { id: 'easy', label: 'Легко', desc: '~50 сек. повітря', color: '#7ed957' },
  { id: 'normal', label: 'Нормально', desc: '~25 сек. повітря', color: '#ffd43b' },
  { id: 'hard', label: 'Важко', desc: '~10 сек. повітря', color: '#ff5a5a' },
];

const STATS = [
  { value: '15', label: 'питань', icon: Play, color: '#3b9eff' },
  { value: '4.5', label: 'хвилини', icon: Clock, color: '#ffd43b' },
  { value: '3', label: 'формати', icon: Layers, color: '#34d399' },
];

function SectionHeader({ step, title, icon }: { step: string; title: string; icon?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="font-display text-xs font-800 tabular-nums text-steel-100">{step}</span>
      <h3 className="flex items-center gap-2 font-display text-sm font-800 uppercase tracking-[0.15em] text-steel-50">
        {icon}
        {title}
      </h3>
      <span className="h-px flex-1 bg-gradient-to-r from-steel-500/50 to-transparent" />
    </div>
  );
}

function OptionTile({
  active, color, onClick, icon, title, hint,
}: {
  active: boolean;
  color: string;
  onClick: () => void;
  icon: ReactNode;
  title: string;
  hint: string;
}) {
  const onColor = readableTextOn(color);
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="group relative flex items-center gap-3 overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2"
      style={{
        background: active
          ? `linear-gradient(150deg, ${color}, ${color}d9)`
          : `radial-gradient(120% 100% at 0% 0%, ${color}22, transparent 60%), #1a1d24`,
        color: active ? onColor : '#e2e6ee',
        boxShadow: active ? `0 10px 28px -12px ${color}` : `inset 0 0 0 1px ${color}40`,
        '--tw-ring-color': color,
      } as CSSProperties}
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: active ? 'rgba(15,17,21,0.18)' : `${color}26`, color: active ? onColor : color }}
      >
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-display text-sm font-800 uppercase tracking-wide">{title}</span>
        <span className="mt-0.5 block text-xs opacity-80">{hint}</span>
      </span>
      {active && (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cave-900/80 text-white">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
      )}
    </button>
  );
}

export default function WelcomeScreen({
  subject, mode, topicId, difficulty, loading,
  onSubject, onMode, onTopic, onDifficulty, onStart,
}: Props) {
  const topics = TOPICS[subject] ?? [];
  const activeSubject = SUBJECTS.find((s) => s.id === subject) as SubjectExtra;
  const color = ELEMENT_COLOR[activeSubject.element];
  const ctaDisabled = loading || (mode === 'topic' && !topicId);

  return (
    <div className="animate-pop-in space-y-8">
      <section className="fe-panel relative isolate overflow-hidden p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full opacity-40 blur-3xl transition-colors duration-700"
          style={{ background: color }}
        />
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 animate-float items-center justify-center rounded-2xl text-4xl transition-colors duration-500"
            style={{ backgroundColor: color, boxShadow: `0 12px 30px -10px ${color}` }}
          >
            {activeSubject.icon}
          </div>
          <div>
            <p className="text-[11px] font-800 uppercase tracking-[0.25em] text-steel-100">NMT FLOOD RUN</p>
            <h2 className="mt-1 font-display text-2xl font-800 leading-tight text-white sm:text-3xl">
              <FlyingText text="15 ПИТАНЬ. 4.5 ХВИЛИНИ." />
              <br />
              <span style={{ color }}><FlyingText text="ВТЕЧИ ВІД ПОТОПУ." /></span>
            </h2>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-steel-50/85 sm:text-base">
          Чим довше сидиш на питанні — тим вищий потоп. Коли потоп повний, починає тонути твоє
          повітря. Відповідай швидко: поки є повітря — є шанс.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex items-center gap-2.5 rounded-xl bg-cave-800/70 p-2.5 ring-1 ring-steel-500/30 sm:p-3"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${s.color}22`, color: s.color }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="font-display text-base font-800 text-white">{s.value}</p>
                  <p className="text-[10px] uppercase tracking-wide text-steel-100">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="mt-6 h-2.5 rounded-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #ffd43b, #ffd43b 10px, #1a1d24 10px, #1a1d24 20px)',
          }}
        />
      </section>

      <section>
        <SectionHeader step="01" title="Предмет" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SUBJECTS.map((s) => (
            <SubjectCard
              key={s.id}
              subject={s}
              topicCount={(TOPICS[s.id] ?? []).length}
              active={s.id === subject}
              onSelect={() => {
                onSubject(s.id);
                onMode('sprint');
              }}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader step="02" title="Режим" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <OptionTile
            active={mode === 'sprint'}
            color="#ffd43b"
            onClick={() => onMode('sprint')}
            icon={<Zap className="h-5 w-5" fill="currentColor" />}
            title="Випадковий спринт"
            hint="15 випадкових питань з усіх тем"
          />
          <OptionTile
            active={mode === 'topic'}
            color="#3b9eff"
            onClick={() => onMode('topic')}
            icon={<BookOpen className="h-5 w-5" />}
            title="Обрати тему"
            hint="Фокус на одній темі"
          />
        </div>

        {mode === 'topic' && (
          <div className="mt-4 flex animate-slide-up flex-wrap gap-2">
            {topics.map((t) => {
              const active = t.id === topicId;
              return (
                <button
                  key={t.id}
                  onClick={() => onTopic(t.id)}
                  aria-pressed={active}
                  className="rounded-full px-4 py-2 text-sm font-700 ring-1 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: active ? color : '#1a1d24',
                    color: active ? readableTextOn(color) : '#cfd4dd',
                    boxShadow: active ? `0 8px 20px -10px ${color}` : undefined,
                    '--tw-ring-color': active ? color : 'rgba(255,255,255,0.12)',
                  } as CSSProperties}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <SectionHeader step="03" title="Складність" icon={<Wind className="h-4 w-4" />} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {DIFFICULTY_OPTIONS.map((d) => (
            <OptionTile
              key={d.id}
              active={difficulty === d.id}
              color={d.color}
              onClick={() => onDifficulty(d.id)}
              icon={<Wind className="h-5 w-5" />}
              title={d.label}
              hint={d.desc}
            />
          ))}
        </div>
      </section>

      <div className="pt-2">
        <button
          onClick={onStart}
          disabled={ctaDisabled}
          className="shine-sweep fe-btn inline-flex w-full items-center justify-center gap-2.5 px-6 py-4 text-lg transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          style={{ backgroundColor: color, color: readableTextOn(color) }}
        >
          {loading ? (
            <>
              <span className="h-5 w-5 animate-spin-slow rounded-full border-2 border-black/20 border-t-current" />
              Готую питання…
            </>
          ) : (
            <>
              <Play className="h-5 w-5" fill="currentColor" />
              Почати тест
            </>
          )}
        </button>
        {mode === 'topic' && !topicId && (
          <p className="mt-3 text-center text-xs text-steel-100">Обери тему вище, щоб продовжити</p>
        )}
      </div>
    </div>
  );
}
