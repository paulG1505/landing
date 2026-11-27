export const DAWN_STORAGE_KEY = 'aiworks-amanecer';

export const DAWN_TIMELINE = {
  client: 700,
  typing: 1400,
  assistant: 2100,
  ticks: 2450,
  circle: 2600,
  scramble: 2700,
  scrambleMs: 1100,
  end: 3800,
} as const;

interface DawnConditions {
  reduced: boolean;
  hash: string;
  scrollY: number;
  seen: boolean;
}

interface SessionStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export function shouldPlayDawn({ reduced, hash, scrollY, seen }: DawnConditions): boolean {
  return !reduced && hash === '' && scrollY <= 0 && !seen;
}

// A storage we cannot read counts as seen: better no dawn than one on every load.
export function readSeen(storage: SessionStore | null): boolean {
  if (!storage) return true;
  try {
    return storage.getItem(DAWN_STORAGE_KEY) === '1';
  } catch {
    return true;
  }
}

export function markSeen(storage: SessionStore | null): void {
  try {
    storage?.setItem(DAWN_STORAGE_KEY, '1');
  } catch {
    // Without storage the dawn is already skipped by readSeen.
  }
}

export function dawnRadius(x: number, y: number, width: number, height: number): number {
  return Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
}

export function dawnProfile({ cores, width }: { cores: number; width: number }) {
  const modest = cores <= 4 || width <= 900;
  return modest
    ? { circleMs: 950, ring: false, blurPx: 5 }
    : { circleMs: 1100, ring: true, blurPx: 12 };
}
