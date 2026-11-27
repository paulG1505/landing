import type { FlashTone } from './flashPlan';

type FlashHandler = (x: number, y: number, options: { tone: FlashTone; size: number }) => void;

let handler: FlashHandler | null = null;

export function setFlashHandler(next: FlashHandler | null) {
  handler = next;
}

export function triggerFlash(x: number, y: number, options: { tone: FlashTone; size: number }) {
  handler?.(x, y, options);
}
