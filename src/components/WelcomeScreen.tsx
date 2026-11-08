import type { CSSProperties, ReactNode } from 'react';
import { BookOpen, Check, Clock, Layers, Play, Wind, Zap, Pencil } from 'lucide-react';
import FlyingText from '@/components/FlyingText';
import SubjectCard from '@/components/SubjectCard';
import { SUBJECTS, ELEMENT_COLOR, TOPICS, type SubjectExtra } from '@/data/subjects';
import { loadCustomSets } from '@/lib/customSets';
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
  onOpenEditor: () => void;
}

const DIFFICULTY_OPTIONS: { id: Difficulty; label: string; desc: string; bars: number; color: string }[] = [
  { id: 'easy', label: 'Легко', desc: '~50 сек. повітря', bars: 1, color: '#7ed957' },
  { id: 'normal', label: 'Нормально', desc: '~25 сек. повітря', bars: 2, color: '#ffd43b' },
  { id: 'hard', label: 'Важко', desc: '~10 сек. повітря', bars: 3, color: '#ff5a5a' },
];

const STATS = [
  { value: '15', label: 'питань', icon: Play, color: '#3b9eff' },
  { value: '4.5', label: 'хвилини', icon: Clock, color: '#ffd43b' },
  { value: '3', label: 'формати', icon: Layers, color: '#34d399' },
];

const MODE_COLOR = { sprint: '#ffd43b', topic: '#3b9eff' } as const;

function SectionHeader({
  step, title, meta, color = '#ffd43b',
}: {
  step: string;
  title: string;
  meta?: string;
  color?: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-2.5">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-display text-[11px] font-extrabold tabular-nums"
        style={{ backgroundColor: `${color}1f`, color, boxShadow: `inset 0 0 0 1px ${color}55` }}
      >
        {step}
      </span>
      <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-white">
        <FlyingText text={title} />
      </h3>
      <span
        aria-hidden="true"
        className="h-[3px] flex-1 rounded-full"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${color}66 0 8px, transparent 8px 14px)`,
        }}
      />
      {meta && (
        <span
          className="shrink-0 rounded-md px-2 py-0.5 font-display text-[9px] font-extrabold uppercase tracking-wide"
          style={{ backgroundColor: `${color}16`, color, boxShadow: `inset 0 0 0 1px ${color}45` }}
        >
          {meta}
        </span>
      )}
    </div>
  );
}

function OptionTile({
  active, color, onClick, icon, title, hint, tag, meter,
}: {
  active: boolean;
  color: string;
  onClick: () => void;
  icon: ReactNode;
  title: string;
  hint: string;
  tag?: string;
  meter?: number;
}) {
  const onColor = readableTextOn(color);
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="group relative flex items-center gap-3 overflow-hidden rounded-xl p-3 text-left transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 active:translate-y-0"
      style={{
        background: active
          ? `linear-gradient(150deg, ${color}, ${color}d9)`
          : `linear-gradient(180deg, ${color}14 0%, #171a21 65%, #14171d 100%)`,
        color: active ? onColor : '#e2e6ee',
        boxShadow: active
          ? `inset 0 2px 0 rgba(255,255,255,0.30), inset 0 -3px 0 rgba(0,0,0,0.20), 0 10px 24px -12px ${color}`
          : `inset 0 0 0 1px ${color}4d, inset 0 -3px 0 rgba(0,0,0,0.40)`,
        '--tw-ring-color': color,
      } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1"
        style={{ backgroundColor: active ? 'rgba(255,255,255,0.45)' : color }}
      />

      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: active ? 'rgba(15,17,21,0.18)' : `${color}22`, color: active ? onColor : color }}
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span className="truncate font-display text-xs font-extrabold uppercase tracking-wide">
            <FlyingText text={title} />
          </span>
          {tag && (
            <span
              className="shrink-0 rounded px-1 py-0.5 text-[8px] font-extrabold uppercase tracking-[0.1em]"
              style={{ backgroundColor: active ? 'rgba(15,17,21,0.16)' : `${color}1f`, color: active ? onColor : color }}
            >
              {tag}
            </span>
          )}
        </span>
        <span className="mt-0.5 block truncate text-[11px] opacity-80">{hint}</span>

        {typeof meter === 'number' && (
          <span aria-hidden="true" className="mt-1.5 flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1 w-5 rounded-full transition-colors"
                style={{
                  backgroundColor: i < meter
                    ? (active ? onColor : color)
                    : (active ? 'rgba(15,17,21,0.18)' : 'rgba(255,255,255,0.14)'),
                }}
              />
            ))}
          </span>
        )}
      </span>

      {active && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-cave-900/80 text-white ring-2 ring-white/25">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
      )}
    </button>
  );
}

