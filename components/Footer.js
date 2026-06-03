export default function Footer({ copyrightText }) {
  return (
    <footer className="mt-24 flex items-center justify-between border-t border-faint pt-6 text-xs text-muted">
      <p>{copyrightText}</p>
      <nav className="flex gap-4">
        <a
          href="https://github.com/pagpeter"
          className="hover:text-fg"
          target="_blank"
          rel="noreferrer"
        >
          [github]
        </a>
      </nav>
    </footer>
  );
}
