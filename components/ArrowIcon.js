export default function ArrowIcon({ className = '', direction = 'right' }) {
  const glyph = direction === 'left' ? '←' : '→';
  return <span className={className}>{glyph}</span>;
}
