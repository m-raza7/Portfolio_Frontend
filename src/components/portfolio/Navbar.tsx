import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2 sm:py-3" : "py-3 sm:py-5"
        }`}
      >
        <div className="mx-auto max-w-6xl px-3 sm:px-4">
          <div
            className={`glass flex items-center justify-between rounded-full px-3 py-2 sm:px-5 sm:py-3 ${
              scrolled ? "shadow-glow" : ""
            }`}
          >
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-hero font-bold text-primary-foreground shadow-glow">
                M
              </span>

              <span className="font-display whitespace-nowrap text-sm font-semibold tracking-tight">
                mustafeez.dev
              </span>
            </a>

            {/* Desktop Menu */}
            <ul className="hidden items-center gap-1 md:flex">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop Resume */}
            <a
              href="/resume.pdf"
              download
              className="hidden rounded-full bg-gradient-hero px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition hover:scale-105 md:inline-block"
            >
              Resume
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-full p-2 transition hover:bg-white/10 md:hidden"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed left-3 right-3 top-20 z-50 rounded-3xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-3">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-center text-muted-foreground transition hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  href="/resume.pdf"
                  download
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 rounded-full bg-gradient-hero px-5 py-3 text-center text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02]"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
