"use client";

import { motion } from "framer-motion";

const phases = [
  {
    label: "Now",
    title: "Foundation",
    items: ["Core CLI", "Genesis command", "AI providers", "Context scanning"],
    active: true,
  },
  {
    label: "Next",
    title: "Expansion",
    items: ["Plugin system", "Multi-provider", "Workspace sharing", "Advanced context"],
    active: false,
  },
  {
    label: "Later",
    title: "Constellation",
    items: ["Team workspaces", "CI/CD integration", "IDE extensions", "Custom fine-tuning"],
    active: false,
  },
];

export default function Roadmap() {
  return (
    <section className="relative py-32 px-4 bg-background" id="roadmap">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Where we&apos;re going.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Phase label */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    phase.active ? "bg-success animate-pulse-slow" : "bg-muted/30"
                  }`}
                />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted/60">
                  {phase.label}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-4 tracking-tight">
                {phase.title}
              </h3>

              <ul className="space-y-2.5">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className={`text-sm ${phase.active ? "text-muted" : "text-muted/50"}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
