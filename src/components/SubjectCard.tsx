import type { CSSProperties } from 'react';
import { Check } from 'lucide-react';
import { DIFFICULTY_STYLE, ELEMENT_COLOR, type SubjectExtra } from '@/data/subjects';
import { readableTextOn } from '@/lib/color';

interface Props {
  subject: SubjectExtra;
  topicCount: number;
  active: boolean;
  onSelect: () => void;
}

export default function SubjectCard({ subject, topicCount, active, onSelect }: Props) {
  const color = ELEMENT_COLOR[subject.element];
  const diff = DIFFICULTY_STYLE[subject.difficulty];
  const onColor = readableTextOn(color);

  return (
    <button
      onClick={onSelect}
      aria-pressed={active}
      className="group relative flex min-h-[9.5rem] flex-col justify-between overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-12px_var(--glow)] focus-visible:outline-none focus-visible:ring-2"
      style={{
        '--glow': color,
        '--tw-ring-color': color,
        background: active
          ? `linear-gradient(150deg, ${color} 0%, ${color}e6 60%, ${color}b3 100%)`
          : `radial-gradient(120% 90% at 100% 0%, ${color}2e 0%, transparent 60%), #1a1d24`,
        color: active ? onColor : '#e2e6ee',
        boxShadow: active ? `0 10px 28px -10px ${color}` : `inset 0 0 0 1px ${color}40`,
      } as CSSProperties}
    >
      <div className="flex items-start justify-between">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
          style={{ backgroundColor: active ? 'rgba(15,17,21,0.18)' : `${color}26` }}
        >
          {subject.icon}
        </span>
        {active && (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cave-900/80 text-white">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="font-display text-base font-800 leading-tight">{subject.label}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className={`rounded px-1.5 py-0.5 text-[9px] font-800 uppercase tracking-wide ${diff.bg} ${diff.text}`}>
            {subject.difficulty}
          </span>
          <span className="text-[11px] font-700 opacity-80">{topicCount} тем</span>
        </div>
      </div>
    </button>
  );
}
