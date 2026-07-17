"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Genesis",
    description: "One command. Your entire codebase becomes an AI-native workspace.",
    accent: "from-nebula-purple to-nebula-blue",
    span: "md:col-span-2",
  },
  {
    title: "Context-Aware",
    description: "Understands your architecture, dependencies, and patterns automatically.",
    accent: "from-nebula-blue to-nebula-cyan",
    span: "md:col-span-1",
  },
  {
    title: "Fast",
    description: "Built in Rust. Scans thousands of files in milliseconds.",
    accent: "from-aurora-green to-aurora-teal",
    span: "md:col-span-1",
  },
  {
    title: "Provider Agnostic",
    description: "OpenAI, Anthropic, local models — your choice, your keys, your rules.",
    accent: "from-nebula-cyan to-nebula-purple",
    span: "md:col-span-2",
  },
  {
    title: "Private",
    description: "Your code never leaves your machine unless you choose to share it.",
    accent: "from-nebula-pink to-nebula-purple",
    span: "md:col-span-1",
  },
  {
    title: "Extensible",
    description: "Plugin system for custom commands, providers, and workflows.",
    accent: "from-aurora-teal to-nebula-blue",
    span: "md:col-span-1",
  },
  {
    title: "Open Source",
    description: "MIT licensed. Built in public. Community-driven from day one.",
    accent: "from-nebula-purple to-nebula-pink",
    span: "md:col-span-1",
  },
];

export default function Features() {
  return (
    <section className="relative py-32 px-4 bg-background" id="features">
      {/* Subtle top divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Everything you need.
            <br />
            <span className="text-muted">Nothing you don&apos;t.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`group relative ${feature.span} p-6 rounded-2xl border border-border bg-surface/50 hover:bg-surface-hover/50 transition-all duration-500 overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              {/* Hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />

              {/* Top line accent */}
              <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${feature.accent} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />

              <div className="relative">
                <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
