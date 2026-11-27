import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scrambleFrame, SCRAMBLE_GLYPHS } from './scramble.ts';

const TARGET = 'hecho solo.';

test('progress 0 keeps the length, spaces and periods', () => {
  const frame = scrambleFrame(TARGET, 0, Math.random);
  assert.equal(frame.length, TARGET.length);
  assert.equal(frame[5], ' ');
  assert.equal(frame[10], '.');
  for (const [index, char] of [...frame].entries()) {
    if (TARGET[index] !== ' ' && TARGET[index] !== '.') assert.ok(SCRAMBLE_GLYPHS.includes(char));
  }
});

test('progress 1 is the target', () => {
  assert.equal(scrambleFrame(TARGET, 1, Math.random), TARGET);
});

test('with rand returning 0 the unresolved part is the first glyph', () => {
  assert.equal(scrambleFrame(TARGET, 0, () => 0), 'aaaaa aaaa.');
});

test('the resolved prefix grows monotonically', () => {
  const resolved = (frame: string) => {
    let count = 0;
    while (count < TARGET.length && frame[count] === TARGET[count]) count++;
    return count;
  };
  let previous = 0;
  for (let step = 0; step <= 20; step++) {
    const count = resolved(scrambleFrame(TARGET, step / 20, () => 0));
    assert.ok(count >= previous, `step ${step}`);
    previous = count;
  }
  assert.equal(previous, TARGET.length);
});
