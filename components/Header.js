import Link from 'next/link';

export default function Header({ name, tagline }) {
  return (
    <header className="mb-16 flex items-start justify-between">
      <div>
        <h1 className="text-base font-medium text-fg">
          <Link href="/" className="hover:text-accent">
            <span className="text-muted">~/</span>
            {name.toLowerCase().replace(/\s+/g, '-')}
          </Link>
        </h1>
        {tagline && (
          <p className="mt-1 text-sm text-muted">{tagline}</p>
        )}
      </div>
      <nav className="text-xs text-muted">
        <a
          href="https://peet.ws"
          className="hover:text-fg"
          target="_blank"
          rel="noreferrer"
        >
          [peet.ws]
        </a>
      </nav>
    </header>
  );
}
