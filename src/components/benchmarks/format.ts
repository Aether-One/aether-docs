export function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  return `${Math.round(n / 1000)}K`;
}

export function formatUsd(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function formatPct(n: number): string {
  return `${n >= 0 ? "-" : "+"}${Math.abs(Math.round(n))}%`;
}
