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
                    Connecting to <span className="font-semibold text-[#e8e8f0]">openrouter</span> · nvidia/nemotron-3-ultra-550b-a55b:free...{" "}
                    <span className="text-[#22c55e]">✓</span>
                  </div>
                  <div className="text-[#c8c8e0]">
                    Scanning project...{" "}
                    <span className="text-[#22c55e]">✓</span>
                  </div>
                  <div className="text-[#c8c8e0]">
                    Planning documentation...{" "}
                    <span className="text-[#22c55e]">✓</span>{" "}
                    <span className="text-[#8888a8]">(11 docs)</span>
                  </div>
                </div>

                {/* Planner decided */}
                <div className="pl-3 space-y-0.5">
                  <div className="text-[#c8c8e0]">
                    <span className="text-[#8b5cf6]">◇</span> Planner decided:
                  </div>
                  <div className="pl-5 text-[#8888a8] space-y-0">
                    <div>• guides/getting-started.md</div>
                    <div>• guides/onboarding.md</div>
                    <div>• architecture/system-overview.md</div>
                    <div>• architecture/folder-structure.md</div>
                    <div>• architecture/tech-stack.md</div>
                    <div>• AI_CONTEXT.md</div>
                    <div>• modules/overview.md</div>
                    <div>• diagrams/system.md</div>
                    <div>• infrastructure/environment-configuration.md <span className="text-[#6b6b8a]">(custom)</span></div>
                    <div>• infrastructure/s3-bucket-design.md <span className="text-[#6b6b8a]">(custom)</span></div>
                    <div>• infrastructure/cloudfront-distribution.md <span className="text-[#6b6b8a]">(custom)</span></div>
                  </div>
                </div>

                {/* Exclude tip */}
                <div className="pl-3">
                  <div className="text-[#eab308]">
                    <span>💡</span>{" "}
                    <span>Large paths that don&apos;t need documenting? Exclude them with{" "}</span>
                    <span className="font-semibold text-[#e8e8f0]">/exclude &lt;path&gt;</span>
                  </div>
                  <div className="text-[#eab308] pl-5">to shrink the scan and lower the cost.</div>
                </div>

                {/* Cost estimate */}
                <div className="pl-3 space-y-0.5">
                  <div className="text-[#c8c8e0]">
                    <span className="font-semibold text-[#e8e8f0]">Cost estimate</span>{" "}
                    <span className="text-[#8888a8]">— openrouter · nvidia/nemotron-3-ultra-550b-a55b:free</span>
                  </div>
                  <div className="pl-5 text-[#8888a8] space-y-0">
                    <div>Calls{" "}<span className="pl-2">~11</span> <span className="text-[#6b6b8a]">(11 docs)</span></div>
                    <div>Input{" "}<span className="pl-2">~21,956 tokens</span> <span className="text-[#6b6b8a]">(measured)</span></div>
                    <div>Output <span className="pl-1">~22,000–35,750 tokens</span> <span className="text-[#6b6b8a]">(estimated)</span></div>
                    <div>Cost{" "}<span className="pl-3 font-semibold text-[#e8e8f0]">Free</span> <span className="text-[#6b6b8a]">($0.00)</span></div>
                  </div>
                </div>

                {/* Confirmation */}
                <div className="pl-3 space-y-0.5">
                  <div className="text-[#c8c8e0]">
                    Proceed? <span className="text-[#8888a8]">[Y/n]</span> <span className="text-[#e8e8f0]">y</span>
                  </div>
                  <div className="text-[#8888a8]">
                    Press <span className="font-semibold text-[#e8e8f0]">ESC</span> to cancel.
                  </div>
                  <div className="text-[#c8c8e0]">
                    Preparing project context...{" "}
                    <span className="text-[#22c55e]">✓</span>
                  </div>
                </div>

                {/* Generating docs */}
                <div className="pl-3 space-y-0.5 pt-1">
                  <div>
                    <span className="text-[#8b5cf6]">⚡</span>{" "}
                    <span className="text-[#c8c8e0]">generating docs</span>
                  </div>
                  <div className="pl-3 text-[#8888a8] space-y-0">
                    <div><span className="text-[#22c55e]">✓</span> guides/getting-started.md</div>
                    <div><span className="text-[#a78bfa]">⏳</span> <span className="font-semibold text-[#e8e8f0]">guides/onboarding.md</span></div>
                    <div><span className="text-[#22c55e]">✓</span> architecture/system-overview.md</div>
                    <div><span className="text-[#22c55e]">✓</span> architecture/folder-structure.md</div>
                    <div><span className="text-[#22c55e]">✓</span> architecture/tech-stack.md</div>
                    <div><span className="text-[#22c55e]">✓</span> modules/overview.md</div>
                    <div><span className="text-[#22c55e]">✓</span> diagrams/system.md</div>
                    <div><span className="text-[#a78bfa]">⏳</span> <span className="font-semibold text-[#e8e8f0]">AI_CONTEXT.md</span></div>
                    <div><span className="text-[#a78bfa]">⏳</span> <span className="font-semibold text-[#e8e8f0]">infrastructure/environment-configuration.md</span></div>
                    <div><span className="text-[#22c55e]">✓</span> infrastructure/s3-bucket-design.md</div>
                    <div><span className="text-[#22c55e]">✓</span> infrastructure/cloudfront-distribution.md</div>
                  </div>
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
