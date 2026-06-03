import Link from 'next/link';

export default function Header({ name, tagline }) {
  return (
    <header className="mb-16">
      <h1 className="text-base font-medium text-fg">
        <Link href="/" className="hover:text-accent">
          <span className="text-muted">~/</span>
          {name.toLowerCase().replace(/\s+/g, '-')}
        </Link>
      </h1>
      {tagline && (
        <p className="mt-1 text-sm text-muted">{tagline}</p>
      )}
    </header>
  );
}
