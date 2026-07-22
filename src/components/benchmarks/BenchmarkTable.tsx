"use client";

import { TASKS, reduction } from "./data";
import { formatTokens, formatUsd, formatPct } from "./format";

export default function BenchmarkTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full text-sm border-collapse min-w-[720px]">
        <thead>
          <tr className="border-b border-border bg-cosmos-800/30">
            <th className="text-left px-4 py-3 font-semibold text-[12px] text-foreground">Bug</th>
            <th className="text-left px-4 py-3 font-semibold text-[12px] text-foreground">File(s)</th>
            <th className="text-right px-4 py-3 font-semibold text-[12px] text-foreground">Tokens</th>
            <th className="text-right px-4 py-3 font-semibold text-[12px] text-foreground">Turns</th>
            <th className="text-right px-4 py-3 font-semibold text-[12px] text-foreground">Cost</th>
            <th className="text-right px-4 py-3 font-semibold text-[12px] text-foreground">Δ</th>
          </tr>
        </thead>
        <tbody>
          {TASKS.map((task) => {
            const pct = reduction(task.raw.tokens, task.prompt.tokens);
            return (
              <tr key={task.id} className="border-b border-border last:border-0 align-top">
                <td className="px-4 py-4 max-w-[280px]">
                  <a
                    href={task.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {task.title}
                  </a>
                  <div className="text-[11px] font-mono text-muted mt-1">
                    <a href={task.prUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                      {task.prNumber}
                    </a>{" "}
                    · axios/axios
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-1">
                    {task.files.map((f) => (
                      <code key={f} className="text-[11px] font-mono text-accent/80 whitespace-nowrap">
                        {f}
                      </code>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-right font-mono tabular-nums text-[12px]">
                  <div className="text-muted">{formatTokens(task.raw.tokens)}</div>
                  <div className="text-accent">{formatTokens(task.prompt.tokens)}</div>
                </td>
                <td className="px-4 py-4 text-right font-mono tabular-nums text-[12px]">
                  <div className="text-muted">{task.raw.turns}</div>
                  <div className="text-accent">{task.prompt.turns}</div>
                </td>
                <td className="px-4 py-4 text-right font-mono tabular-nums text-[12px]">
                  <div className="text-muted">{formatUsd(task.raw.cost)}</div>
                  <div className="text-accent">{formatUsd(task.prompt.cost)}</div>
                </td>
                <td className="px-4 py-4 text-right">
                  <span
                    className={`font-mono tabular-nums text-[12px] font-medium ${
                      pct > 10 ? "text-success" : "text-muted"
                    }`}
                  >
                    {formatPct(pct)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
