import { motion } from "motion/react";
import { Section } from "./Section";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Download,
  Send,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
type Errors = Partial<Record<keyof FormState, string>>;

const initial: FormState = { name: "", email: "", subject: "", message: "" };

function validate(data: FormState): Errors {
  const e: Errors = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    e.name = "Name must be at least 2 characters";
  if (data.name.length > 100) e.name = "Name too long";
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(data.email.trim())) e.email = "Enter a valid email address";
  if (!data.subject.trim() || data.subject.trim().length < 2)
    e.subject = "Subject is required";
  if (data.subject.length > 200) e.subject = "Subject too long";
  if (!data.message.trim() || data.message.trim().length < 10)
    e.message = "Message must be at least 10 characters";
  if (data.message.length > 2000) e.message = "Message too long (max 2000)";
  return e;
}

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const onChange =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/contact`, form);
      toast.success(res.data?.message || "Message sent successfully!");
      setForm(initial);
    } catch (err: any) {
      const data = err?.response?.data;
      if (data?.errors) {
        const fieldErrors: Errors = {};
        Object.entries(data.errors).forEach(([k, v]) => {
          fieldErrors[k as keyof FormState] = Array.isArray(v)
            ? (v[0] as string)
            : String(v);
        });
        setErrors(fieldErrors);
      }
      toast.error(data?.message || "Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Let's <span className="text-gradient">build</span> something
        </>
      }
      subtitle="Have an idea or role in mind? I'd love to hear about it."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-2xl font-semibold">Get in touch</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            I usually reply within 24 hours.
          </p>
          <a
            href="mailto:mustafeezdominicraza@gmail.com"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-hero px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            <Mail className="h-4 w-4" />
            <span>mustafeezdominicraza@gmail.com</span>
          </a>
          <p className="mt-4 text-xs text-muted-foreground">
            📞 +91 7887988227 · 📍 Kamptee, Dist. Nagpur - 441001
          </p>
          <div className="mt-6 flex gap-3">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="glass grid h-11 w-11 place-items-center rounded-full transition hover:scale-110 hover:text-[var(--neon-cyan)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <a
            href="/resume.pdf"
            download
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold transition hover:bg-white/5"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Resume (PDF)</span>
          </a>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={onSubmit}
          noValidate
          className="glass space-y-4 rounded-3xl p-8"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Your name"
              value={form.name}
              onChange={onChange("name")}
              error={errors.name}
              placeholder="Ada Lovelace"
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={onChange("email")}
              error={errors.email}
              placeholder="you@domain.com"
            />
          </div>
          <Field
            label="Subject"
            value={form.subject}
            onChange={onChange("subject")}
            error={errors.subject}
            placeholder="Project / role / collab"
          />
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Message
            </label>
            <textarea
              rows={5}
              value={form.message}
              onChange={onChange("message")}
              placeholder="Tell me about your project..."
              className={`w-full resize-none rounded-2xl border bg-white/5 px-4 py-3 text-sm outline-none transition focus:bg-white/10 ${
                errors.message
                  ? "border-red-400 focus:border-red-400"
                  : "border-white/10 focus:border-[var(--neon-pink)]"
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-400">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send message</span>
                <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}

function Field({
  label,
  error,
  ...rest
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <input
        {...rest}
        className={`w-full rounded-2xl border bg-white/5 px-4 py-3 text-sm outline-none transition focus:bg-white/10 ${
          error
            ? "border-red-400 focus:border-red-400"
            : "border-white/10 focus:border-[var(--neon-pink)]"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
