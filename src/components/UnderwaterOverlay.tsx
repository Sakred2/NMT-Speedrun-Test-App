import { useMemo, type CSSProperties } from 'react';
import WaterSurface from '@/components/WaterSurface';
import { ELEMENT_COLOR, type Element } from '@/data/subjects';

interface Props {
  /** Fully flooded — the player is underwater. */
  active: boolean;
  /** 0..100 — how far the tide has risen across the screen. */
  floodPct: number;
  /** 0..100 — remaining air (used for the red danger pulse). */
  air?: number;
  element?: Element;
}

interface Bubble {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

interface Mote {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

interface Ray {
  id: number;
  left: number;
  width: number;
  height: number;
  tilt: number;
  duration: number;
  delay: number;
  opacity: number;
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export default function UnderwaterOverlay({
  active,
  floodPct,
  air = 100,
  element = 'water',
}: Props) {
  const color = ELEMENT_COLOR[element] ?? '#3b9eff';
  const level = Math.max(0, Math.min(100, floodPct));
  const danger = active && air <= 30;

  const bubbles = useMemo<Bubble[]>(
    () =>
      Array.from({ length: 20 }, (_, id) => ({
        id,
        left: rand(2, 98),
        size: rand(3, 16),
        duration: rand(4.5, 11),
        delay: -rand(0, 9),
        drift: rand(-26, 26),
      })),
    [],
  );

  const motes = useMemo<Mote[]>(
    () =>
      Array.from({ length: 34 }, (_, id) => ({
        id,
        left: rand(0, 100),
        top: rand(0, 100),
        size: rand(1, 3.4),
        duration: rand(14, 30),
        delay: -rand(0, 30),
        drift: rand(-40, 40),
      })),
    [],
  );

  const rays = useMemo<Ray[]>(
    () =>
      Array.from({ length: 7 }, (_, id) => ({
        id,
        left: rand(-6, 92),
        width: rand(34, 104),
        height: rand(52, 92),
        tilt: rand(5, 17),
        duration: rand(8, 16),
        delay: -rand(0, 12),
        opacity: rand(0.12, 0.3),
      })),
    [],
  );

  if (level <= 0.01 && !active) return null;

  return (
    <div
      className="uw-overlay fixed inset-0 z-30 overflow-hidden"
      style={{ '--uw-color': color } as CSSProperties}
      aria-hidden="true"
    >
      {/* ===== Rising tide ===== */}
      <div className="uw-water" style={{ height: `${level}%` }}>
        <div
          className="uw-water-body"
          style={{
            backgroundImage: `linear-gradient(180deg, ${color}40 0px, ${color}1f 22px, ${color}14 88px, ${color}29 100%)`,
          }}
        />

        <div className="uw-water-inner">
          <div className="uw-caustics uw-caustics--tide" />
          {level > 2 &&
            bubbles.map((b) => (
              <span
                key={b.id}
                className="uw-bubble uw-bubble--inwater"
                style={{
                  left: `${b.left}%`,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  animationDuration: `${b.duration}s`,
                  animationDelay: `${b.delay}s`,
                  '--drift': `${b.drift}px`,
                } as CSSProperties}
              />
            ))}
        </div>

        <WaterSurface color={color} className="uw-water-surface" intensity={0.95} />
        <div className="uw-crest" />
      </div>

      {/* ===== Fully underwater ===== */}
      {active && (
        <>
          <div className="uw-tint" />

          <div className="uw-rays">
            {rays.map((r) => (
              <span
                key={r.id}
                className="uw-ray"
                style={{
                  left: `${r.left}%`,
                  width: `${r.width}px`,
                  height: `${r.height}%`,
                  opacity: r.opacity,
                  animationDuration: `${r.duration}s`,
                  animationDelay: `${r.delay}s`,
                  '--ray-tilt': `${r.tilt}deg`,
                } as CSSProperties}
              />
            ))}
          </div>

          <div className="uw-caustics uw-caustics--deep" />

          <div className="uw-motes">
            {motes.map((m) => (
              <span
                key={m.id}
                className="uw-mote"
                style={{
                  left: `${m.left}%`,
                  top: `${m.top}%`,
                  width: `${m.size}px`,
                  height: `${m.size}px`,
                  animationDuration: `${m.duration}s`,
                  animationDelay: `${m.delay}s`,
                  '--drift': `${m.drift}px`,
                } as CSSProperties}
              />
            ))}
          </div>

          {/* underside of the water surface above the player */}
          <WaterSurface color="#bfe9ff" className="uw-ceiling" intensity={0.5} />
          <div className="uw-ceiling-glow" />

          {/* ambient bubbles drifting upward */}
          {bubbles.map((b) => (
            <span
              key={`free-${b.id}`}
              className="uw-bubble uw-bubble--free"
              style={{
                left: `${b.left}%`,
                width: `${b.size + 2}px`,
                height: `${b.size + 2}px`,
                animationDuration: `${b.duration * 1.15}s`,
                animationDelay: `${b.delay * 1.4}s`,
                '--drift': `${b.drift}px`,
              } as CSSProperties}
            />
          ))}

          <div className="uw-vignette" />
          {danger && <div className="uw-danger" />}
        </>
      )}
    </div>
  );
}
