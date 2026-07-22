"use client";

import { motion } from "framer-motion";
import { TOTALS, reduction } from "./data";

const stats = [
  {
    label: "Tokens",
    before: TOTALS.raw.tokens,
    after: TOTALS.prompt.tokens,
    format: (n: number) => `${(n / 1_000_000).toFixed(1)}M`,
  },
  {
    label: "Turns",
    before: TOTALS.raw.turns,
    after: TOTALS.prompt.turns,
    format: (n: number) => `${n}`,
  },
  {
    label: "Cost",
    before: TOTALS.raw.cost,
    after: TOTALS.prompt.cost,
    format: (n: number) => `$${n.toFixed(2)}`,
  },
];

export default function BenchmarkStats() {
  return (
    <section className="relative py-16 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl border border-border overflow-hidden bg-border">
          {stats.map((stat, index) => {
            const pct = reduction(stat.before, stat.after);
            const afterPos = (stat.after / stat.before) * 100;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-surface p-6"
              >
                <p className="text-[11px] text-muted uppercase tracking-[0.12em] mb-3">
                  {stat.label} to fix the bug
                </p>

                <span className="block text-4xl font-bold text-foreground tracking-tight mb-6">
                  -{Math.round(pct)}%
                </span>

                {/* mini dumbbell: before -> after on a shared track */}
                <div className="relative h-4 mb-2">
                  <div
                    className="absolute top-1/2 h-[2px] bg-border -translate-y-1/2 rounded-full"
                    style={{ left: `${afterPos}%`, width: `${100 - afterPos}%` }}
                  />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-muted ring-[3px] ring-surface"
                    initial={{ left: "100%" }}
                    whileInView={{ left: "100%" }}
                    viewport={{ once: true }}
                  />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent ring-[3px] ring-surface shadow-[0_0_10px_var(--accent-muted)]"
                    initial={{ left: "100%" }}
                    whileInView={{ left: `${afterPos}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>

                <div className="flex items-center justify-between text-[12px] font-mono tabular-nums">
                  <span className="text-muted">raw {stat.format(stat.before)}</span>
                  <span className="text-accent">/prompt {stat.format(stat.after)}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-[12px] text-muted/60 mt-5"
        >
          Summed across all 5 tasks. Execution cost only — generating the prompts is separate and one-time per task.
        </motion.p>
      </div>
    </section>
  );
}
