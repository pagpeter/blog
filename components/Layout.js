export default function Layout({ children }) {
  return (
    <div className="min-h-screen px-6 py-12 sm:py-16">
      <div className="mx-auto flex w-full max-w-[680px] flex-col">
        {children}
      </div>
    </div>
  );
}
