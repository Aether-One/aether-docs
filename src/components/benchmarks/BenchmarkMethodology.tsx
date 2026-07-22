"use client";

import { motion } from "framer-motion";
import { MODEL, REPO } from "./data";

const steps = [
  {
    number: "1",
    title: "Real bugs, not made up",
    description: `5 already-merged pull requests from ${REPO} were picked. For each one, the repo was checked out at the commit right before the fix — the bug is genuinely still there.`,
  },
  {
    number: "2",
    title: "No documentation, on purpose",
    description: "docs/, examples/, README.md, AGENTS.md and CLAUDE.md were removed from the working copy for both runs — /prompt exists for projects that don't already have great docs, so that's the scenario we tested.",
  },
  {
    number: "3",
    title: "Same model, same repo, one variable",
    description: `Both runs used ${MODEL} through the real Claude Code CLI, with full file-edit permissions. The only thing that changed between runs was the briefing it received.`,
  },
  {
    number: "4",
    title: "Two briefings",
    description: "The \"raw task\" run got the bug described in plain language, with the whole repo to explore. The \"/prompt\" run got the prompt /prompt generated from a .aether/docs knowledge base — pointing at the exact files, conventions and acceptance criteria.",
  },
  {
    number: "5",
    title: "Graded against the real fix",
    description: "The files each run actually touched were checked against the files the real pull request changed — not a guess, a direct diff.",
  },
];

export default function BenchmarkMethodology() {
  return (
    <section className="relative py-24 px-4 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Setup.
          </h2>
          <p className="text-muted text-base mt-3 max-w-2xl">
            Exactly what ran, in order.
          </p>
        </motion.div>

        <div className="space-y-1">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="group flex flex-col sm:flex-row gap-2 sm:gap-8 py-6 border-b border-border first:border-t"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="flex items-baseline gap-4 sm:w-56 flex-shrink-0">
                <span className="text-[11px] font-mono text-muted/40 tracking-wider">
                  0{step.number}
                </span>
                <span className="text-foreground font-medium text-sm">
                  {step.title}
                </span>
              </div>
              <p className="text-sm text-muted leading-relaxed flex-1">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