export default function WelcomeScreen({
  subject, mode, topicId, difficulty, loading,
  onSubject, onMode, onTopic, onDifficulty, onStart, onOpenEditor,
}: Props) {
  const topics = TOPICS[subject] ?? [];
  const activeSubject = SUBJECTS.find((s) => s.id === subject) as SubjectExtra;
  const color = ELEMENT_COLOR[activeSubject.element];
  const ctaDisabled = loading || (mode === 'topic' && !topicId);
  const activeDiff = DIFFICULTY_OPTIONS.find((d) => d.id === difficulty) ?? DIFFICULTY_OPTIONS[1];
  const activeTopic = topics.find((t) => t.id === topicId);
  const modeLabel = mode === 'sprint' ? 'Спринт' : (activeTopic?.label ?? 'Тема');
  const customCount = loadCustomSets().length;

  return (
    <div className="animate-pop-in space-y-6 sm:space-y-7">
      {/* ===== Mission briefing ===== */}
      <section className="fe-panel relative isolate overflow-hidden">
        <div className="hazard-strip h-2 w-full" aria-hidden="true" />

        <div className="relative p-5 sm:p-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: `radial-gradient(90% 130% at 88% -20%, ${color}30 0%, transparent 60%), radial-gradient(70% 110% at -10% 10%, rgba(59,158,255,0.14) 0%, transparent 55%), radial-gradient(60% 90% at 50% 120%, rgba(255,212,59,0.10) 0%, transparent 60%)`,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full opacity-40 blur-3xl transition-colors duration-700"
            style={{ background: color }}
          />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="inline-flex items-center gap-2 rounded-full bg-cave-800/80 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.22em] text-steel-50 ring-1 ring-steel-500/60">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                  style={{ backgroundColor: color }}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
              </span>
              Mission briefing
            </p>
            <span className="font-display text-[9px] font-extrabold uppercase tracking-[0.2em] text-steel-100">
              Сезон 01 · NMT
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3.5 sm:gap-5">
            <div
              className="flex h-16 w-16 shrink-0 animate-float items-center justify-center rounded-2xl text-4xl ring-2 ring-white/15 sm:h-20 sm:w-20 sm:text-5xl"
              style={{
                backgroundColor: color,
                boxShadow: `inset 0 2px 0 rgba(255,255,255,0.35), inset 0 -5px 0 rgba(0,0,0,0.25), 0 14px 32px -12px ${color}`,
              }}
            >
              {activeSubject.icon}
            </div>

            <h2 className="min-w-0 font-display text-[1.9rem] font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-[2.5rem]">
              <span className="text-shadow-arcade">
                <FlyingText text="Втечи від" wild />
              </span>
              <br />
              <span style={{ color, textShadow: '0 4px 0 rgba(0,0,0,0.45)' }}>
                <FlyingText text="потопу." wild />
              </span>
            </h2>
          </div>

          <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-steel-50/85 sm:text-sm">
            Чим довше сидиш на питанні — тим вищий потоп. Коли вода дістане повітря, починається
            відлік. Відповідай швидко: поки є повітря — є шанс.
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="relative overflow-hidden rounded-lg px-2.5 py-2"
                  style={{
                    backgroundImage: `linear-gradient(180deg, ${s.color}20 0%, rgba(20,23,29,0.95) 70%)`,
                    boxShadow: `inset 0 0 0 1px ${s.color}4d`,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[2px]"
                    style={{ backgroundColor: s.color, boxShadow: `0 0 10px ${s.color}` }}
                  />
                  <div className="flex items-center justify-between gap-1">
                    <p className="font-display text-lg font-extrabold leading-none text-white sm:text-xl">
                      <FlyingText text={s.value} />
                    </p>
                    <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: s.color }} />
                  </div>
                  <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.14em] text-steel-100 sm:text-[9px]">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hazard-strip h-1.5 w-full opacity-70" aria-hidden="true" />
      </section>

      {/* ===== 01 · Subject ===== */}
      <section>
        <SectionHeader step="01" title="Обери предмет" meta={`${SUBJECTS.length} секторів`} color="#3b9eff" />
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {SUBJECTS.map((s, i) => (
            <SubjectCard
              key={s.id}
              subject={s}
              index={i}
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

      {/* ===== 02 · Mode ===== */}
      <section>
        <SectionHeader
          step="02"
          title="Режим"
          meta={mode === 'sprint' ? 'SPRINT' : 'TOPIC'}
          color={MODE_COLOR[mode]}
        />
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <OptionTile
            active={mode === 'sprint'}
            color={MODE_COLOR.sprint}
            onClick={() => onMode('sprint')}
            icon={<Zap className="h-5 w-5" fill="currentColor" />}
            title="Випадковий спринт"
            hint="15 питань з усіх тем"
            tag="Швидко"
          />
          <OptionTile
            active={mode === 'topic'}
            color={MODE_COLOR.topic}
            onClick={() => onMode('topic')}
            icon={<BookOpen className="h-5 w-5" />}
            title="Обрати тему"
            hint="Фокус на одній темі"
            tag="Фокус"
          />
        </div>

        {mode === 'topic' && (
          <div className="mt-3 flex animate-slide-up flex-wrap gap-2">
            {topics.map((t) => {
              const active = t.id === topicId;
              return (
                <button
                  key={t.id}
                  onClick={() => onTopic(t.id)}
                  aria-pressed={active}
                  className="rounded-lg px-3 py-1.5 font-display text-[11px] font-extrabold uppercase tracking-wide ring-1 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2"
                  style={{
                    background: active ? color : '#15181e',
                    color: active ? readableTextOn(color) : '#cfd4dd',
                    boxShadow: active
                      ? `inset 0 2px 0 rgba(255,255,255,0.28), 0 8px 18px -10px ${color}`
                      : 'inset 0 -2px 0 rgba(0,0,0,0.35)',
                    '--tw-ring-color': active ? color : 'rgba(255,255,255,0.12)',
                  } as CSSProperties}
                >
                  <FlyingText text={t.label} />
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* ===== 03 · Difficulty ===== */}
      <section>
        <SectionHeader step="03" title="Складність" meta={activeDiff.label} color={activeDiff.color} />
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {DIFFICULTY_OPTIONS.map((d) => (
            <OptionTile
              key={d.id}
              active={difficulty === d.id}
              color={d.color}
              onClick={() => onDifficulty(d.id)}
              icon={<Wind className="h-4 w-4" />}
              title={d.label}
              hint={d.desc}
              meter={d.bars}
            />
          ))}
        </div>
      </section>

      {/* ===== Editor entry ===== */}
      <section className="fe-panel flex items-center justify-between gap-3 p-4 sm:p-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-volt/15 text-volt ring-1 ring-volt/40">
            <Pencil className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-xs font-extrabold uppercase tracking-wide text-white">
              Редактор завдань
            </p>
            <p className="truncate text-[11px] text-steel-100">
              Створюй свої тести та ділись з іншими · {customCount} збережено
            </p>
          </div>
        </div>
        <button
          onClick={onOpenEditor}
          className="fe-btn inline-flex shrink-0 items-center gap-1.5 px-4 py-2.5 text-xs"
          style={{ backgroundColor: '#3b9eff', color: '#fff' }}
        >
          Відкрити
        </button>
      </section>

      {/* ===== Launch ===== */}
      <div>
        <div
          className="rounded-2xl border bg-cave-400/95 p-2.5 backdrop-blur-md"
          style={{
            borderColor: `${color}66`,
            boxShadow: `0 18px 40px -14px rgba(0,0,0,0.85), 0 0 0 1px ${color}22, 0 0 28px -8px ${color}66`,
          }}
        >
          <div className="mb-2 flex items-center gap-1.5 px-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-steel-100">
            <span className="text-steel-50">{activeSubject.icon} {activeSubject.label}</span>
            <span className="h-1 w-1 rounded-full bg-steel-300" aria-hidden="true" />
            <span className="min-w-0 truncate">{modeLabel}</span>
            <span className="h-1 w-1 rounded-full bg-steel-300" aria-hidden="true" />
            <span style={{ color: activeDiff.color }}>{activeDiff.label}</span>
            <span className="ml-auto hidden shrink-0 text-steel-100/70 sm:inline">15 питань · 4.5 хв</span>
          </div>

          <button
            onClick={onStart}
            disabled={ctaDisabled}
            className="shine-sweep fe-btn inline-flex w-full items-center justify-center gap-2.5 px-6 py-3.5 text-base sm:text-lg"
            style={{
              backgroundColor: color,
              backgroundImage: `linear-gradient(180deg, ${color} 0%, ${color} 55%, ${color}cc 100%)`,
              color: readableTextOn(color),
            }}
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin-slow rounded-full border-2 border-black/20 border-t-current" />
                <FlyingText text="Готую питання…" />
              </>
            ) : (
              <>
                <Play className="h-5 w-5" fill="currentColor" />
                <FlyingText text="Почати забіг" wild />
              </>
            )}
          </button>

          {mode === 'topic' && !topicId && (
            <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-wide text-volt">
              Обери тему вище, щоб продовжити
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
