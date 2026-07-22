"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BenchmarkCTA() {
  return (
    <section className="relative py-24 px-4 bg-background border-t border-border overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        className="relative max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">
          Try it on your own codebase.
        </h2>
        <p className="text-muted text-base mb-8 max-w-md mx-auto">
          Run <code className="text-accent font-mono text-[0.9em]">/genesis</code> once,
          then <code className="text-accent font-mono text-[0.9em]">/prompt</code> for
          any task — no docs required.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/docs/cli-reference/prompt"
            className="px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-sm hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-[0_0_30px_var(--accent-muted)]"
          >
            Read the /prompt docs
          </Link>
          <Link
            href="/docs/getting-started"
            className="px-8 py-3.5 rounded-full text-muted hover:text-foreground text-sm font-medium transition-colors duration-200 border border-border hover:border-accent/30 hover:bg-accent-muted"
          >
            Get Started
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
