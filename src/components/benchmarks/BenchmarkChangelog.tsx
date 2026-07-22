"use client";

import { motion } from "framer-motion";
import { TASKS, REPO } from "./data";

export default function BenchmarkChangelog() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="relative bg-[#0a0a12] border border-[#1e1e2e] rounded-2xl overflow-hidden shadow-2xl"
    >
      <div className="flex items-center px-5 py-3 border-b border-[#1e1e2e]">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <span className="text-[11px] text-[#6b6b8a] font-mono ml-4">
          git log --grep=fix -5 · {REPO}
        </span>
      </div>

      <div className="divide-y divide-[#1e1e2e]">
        {TASKS.map((task) => (
          <a
            key={task.id}
            href={task.prUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block px-5 py-4 hover:bg-white/[0.02] transition-colors duration-150"
          >
            <div className="flex items-start gap-3 font-mono text-[12px] sm:text-[13px] leading-6">
              <span className="text-[#5a5a78] flex-shrink-0">$</span>
              <div className="min-w-0">
                <div>
                  <span className="text-[#8b5cf6]">{task.prNumber}</span>{" "}
                  <span className="text-[#e2e8f0] group-hover:text-white transition-colors">
                    {task.prTitle}
                  </span>
                </div>
                <p className="text-[#8888a8] mt-1 leading-relaxed whitespace-normal">
                  {task.bug}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </motion.div>
  );
}
