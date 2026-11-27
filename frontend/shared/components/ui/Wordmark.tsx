import { cn } from '@/shared/lib/utils';

interface WordmarkProps {
  size?: 'header' | 'footer';
  className?: string;
}

export function Wordmark({ size = 'header', className }: WordmarkProps) {
  return (
    <span
      className={cn(
        'font-display font-bold tracking-[-0.02em]',
        size === 'header' ? 'text-[24px]' : 'text-[22px]',
        className,
      )}
    >
      <span className="text-[var(--c-clave)]">AI</span>works
    </span>
  );
}
