'use client';

import { useTranslation } from '@/shared/hooks/useTranslation';
import { useReveal } from '@/shared/hooks/useReveal';
import { newTabNotice, whatsappTextLink } from '@/shared/lib/whatsapp';
import { cn } from '@/shared/lib/utils';

const PRICE_DELAYS = ['w2', 'w3', 'w4'];

export function Pricing() {
  const { t, locale } = useTranslation();
  const { heading, items, terms, custom, cta, ctaMessage } = t.pricing;
  const lastIndex = items.length - 1;
  const reveal = useReveal<HTMLElement>();

  return (
    <section {...reveal} id="precios" data-tone="light" className="screen">
      <div className="screen-wrap flex flex-col gap-[72px]">
        <h2 className="display heading-h w">
          {heading.before} <span className="text-marca">{heading.highlight}</span>
        </h2>
        <ul className="price-grid m-0 list-none p-0">
          {items.map((item, index) => {
            const featured = index === lastIndex;
            return (
              <li
                key={item.label}
                className={cn(
                  'w w-flat flex flex-col gap-3 border-t pt-4',
                  PRICE_DELAYS[index],
                  featured ? 'border-marca text-marca' : 'border-tinta',
                )}
              >
                <p className="mono-label">{item.label}</p>
                <p className="display price-figure" aria-hidden="true">
                  <span className="mono-label mb-2.5 block">USD</span>
                  {item.figure}
                </p>
                <p className="sr-only">{item.amount}</p>
                <p className="m-0 text-[15px] text-tinta-media">{item.line}</p>
              </li>
            );
          })}
        </ul>
        <div className="w w5 flex flex-col gap-7">
          <p className="mono-label leading-[1.8] text-tinta-media">{terms}</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-regla pt-7">
            <a
              href={whatsappTextLink(ctaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${cta} ${newTabNotice(locale)}`}
              data-flash=""
              className="press inline-flex h-14 items-center gap-2.5 bg-marca px-7 font-medium text-papel no-underline max-[900px]:w-full max-[900px]:justify-center"
            >
              {cta} <span aria-hidden="true">→</span>
            </a>
            <p className="m-0 text-tinta-media">
              {custom.lead} <strong className="font-semibold text-tinta">{custom.amount}.</strong>{' '}
              {custom.detail}{' '}
              <a
                href={whatsappTextLink(custom.message)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${custom.cta} ${newTabNotice(locale)}`}
                className="text-link inline-flex min-h-11 items-center text-tinta"
              >
                {custom.cta}&nbsp;<span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
