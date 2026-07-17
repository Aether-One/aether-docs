"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "@/components/theme";
import Logo from "@/components/ui/Logo";

const Galaxy = dynamic(() => import("@/components/galaxy/Galaxy"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />,
});

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <Galaxy isDark={isDark} />

      {/* Depth overlays - subtle, just enough to fade edges */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_60%,var(--background)_95%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[1] bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 px-4 max-w-6xl mx-auto"
      >
        <div className="relative">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-8"
          >
            <Logo
              width={140}
              height={140}
              className="drop-shadow-[0_0_60px_rgba(139,92,246,0.5)]"
            />
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center mb-10"
          >
            <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-surface/50 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-slow" />
              <span className="text-xs text-muted font-mono tracking-widest uppercase">
                v0.1 · genesis
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-[clamp(3rem,9vw,7rem)] font-bold leading-[0.85] tracking-[-0.04em]">
              <span className="block text-foreground drop-shadow-[0_2px_20px_var(--accent-muted)]">Make your code</span>
              <span className="block mt-1 bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#34d399] bg-clip-text text-transparent bg-[length:200%] animate-shimmer">
                think.
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-center text-white text-lg md:text-xl max-w-lg mx-auto mt-8 leading-relaxed font-normal backdrop-blur-md bg-background/40 rounded-2xl px-8 py-4 border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            The open-source CLI that turns any codebase into an AI-native workspace.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
          >
            <Link
              href="/docs/getting-started"
              className="px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-sm hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-[0_0_30px_var(--accent-muted)]"
            >
              Get Started
            </Link>
            <a
              href="https://github.com/aether-one/aether"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full text-muted hover:text-foreground text-sm font-medium transition-colors duration-200 border border-border hover:border-accent/30 hover:bg-accent-muted inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
          </motion.div>

          {/* Terminal */}
          <motion.div
            className="mt-20 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-border to-transparent opacity-50" />
              <div className="absolute -inset-8 rounded-3xl bg-accent/5 blur-3xl" />

              <div className="relative bg-surface/95 backdrop-blur-md border border-border rounded-2xl overflow-hidden shadow-2xl">
                {/* Chrome */}
                <div className="flex items-center px-5 py-3 border-b border-border">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                  </div>
                  <span className="text-[11px] text-muted/50 font-mono ml-4">~/my-project</span>
                </div>

                {/* Content */}
                <div className="p-6 font-mono text-[13px] leading-7">
                  <div>
                    <span className="text-accent">❯</span>{" "}
                    <span className="text-foreground font-medium">aether genesis</span>
                  </div>
                  <div className="text-muted/60 pl-4 mt-1">
                    scanning 847 files · mapping deps · indexing...
                  </div>
                  <div className="mt-1">
                    <span className="text-success">✓</span>{" "}
                    <span className="text-foreground/80">workspace ready</span>{" "}
                    <span className="text-muted/40">· 1.2s</span>
                  </div>
                  <div className="mt-3">
                    <span className="text-accent">❯</span>{" "}
                    <span className="text-foreground font-medium">aether ask</span>{" "}
                    <span className="text-accent-secondary">&quot;how does auth work?&quot;</span>
                    <span className="inline-block w-[2px] h-4 bg-accent/60 ml-1 animate-pulse-slow align-middle" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
