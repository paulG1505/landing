'use client';

import { useEffect } from 'react';
import { resolveAnchor } from '@/shared/lib/anchorAliases';

const MAX_WAIT_MS = 4000;

export function ScrollToAnchor() {
  useEffect(() => {
    let frame = 0;

    const scrollTo = (id: string) => {
      cancelAnimationFrame(frame);
      const startedAt = performance.now();
      const seek = () => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'auto', block: 'start' });
          return;
        }
        if (performance.now() - startedAt < MAX_WAIT_MS) frame = requestAnimationFrame(seek);
      };
      frame = requestAnimationFrame(seek);
    };

    const follow = (onlyAliases: boolean) => {
      const hash = window.location.hash;
      const target = resolveAnchor(hash);
      if (target.kind === 'page') {
        window.location.replace(target.path);
        return;
      }
      if (target.kind !== 'section') return;
      const aliased = `#${target.id}` !== hash;
      if (aliased) window.history.replaceState(null, '', `#${target.id}`);
      if (aliased || !onlyAliases) scrollTo(target.id);
    };

    const onHashChange = () => follow(true);
    follow(false);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return null;
}
