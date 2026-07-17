"use client";

import { motion } from "framer-motion";

export default function QuickStart() {
  return (
    <section className="relative py-32 px-4 bg-background" id="quickstart">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Try it now.
          </h2>
        </motion.div>

        <motion.div
          className="relative max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-border to-transparent" />

            <div className="relative bg-surface border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center px-5 py-3 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-foreground/10" />
                  <div className="w-2 h-2 rounded-full bg-foreground/10" />
                  <div className="w-2 h-2 rounded-full bg-foreground/10" />
                </div>
              </div>

              <div className="p-6 font-mono text-[13px] leading-8 space-y-0.5">
                <div>
                  <span className="text-accent">❯</span>{" "}
                  <span className="text-foreground">curl -fsSL https://aether.sh/install | sh</span>
                </div>
                <div className="text-muted/60 pl-4">installed to ~/.local/bin/aether</div>
                <div className="pt-2">
                  <span className="text-accent">❯</span>{" "}
                  <span className="text-foreground">cd my-project</span>
                </div>
                <div className="pt-2">
                  <span className="text-accent">❯</span>{" "}
                  <span className="text-foreground">aether genesis</span>
                </div>
                <div className="text-muted/60 pl-4">scanning · mapping · indexing</div>
                <div className="pl-4">
                  <span className="text-success">✓</span>{" "}
                  <span className="text-foreground/80">workspace ready</span>
                </div>
                <div className="pt-2">
                  <span className="text-accent">❯</span>{" "}
                  <span className="text-foreground">aether ask</span>{" "}
                  <span className="text-accent-secondary">&quot;explain the architecture&quot;</span>
                </div>
                <div className="text-muted pl-4 pt-1 leading-relaxed">
                  This project uses a layered architecture with three main<br />
                  modules: auth, api, and storage. The auth module handles...
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="/docs/getting-started"
              className="text-sm text-muted hover:text-accent transition-colors duration-200"
            >
              Read the full guide →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
