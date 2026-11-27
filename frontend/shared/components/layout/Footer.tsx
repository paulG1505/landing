'use client';

import Link from 'next/link';
import { LanguageSelector } from '@/shared/components/layout/LanguageSelector';
import { Wordmark } from '@/shared/components/ui/Wordmark';
import { useTranslation } from '@/shared/hooks/useTranslation';

const LINK_CLASS = 'text-link inline-flex min-h-11 items-center text-sm text-hueso';

export function Footer() {
  const { t } = useTranslation();
  const copy = t.footer;

  return (
    <footer data-tone="dark" className="tone-night">
      <div className="screen-wrap pb-10">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-[var(--regla-noche)] pt-7 text-sm">
          <Link href="/" aria-label={t.header.homeLabel} className="inline-flex min-h-11 items-center text-hueso no-underline">
            <Wordmark size="footer" />
          </Link>
          <nav aria-label={copy.navLabel} className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <Link href="/como-trabajamos" className={LINK_CLASS}>
              {copy.howWeWork}
            </Link>
            <Link href="/preguntas" className={LINK_CLASS}>
              {copy.faq}
            </Link>
            <Link href="/privacidad" className={LINK_CLASS}>
              {copy.privacy}
            </Link>
            <LanguageSelector />
          </nav>
          <span className="font-mono tracking-[0.08em] text-hueso-medio">{copy.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
