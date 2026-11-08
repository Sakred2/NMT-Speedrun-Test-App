import type { CSSProperties } from 'react';
import { Check } from 'lucide-react';
import FlyingText from '@/components/FlyingText';
import { DIFFICULTY_STYLE, ELEMENT_COLOR, type SubjectExtra } from '@/data/subjects';
import { readableTextOn } from '@/lib/color';

interface Props {
  subject: SubjectExtra;
  topicCount: number;
  active: boolean;
  index: number;
  onSelect: () => void;
}

export default function SubjectCard({ subject, topicCount, active, index, onSelect }: Props) {
  const color = ELEMENT_COLOR[subject.element];
  const diff = DIFFICULTY_STYLE[subject.difficulty];
  const onColor = readableTextOn(color);
  const level = String(index + 1).padStart(2, '0');

  return (
    <button
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`${subject.label} — рівень ${level}, ${topicCount} тем`}
      className="group relative flex min-h-[8.75rem] flex-col justify-between overflow-hidden rounded-xl p-3 text-left transition-all duration-200 hover:-translate-y-1 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 active:translate-y-0.5 sm:min-h-[9.5rem] sm:rounded-2xl sm:p-4"
      style={{
        '--glow': color,
        '--tw-ring-color': color,
        background: active
          ? `linear-gradient(155deg, ${color} 0%, ${color}e6 55%, ${color}b3 100%)`
          : `radial-gradient(130% 110% at 100% 0%, ${color}3d 0%, transparent 62%), linear-gradient(180deg, ${color}12 0%, #171a21 60%, #14171d 100%)`,
        color: active ? onColor : '#e2e6ee',
        boxShadow: active
          ? `inset 0 2px 0 rgba(255,255,255,0.35), inset 0 -4px 0 rgba(0,0,0,0.22), 0 12px 28px -12px ${color}`
          : `inset 0 0 0 1px ${color}55, inset 0 -3px 0 rgba(0,0,0,0.45)`,
      } as CSSProperties}
    >
      {/* top accent strip */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ backgroundColor: active ? 'rgba(255,255,255,0.45)' : color }}
      />
      {/* corner glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full opacity-40 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-start justify-between gap-2">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-lg text-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:h-12 sm:w-12 sm:rounded-xl sm:text-2xl"
          style={{
            backgroundColor: active ? 'rgba(15,17,21,0.18)' : `${color}2e`,
            boxShadow: active ? undefined : `inset 0 0 0 1px ${color}4d`,
          }}
        >
          {subject.icon}
        </span>

        {active ? (
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-cave-900/80 text-white ring-2 ring-white/30">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
        ) : (
          <span
            className="font-display text-[10px] font-extrabold uppercase tracking-[0.14em] opacity-70"
            style={{ color }}
          >
            Lvl {level}
          </span>
        )}
      </div>

      <div className="mt-3">
        <p className="font-display text-sm font-extrabold uppercase leading-tight tracking-wide sm:text-base">
          <FlyingText text={subject.label} />
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span
            className={`rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ring-1 ring-black/10 ${diff.bg} ${diff.text}`}
          >
            {subject.difficulty}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wide opacity-75">
            {topicCount} тем
          </span>
        </div>
      </div>
    </button>
  );
}
