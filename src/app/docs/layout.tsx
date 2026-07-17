import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsHeader from "@/components/docs/DocsHeader";

export const metadata = {
  title: "Documentation — Aether",
  description: "Learn how to use Aether to transform your codebase into an AI-native workspace.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ background: "var(--docs-bg)" }}>
      <DocsHeader />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-10">
        <DocsSidebar />
        <main className="flex-1 min-w-0 max-w-3xl">
          <article>{children}</article>
        </main>
      </div>
    </div>
  );
}
