"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { searchData, SearchItem } from "@/lib/search-data";

function fuzzyMatch(query: string, text: string): boolean {
  const lowerQuery = query.toLowerCase();
  const lowerText = text.toLowerCase();

  // Direct substring match
  if (lowerText.includes(lowerQuery)) return true;

  // Simple fuzzy: all characters in query appear in order in text
  let qi = 0;
  for (let ti = 0; ti < lowerText.length && qi < lowerQuery.length; ti++) {
    if (lowerText[ti] === lowerQuery[qi]) qi++;
  }
  return qi === lowerQuery.length;
}

function searchItems(query: string): SearchItem[] {
  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase().trim();

  return searchData
    .map((item) => {
      let score = 0;

      // Title exact match (highest priority)
      if (item.title.toLowerCase().includes(normalizedQuery)) score += 10;
      // Keyword match
      if (item.keywords.some((kw) => kw.toLowerCase().includes(normalizedQuery))) score += 7;
      // Description match
      if (item.description.toLowerCase().includes(normalizedQuery)) score += 5;
      // Fuzzy title match
      if (fuzzyMatch(normalizedQuery, item.title)) score += 3;
      // Fuzzy description match
      if (fuzzyMatch(normalizedQuery, item.description)) score += 1;

      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}

function groupByCategory(items: SearchItem[]): Record<string, SearchItem[]> {
  const groups: Record<string, SearchItem[]> = {};
  for (const item of items) {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
  }
  return groups;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = searchItems(query);
  const grouped = groupByCategory(results);

  const closeDialog = useCallback(() => {
    onOpenChange(false);
    setQuery("");
    setActiveIndex(0);
  }, [onOpenChange]);

  const navigateTo = useCallback(
    (href: string) => {
      closeDialog();
      router.push(href);
    },
    [closeDialog, router]
  );

  // Global keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
        if (!open) {
          setQuery("");
          setActiveIndex(0);
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // Keyboard navigation within dialog
  function handleDialogKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeDialog();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIndex]) {
        navigateTo(results[activeIndex].href);
      }
    }
  }

  // Scroll active item into view
  useEffect(() => {
    if (resultsRef.current) {
      const activeEl = resultsRef.current.querySelector(`[data-index="${activeIndex}"]`);
      activeEl?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
      onClick={closeDialog}
    >
      <div
        className="w-full max-w-lg mx-4 rounded-xl border shadow-2xl overflow-hidden"
        style={{
          background: "var(--docs-bg)",
          borderColor: "var(--docs-border)",
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleDialogKeyDown}
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "var(--docs-border)" }}>
          <svg
            className="w-5 h-5 shrink-0"
            style={{ color: "var(--muted)" }}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "var(--docs-text)" }}
            aria-label="Search documentation"
          />
          <kbd
            className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium border"
            style={{
              color: "var(--muted)",
              borderColor: "var(--docs-border)",
              background: "var(--docs-code-bg)",
            }}
          >
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div
          ref={resultsRef}
          className="max-h-[60vh] overflow-y-auto p-2"
          role="listbox"
        >
          {query.trim() === "" && (
            <div className="px-3 py-8 text-center text-sm" style={{ color: "var(--muted)" }}>
              Start typing to search documentation...
            </div>
          )}

          {query.trim() !== "" && results.length === 0 && (
            <div className="px-3 py-8 text-center text-sm" style={{ color: "var(--muted)" }}>
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}

          {Object.entries(grouped).map(([category, items]) => {
            return (
              <div key={category} className="mb-2">
                <div
                  className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--muted)" }}
                >
                  {category}
                </div>
                {items.map((item) => {
                  const flatIndex = results.indexOf(item);
                  const isActive = flatIndex === activeIndex;
                  return (
                    <button
                      key={item.href}
                      data-index={flatIndex}
                      className="w-full text-left px-3 py-2.5 rounded-lg flex flex-col gap-0.5 cursor-pointer transition-colors"
                      style={{
                        background: isActive ? "var(--docs-code-bg)" : "transparent",
                      }}
                      onClick={() => navigateTo(item.href)}
                      onMouseEnter={() => setActiveIndex(flatIndex)}
                      role="option"
                      aria-selected={isActive}
                    >
                      <span className="text-sm font-medium" style={{ color: "var(--docs-heading)" }}>
                        {item.title}
                      </span>
                      <span className="text-xs line-clamp-1" style={{ color: "var(--muted)" }}>
                        {item.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div
            className="flex items-center gap-4 px-4 py-2.5 border-t text-xs"
            style={{ borderColor: "var(--docs-border)", color: "var(--muted)" }}
          >
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded border text-[10px]" style={{ borderColor: "var(--docs-border)", background: "var(--docs-code-bg)" }}>↑</kbd>
              <kbd className="px-1 py-0.5 rounded border text-[10px]" style={{ borderColor: "var(--docs-border)", background: "var(--docs-code-bg)" }}>↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded border text-[10px]" style={{ borderColor: "var(--docs-border)", background: "var(--docs-code-bg)" }}>↵</kbd>
              select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded border text-[10px]" style={{ borderColor: "var(--docs-border)", background: "var(--docs-code-bg)" }}>esc</kbd>
              close
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
