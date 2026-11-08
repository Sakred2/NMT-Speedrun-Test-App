export function readableTextOn(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const channel = (shift: number) => {
    const v = ((n >> shift) & 255) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * channel(16) + 0.7152 * channel(8) + 0.0722 * channel(0);
  return luminance > 0.35 ? '#0f1115' : '#ffffff';
}
