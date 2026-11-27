export type AnchorTarget =
  | { kind: 'none' }
  | { kind: 'section'; id: string }
  | { kind: 'page'; path: string };

const ALIASES: Record<string, AnchorTarget> = {
  procesos: { kind: 'section', id: 'servicios' },
  ejemplos: { kind: 'section', id: 'servicios' },
  porque: { kind: 'section', id: 'demo' },
  demos: { kind: 'section', id: 'demo' },
  proceso: { kind: 'page', path: '/como-trabajamos' },
  preguntas: { kind: 'page', path: '/preguntas' },
};

function decodeHash(hash: string): string {
  try {
    return decodeURIComponent(hash.replace(/^#/, ''));
  } catch {
    return '';
  }
}

export function resolveAnchor(hash: string): AnchorTarget {
  const id = decodeHash(hash);
  if (!id) return { kind: 'none' };
  return Object.hasOwn(ALIASES, id) ? ALIASES[id] : { kind: 'section', id };
}
