"use client";

import { motion } from "framer-motion";
import { TASKS, reduction } from "./data";
import { formatTokens, formatUsd, formatPct } from "./format";
import { logPosition, AXIS_TICKS } from "./scale";

function Row({ task }: { task: (typeof TASKS)[number] }) {
  const rawX = logPosition(task.raw.tokens);
  const promptX = logPosition(task.prompt.tokens);
  const pct = reduction(task.raw.tokens, task.prompt.tokens);

  return (
    <div className="group/row relative">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[13px] text-foreground font-medium">{task.short}</span>
        <span className="text-[11px] font-mono tabular-nums text-muted/70">
          {formatPct(pct)}
        </span>
      </div>

      <div className="relative h-6">
        {/* connecting line */}
        <div
          className="absolute top-1/2 h-[2px] bg-border -translate-y-1/2 rounded-full"
          style={{ left: `${Math.min(rawX, promptX)}%`, width: `${Math.abs(promptX - rawX)}%` }}
        />
        {/* raw dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-muted ring-[3px] ring-background z-10"
          style={{ left: `${rawX}%` }}
        />
        {/* prompt dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent ring-[3px] ring-background z-10 shadow-[0_0_10px_var(--accent-muted)]"
          style={{ left: `${promptX}%` }}
        />
        {/* hover hit area + tooltip */}
        <div className="absolute inset-y-[-8px] inset-x-0 cursor-default">
          <div
            className="absolute bottom-full mb-2 -translate-x-1/2 opacity-0 group-hover/row:opacity-100 pointer-events-none transition-opacity duration-150 z-20 whitespace-nowrap"
            style={{ left: `${(rawX + promptX) / 2}%` }}
          >
            <div className="rounded-lg border border-border bg-surface px-3 py-2 shadow-xl text-[11px] font-mono tabular-nums flex items-center gap-3">
              <span className="text-muted">
                raw <span className="text-foreground">{formatTokens(task.raw.tokens)}</span> · {task.raw.turns}t · {formatUsd(task.raw.cost)}
              </span>
              <span className="text-muted/30">|</span>
              <span className="text-accent">
                /prompt <span className="text-foreground">{formatTokens(task.prompt.tokens)}</span> · {task.prompt.turns}t · {formatUsd(task.prompt.cost)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BenchmarkChart() {
  return (
    <figure className="relative p-6 sm:p-8 rounded-2xl border border-border bg-surface/50">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Tokens spent per task, raw vs. /prompt
          </p>
          <p className="text-[12px] text-muted mt-0.5">Log scale — hover a row for exact figures</p>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-muted" /> raw task
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" /> /prompt
          </span>
        </div>
      </figcaption>

      <div className="relative">
        {/* gridlines, stretched to the rows column's height */}
        <div className="absolute inset-0 pointer-events-none">
          {AXIS_TICKS.map((tick) => (
            <div
              key={tick.value}
              className="absolute top-0 bottom-0 w-px bg-border/60"
              style={{ left: `${logPosition(tick.value)}%` }}
            />
          ))}
        </div>

        <motion.div
          className="relative space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          {TASKS.map((task) => (
            <Row key={task.id} task={task} />
          ))}
        </motion.div>
      </div>

      {/* axis */}
      <div className="relative h-5 mt-4 pt-2 border-t border-border">
        {AXIS_TICKS.map((tick) => (
          <span
            key={tick.value}
            className="absolute -translate-x-1/2 text-[10px] font-mono tabular-nums text-muted/60"
            style={{ left: `${logPosition(tick.value)}%` }}
          >
            {tick.label}
          </span>
        ))}
      </div>
    </figure>
  );
}
