'use client';

import { useEffect, useRef } from 'react';
import { setFlashHandler } from './flashBus';
import { planFlash, type FlashTone } from './flashPlan';

const CONTROL = 'a, button';

function toneOf(element: Element): FlashTone | null {
  const tone = element.closest('[data-tone]')?.getAttribute('data-tone');
  return tone === 'dark' || tone === 'light' ? tone : null;
}

export function ClickFlash() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Older Safari sends click as a MouseEvent without pointerType; reuse the last press.
    let lastPointerType = '';

    const fire = (x: number, y: number, { tone, size }: { tone: FlashTone; size: number }) => {
      node.removeAttribute('data-on');
      node.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      node.style.setProperty('--fx-size', String(size));
      node.dataset.t = tone;
      void node.offsetWidth;
      node.setAttribute('data-on', '');
    };

    const onEvent = (event: Event) => {
      const control = (event.target as Element | null)?.closest?.(CONTROL);
      if (!control) return;
      const pointer = event as PointerEvent;
      if (event.type === 'pointerdown') lastPointerType = pointer.pointerType;
      const plan = planFlash({
        event: event.type as 'pointerdown' | 'click',
        pointerType: pointer.pointerType || lastPointerType,
        detail: pointer.detail,
        clientX: pointer.clientX,
        clientY: pointer.clientY,
        targetRect: control.getBoundingClientRect(),
        tone: toneOf(control),
        hasFlashAttr: control.hasAttribute('data-flash'),
        disabled: control.matches('[disabled], [aria-disabled="true"]'),
      });
      if (plan) fire(plan.x, plan.y, plan);
    };

    document.addEventListener('pointerdown', onEvent, true);
    document.addEventListener('click', onEvent, true);
    setFlashHandler(fire);
    return () => {
      document.removeEventListener('pointerdown', onEvent, true);
      document.removeEventListener('click', onEvent, true);
      setFlashHandler(null);
    };
  }, []);

  return (
    <div ref={ref} className="fx" aria-hidden="true">
      <i className="core" />
      <i className="bloom" />
      <i className="ring" />
    </div>
  );
}
