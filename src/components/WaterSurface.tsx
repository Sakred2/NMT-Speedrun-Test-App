import { useMemo, type CSSProperties } from 'react';

const TILE_WIDTH = 720;

export interface WaveLayer {
  /** Height of the crest, in percent of the strip height. */
  amplitude: number;
  /** Number of full sine periods per tile. */
  waves: number;
  opacity: number;
  /** Seconds for one full tile pass. */
  speed: number;
  reverse?: boolean;
  /** Where the flat waterline sits, in percent of the strip height. */
  baseline: number;
}

const DEFAULT_LAYERS: WaveLayer[] = [
  { amplitude: 15, waves: 2, opacity: 0.35, speed: 13, baseline: 56 },
  { amplitude: 11, waves: 3, opacity: 0.6, speed: 8.5, reverse: true, baseline: 47 },
  { amplitude: 7, waves: 4, opacity: 0.95, speed: 5.5, baseline: 39 },
];

function buildTile(color: string, layer: WaveLayer): string {
  const steps = layer.waves * 28;
  let d = `M0 ${layer.baseline.toFixed(1)}`;
  for (let i = 1; i <= steps; i += 1) {
    const x = (i / steps) * TILE_WIDTH;
    const y = layer.baseline - Math.sin((i / steps) * Math.PI * 2 * layer.waves) * layer.amplitude;
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  d += ` L${TILE_WIDTH} 100 L0 100 Z`;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${TILE_WIDTH} 100' preserveAspectRatio='none'><path d='${d}' fill='${color}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

interface Props {
  /** 6-digit hex color, e.g. #3b9eff */
  color: string;
  /** Positioning + size classes. The element should be positioned absolute/fixed by the caller. */
  className?: string;
  layers?: WaveLayer[];
  /** Multiplies all layer opacities (0..1+). */
  intensity?: number;
}

/**
 * Seamlessly looping animated water surface built from tiled SVG waves.
 * Place it at the top of a water body so the crests read as the waterline.
 */
export default function WaterSurface({
  color,
  className = '',
  layers = DEFAULT_LAYERS,
  intensity = 1,
}: Props) {
  const tiles = useMemo(
    () => layers.map((layer) => ({ ...layer, image: buildTile(color, layer) })),
    [color, layers],
  );

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      {tiles.map((layer, i) => (
        <div
          key={i}
          className="wave-layer"
          style={{
            backgroundImage: layer.image,
            backgroundSize: `${TILE_WIDTH}px 100%`,
            opacity: Math.max(0, Math.min(1, layer.opacity * intensity)),
            animationDuration: `${layer.speed}s`,
            animationDirection: layer.reverse ? 'reverse' : 'normal',
            animationDelay: `${(i * 1.7) % 4}s`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
