import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import BenchmarkHero from "@/components/benchmarks/BenchmarkHero";
import BenchmarkStats from "@/components/benchmarks/BenchmarkStats";
import BenchmarkMethodology from "@/components/benchmarks/BenchmarkMethodology";
import BenchmarkTasks from "@/components/benchmarks/BenchmarkTasks";
import BenchmarkCaveats from "@/components/benchmarks/BenchmarkCaveats";
import BenchmarkCTA from "@/components/benchmarks/BenchmarkCTA";

export const metadata: Metadata = {
  title: "Benchmark: /prompt vs. raw agent exploration — Aether",
  description:
    "5 real, already-merged axios bugs. Same model, same repo — one run got a plain bug report, the other got /prompt's optimized briefing. Here's what it cost.",
};

export default function BenchmarksPage() {
  return (
    <main>
      <Navbar />
      <BenchmarkHero />
      <BenchmarkStats />
      <BenchmarkMethodology />
      <BenchmarkTasks />
      <BenchmarkCaveats />
      <BenchmarkCTA />
      <Footer />
    </main>
  );
}
