import { useMemo } from 'react';
import { Droplets } from 'lucide-react';
import WaterSurface from '@/components/WaterSurface';

interface Props {
  color: string;
  className?: string;
}

/**
 * Decorative "flood simulation" tank shown in the lobby hero.
 * The water breathes up and down on its own loop so the lobby never sits still.
 */
export default function FloodTank({ color, className = '' }: Props) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: 8 + Math.random() * 82,
        size: 3 + Math.random() * 6,
        duration: 3.4 + Math.random() * 3,
        delay: -Math.random() * 6,
      })),
    [],
  );

  return (
    <div className={`flood-tank ${className}`} aria-hidden="true">
      <div className="flex items-center gap-1.5">
        <span className="flood-tank__live" style={{ backgroundColor: color }} />
        <span className="font-display text-[8px] font-extrabold uppercase tracking-[0.2em] text-steel-50">
          Flood sim
        </span>
        <span className="ml-auto flex items-center gap-1 text-[8px] font-extrabold uppercase tracking-[0.14em] text-steel-100">
          <Droplets className="h-3 w-3" style={{ color }} />
          live
        </span>
      </div>

      <div className="flood-tank__glass">
        <div className="flood-tank__grid" />
        <div className="flood-tank__water" style={{ color }}>
          <div className="flood-tank__water-inner">
            <div
              className="flood-tank__water-body"
              style={{ backgroundImage: `linear-gradient(180deg, ${color}8c 0%, ${color}59 100%)` }}
            />
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
          <WaterSurface color={color} className="flood-tank__surface" intensity={1} />
        </div>
        <span className="flood-tank__runner">🏃</span>
        <span className="flood-tank__mark flood-tank__mark--high">⚠</span>
      </div>

      <div className="flex items-center justify-between font-display text-[8px] font-extrabold uppercase tracking-[0.14em] text-steel-100">
        <span>depth 12 m</span>
        <span style={{ color }}>flood 42%</span>
      </div>
    </div>
  );
}
