'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wordmark } from '@/shared/components/ui/Wordmark';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { newTabNotice, whatsappTextLink } from '@/shared/lib/whatsapp';
import { cn } from '@/shared/lib/utils';

const LINK_CLASS = 'text-link inline-flex min-h-11 items-center text-[15px] font-medium';

export function SiteHeader({ className }: { className?: string }) {
  const { t, locale } = useTranslation();

  return (
    <header
      className={cn(
        'mx-auto flex h-[var(--header-h)] w-full max-w-[1440px] items-center justify-between gap-6 px-5 min-[901px]:px-16',
        className,
      )}
    >
      <Link href="/" aria-label={t.header.homeLabel} className="text-[var(--c-texto)] no-underline">
        <Wordmark />
      </Link>
      <nav aria-label={t.header.navLabel} className="flex items-center gap-8">
        <Link href="/#demo" className={cn(LINK_CLASS, 'text-[var(--c-texto)] max-[900px]:hidden')}>
          {t.header.nav.demo}
        </Link>
        <Link href="/#precios" className={cn(LINK_CLASS, 'text-[var(--c-texto)] max-[900px]:hidden')}>
          {t.header.nav.pricing}
        </Link>
        <a
          href={whatsappTextLink(t.header.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.header.whatsapp} ${newTabNotice(locale)}`}
          className={cn(LINK_CLASS, 'text-[var(--c-clave)]')}
        >
          {t.header.whatsapp}&nbsp;<span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}

export function HeaderOutsideHome() {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return <SiteHeader />;
}
