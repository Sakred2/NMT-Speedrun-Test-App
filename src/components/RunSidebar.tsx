import { useMemo } from 'react';
import { Waves, Route, Trophy, Target, Timer } from 'lucide-react';
import WaterSurface from '@/components/WaterSurface';
import { ELEMENT_COLOR, type Element } from '@/data/subjects';

interface Props {
  current: number;
  total: number;
  score: number;
  correct: number;
  floodPct: number;
  flooded: boolean;
  air: number;
  questionElapsed: number;
  maxSeconds: number;
  element: Element;
  className?: string;
}

/**
 * Right-hand HUD rail for a run: depth tube, room route and run stats.
 */
export default function RunSidebar({
  current,
  total,
  score,
  correct,
  floodPct,
  flooded,
  air,
  questionElapsed,
  maxSeconds,
  element,
  className = '',
}: Props) {
  const color = ELEMENT_COLOR[element];
  const depth = (floodPct * 0.32).toFixed(1);
  const remaining = questionElapsed / maxSeconds;
  const urgent = questionElapsed <= 5 && !flooded;

  const bubbles = useMemo(
    () =>
      [0, 1, 2].map((i) => ({
        id: i,
        left: 18 + i * 26,
        size: 2 + i,
        duration: 3.4 + i * 1.3,
        delay: -i * 1.9,
      })),
    [],
  );

  const meters = [40, 30, 20, 10, 0];

  return (
    <aside className={`run-sidebar ${className}`} aria-label="Стан забігу">
      {/* depth tube */}
      <div className="hud-card">
        <div className="hud-head">
          <Waves className="h-3.5 w-3.5" style={{ color }} />
          Глибина
          <span className="ml-auto font-display text-[10px] tabular-nums text-white">{depth} м</span>
        </div>

        <div className="depth-tube">
          <div
            className="depth-fill"
            style={{
              height: `${Math.min(100, floodPct)}%`,
              backgroundImage: `linear-gradient(180deg, ${color}cc 0%, ${color}88 100%)`,
            }}
          >
            <div className="depth-fill__inner">
              <div className="uw-caustics depth-caustics" />
              {bubbles.map((b) => (
                <span
                  key={b.id}
                  className="uw-bubble uw-bubble--inwater"
                  style={{
                    left: `${b.left}%`,
                    width: `${b.size}px`,
                    height: `${b.size}px`,
                    animationDuration: `${b.duration}s`,
                    animationDelay: `${b.delay}s`,
                  }}
                />
              ))}
            </div>
            <WaterSurface color={color} className="depth-surface" intensity={1} />
          </div>

          <div className="depth-ticks" aria-hidden="true">
            {meters.map((m) => (
              <span key={m} className="depth-tick">
                <span className="depth-tick__line" />
                <span className="depth-tick__label">{m}</span>
              </span>
            ))}
          </div>

          <span className="depth-tube__glare" aria-hidden="true" />
        </div>
      </div>

      {/* per-room timer */}
      <div className="hud-card">
        <div className="hud-head">
          <Timer className="h-3.5 w-3.5" />
          Час
          <span className={`ml-auto font-display text-[10px] tabular-nums ${urgent ? 'text-rose-400' : 'text-white'}`}>
            {questionElapsed} с
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`run-ring run-ring--lg ${urgent ? 'run-ring--urgent' : ''}`}
            style={{
              backgroundImage: `conic-gradient(${urgent ? '#fb7185' : color} ${Math.max(0, Math.min(1, remaining)) * 360}deg, rgba(255,255,255,0.08) 0deg)`,
            }}
          >
            <span className="run-ring__inner">
              <span className="tabular-nums">{questionElapsed}</span>
            </span>
          </div>
          <div className="min-w-0 text-[10px] font-700 leading-snug text-steel-100">
            {flooded ? 'Повітря тане — відповідай!' : 'Встигни, поки вода не піднялась.'}
          </div>
        </div>

        {flooded && (
          <div className="mt-2">
            <div className="mb-1 flex items-center justify-between text-[8px] font-extrabold uppercase tracking-[0.12em]">
              <span className="text-steel-100">Повітря</span>
              <span className={air <= 30 ? 'text-rose-400' : 'text-sky-300'}>{Math.round(air)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-cave-700 ring-1 ring-steel-500/40">
              <div
                className={`h-full rounded-full ${air <= 30 ? 'animate-pulse' : ''}`}
                style={{
                  width: `${Math.max(0, Math.min(100, air))}%`,
                  backgroundImage:
                    air <= 30
                      ? 'linear-gradient(90deg, #be123c, #fb7185)'
                      : 'linear-gradient(90deg, #0284c7, #38bdf8 60%, #a5f3fc)',
                  boxShadow: air <= 30 ? '0 0 10px rgba(251,113,133,0.6)' : '0 0 10px rgba(56,189,248,0.45)',
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* escape route */}
      <div className="hud-card">
        <div className="hud-head">
          <Route className="h-3.5 w-3.5" />
          Маршрут
          <span className="ml-auto font-display text-[10px] tabular-nums text-white">
            {Math.min(current + 1, total)}/{total}
          </span>
        </div>
        <div className="room-grid">
          {Array.from({ length: total }, (_, i) => {
            const done = i < current;
            const active = i === current;
            return (
              <span
                key={i}
                className={`room-tile ${active ? 'room-tile--active' : ''}`}
                style={
                  done
                    ? { backgroundColor: `${color}33`, color, boxShadow: `inset 0 0 0 1px ${color}66` }
                    : active
                      ? { backgroundColor: color, color: '#0b0d11', boxShadow: `0 0 12px ${color}88` }
                      : { backgroundColor: 'rgba(255,255,255,0.04)', color: '#5a6573', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)' }
                }
                title={`Кімната ${i + 1}`}
              >
                {i + 1}
              </span>
            );
          })}
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="hud-card !p-2">
          <Trophy className="h-3.5 w-3.5 text-volt" />
          <p className="mt-1 font-display text-lg font-extrabold leading-none tabular-nums text-white">{score}</p>
          <p className="mt-0.5 text-[8px] font-extrabold uppercase tracking-[0.14em] text-steel-100">бали</p>
        </div>
        <div className="hud-card !p-2">
          <Target className="h-3.5 w-3.5 text-emerald-400" />
          <p className="mt-1 font-display text-lg font-extrabold leading-none tabular-nums text-white">{correct}</p>
          <p className="mt-0.5 text-[8px] font-extrabold uppercase tracking-[0.14em] text-steel-100">врятовано</p>
        </div>
      </div>
    </aside>
  );
}
