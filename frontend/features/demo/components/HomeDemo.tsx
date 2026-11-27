'use client';

import Link from 'next/link';
import { useEffect, useId, useState, type FormEvent } from 'react';
import { DEMO_MAX_CHARS } from '@/shared/components/ui/chat/api';
import { CHAT_COPY } from '@/shared/components/ui/chat/copy';
import { useConversation } from '@/shared/components/ui/chat/useConversation';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';
import { useReveal } from '@/shared/hooks/useReveal';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { demoTenantId } from '@/shared/lib/demoSlug';
import type { Locale } from '@/shared/lib/i18n/translations';
import { cn } from '@/shared/lib/utils';
import { SECTOR_DEMOS, type DemoSector } from '../data/sectorDemos';
import { FINAL_STAGE, LOG_KIND_TONE, SCRIPT_STEPS_MS, visibleLogRows } from '../lib/homeDemo';

const INITIAL_SECTOR: DemoSector = 'salud';

const CLIENT_BUBBLE =
  'pop m-0 max-w-[320px] self-end rounded-[18px_18px_4px_18px] bg-marca px-3.5 pb-2 pt-2.5 text-[15px] leading-[1.4] text-hueso';
const ASSISTANT_BUBBLE =
  'pop m-0 max-w-[300px] self-start rounded-[4px_18px_18px_18px] bg-hueso px-3.5 pb-2 pt-2.5 text-[15px] leading-[1.4] text-tinta';

function TypingBubble({ label }: { label: string }) {
  return (
    <p
      role="status"
      aria-label={label}
      className="pop m-0 flex gap-[5px] self-start rounded-[4px_18px_18px_18px] bg-[rgb(238_233_224/0.12)] px-3.5 py-3"
    >
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          aria-hidden="true"
          className="typing-dot"
          style={{ '--d': `${delay}ms`, background: 'var(--hueso)' } as React.CSSProperties}
        />
      ))}
    </p>
  );
}

interface AskBlockProps {
  slug: string;
  businessName: string;
  locale: Locale;
  label: string;
  placeholder: string;
  send: string;
}

