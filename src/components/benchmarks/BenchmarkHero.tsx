"use client";

import { motion } from "framer-motion";
import { REPO, REPO_URL, REPO_DESCRIPTION, MODEL } from "./data";

export default function BenchmarkHero() {
  return (
    <section className="relative pt-32 pb-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[clamp(2rem,5.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground"
        >
          Does <span className="text-accent">/prompt</span> actually save tokens?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted text-base sm:text-lg max-w-2xl mt-5 leading-relaxed"
        >
          5 already-merged bugs, rolled back to the commit right before each fix.
          Same model, same empty-of-docs repo, twice: once with a plain bug
          report, once with the prompt <code className="text-accent font-mono text-[0.9em]">/prompt</code> generated.
          The only variable was the briefing.
        </motion.p>

        <motion.a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group flex items-center gap-3 mt-8 p-4 rounded-xl border border-border bg-surface/50 hover:border-accent/40 hover:bg-surface-hover/50 transition-all duration-200 max-w-md"
        >
          <svg className="w-8 h-8 text-foreground flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-sm font-mono">
              <span className="text-foreground font-semibold group-hover:text-accent transition-colors">
                {REPO}
              </span>
              <svg className="w-3 h-3 text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <p className="text-[12px] text-muted mt-0.5 leading-snug">{REPO_DESCRIPTION}</p>
          </div>
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-[12px] font-mono text-muted/70"
        >
          <span>5 pull requests</span>
          <span className="text-muted/30">·</span>
          <span>{MODEL} on both runs</span>
          <span className="text-muted/30">·</span>
          <span>graded against the real diff</span>
        </motion.div>
      </div>
    </section>
  );
}
