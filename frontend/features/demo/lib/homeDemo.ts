export type LogKind = 'entry' | 'ai' | 'human';

export const SCRIPT_STEPS_MS = [500, 1400, 1850, 2300] as const;

export const FINAL_STAGE = SCRIPT_STEPS_MS.length;

export function stageAt(elapsedMs: number): number {
  return SCRIPT_STEPS_MS.filter((step) => elapsedMs >= step).length;
}

// The first row shows while the question waits, so the log is never empty.
export function visibleLogRows(stage: number): number {
  return Math.max(1, stage);
}

export const LOG_KIND_TONE: Record<LogKind, string> = {
  entry: 'var(--hueso-medio)',
  ai: 'var(--marca-clara)',
  human: 'var(--hueso)',
};