function AskBlock({ slug, businessName, locale, label, placeholder, send }: AskBlockProps) {
  const inputId = useId();
  const chatCopy = CHAT_COPY[locale];
  const [draft, setDraft] = useState('');
  const conversation = useConversation({
    tenant: demoTenantId(slug),
    locale,
    whatsappFallback: false,
    isDemo: true,
    maxChars: DEMO_MAX_CHARS,
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.trim()) return;
    if (await conversation.send(draft)) setDraft('');
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div aria-live="polite" className="flex flex-col gap-2.5 empty:hidden">
        {conversation.messages.map((message) =>
          message.role === 'user' ? (
            <p key={message.id} className={CLIENT_BUBBLE}>
              {message.text}
            </p>
          ) : (
            <div key={message.id} className={cn(ASSISTANT_BUBBLE, 'flex flex-col items-start gap-1.5')}>
              <p className="m-0 whitespace-pre-line">{message.text}</p>
              {message.failed && (
                <button
                  type="button"
                  onClick={() => void conversation.retry(message.retryText ?? '')}
                  className="text-link inline-flex min-h-11 cursor-pointer items-center font-medium text-marca"
                >
                  {chatCopy.retry}
                </button>
              )}
            </div>
          ),
        )}
        {conversation.ended && (
          <p className="pop m-0 max-w-[320px] self-start font-mono text-[11px] leading-[1.6] tracking-[0.08em] text-[var(--marca-clara)]">
            {conversation.ended.text}
          </p>
        )}
      </div>
      {conversation.sending && <TypingBubble label={chatCopy.typing} />}

      <form
        onSubmit={onSubmit}
        className="mt-2.5 flex flex-col gap-2.5 border-t border-[var(--regla-noche)] pt-5"
      >
        <label htmlFor={inputId} className="text-base font-medium">
          {label}
        </label>
        <div className="flex gap-2">
          <input
            id={inputId}
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            maxLength={DEMO_MAX_CHARS}
            placeholder={placeholder.replace('{name}', businessName)}
            autoComplete="off"
            disabled={Boolean(conversation.ended)}
            className="h-[52px] min-w-0 flex-1 rounded-[26px] border border-tinta-media bg-[var(--campo-noche)] px-5 text-base text-hueso placeholder:text-hueso-medio disabled:opacity-60"
          />
          <button
            type="submit"
            data-flash=""
            aria-label={send}
            disabled={conversation.sending || Boolean(conversation.ended)}
            className="press grid size-[52px] shrink-0 cursor-pointer place-items-center rounded-full bg-[var(--marca-clara)] text-xl font-semibold text-noche disabled:cursor-default disabled:opacity-60"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export function HomeDemo() {
  const { t, locale } = useTranslation();
  const copy = t.homeDemo;
  const reveal = useReveal<HTMLElement>();
  const visible = reveal['data-visible'] !== undefined;
  const reduced = usePrefersReducedMotion();
  const [sector, setSector] = useState<DemoSector>(INITIAL_SECTOR);
  const [stage, setStage] = useState(0);

  const demo = SECTOR_DEMOS.find((item) => item.sector === sector) ?? SECTOR_DEMOS[0];
  const script = copy.sectors[demo.sector];
  const shownStage = reduced ? FINAL_STAGE : stage;

  useEffect(() => {
    if (!visible || reduced) return;
    const timers = SCRIPT_STEPS_MS.map((ms, index) => setTimeout(() => setStage(index + 1), ms));
    return () => timers.forEach(clearTimeout);
  }, [sector, visible, reduced]);

  const pick = (next: DemoSector) => {
    if (next === sector) return;
    setStage(0);
    setSector(next);
  };

  return (
    <section {...reveal} id="demo" data-tone="dark" className="tone-night screen">
      <div className="screen-wrap flex flex-col gap-[88px] max-[900px]:gap-12">
        <h2 className="display display-l">
          <span className="w block">{copy.headingA}</span>
          <span className="indent-step w w2 block text-[var(--marca-clara)]">{copy.headingB}</span>
        </h2>
        <div className="demo-grid">
          <div className="w w3 flex min-w-0 flex-col gap-7">
            <div role="group" aria-label={copy.pickLabel} className="flex flex-wrap gap-x-5 gap-y-1">
              {SECTOR_DEMOS.map((item) => {
                const active = item.sector === sector;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    aria-pressed={active}
                    onClick={() => pick(item.sector)}
                    className={cn(
                      'mono-label min-h-11 cursor-pointer border-b',
                      active ? 'border-[var(--marca-clara)] text-hueso' : 'border-transparent text-hueso-medio',
                    )}
                  >
                    {copy.sectors[item.sector].label}
                  </button>
                );
              })}
            </div>

            <div className="flex min-h-[196px] flex-col gap-2.5">
              <p key={`q-${sector}`} className={CLIENT_BUBBLE}>
                {script.question}
              </p>
              {shownStage === 1 && <TypingBubble label={CHAT_COPY[locale].typing} />}
              {shownStage >= 2 && (
                <p key={`a-${sector}`} className={ASSISTANT_BUBBLE}>
                  {script.answer}{' '}
                  <span aria-hidden="true" className="font-mono text-[11px] text-marca">
                    ✓✓
                  </span>
                </p>
              )}
            </div>

            <AskBlock
              key={demo.slug}
              slug={demo.slug}
              businessName={demo.businessName}
              locale={locale}
              label={copy.askLabel}
              placeholder={copy.placeholder}
              send={copy.send}
            />

            <p className="m-0 font-mono text-[11px] text-hueso-medio">
              {copy.exampleNote.replace('{name}', demo.businessName)} ·{' '}
              <Link href="/demo" className="text-link text-hueso-medio">
                {copy.allDemos}
              </Link>
            </p>
          </div>
          <div className="w w-flat w4 flex min-w-0 flex-col gap-5">
            <p className="mono-label text-hueso-medio">{copy.logTitle}</p>
            <ol className="m-0 min-h-[236px] list-none border-b border-[var(--regla-noche)] p-0">
              {script.log.slice(0, visibleLogRows(shownStage)).map((row, index) => (
                <li key={`${sector}-${row.label}`} className="demo-log-row pop">
                  <span className="font-mono text-[13px] text-hueso-medio">{copy.logTimes[index]}</span>
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.12em]"
                    style={{ color: LOG_KIND_TONE[row.kind] }}
                  >
                    {row.label}
                  </span>
                  <span className="text-[18px] leading-[1.4]">{row.text}</span>
                </li>
              ))}
            </ol>
            <p className="m-0 mt-3 text-[20px] leading-[1.4]">
              {copy.trust} <span className="text-hueso-medio">{copy.trackRecord}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
