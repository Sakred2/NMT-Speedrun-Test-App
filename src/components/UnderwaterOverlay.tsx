import { useMemo } from 'react';

interface Props {
  active: boolean;
}

interface Bubble {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

export default function UnderwaterOverlay({ active }: Props) {
  const bubbles = useMemo<Bubble[]>(() => {
    if (!active) return [];
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 4 + Math.random() * 14,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 5,
    }));
  }, [active]);

  if (!active) return null;

  return (
    <div className="uw-overlay fixed inset-0 z-30 overflow-hidden">
      {/* blue tint + vignette */}
      <div className="uw-tint absolute inset-0" />

      {/* caustic light rays */}
      <div className="uw-caustics absolute inset-0" />

      {/* water surface waves at top */}
      <div className="uw-surface absolute left-0 right-0 top-0 w-full" />

      {/* bubbles */}
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="uw-bubble"
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
  );
}
