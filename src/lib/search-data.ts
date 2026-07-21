export interface SearchItem {
  title: string;
  description: string;
  href: string;
  category: string;
  keywords: string[];
}

export const searchData: SearchItem[] = [
  // Getting Started
  { title: "Introduction", description: "Welcome to Aether — transform any codebase into an AI-native workspace", href: "/docs", category: "Getting Started", keywords: ["welcome", "about", "overview", "what is aether"] },
  { title: "Installation", description: "Download and install Aether on macOS, Linux, or Windows", href: "/docs/getting-started", category: "Getting Started", keywords: ["install", "setup", "download", "binary", "powershell", "curl"] },
  // CLI Reference
  { title: "CLI Overview", description: "Usage, flags, and interactive commands reference", href: "/docs/cli-reference", category: "CLI Reference", keywords: ["commands", "flags", "usage", "help", "cli"] },
  { title: "/config", description: "Configure your AI provider and model", href: "/docs/cli-reference/config", category: "CLI Reference", keywords: ["config", "provider", "openai", "anthropic", "gemini", "openrouter", "api key", "model"] },
  { title: "/genesis", description: "Analyze your project and generate documentation", href: "/docs/cli-reference/genesis", category: "CLI Reference", keywords: ["genesis", "analyze", "generate", "docs", "scan", "documentation", "budget"] },
  { title: "/sync", description: "Update existing docs incrementally after code changes", href: "/docs/cli-reference/sync", category: "CLI Reference", keywords: ["sync", "update", "incremental", "diff", "refresh", "patch"] },
  { title: "/clean", description: "Manage global data, caches, and project configs", href: "/docs/cli-reference/clean", category: "CLI Reference", keywords: ["clean", "cache", "delete", "remove", "global", "config"] },
  { title: "/exclude", description: "Manage paths excluded from scans to reduce cost and noise", href: "/docs/cli-reference/exclude", category: "CLI Reference", keywords: ["exclude", "ignore", "path", "filter", "cost", "reduce"] },
  { title: "/cleancode", description: "Scan the project for clean-code violations and write a report", href: "/docs/cli-reference/cleancode", category: "CLI Reference", keywords: ["cleancode", "clean code", "review", "lint", "solid", "heuristics", "paradigm"] },
  // Changelog
  { title: "Changelog", description: "All notable updates to Aether", href: "/docs/changelog", category: "Changelog", keywords: ["changelog", "releases", "updates", "versions"] },
  { title: "v0.1.11", description: "Clean Code, On Demand — new /cleancode command with hybrid heuristic + AI review", href: "/docs/changelog/v0.1.11", category: "Changelog", keywords: ["0.1.11", "cleancode", "clean code", "review", "hybrid"] },
  { title: "v0.1.10", description: "Never Leave a Doc Behind — resilient generation, retries empty responses", href: "/docs/changelog/v0.1.10", category: "Changelog", keywords: ["0.1.10", "empty", "retry", "resilient", "0-byte", "fix"] },
  { title: "v0.1.9", description: "Cost estimates, cancel mid-run, /exclude command, native Anthropic", href: "/docs/changelog/v0.1.9", category: "Changelog", keywords: ["0.1.9", "cost", "estimate", "cancel", "exclude", "anthropic"] },
  { title: "v0.1.4", description: "Sync, Clean & Global Config", href: "/docs/changelog/v0.1.4", category: "Changelog", keywords: ["0.1.4", "sync", "clean", "global config"] },
  { title: "v0.1.3", description: "Let the Whole Project In — expanded context budget", href: "/docs/changelog/v0.1.3", category: "Changelog", keywords: ["0.1.3", "context", "budget", "scan"] },
  { title: "v0.1.2", description: "Docs for Humans, Too — human guides generation", href: "/docs/changelog/v0.1.2", category: "Changelog", keywords: ["0.1.2", "guides", "human", "onboarding"] },
  { title: "v0.1.1", description: "Genesis First Steps — full genesis implementation", href: "/docs/changelog/v0.1.1", category: "Changelog", keywords: ["0.1.1", "genesis", "first"] },
  { title: "v0.1.0", description: "Initial Release — interactive terminal with commands", href: "/docs/changelog/v0.1.0", category: "Changelog", keywords: ["0.1.0", "initial", "release", "first"] },
  // Community
  { title: "Contributing", description: "How to contribute to Aether", href: "/docs/contributing", category: "Community", keywords: ["contribute", "contributing", "community", "pull request", "issues"] },
];
