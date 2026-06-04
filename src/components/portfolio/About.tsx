import { motion } from "motion/react";
import { Section } from "./Section";
import {
  Code2,
  Rocket,
  Heart,
  Coffee,
  Users,
  ShieldCheck,
  Lightbulb,
} from "lucide-react";

const highlights = [
  {
    icon: Code2,
    color: "var(--neon-pink)",
    title: "Clean Code",
    desc: "Maintainable, tested, and documented.",
  },
  {
    icon: Rocket,
    color: "var(--neon-cyan)",
    title: "Performance",
    desc: "Fast loads, smooth 60fps interactions.",
  },
  {
    icon: Heart,
    color: "var(--neon-yellow)",
    title: "Design Eye",
    desc: "Color, type and motion done right.",
  },
  {
    icon: Coffee,
    color: "var(--neon-lime)",
    title: "Always Learning",
    desc: "Curious, kind, and collaborative.",
  },
  {
    icon: ShieldCheck,
    color: "var(--neon-violet)",
    title: "Best Practices",
    desc: "Scalable architecture, security, and code quality.",
  },
  {
    icon: Users,
    color: "var(--neon-cyan)",
    title: "Team Collaboration",
    desc: "Effective communication and seamless teamwork.",
  },
  {
    icon: Lightbulb,
    color: "var(--neon-yellow)",
    title: "Problem Solving",
    desc: "Turning complex challenges into simple, effective solutions.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          A bit <span className="text-gradient">about me</span>
        </>
      }
      subtitle="I'm a Software Developer based in Kamptee, Nagpur. I build scalable web apps, mentor students, and craft thoughtful UI/UX."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {highlights.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass group rounded-3xl p-6 transition"
          >
            <div
              className="mb-4 grid h-12 w-12 place-items-center rounded-2xl"
              style={{
                background: `color-mix(in oklab, ${h.color} 25%, transparent)`,
              }}
            >
              <h.icon className="h-6 w-6" style={{ color: h.color }} />
            </div>
            <h3 className="text-lg font-semibold">{h.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
