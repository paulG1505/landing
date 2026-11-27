'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { triggerFlash } from '@/shared/components/ui/flash/flashBus';
import { DAWN_TIMELINE, dawnProfile, dawnRadius, markSeen, readSeen, shouldPlayDawn } from '../lib/dawnPlan';
import { scrambleFrame } from '../lib/scramble';

const SILK = 'cubic-bezier(0.6, 0, 0.2, 1)';
const SCRAMBLE_TICK_MS = 45;
const SKIP_EVENTS = ['pointerdown', 'touchstart', 'wheel', 'keydown', 'scroll'] as const;

export type DawnStage = 0 | 1 | 2 | 3 | 4;

interface ScrambleTarget {
  first: string;
  second: string;
}

function sessionStore(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// The light starts at the night's ✓✓; --ox/--oy are the mockup's fallback if it is missing.
function dawnOrigin(host: HTMLElement, rect: DOMRect) {
  const check = host.querySelector('[data-dawn-origin]')?.getBoundingClientRect();
  if (check) return { x: check.left + check.width / 2 - rect.left, y: check.top + check.height / 2 - rect.top };
  const style = getComputedStyle(host);
  return {
    x: (rect.width * (parseFloat(style.getPropertyValue('--ox')) || 79)) / 100,
    y: (rect.height * (parseFloat(style.getPropertyValue('--oy')) || 74)) / 100,
  };
}

export function useDawn(target: ScrambleTarget) {
  const stageRef = useRef<HTMLElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const animations = useRef<Animation[]>([]);
  const targetRef = useRef(target);
  const [playing, setPlaying] = useState(false);
  const [stage, setStage] = useState<DawnStage>(0);
  const [blurPx, setBlurPx] = useState(12);
  const [scrambled, setScrambled] = useState<ScrambleTarget | null>(null);

  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  const clear = useCallback(() => {
    timers.current.forEach((id) => {
      clearTimeout(id);
      clearInterval(id);
    });
    timers.current = [];
    animations.current.forEach((animation) => animation.cancel());
    animations.current = [];
  }, []);

  const finish = useCallback(() => {
    clear();
    setPlaying(false);
    setStage(0);
    setScrambled(null);
  }, [clear]);

  const openCircle = useCallback(() => {
    const host = stageRef.current;
    const day = dayRef.current;
    if (!host || !day) return;
    const rect = host.getBoundingClientRect();
    const { x, y } = dawnOrigin(host, rect);
    const radius = dawnRadius(x, y, rect.width, rect.height);
    const profile = dawnProfile({ cores: navigator.hardwareConcurrency || 8, width: window.innerWidth });
    const timing = { duration: profile.circleMs, easing: SILK, fill: 'forwards' as const };

    animations.current.push(
      day.animate(
        [{ clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(${radius}px at ${x}px ${y}px)` }],
        timing,
      ),
    );

    const ring = ringRef.current;
    if (ring && profile.ring) {
      Object.assign(ring.style, {
        left: `${x - radius}px`,
        top: `${y - radius}px`,
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      });
      animations.current.push(
        ring.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], timing),
        ring.animate([{ opacity: 1 }, { opacity: 1, offset: 0.7 }, { opacity: 0 }], {
          duration: profile.circleMs,
          fill: 'forwards',
        }),
      );
    }

    triggerFlash(rect.left + x, rect.top + y, { tone: 'dark', size: 1.6 });
  }, []);

  const runScramble = useCallback(() => {
    const started = performance.now();
    const id = window.setInterval(() => {
      const progress = (performance.now() - started) / DAWN_TIMELINE.scrambleMs;
      if (progress >= 1) {
        clearInterval(id);
        setScrambled(null);
        return;
      }
      const { first, second } = targetRef.current;
      setScrambled({
        first: scrambleFrame(first, progress, Math.random),
        second: scrambleFrame(second, progress, Math.random),
      });
    }, SCRAMBLE_TICK_MS);
    timers.current.push(id);
  }, []);

  const play = useCallback(() => {
    clear();
    setPlaying(true);
    setStage(0);
    setScrambled(null);
    setBlurPx(dawnProfile({ cores: navigator.hardwareConcurrency || 8, width: window.innerWidth }).blurPx);
    const at = (ms: number, run: () => void) => timers.current.push(window.setTimeout(run, ms));
    at(DAWN_TIMELINE.client, () => setStage(1));
    at(DAWN_TIMELINE.typing, () => setStage(2));
    at(DAWN_TIMELINE.assistant, () => setStage(3));
    at(DAWN_TIMELINE.ticks, () => setStage(4));
    at(DAWN_TIMELINE.circle, openCircle);
    at(DAWN_TIMELINE.scramble, runScramble);
    at(DAWN_TIMELINE.end, finish);
  }, [clear, finish, openCircle, runScramble]);

  // Layout effect so the night covers the day before the first client paint.
  useLayoutEffect(() => {
    const storage = sessionStore();
    const shouldPlay = shouldPlayDawn({
      reduced: prefersReducedMotion(),
      hash: window.location.hash,
      scrollY: window.scrollY,
      seen: readSeen(storage),
    });
    if (!shouldPlay) return;
    markSeen(storage);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the dawn depends on browser-only state read once on mount.
    play();
  }, [play]);

  useEffect(() => {
    if (!playing) return;
    const skip = () => finish();
    SKIP_EVENTS.forEach((type) => window.addEventListener(type, skip, { passive: true, capture: true }));
    return () => SKIP_EVENTS.forEach((type) => window.removeEventListener(type, skip, { capture: true }));
  }, [playing, finish]);

  useEffect(() => clear, [clear]);

  return { stageRef, dayRef, ringRef, playing, stage, blurPx, scrambled, skip: finish, replay: play };
}
