'use client';

import Link from 'next/link';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useReveal } from '@/shared/hooks/useReveal';
import { SECTOR_DEMOS } from '../data/sectorDemos';

const INITIAL_SECTOR = 'salud';

export function HomeDemo() {
  const { t } = useTranslation();
  const copy = t.homeDemo;
  const reveal = useReveal<HTMLElement>();
  const demo = SECTOR_DEMOS.find((item) => item.sector === INITIAL_SECTOR) ?? SECTOR_DEMOS[0];

  return (
    <section {...reveal} id="demo" data-tone="dark" className="tone-night screen">
      <div className="screen-wrap flex flex-col gap-[88px] max-[900px]:gap-12">
        <h2 className="display display-l">
          <span className="w block">{copy.headingA}</span>
          <span className="indent-step w w2 block text-[var(--marca-clara)]">{copy.headingB}</span>
        </h2>
        <div className="demo-grid">
          <div className="w w3 flex min-w-0 flex-col gap-7">
            <p className="m-0 font-mono text-[11px] text-hueso-medio">
              {copy.exampleNote.replace('{name}', demo.businessName)} ·{' '}
              <Link href="/demo" className="text-link text-hueso-medio">
                {copy.allDemos}
              </Link>
            </p>
          </div>
          <div className="w w-flat w4 flex min-w-0 flex-col gap-5">
            <p className="mono-label text-hueso-medio">{copy.logTitle}</p>
            <ol className="m-0 min-h-[236px] list-none border-b border-[var(--regla-noche)] p-0" />
            <p className="m-0 mt-3 text-[20px] leading-[1.4]">
              {copy.trust} <span className="text-hueso-medio">{copy.trackRecord}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
