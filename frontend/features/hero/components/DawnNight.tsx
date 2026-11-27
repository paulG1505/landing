'use client';

import { Wordmark } from '@/shared/components/ui/Wordmark';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { DawnStage } from '../hooks/useDawn';
import type { LineBStyle } from './Hero';

interface DawnNightProps {
  stage: DawnStage;
  blurPx: number;
  lineBStyle: LineBStyle;
}

const BUBBLE = 'chat-bubble pop';

// A decorative clone of the hero: aria-hidden, inert and without ids or links.
export function DawnNight({ stage, blurPx, lineBStyle }: DawnNightProps) {
  const { t } = useTranslation();
  const { hero, header } = t;

  return (
    <div className="dawn-night tone-night" data-tone="dark" aria-hidden="true" inert>
      <div className="hero">
        <div className="flex h-[var(--header-h)] w-full items-center justify-between gap-6">
          <Wordmark />
          <div className="flex items-center gap-8 text-[15px] font-medium">
            <span className="max-[900px]:hidden">{header.nav.demo}</span>
            <span className="max-[900px]:hidden">{header.nav.pricing}</span>
            <span className="text-[var(--c-clave)]">{header.whatsapp}&nbsp;↗</span>
          </div>
        </div>
        <p className="display hero-line-a mb-0">
          <span className="dawn-in" style={{ '--dawn-blur': `${blurPx}px` } as React.CSSProperties}>
            {hero.lineA}
          </span>{' '}
          <span className="hero-line-b invisible" style={lineBStyle}>
            <span className="hero-b1">{hero.lineB1}</span> <span className="hero-b2">{hero.lineB2}</span>
          </span>
        </p>
        <div className="hero-low">
          <div className="invisible flex flex-col items-start gap-6">
            <p className="lede m-0 max-w-[24em]">{hero.lede}</p>
            <span className="inline-flex h-14 items-center px-7">{hero.cta} →</span>
            <span className="mono-label inline-flex min-h-11 items-center">↻ {hero.replay}</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {stage >= 1 && (
              <p className={`${BUBBLE} self-end rounded-[18px_18px_4px_18px] bg-marca text-hueso`}>
                {hero.chat.client}
                <span className="chat-bubble-time !text-hueso opacity-70">{hero.chat.time}</span>
              </p>
            )}
            {stage === 2 && (
              <p className="pop m-0 flex gap-[5px] self-start rounded-[4px_18px_18px_18px] bg-[rgb(238_233_224/0.12)] px-3.5 py-3">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="typing-dot"
                    style={{ '--d': `${delay}ms`, background: 'var(--hueso)' } as React.CSSProperties}
                  />
                ))}
              </p>
            )}
            {stage >= 3 && (
              <p className={`${BUBBLE} self-start max-w-[300px] rounded-[4px_18px_18px_18px] bg-hueso text-tinta`}>
                {hero.chat.assistant}
                <span className="chat-bubble-time">
                  {hero.chat.time}{' '}
                  <span data-dawn-origin="" className={stage >= 4 ? 'text-marca' : 'text-[rgb(27_25_22/0.35)]'}>
                    ✓✓
                  </span>
                </span>
              </p>
            )}
            <p className="mono-label text-[11px] text-hueso-medio">{hero.sampleLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
