"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle, useTheme } from "@/components/theme";
import SearchDialog from "@/components/docs/SearchDialog";

export default function DocsHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <>
      <header
        className="sticky top-0 z-50 backdrop-blur-xl border-b"
        style={{ background: "color-mix(in srgb, var(--docs-bg) 80%, transparent)", borderColor: "var(--docs-border)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={theme === "dark" ? "/topbar_logo_dark.png" : "/topbar_logo_light.png"}
                alt="Aether"
                className="h-7 w-auto"
              />
            </Link>
            <span style={{ color: "var(--docs-border)" }} className="mx-2">/</span>
            <span className="text-sm" style={{ color: "var(--muted)" }}>docs</span>
          </div>

          {/* Search button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm cursor-pointer transition-colors hover:border-[var(--muted)]"
            style={{
              color: "var(--muted)",
              borderColor: "var(--docs-border)",
              background: "var(--docs-code-bg)",
            }}
            aria-label="Search documentation"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <span>Search docs...</span>
            <kbd
              className="ml-2 px-1.5 py-0.5 rounded text-xs font-medium border"
              style={{
                borderColor: "var(--docs-border)",
                background: "var(--docs-bg)",
                color: "var(--muted)",
              }}
            >
              Ctrl K
            </kbd>
          </button>

          {/* Mobile search button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="sm:hidden p-2 rounded-lg transition-colors"
            style={{ color: "var(--muted)" }}
            aria-label="Search documentation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href="https://github.com/aether-one/aether"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "var(--muted)" }}
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
