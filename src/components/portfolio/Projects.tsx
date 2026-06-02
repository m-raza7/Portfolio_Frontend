import { motion } from "motion/react";
import { Section } from "./Section";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Brightspeed",
    desc: "Designed and developed modern web interfaces focused on billing and invoice management with responsive layouts and intuitive workflows.",
    tags: ["React", "UI/UX", "Responsive"],
    href: "https://www.brightspeed.com",
    gradient: "linear-gradient(135deg, oklch(0.72 0.25 340), oklch(0.62 0.25 295))",
  },
  {
    title: "Codesoul Solutions",
    desc: "Created intuitive and visually appealing UIs for multiple web applications, improving usability and responsiveness across the board.",
    tags: ["Next.js", "Figma", "Frontend"],
    href: "https://www.codesoul.solutions",
    gradient: "linear-gradient(135deg, oklch(0.82 0.18 200), oklch(0.85 0.22 140))",
  },
  {
    title: "HICKOKU",
    desc: "Built responsive and scalable web applications as Frontend Developer — developed reusable components and integrated features efficiently.",
    tags: ["React", "Components", "Scalable"],
    href: "https://www.hickoku.com",
    gradient: "linear-gradient(135deg, oklch(0.9 0.2 95), oklch(0.72 0.25 340))",
  },
];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title={<>Selected <span className="text-gradient">work</span></>}
      subtitle="A few products I've designed and built end-to-end."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -8 }}
            className="glass group relative overflow-hidden rounded-3xl p-1"
          >
            <div
              className="relative h-44 overflow-hidden rounded-[20px]"
              style={{ background: p.gradient }}
            >
              <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:18px_18px]" />
              <div className="absolute bottom-3 left-4 font-mono text-xs text-white/80">
                0{i + 1} / 0{projects.length}
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <div className="flex gap-2 text-muted-foreground">
                  <a href={p.href} target="_blank" rel="noreferrer" aria-label="Live" className="transition hover:text-foreground"><ExternalLink className="h-4 w-4" /></a>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}