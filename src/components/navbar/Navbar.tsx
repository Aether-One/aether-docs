"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <Logo
            width={36}
            height={36}
            className="group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.4)] transition-all duration-300"
          />
          <span className="text-foreground/90 font-semibold text-sm tracking-tight">
            Aether
          </span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[13px] text-muted hover:text-foreground transition-colors duration-200">
            Features
          </a>
          <a href="#how-it-works" className="text-[13px] text-muted hover:text-foreground transition-colors duration-200">
            How it works
          </a>
          <a href="#roadmap" className="text-[13px] text-muted hover:text-foreground transition-colors duration-200">
            Roadmap
          </a>
          <a href="/docs" className="text-[13px] text-muted hover:text-foreground transition-colors duration-200">
            Docs
          </a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://github.com/aether-one/aether"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors duration-200 hidden sm:block"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a
            href="/docs/getting-started"
            className="px-4 py-1.5 rounded-full text-[13px] font-medium bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 hover:border-accent/30 transition-all duration-200"
          >
            Get Started
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
