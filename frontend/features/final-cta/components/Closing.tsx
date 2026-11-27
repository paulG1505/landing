'use client';

import { CONTACT_INFO } from '@/shared/constants';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { newTabNotice, whatsappTextLink } from '@/shared/lib/whatsapp';

export function Closing() {
  const { t, locale } = useTranslation();
  const copy = t.cta;

  return (
    <section id="contacto" data-tone="dark" className="tone-night">
      <div className="screen-wrap closing-wrap flex flex-col gap-12">
        <h2 className="display display-l">
          <span className="block">{copy.titleA}</span>
          <span className="indent-step block">
            {copy.titleB} <span className="text-[var(--marca-clara)]">{copy.highlight}</span>
          </span>
        </h2>
        <div className="indent-step flex flex-wrap items-center gap-x-10 gap-y-5">
          <a
            href={whatsappTextLink(copy.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${copy.whatsapp} ${newTabNotice(locale)}`}
            data-flash=""
            className="press inline-flex h-[58px] items-center gap-2.5 bg-[var(--marca-clara)] px-[30px] whitespace-nowrap text-lg font-semibold text-noche no-underline max-[900px]:w-full max-[900px]:justify-center max-[900px]:px-5"
          >
            {copy.whatsapp} <span aria-hidden="true">↗</span>
          </a>
          <p className="m-0 text-[20px] text-[var(--hueso-suave)]">{copy.description}</p>
        </div>
        <p className="indent-step my-0 mr-0 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[15px]">
          <span className="select-all tabular-nums">{CONTACT_INFO.phone}</span>
          <span className="select-all">{CONTACT_INFO.email}</span>
        </p>
      </div>
    </section>
  );
}
