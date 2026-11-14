import { DoorOpen } from 'lucide-react';
import { ELEMENT_COLOR, type Element } from '@/data/subjects';

interface Props {
  current: number;
  total: number;
  subjectLabel: string;
  icon: string;
  element: Element;
  floodPct: number;
  flooded: boolean;
  questionElapsed: number;
  maxSeconds: number;
}

export default function RunBanner({
  current,
  total,
  subjectLabel,
  icon,
  element,
  floodPct,
  flooded,
  questionElapsed,
  maxSeconds,
}: Props) {
  const color = ELEMENT_COLOR[element];
  const depth = (floodPct * 0.32).toFixed(1);
  const urgent = questionElapsed <= 5 && !flooded;
  const ringColor = urgent ? '#fb7185' : color;
  const ringPct = Math.max(0, Math.min(1, questionElapsed / maxSeconds));

  const status = flooded
    ? { label: 'ПОТОП', color: '#fb7185' }
    : floodPct >= 75
      ? { label: 'КРИТИЧНО', color: '#fbbf24' }
      : { label: 'ВТЕЧА', color: '#34d399' };

  const room = String(Math.min(current + 1, total)).padStart(2, '0');

  return (
    <div
      className="run-banner"
      style={{ backgroundImage: `linear-gradient(120deg, ${color}26 0%, rgba(18,21,27,0.95) 55%)` }}
    >
      <span className="run-banner__door" style={{ backgroundColor: color }} aria-hidden="true">
        <DoorOpen className="h-5 w-5" strokeWidth={2.5} />
      </span>

      <div className="min-w-0">
        <p className="font-display text-[9px] font-extrabold uppercase tracking-[0.22em] text-steel-100">
          Кімната {room} / {String(total).padStart(2, '0')}
        </p>
        <p className="mt-0.5 truncate font-display text-sm font-extrabold uppercase tracking-wide text-white">
          <span aria-hidden="true">{icon}</span> {subjectLabel}
        </p>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1.5">
        <span className="run-chip run-chip--optional">
          <span className="text-[10px]" aria-hidden="true">↓</span> {depth} м
        </span>
        <span
          className="run-chip"
          style={{
            color: status.color,
            backgroundColor: `${status.color}1f`,
            boxShadow: `inset 0 0 0 1px ${status.color}55`,
          }}
        >
          <span className="run-chip__dot" style={{ backgroundColor: status.color }} />
          {status.label}
        </span>

        <div
          className={`run-ring ${urgent ? 'run-ring--urgent' : ''}`}
          style={{ backgroundImage: `conic-gradient(${ringColor} ${ringPct * 360}deg, rgba(255,255,255,0.09) 0deg)` }}
          title={`${questionElapsed} секунд на відповідь`}
          role="timer"
          aria-label={`${questionElapsed} секунд на відповідь`}
        >
          <span className="run-ring__inner">
            <span className="tabular-nums">{questionElapsed}</span>
          </span>
        </div>
      </div>

      <div
        className="run-banner__flood"
        aria-hidden="true"
        style={{ width: `${Math.min(100, floodPct)}%`, backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
      />
    </div>
  );
}
