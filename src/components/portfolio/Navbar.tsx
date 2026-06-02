import { useEffect, useState } from "react";
import { motion } from "motion/react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className={`mx-auto max-w-6xl px-4 ${scrolled ? "" : ""}`}>
        <div className={`glass flex items-center justify-between rounded-full px-5 py-3 ${scrolled ? "shadow-glow" : ""}`}>
          <a href="#home" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-hero font-bold text-primary-foreground shadow-glow">
              M
            </span>
            <span className="font-display text-sm font-semibold tracking-tight">mustafeez.dev</span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/resume.pdf"
            download
            className="hidden rounded-full bg-gradient-hero px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition hover:scale-105 md:inline-block"
          >
            Resume
          </a>
        </div>
      </div>
    </motion.nav>
  );
}