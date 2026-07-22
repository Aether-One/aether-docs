"use client";

import { motion } from "framer-motion";
import BenchmarkChart from "./BenchmarkChart";
import BenchmarkTable from "./BenchmarkTable";
import BenchmarkChangelog from "./BenchmarkChangelog";

export default function BenchmarkTasks() {
  return (
    <section className="relative py-24 px-4 bg-background border-t border-border" id="tasks">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            5 bugs, task by task.
          </h2>
          <p className="text-muted text-base mt-3 max-w-2xl">
            Both runs edited the correct file every time. The gap is how much it cost to get there.
          </p>
        </motion.div>

        <BenchmarkChart />

        <div className="mt-6">
          <BenchmarkTable />
        </div>

        <div className="mt-10">
          <p className="text-[13px] text-muted mb-3">What was actually broken, per PR:</p>
          <BenchmarkChangelog />
        </div>
      </div>
    </section>
  );
}
