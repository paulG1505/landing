'use client';

import { useTranslation } from '@/shared/hooks/useTranslation';
import { useReveal } from '@/shared/hooks/useReveal';
import { FaqItem } from './FaqItem';

export function Faq() {
  const { t } = useTranslation();
  const copy = t.faq;
  const reveal = useReveal();

  return (
    <section data-tone="light" className="page-screen">
      <div className="screen-wrap lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-12 lg:self-start">
          <p className="mono-label text-tinta-media">{copy.eyebrow}</p>
          <h1 className="display display-m mt-6">
            {copy.title.before} <span className="text-marca">{copy.title.highlight}</span>
          </h1>
        </div>

        <div {...reveal} className="mt-14 max-w-[760px] border-t border-[var(--c-regla)] lg:mt-2 lg:max-w-none">
          {copy.items.map((item, index) => (
            <FaqItem
              key={item.question}
              index={index}
              question={item.question}
              answer={item.answer}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
