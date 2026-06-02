import { motion } from "motion/react";
import { Section } from "./Section";
import { Briefcase } from "lucide-react";

const jobs = [
  {
    company: "S2P Edutech Pvt. Ltd.",
    role: "Software Developer & Teaching Assistant",
    points: [
      "Developing web applications and supporting students through technical training and mentorship.",
      "Collaborating on development projects while ensuring quality and performance standards.",
    ],
    color: "var(--neon-pink)",
  },
  {
    company: "Codesoul Solutions",
    role: "UI/UX Designer & Developer",
    points: [
      "Designed user-friendly interfaces and transformed designs into responsive web applications.",
      "Worked closely with design and development teams to enhance user experience.",
    ],
    color: "var(--neon-cyan)",
  },
];

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={<>Work <span className="text-gradient">history</span></>}
      subtitle="Roles where I've shipped products and grown as an engineer."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {jobs.map((j, i) => (
          <motion.div
            key={j.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-3xl p-6"
          >
            <div
              className="mb-4 grid h-12 w-12 place-items-center rounded-2xl"
              style={{ background: `color-mix(in oklab, ${j.color} 25%, transparent)` }}
            >
              <Briefcase className="h-6 w-6" style={{ color: j.color }} />
            </div>
            <h3 className="text-lg font-semibold">{j.company}</h3>
            <p className="text-sm text-[var(--neon-cyan)]">{j.role}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {j.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-[var(--neon-yellow)]">▹</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}