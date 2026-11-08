interface Props {
  text: string;
  className?: string;
}

export default function FlyingText({ text, className }: Props) {
  return (
    <span className={className} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="fly-letter"
          style={{
            animationDelay: `${(i * 0.17) % 1.6}s`,
            animationDuration: `${2.8 + (i % 4) * 0.4}s`,
          }}
        >
          {ch === ' ' ? '\u00a0' : ch}
        </span>
      ))}
    </span>
  );
}
