// Log scale for the token-comparison chart. Domain covers the full data range
// (280K–4.23M) with margin, landing gridlines on clean 1-3-10 steps.
export const SCALE_MIN = 100_000;
export const SCALE_MAX = 10_000_000;

const LOG_MIN = Math.log10(SCALE_MIN);
const LOG_MAX = Math.log10(SCALE_MAX);

export function logPosition(value: number): number {
  const clamped = Math.min(Math.max(value, SCALE_MIN), SCALE_MAX);
  return ((Math.log10(clamped) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100;
}

export const AXIS_TICKS = [
  { value: 100_000, label: "100K" },
  { value: 300_000, label: "300K" },
  { value: 1_000_000, label: "1M" },
  { value: 3_000_000, label: "3M" },
  { value: 10_000_000, label: "10M" },
];
