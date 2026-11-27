'use client';

import { SiteHeader } from '@/shared/components/layout/SiteHeader';
import { useTranslation } from '@/shared/hooks/useTranslation';

type LineBStyle = React.CSSProperties & { '--b-chars': number; '--b-chars-sm': number };

export function Hero() {
  const { t } = useTranslation();
  const { hero } = t;
  const lineBStyle: LineBStyle = {
    '--b-chars': hero.lineB.length,
    '--b-chars-sm': Math.max(hero.lineB1.length, hero.lineB2.length),
  };

  return (
    <section data-tone="light" aria-label={hero.label} className="hero">
      <SiteHeader className="max-w-none px-0 min-[901px]:px-0" />
      <h1 className="display hero-line-a">
        <span>{hero.lineA}</span>{' '}
        <span className="hero-line-b" style={lineBStyle}>
          <span className="sr-only">{hero.lineB}</span>
          <span aria-hidden="true" className="hero-b1">
            {hero.lineB1}
          </span>{' '}
          <span aria-hidden="true" className="hero-b2">
            {hero.lineB2}
          </span>
        </span>
      </h1>
      <div className="hero-low">
        <div className="flex flex-col items-start gap-6">
          <p className="lede m-0 max-w-[24em] text-tinta-media">{hero.lede}</p>
          <a
            id="assistant-cta"
            href="#demo"
            data-flash=""
            className="press inline-flex h-14 items-center gap-2.5 bg-marca px-7 text-base font-medium text-papel no-underline max-[900px]:w-full max-[900px]:justify-center"
          >
            {hero.cta} <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="chat-bubble chat-bubble-client self-end">
            {hero.chat.client}
            <span className="chat-bubble-time">{hero.chat.time}</span>
          </p>
          <p className="chat-bubble chat-bubble-assistant self-start">
            {hero.chat.assistant}
            <span className="chat-bubble-time">
              {hero.chat.time} <span className="text-marca">✓✓</span>
            </span>
          </p>
          <p className="mono-label text-[11px] text-tinta-media">{hero.sampleLabel}</p>
        </div>
      </div>
    </section>
  );
}
