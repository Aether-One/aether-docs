interface Author {
  github: string;
  name?: string;
}

interface AuthorsProps {
  authors: Author[];
}

/**
 * Byline shown at the top of each docs page. Pages can be updated by anyone,
 * so this credits whoever last touched the content — one author today,
 * but the `authors` array is ready for more than one.
 */
export default function Authors({ authors }: AuthorsProps) {
  if (authors.length === 0) return null;

  return (
    <div className="flex items-center gap-2 mb-8 -mt-2">
      <span className="text-xs uppercase tracking-wide" style={{ color: "var(--muted)" }}>
        {authors.length > 1 ? "Authors" : "Author"}
      </span>
      <div className="flex items-center gap-3">
        {authors.map((author) => (
          <a
            key={author.github}
            href={`https://github.com/${author.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-80"
            style={{ color: "var(--docs-link)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://github.com/${author.github}.png`}
              alt={author.name ?? author.github}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>{author.name ?? author.github}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
