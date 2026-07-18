"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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

            <div className="relative bg-[#0a0a12] border border-[#1e1e2e] rounded-2xl overflow-hidden">
              {/* Window dots */}
              <div className="flex items-center px-5 py-3 border-b border-[#1e1e2e]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                </div>
              </div>

              <div className="p-6 font-mono text-[13px] leading-7 space-y-3">
                {/* User command */}
                <div>
                  <span className="text-[#8b5cf6]">→</span>{" "}
                  <span className="text-[#e8e8f0] font-semibold">/genesis</span>
                </div>

                {/* Aether genesis execution */}
                <div className="space-y-1">
                  <div>
                    <span className="text-[#8b5cf6]">⚡</span>{" "}
                    <span className="text-[#8b5cf6] font-bold">aether genesis</span>
                  </div>
                </div>

                {/* Connection & scanning */}
                <div className="pl-3 space-y-0.5">
                  <div className="text-[#c8c8e0]">
                    Connecting to <span className="text-[#8888a8]">openrouter</span> (tencent/hy3:free)...{" "}
                    <span className="text-[#22c55e]">✓</span>
                  </div>
                  <div className="text-[#c8c8e0]">
                    Scanning project...{" "}
                    <span className="text-[#22c55e]">✓</span>
                  </div>
                  <div className="text-[#c8c8e0]">Planning documentation...</div>
                </div>

                {/* Planner decided */}
                <div className="pl-3 space-y-0.5">
                  <div className="text-[#c8c8e0]">
                    <span className="text-[#8b5cf6]">◇</span> Planner decided:
                  </div>
                  <div className="pl-5 text-[#8888a8] space-y-0">
                    <div>• architecture/system-overview.md</div>
                    <div>• architecture/folder-structure.md</div>
                    <div>• architecture/tech-stack.md</div>
                    <div>• AI_CONTEXT.md</div>
                    <div>• modules/overview.md</div>
                    <div>• docs/docs/theme-system.md <span className="text-[#6b6b8a]">(custom)</span></div>
                    <div>• docs/docs/3d-galaxy-background.md <span className="text-[#6b6b8a]">(custom)</span></div>
                  </div>
                </div>

                {/* Doc count */}
                <div className="pl-3">
                  <span className="text-[#22c55e]">✓</span>{" "}
                  <span className="text-[#c8c8e0]">(7 docs)</span>
                </div>

                {/* Generating docs */}
                <div className="pl-3 space-y-0.5">
                  <div>
                    <span className="text-[#8b5cf6]">⚡</span>{" "}
                    <span className="text-[#c8c8e0]">generating docs</span>
                  </div>
                  <div className="pl-5 text-[#8888a8] space-y-0">
                    <div><span className="text-[#22c55e]">✓</span> architecture/system-overview.md</div>
                    <div><span className="text-[#22c55e]">✓</span> architecture/folder-structure.md</div>
                    <div><span className="text-[#22c55e]">✓</span> architecture/tech-stack.md</div>
                    <div><span className="text-[#22c55e]">✓</span> modules/overview.md</div>
                    <div><span className="text-[#22c55e]">✓</span> AI_CONTEXT.md</div>
                    <div><span className="text-[#22c55e]">✓</span> docs/docs/theme-system.md</div>
                    <div><span className="text-[#22c55e]">✓</span> docs/docs/3d-galaxy-background.md</div>
                  </div>
                </div>

                {/* Genesis complete */}
                <div className="pt-1">
                  <span className="text-[#22c55e]">✓</span>{" "}
                  <span className="text-[#22c55e] font-semibold">Genesis complete in 170.1s</span>{" "}
                  <span className="text-[#8888a8]">→ .aether/docs/</span>
                </div>

                {/* Cursor */}
                <div className="pt-2">
                  <span className="text-[#8b5cf6]">→</span>{" "}
                  <span className="inline-block w-[2px] h-4 bg-[#e8e8f0]/70 animate-pulse" />
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
            <Link
              href="/docs/getting-started"
              className="text-sm text-muted hover:text-accent transition-colors duration-200"
            >
              Read the full guide →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
