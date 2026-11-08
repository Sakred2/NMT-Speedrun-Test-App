interface Props {
  text: string;
  className?: string;
  /** Bigger, more dramatic flight path — use for headlines. */
  wild?: boolean;
}

export default function FlyingText({ text, className, wild }: Props) {
  return (
    <span className={className} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={wild ? 'fly-letter fly-letter-wild' : 'fly-letter'}
          style={{
            animationDelay: `${(i * 0.17) % 1.6}s`,
            animationDuration: wild
              ? `${3.2 + (i % 4) * 0.5}s`
              : `${2.8 + (i % 4) * 0.4}s`,
          }}
        >
          {ch === ' ' ? '\u00a0' : ch}
        </span>
      ))}
    </span>
  );
}
