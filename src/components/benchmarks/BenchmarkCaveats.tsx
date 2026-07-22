"use client";

import { motion } from "framer-motion";

const notes = [
  "Numbers above are execution only — the cost of running Claude Code to actually fix each bug. Generating the /prompt itself is a small, separate one-time cost per task, not included in these charts.",
  "Generating .aether/docs with /genesis is a one-time cost per project, not per task — it wasn't measured here, and it amortizes across every future /prompt you run.",
  "Both runs found the correct file 5 out of 5 times. /prompt's advantage in this test is efficiency and cost, not accuracy — raw exploration got there too, it just took more turns to do it.",
  "Task 4 (Set serialization) barely moved the needle — /prompt saved 3% here, not the 30–75% seen elsewhere. Not every task benefits equally; simple, single-file bugs leave less room to save.",
];

export default function BenchmarkCaveats() {
  return (
    <section className="relative py-20 px-4 bg-background border-t border-border">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-xl font-semibold text-foreground tracking-tight mb-6"
        >
          What this benchmark doesn&apos;t show
        </motion.h2>

        <ul className="space-y-4">
          {notes.map((note, index) => (
            <motion.li
              key={note}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex gap-3 text-sm text-muted leading-relaxed"
            >
              <span className="text-muted/40 flex-shrink-0">—</span>
              <span>{note}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
