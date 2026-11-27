'use client';

import { m } from 'motion/react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { usePhaseProgress } from '../hooks/usePhaseProgress';
import { Phase } from './Phase';
import { TechnologyTicker } from './TechnologyTicker';

export function HowWeWork() {
  const { t } = useTranslation();
  const copy = t.howWeWork;
  const { ref, reachedCount, style } = usePhaseProgress(copy.phases.length);

  return (
    <section data-tone="light" className="page-screen">
      <div className="screen-wrap">
        <p className="mono-label text-tinta-media">{copy.eyebrow}</p>
        <h1 className="display display-m mt-6">
          {copy.title.before} <span className="text-marca">{copy.title.highlight}</span>
        </h1>
        <p className="lede mt-8 max-w-[34em] text-tinta-media">{copy.subtitle}</p>

        <m.div ref={ref} style={style} className="relative mt-16 pl-6 md:mt-20 md:pl-0 md:pt-8">
          <div aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-regla md:h-px md:w-full">
            <div className="phase-progress absolute inset-0 bg-marca" />
          </div>

          <ol className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-10">
            {copy.phases.map((phase, index) => (
              <Phase
                key={phase.number}
                reached={index < reachedCount}
                phaseLabel={copy.phaseLabel}
                number={phase.number}
                title={phase.title}
                description={phase.description}
                deliverable={phase.deliverable}
                deliverableLabel={copy.deliverableLabel}
              />
            ))}
          </ol>
        </m.div>

        <div className="mt-20 border-t border-regla pt-10 md:mt-24">
          <TechnologyTicker label={copy.stackLabel} pause={copy.pause} resume={copy.resume} />
        </div>
      </div>
    </section>
  );
}
