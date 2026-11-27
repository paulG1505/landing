'use client';

import { useState } from 'react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { newTabNotice, whatsappTextLink } from '@/shared/lib/whatsapp';
import { cn } from '@/shared/lib/utils';

export function PainPoints() {
  const { t, locale } = useTranslation();
  const copy = t.painPoints;
  const [selected, setSelected] = useState(0);
  const current = copy.options[selected] ?? copy.options[0];

  return (
    <section id="servicios" data-tone="light" className="screen border-t border-regla">
      <div className="screen-wrap flex flex-col gap-[72px]">
        <div className="pain-grid">
          <div className="flex min-w-0 flex-col gap-5">
            <h2 className="display display-m">{copy.heading}</h2>
            <p className="display heading-h indent-step min-h-[1.1em] text-marca">
              <span key={selected} className="swap">
                {current.verb}…
              </span>
            </p>
            <div className="indent-step mt-7 flex max-w-[30em] flex-col gap-3.5">
              <p className="m-0 text-tinta-media">
                <span className="mono-label mr-2.5 text-tinta-media">{copy.todayLabel}</span>
                {current.today}
              </p>
              <p className="lede m-0 leading-[1.35]">
                <span className="mono-label mr-2.5 text-marca">{copy.withLabel}</span>
                {current.withAi}
              </p>
            </div>
          </div>
          <ul aria-label={copy.pickLabel} className="m-0 flex list-none flex-col border-b border-regla p-0">
            {copy.options.map((option, index) => {
              const active = index === selected;
              return (
                <li key={option.verb} className="border-t border-regla">
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelected(index)}
                    className={cn(
                      'option-row flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 text-left text-[20px]',
                      active ? 'font-semibold text-tinta' : 'text-tinta-media',
                    )}
                  >
                    <span>{option.verb}</span>
                    <span aria-hidden="true" className="text-xs text-marca">
                      {active ? '●' : ''}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
          <p className="mono-label text-tinta-media">{copy.serviceNames.join(' · ')}</p>
          <a
            href={whatsappTextLink(copy.other.message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${copy.other.label} ${newTabNotice(locale)}`}
            className="text-link text-[15px] font-medium text-tinta"
          >
            {copy.other.label}&nbsp;<span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
