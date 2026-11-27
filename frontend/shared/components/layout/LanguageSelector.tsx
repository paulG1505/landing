'use client';

import { useLanguageStore } from '@/shared/store/useLanguageStore';
import type { Locale } from '@/shared/lib/i18n/translations';
import { cn } from '@/shared/lib/utils';

const LANGUAGES: { code: Locale; label: string; name: string }[] = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
];

export function LanguageSelector() {
  const { locale, setLocale } = useLanguageStore();

  return (
    <div
      role="group"
      aria-label={locale === 'en' ? 'Language' : 'Idioma'}
      className="flex items-center font-mono text-sm text-[var(--c-media)]"
    >
      {LANGUAGES.map((lang, index) => {
        const active = locale === lang.code;
        return (
          <span key={lang.code} className="flex items-center">
            {index > 0 && <span aria-hidden="true">·</span>}
            <button
              type="button"
              lang={lang.code}
              onClick={() => setLocale(lang.code)}
              aria-pressed={active}
              aria-label={lang.name}
              className={cn(
                'inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center',
                active ? 'text-[var(--c-texto)]' : 'hover:text-[var(--c-texto)]',
              )}
            >
              {lang.label}
            </button>
          </span>
        );
      })}
    </div>
  );
}
