import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";
import HowItWorks from "@/components/how-it-works/HowItWorks";
import QuickStart from "@/components/quickstart/QuickStart";
import Roadmap from "@/components/roadmap/Roadmap";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <QuickStart />
      <Roadmap />
      <Footer />
    </main>
  );
}
