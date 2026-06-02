import { motion } from "motion/react";
import { Section } from "./Section";

const skills = [
  { name: "HTML / CSS / JavaScript", level: 95, color: "var(--neon-cyan)" },
  { name: "TypeScript", level: 85, color: "var(--neon-violet)" },
  { name: "React.js / Next.js", level: 90, color: "var(--neon-pink)" },
  { name: "Angular", level: 80, color: "var(--neon-pink)" },
  { name: "Node.js / Express.js", level: 82, color: "var(--neon-lime)" },
  { name: "MongoDB / MySQL", level: 78, color: "var(--neon-yellow)" },
  { name: "Figma / Adobe XD / Illustrator", level: 85, color: "var(--neon-cyan)" },
  { name: "Git / Docker / VS Code", level: 80, color: "var(--neon-violet)" },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>Tools of the <span className="text-sun">trade</span></>}
      subtitle="My everyday stack — strong fundamentals, modern tooling."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass rounded-2xl p-5"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">{s.name}</span>
              <span className="font-mono text-xs text-muted-foreground">{s.level}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${s.color}, var(--neon-pink))`,
                  boxShadow: `0 0 20px ${s.color}`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}