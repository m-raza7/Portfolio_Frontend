export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Mustafeez Raza — Crafted with color & care.</p>
        <p className="font-mono text-xs">built with React + Vite + TanStack</p>
      </div>
    </footer>
  );
}