"use client";

import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="relative border-t border-border py-16 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Logo
              width={24}
              height={24}
              className="opacity-70"
            />
            <span className="text-sm text-muted">
              AI-native workspace for any codebase.
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-10 gap-y-3 text-[13px]">
            <a href="/docs" className="text-muted hover:text-foreground transition-colors">
              Docs
            </a>
            <a href="/docs/getting-started" className="text-muted hover:text-foreground transition-colors">
              Getting Started
            </a>
            <a href="/docs/cli-reference" className="text-muted hover:text-foreground transition-colors">
              CLI Reference
            </a>
            <a href="/docs/contributing" className="text-muted hover:text-foreground transition-colors">
              Contributing
            </a>
            <a
              href="https://github.com/aether-one/aether"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
          <span className="text-[11px] text-muted/60 font-mono tracking-wider">
            MIT License · {new Date().getFullYear()}
          </span>
          <span className="text-[11px] text-muted/30">
            ✦
          </span>
        </div>
      </div>
    </footer>
  );
}
