import { test } from 'node:test';
import assert from 'node:assert/strict';
import { planFlash, FLASH_TIMING, type FlashInput } from './flashPlan.ts';

const base: FlashInput = {
  event: 'pointerdown',
  pointerType: 'mouse',
  detail: 1,
  clientX: 30,
  clientY: 40,
  targetRect: { left: 100, top: 200, width: 80, height: 20 },
  tone: 'light',
  hasFlashAttr: false,
  disabled: false,
};

test('mouse pointerdown flashes at the pointer', () => {
  assert.deepEqual(planFlash(base), { x: 30, y: 40, tone: 'light', size: 1 });
});

test('touch pointerdown waits for the click', () => {
  assert.equal(planFlash({ ...base, pointerType: 'touch' }), null);
});

test('touch click flashes at the pointer with size 1.3', () => {
  assert.deepEqual(planFlash({ ...base, event: 'click', pointerType: 'touch' }), {
    x: 30,
    y: 40,
    tone: 'light',
    size: 1.3,
  });
});

test('keyboard click flashes from the center of the element', () => {
  assert.deepEqual(
    planFlash({ ...base, event: 'click', pointerType: '', detail: 0, clientX: 0, clientY: 0, tone: 'dark' }),
    { x: 140, y: 210, tone: 'dark', size: 1 },
  );
});

test('a data-flash control uses the dark tone and size 1.6', () => {
  assert.deepEqual(planFlash({ ...base, hasFlashAttr: true }), { x: 30, y: 40, tone: 'dark', size: 1.6 });
});

test('a disabled control does not flash', () => {
  assert.equal(planFlash({ ...base, disabled: true }), null);
  assert.equal(planFlash({ ...base, event: 'click', detail: 0, disabled: true }), null);
});

test('mouse click does not flash again after its pointerdown', () => {
  assert.equal(planFlash({ ...base, event: 'click' }), null);
});

test('timing matches the mockup', () => {
  assert.deepEqual(FLASH_TIMING, { core: 220, bloom: 560, ring: 640, ringDelay: 60 });
});
