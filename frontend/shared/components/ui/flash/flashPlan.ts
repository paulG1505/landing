export type FlashTone = 'light' | 'dark';

export interface FlashInput {
  event: 'pointerdown' | 'click';
  pointerType: string;
  detail: number;
  clientX: number;
  clientY: number;
  targetRect: { left: number; top: number; width: number; height: number };
  tone: FlashTone | null;
  hasFlashAttr: boolean;
  disabled: boolean;
}

export interface FlashPlan {
  x: number;
  y: number;
  tone: FlashTone;
  size: number;
}

export const FLASH_TIMING = { core: 220, bloom: 560, ring: 640, ringDelay: 60 } as const;

const isFinePointer = (pointerType: string) => pointerType === 'mouse' || pointerType === 'pen';

export function planFlash(input: FlashInput): FlashPlan | null {
  if (input.disabled) return null;

  const fromKeyboard = input.event === 'click' && input.detail === 0;
  // Mouse and pen flash on pointerdown so the light answers the press, not the release.
  const fires = fromKeyboard || (input.event === 'pointerdown') === isFinePointer(input.pointerType);
  if (!fires) return null;

  const tone: FlashTone = input.hasFlashAttr ? 'dark' : (input.tone ?? 'light');
  const size = input.hasFlashAttr ? 1.6 : !fromKeyboard && input.pointerType === 'touch' ? 1.3 : 1;

  if (fromKeyboard) {
    const { left, top, width, height } = input.targetRect;
    return { x: left + width / 2, y: top + height / 2, tone, size };
  }
  return { x: input.clientX, y: input.clientY, tone, size };
}
