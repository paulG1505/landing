import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveAnchor } from './anchorAliases.ts';

test('retired section anchors point to their new section', () => {
  assert.deepEqual(resolveAnchor('#procesos'), { kind: 'section', id: 'servicios' });
  assert.deepEqual(resolveAnchor('#ejemplos'), { kind: 'section', id: 'servicios' });
  assert.deepEqual(resolveAnchor('#porque'), { kind: 'section', id: 'demo' });
  assert.deepEqual(resolveAnchor('#demos'), { kind: 'section', id: 'demo' });
});

test('retired anchors that became pages point to the page', () => {
  assert.deepEqual(resolveAnchor('#proceso'), { kind: 'page', path: '/como-trabajamos' });
  assert.deepEqual(resolveAnchor('#preguntas'), { kind: 'page', path: '/preguntas' });
});

test('current and unknown anchors keep their id', () => {
  assert.deepEqual(resolveAnchor('#precios'), { kind: 'section', id: 'precios' });
  assert.deepEqual(resolveAnchor('#cualquier-cosa'), { kind: 'section', id: 'cualquier-cosa' });
});

test('empty hash resolves to nothing', () => {
  assert.deepEqual(resolveAnchor(''), { kind: 'none' });
  assert.deepEqual(resolveAnchor('#'), { kind: 'none' });
});

test('inherited object keys are not aliases', () => {
  assert.deepEqual(resolveAnchor('#__proto__'), { kind: 'section', id: '__proto__' });
  assert.deepEqual(resolveAnchor('#constructor'), { kind: 'section', id: 'constructor' });
});

test('malformed hash resolves to nothing', () => {
  assert.deepEqual(resolveAnchor('#%E0%A4%A'), { kind: 'none' });
});
