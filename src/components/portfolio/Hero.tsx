import { motion } from "motion/react";
import { Download, ArrowRight, Sparkles } from "lucide-react";
import avatar from "@/assets/avatar.jpg";

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      {/* animated blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-blob absolute -left-20 top-20 h-72 w-72 rounded-full bg-[var(--neon-pink)] opacity-40 blur-3xl" />
        <div className="animate-blob absolute right-0 top-40 h-80 w-80 rounded-full bg-[var(--neon-cyan)] opacity-30 blur-3xl [animation-delay:-6s]" />
        <div className="animate-blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[var(--neon-yellow)] opacity-30 blur-3xl [animation-delay:-12s]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 md:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5 text-[var(--neon-yellow)]" />
            Available for new projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
          >
            Hi, I'm <span className="text-gradient">Mustafeez Raza</span>
            <br />
            <span className="text-sun">Software Developer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Software Developer with 1.5+ years of experience building scalable,
            user-friendly web apps with React, Angular, Next.js and Node.js.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.03]"
            >
              <Download className="h-4 w-4 transition group-hover:translate-y-0.5" />
              Download Resume
            </a>
            <a
              href="#projects"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <div className="mt-10 flex gap-8 text-sm">
            {[
              { k: "1.5+", v: "Years" },
              { k: "3+", v: "Projects" },
              { k: "2", v: "Companies" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-gradient text-2xl font-bold">{s.k}</div>
                <div className="text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-sm"
        >
          <div className="bg-aurora animate-spin-slow absolute inset-0 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-90 blur-md" />
          <div className="animate-float absolute inset-3 overflow-hidden rounded-[40%_60%_70%_30%/40%_50%_60%_50%] shadow-glow">
            <img
              src={avatar}
              alt="Mustafeez Raza"
              width={768}
              height={768}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="glass animate-float absolute -bottom-2 -left-2 rounded-2xl px-4 py-2 text-xs font-mono [animation-delay:-3s]">
            <span className="text-[var(--neon-lime)]">{"</>"}</span> shipping daily
          </div>
        </motion.div>
      </div>
    </section>
  );
}