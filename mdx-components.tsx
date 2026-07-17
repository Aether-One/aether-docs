import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 mt-2" style={{ color: "var(--docs-heading)" }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl md:text-2xl font-semibold mb-4 mt-10 pb-2 border-b" style={{ color: "var(--docs-heading)", borderColor: "var(--docs-border)" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-medium mb-3 mt-6" style={{ color: "var(--docs-heading)" }}>
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="leading-7 mb-4" style={{ color: "var(--docs-text)" }}>
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold" style={{ color: "var(--docs-heading)" }}>
        {children}
      </strong>
    ),
    code: ({ children }) => (
      <code
        className="px-1.5 py-0.5 rounded text-[13px] font-mono"
        style={{
          background: "var(--docs-code-bg)",
          color: "var(--docs-link)",
        }}
      >
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre
        className="rounded-lg p-4 overflow-x-auto mb-6 text-[13px] leading-6 font-mono border"
        style={{
          background: "var(--docs-code-bg)",
          borderColor: "var(--docs-border)",
          color: "var(--docs-text)",
        }}
      >
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="underline underline-offset-4 transition-colors duration-200 hover:opacity-80"
        style={{ color: "var(--docs-link)" }}
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: "var(--docs-text)" }}>
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2" style={{ color: "var(--docs-text)" }}>
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-7">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="pl-4 italic mb-4 border-l-2"
        style={{
          borderColor: "var(--accent)",
          color: "var(--muted)",
        }}
      >
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6 rounded-lg border" style={{ borderColor: "var(--docs-border)" }}>
        <table className="w-full text-sm" style={{ color: "var(--docs-text)" }}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead style={{ background: "var(--docs-code-bg)" }}>
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody>{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="border-b" style={{ borderColor: "var(--docs-border)" }}>
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th
        className="text-left px-4 py-2.5 font-semibold text-[13px]"
        style={{ color: "var(--docs-heading)" }}
      >
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2.5 text-[13px]">
        {children}
      </td>
    ),
    hr: () => (
      <hr className="my-8" style={{ borderColor: "var(--docs-border)" }} />
    ),
    ...components,
  };
}
