"use client";

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
      { title: "Commands", href: "/docs/cli-reference" },
    ],
  },
  {
    title: "Community",
    links: [
      { title: "Contributing", href: "/docs/contributing" },
    ],
  },
];

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <nav className="sticky top-20 space-y-6">
        {navigation.map((section) => (
          <div key={section.title}>
            <h4
              className="text-[11px] font-semibold mb-2 uppercase tracking-[0.15em]"
              style={{ color: "var(--docs-heading)" }}
            >
              {section.title}
            </h4>
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
                        borderLeft: isActive ? "2px solid var(--docs-active-border)" : "2px solid transparent",
                      }}
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

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
