export const SCRAMBLE_GLYPHS = 'abcdefghijklmnopqrstuvwxyz0123456789#%&*+';

const FIXED = new Set([' ', '.']);

const power1InOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

export function scrambleFrame(target: string, progress: number, rand: () => number): string {
  const clamped = Math.min(1, Math.max(0, progress));
  const resolved = Math.floor(power1InOut(clamped) * target.length);
  return [...target]
    .map((char, index) => {
      if (index < resolved || FIXED.has(char)) return char;
      return SCRAMBLE_GLYPHS[Math.floor(rand() * SCRAMBLE_GLYPHS.length) % SCRAMBLE_GLYPHS.length];
    })
    .join('');
}
