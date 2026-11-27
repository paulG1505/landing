import { test } from 'node:test';
import assert from 'node:assert/strict';
import { es } from './es.ts';
import { en } from './en.ts';

const shape = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(shape)
    : value && typeof value === 'object'
      ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]))
      : typeof value;

test('es and en have the same shape', () => {
  assert.deepEqual(shape(es), shape(en));
});
