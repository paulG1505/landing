import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  DAWN_STORAGE_KEY,
  DAWN_TIMELINE,
  shouldPlayDawn,
  readSeen,
  markSeen,
  dawnRadius,
  dawnProfile,
  DAWN_PENDING_CLASS,
  DAWN_EXPIRED_ATTR,
  dawnPendingScript,
} from './dawnPlan.ts';

const clear = { reduced: false, hash: '', scrollY: 0, seen: false };

function memoryStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
  };
}

const throwing = {
  getItem: () => {
    throw new Error('blocked');
  },
  setItem: () => {
    throw new Error('blocked');
  },
};

test('the timeline follows the design', () => {
  assert.equal(DAWN_STORAGE_KEY, 'aiworks-amanecer');
  assert.deepEqual(DAWN_TIMELINE, {
    client: 700,
    typing: 1400,
    assistant: 2100,
    ticks: 2450,
    circle: 2600,
    scramble: 2700,
    scrambleMs: 1100,
    end: 3800,
  });
});

test('the dawn plays when nothing prevents it', () => {
  assert.equal(shouldPlayDawn(clear), true);
});

test('each condition alone prevents the dawn', () => {
  assert.equal(shouldPlayDawn({ ...clear, reduced: true }), false);
  assert.equal(shouldPlayDawn({ ...clear, hash: '#precios' }), false);
  assert.equal(shouldPlayDawn({ ...clear, scrollY: 1 }), false);
  assert.equal(shouldPlayDawn({ ...clear, seen: true }), false);
});

test('markSeen then readSeen reports the dawn as seen', () => {
  const storage = memoryStorage();
  assert.equal(readSeen(storage), false);
  markSeen(storage);
  assert.equal(storage.getItem(DAWN_STORAGE_KEY), '1');
  assert.equal(readSeen(storage), true);
});

test('a storage that throws counts as seen, so the dawn does not play', () => {
  assert.equal(readSeen(throwing), true);
  assert.equal(readSeen(null), true);
  assert.doesNotThrow(() => markSeen(throwing));
  assert.equal(shouldPlayDawn({ ...clear, seen: readSeen(throwing) }), false);
});

test('dawnRadius reaches the farthest corner', () => {
  assert.equal(dawnRadius(0, 0, 3, 4), 5);
  assert.equal(dawnRadius(3, 4, 3, 4), 5);
});

test('modest devices get a shorter circle without ring', () => {
  assert.deepEqual(dawnProfile({ cores: 8, width: 1440 }), { circleMs: 1100, ring: true, blurPx: 12 });
  assert.deepEqual(dawnProfile({ cores: 4, width: 1440 }), { circleMs: 950, ring: false, blurPx: 5 });
  assert.deepEqual(dawnProfile({ cores: 8, width: 390 }), { circleMs: 950, ring: false, blurPx: 5 });
});

function runHeadScript(overrides: { pathname?: string; hash?: string; scrollY?: number; reduced?: boolean; seen?: boolean; storageThrows?: boolean; fallbackFires?: boolean } = {}) {
  const classes = new Set<string>();
  const attributes = new Map<string, string>();
  const document = {
    documentElement: {
      classList: { add: (c: string) => classes.add(c), remove: (c: string) => classes.delete(c) },
      setAttribute: (name: string, value: string) => attributes.set(name, value),
    },
  };
  const location = { pathname: overrides.pathname ?? '/', hash: overrides.hash ?? '' };
  const window = { scrollY: overrides.scrollY ?? 0 };
  const matchMedia = () => ({ matches: overrides.reduced ?? false });
  const sessionStorage = {
    getItem: () => {
      if (overrides.storageThrows) throw new Error('blocked');
      return overrides.seen ? '1' : null;
    },
  };
  const setTimeout = (run: () => void) => {
    if (overrides.fallbackFires) run();
    return 0;
  };
  new Function('document', 'location', 'window', 'matchMedia', 'sessionStorage', 'setTimeout', dawnPendingScript())(
    document, location, window, matchMedia, sessionStorage, setTimeout,
  );
  return Object.assign(classes, { attributes });
}

test('the head script marks the night before paint only when the dawn will play', () => {
  assert.deepEqual([...runHeadScript()].sort(), [DAWN_PENDING_CLASS, 'js'].sort());
  for (const blocked of [
    { pathname: '/precios' },
    { hash: '#demo' },
    { scrollY: 10 },
    { reduced: true },
    { seen: true },
    { storageThrows: true },
  ]) {
    assert.deepEqual([...runHeadScript(blocked)], ['js'], JSON.stringify(blocked));
  }
});

test('when the fallback fires the head script marks the dawn as expired', () => {
  const result = runHeadScript({ fallbackFires: true });
  assert.equal(result.has(DAWN_PENDING_CLASS), false);
  assert.equal(result.attributes.get(DAWN_EXPIRED_ATTR), 'expired');
  assert.equal(runHeadScript().attributes.has(DAWN_EXPIRED_ATTR), false);
});
