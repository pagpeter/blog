export default function Footer({ copyrightText }) {
  return (
    <footer className="mt-24 flex items-center justify-between border-t border-faint pt-6 text-xs text-muted">
      <p>{copyrightText}</p>
      <nav className="flex flex-wrap gap-4">
        <a
          href="https://peet.ws"
          className="hover:text-fg"
          target="_blank"
          rel="noreferrer"
        >
          [peet.ws]
        </a>
        <a
          href="https://github.com/pagpeter"
          className="hover:text-fg"
          target="_blank"
          rel="noreferrer"
        >
          [github]
        </a>
        <a
          href="https://twitter.com/peetistaken"
          className="hover:text-fg"
          target="_blank"
          rel="noreferrer"
        >
          [twitter]
        </a>
        <a
          href="https://www.linkedin.com/in/ppagenstedt/"
          className="hover:text-fg"
          target="_blank"
          rel="noreferrer"
        >
          [linkedin]
        </a>
      </nav>
    </footer>
  );
}
