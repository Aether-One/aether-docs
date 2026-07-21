"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "Getting Started",
    links: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/getting-started" },
    ],
  },
  {
    title: "CLI Reference",
    links: [
      { title: "Overview", href: "/docs/cli-reference" },
      { title: "/config", href: "/docs/cli-reference/config" },
      { title: "/genesis", href: "/docs/cli-reference/genesis" },
      { title: "/sync", href: "/docs/cli-reference/sync" },
      { title: "/clean", href: "/docs/cli-reference/clean" },
      { title: "/exclude", href: "/docs/cli-reference/exclude" },
    ],
  },
  {
    title: "Changelog",
    links: [
      { title: "All Releases", href: "/docs/changelog" },
      { title: "v0.1.10", href: "/docs/changelog/v0.1.10" },
      { title: "v0.1.9", href: "/docs/changelog/v0.1.9" },
      { title: "v0.1.4", href: "/docs/changelog/v0.1.4" },
      { title: "v0.1.3", href: "/docs/changelog/v0.1.3" },
      { title: "v0.1.2", href: "/docs/changelog/v0.1.2" },
      { title: "v0.1.1", href: "/docs/changelog/v0.1.1" },
      { title: "v0.1.0", href: "/docs/changelog/v0.1.0" },
    ],
  },
  {
    title: "Community",
    links: [
      { title: "Contributing", href: "/docs/contributing" },
    ],
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-200"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
    >
      <path
        d="M4.5 2.5L8 6L4.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DocsSidebar() {
  const pathname = usePathname();

  const isChildActive = (links: { href: string }[]) =>
    links.some((link) => pathname === link.href);

  const isCollapsible = (section: (typeof navigation)[number]) =>
    section.links.length > 3;

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const section of navigation) {
      if (isCollapsible(section)) {
        initial[section.title] = isChildActive(section.links);
      }
    }
    return initial;
  });

  const toggleSection = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <nav className="sticky top-20 space-y-6">
        {navigation.map((section) => {
          const collapsible = isCollapsible(section);
          const childActive = isChildActive(section.links);
          const isOpen = collapsible ? expanded[section.title] || childActive : true;

          return (
            <div key={section.title}>
              {collapsible ? (
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center gap-1.5 w-full text-left text-[11px] font-semibold mb-2 uppercase tracking-[0.15em] cursor-pointer"
                  style={{ color: "var(--docs-heading)" }}
                  aria-expanded={isOpen}
                >
                  <ChevronIcon open={isOpen} />
                  {section.title}
                </button>
              ) : (
                <h4
                  className="text-[11px] font-semibold mb-2 uppercase tracking-[0.15em]"
                  style={{ color: "var(--docs-heading)" }}
                >
                  {section.title}
                </h4>
              )}
              {isOpen && (
                <ul className="space-y-0.5">
                  {section.links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block px-3 py-1.5 rounded-md text-sm transition-all duration-150"
                          style={{
                            color: isActive ? "var(--accent)" : "var(--muted)",
                            background: isActive ? "var(--docs-active)" : "transparent",
                            borderLeft: isActive
                              ? "2px solid var(--docs-active-border)"
                              : "2px solid transparent",
                          }}
                        >
                          {link.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}

        <div className="pt-4 border-t" style={{ borderColor: "var(--docs-border)" }}>
          <Link
            href="/"
            className="text-sm transition-colors duration-200"
            style={{ color: "var(--muted)" }}
          >
            ← Back to Home
          </Link>
        </div>
      </nav>
    </aside>
  );
}
