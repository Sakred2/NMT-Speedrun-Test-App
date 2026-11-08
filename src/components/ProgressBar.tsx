import type { Element } from '@/data/subjects';
import { ELEMENT_COLOR } from '@/data/subjects';

interface Props {
  current: number;
  total: number;
  score: number;
  /** Global elapsed seconds across the whole test (counts up). */
  elapsed: number;
  /** Max seconds before flood is fully risen (100%). */
  floodMax: number;
  /** Air 0..100. Once flood is full, air drains. */
  air: number;
  element: Element;
}

function fmt(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function ProgressBar({
  current, total, score, elapsed, floodMax, air, element,
}: Props) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  const floodPct = Math.min(100, (elapsed / floodMax) * 100);
  const flooded = floodPct >= 100;
  const danger = flooded || (!flooded && floodMax - elapsed <= 6);
  const airLow = air <= 25;
  const color = ELEMENT_COLOR[element];

  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center justify-between text-sm font-800">
        <span className="text-steel-50">
          ПИТАННЯ <span style={{ color }}>{Math.min(current + 1, total)}</span> / {total}
        </span>
        <div className="flex items-center gap-2.5">
          <span
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1 font-800 uppercase tracking-wide"
            style={{ backgroundColor: `${color}22`, color }}
          >
            <span className="text-xs">★</span> {score}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1 tabular-nums font-800 bg-steel-400/50 text-steel-50"
          >
            ⏱ {fmt(elapsed)}
          </span>
        </div>
      </div>

      {/* Progress bar (rooms escaped) */}
      <div className="mb-2 h-3 w-full overflow-hidden rounded-full bg-cave-600 ring-1 ring-steel-500/40">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color, boxShadow: `0 0 10px ${color}88` }}
        />
      </div>

      {/* Flood gauge — rising water across the whole run */}
      <div className="relative h-9 w-full overflow-hidden rounded-lg bg-cave-600 ring-1 ring-steel-500/40">
        {/* hatch warning zones */}
        <div className="absolute inset-0 flex">
          <div className="h-full w-1/4 border-r border-dashed border-steel-400/20" />
          <div className="h-full w-1/4 border-r border-dashed border-steel-400/20" />
          <div className="h-full w-1/4 border-r border-dashed border-steel-400/20" />
          <div className="h-full" />
        </div>
        {/* rising flood — fills from bottom */}
        <div
          className="absolute bottom-0 left-0 h-full transition-all duration-1000 ease-linear"
          style={{
            height: `${floodPct}%`,
            width: '100%',
            background: `linear-gradient(180deg, ${color}cc, ${color})`,
            boxShadow: `inset 0 2px 0 ${color}`,
          }}
        >
          {/* wavy surface */}
          <div
            className="absolute top-0 left-0 h-1.5 w-full animate-pulse-glow"
            style={{ backgroundColor: color }}
          />
        </div>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-800 uppercase tracking-widest text-white/80">
          {flooded ? '⚠ ПОТОП ПОВНИЙ' : `рівень потопу ${Math.round(floodPct)}%`}
        </span>
      </div>

      {/* Air meter — shows once flood is full */}
      <div
        className={`mt-2 transition-all duration-300 ${
          flooded ? 'opacity-100' : 'opacity-0 h-0 mt-0 overflow-hidden'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className={`text-xs font-800 uppercase tracking-wide ${airLow ? 'text-rose-400' : 'text-sky-300'}`}>
            {airLow ? '💨' : '🫁'} Повітря
          </span>
          <div className="relative h-4 flex-1 overflow-hidden rounded-md bg-cave-700 ring-1 ring-steel-500/40">
            <div
              className={`h-full rounded-md transition-all duration-300 ${
                airLow ? 'animate-pulse bg-rose-500' : 'bg-sky-400'
              }`}
              style={{ width: `${air}%` }}
            />
          </div>
          <span className={`w-9 text-right text-xs font-800 tabular-nums ${airLow ? 'text-rose-400' : 'text-sky-300'}`}>
            {Math.round(air)}%
          </span>
        </div>
      </div>

      {/* low air warning banner */}
      {flooded && airLow && (
        <div className="mt-2 animate-pulse rounded-md bg-rose-500/20 px-3 py-1.5 text-center text-xs font-800 uppercase tracking-widest text-rose-300">
          ⚠ Повітря закінчується — дай відповідь швидше!
        </div>
      )}
      {danger && !flooded && (
        <div className="mt-2 rounded-md bg-amber-500/15 px-3 py-1 text-center text-[10px] font-800 uppercase tracking-widest text-amber-300">
          ⚠ Потоп майже повний
        </div>
      )}
    </div>
  );
}
