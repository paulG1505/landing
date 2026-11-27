import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SCRIPT_STEPS_MS, stageAt, visibleLogRows, LOG_KIND_TONE } from './homeDemo.ts';
import { es } from '../../../shared/lib/i18n/translations/es.ts';
import { en } from '../../../shared/lib/i18n/translations/en.ts';

test('script steps follow the mockup timing', () => {
  assert.deepEqual(SCRIPT_STEPS_MS, [500, 1400, 1850, 2300]);
});

test('stageAt maps elapsed time to a stage from 0 to 4', () => {
  assert.equal(stageAt(0), 0);
  assert.equal(stageAt(499), 0);
  assert.equal(stageAt(500), 1);
  assert.equal(stageAt(1400), 2);
  assert.equal(stageAt(1850), 3);
  assert.equal(stageAt(2300), 4);
  assert.equal(stageAt(9999), 4);
});

test('visibleLogRows shows the first row from the start', () => {
  assert.deepEqual([0, 1, 2, 3, 4].map(visibleLogRows), [1, 1, 2, 3, 4]);
});

test('each log kind has its tone', () => {
  assert.deepEqual(LOG_KIND_TONE, {
    entry: 'var(--hueso-medio)',
    ai: 'var(--marca-clara)',
    human: 'var(--hueso)',
  });
});

test('every sector has a four-row script in both languages', () => {
  for (const copy of [es, en]) {
    for (const sector of ['comercio', 'salud', 'finanzas', 'logistica'] as const) {
      const script = copy.homeDemo.sectors[sector];
      assert.ok(script.question && script.answer, sector);
      assert.equal(script.log.length, 4, sector);
      for (const row of script.log) assert.ok(row.kind in LOG_KIND_TONE, `${sector}: ${row.kind}`);
    }
  }
});
