# Benchmark Data Model and Visualization

Based on the provided project context, the benchmark-related code is limited to **formatting utilities** in `src/components/benchmarks/format.ts`. No benchmark task definitions, result datasets, reduction logic, chart components, table components, or statistics components are present in the provided context.

---

## Data Model: `src/components/benchmarks/format.ts`

This file exports three pure formatting functions. No benchmark task definitions, result schemas, aggregation logic, or visualization components are present in the provided context.

### Exported Functions

| Function | Signature | Behavior |
|----------|-----------|----------|
| `formatTokens` | `(n: number) => string` | Returns `"X.XXM"` if `n >= 1_000_000`, else `"XXXK"` (thousands, no decimal). |
| `formatUsd` | `(n: number) => string` | Returns `"$X.XX"` with exactly two decimal places. |
| `formatPct` | `(n: number) => string` | Returns `"-XX%"` if `n >= 0`, else `"+XX%"` (absolute value, rounded integer). |

### Source Reference
```ts
// src/components/benchmarks/format.ts
export function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  return `${Math.round(n / 1000)}K`;
}

export function formatUsd(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function formatPct(n: number): string {
  const sign = n >= 0 ? '-' : '+';
  return `${sign}${Math.round(Math.abs(n))}%`;
}
```

---

## Visualization Components

**No chart, table, or statistics components are present in the provided project context.**  
The following are **not present** in the provided files:

- Chart components (e.g., Recharts, Recharts, Chart.js, Recharts wrappers)
- Table components for benchmark results
- Statistics/summary components (mean, median, percentile displays)
- Benchmark task definitions, result schemas, or reduction/aggregation logic
- Data files (e.g., `data.ts`, `benchmarks.ts`, `results.json`)

---

## Data Flow (Inferred from Available Code)

```mermaid
flowchart LR
    A[Raw Numeric Value] --> B[formatTokens]
    A --> C[formatUsd]
    A --> C[formatPct]
    B --> D[Formatted String: "X.XXM" or "XXXK"]
    C --> E[Formatted String: "$X.XX"]
    C --> F[Formatted String: "-XX%" or "+XX%"]
```

> **Note**: No components consuming these formatters are present in the provided context. The formatters are pure utilities with no consumers visible in the provided file set.

---

## Summary

| Aspect | Status |
|--------|--------|
| Benchmark task definitions | ❌ Not present |
| Result data structures | ❌ Not present |
| Aggregation/reduction logic | ❌ Not present |
| Formatting utilities | ✅ `src/components/benchmarks/format.ts` |
| Chart components | ❌ Not present |
| Table components | ❌ Not present |
| Statistics components | ❌ Not present |
| Data files (JSON/TS/JSONL) | ❌ Not present |

> **Note**: This document only reflects what is verifiable in the provided project context. Benchmark visualization components or data models may exist in files not included in the context.