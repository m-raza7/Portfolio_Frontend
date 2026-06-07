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
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const API_URL = import.meta.env.VITE_API_URL;

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

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
      setForm((f) => ({
        ...f,
        [k]: e.target.value,
      }));

      if (errors[k]) {
        setErrors((prev) => ({
          ...prev,
          [k]: undefined,
        }));
      }
    };

  // const onSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const v = validate(form);
  //   setErrors(v);

  //   if (Object.keys(v).length > 0) {
  //     toast.error("Please fix the highlighted fields.");
  //     return;
  //   }

  //   if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
  //     toast.error("EmailJS is not configured");
  //     return;
  //   }

  //   // if (!SERVICE_ID) {
  //   //   console.log(SERVICE_ID);
  //   //   toast.error("Missing EmailJS Service ID");
  //   //   return;
  //   // }

  //   // if (!TEMPLATE_ID) {
  //   //   console.log(TEMPLATE_ID);

  //   //   toast.error("Missing EmailJS Template ID");
  //   //   return;
  //   // }

  //   // if (!PUBLIC_KEY) {
  //   //   console.log(PUBLIC_KEY);
  //   //   toast.error("Missing EmailJS Public Key");
  //   //   return;
  //   // }

  //   setLoading(true);

  //   // try {
  //   //   await emailjs.send(
  //   //     SERVICE_ID,
  //   //     TEMPLATE_ID,
  //   //     {
  //   //       from_name: form.name,
  //   //       from_email: form.email,
  //   //       subject: form.subject,
  //   //       message: form.message,
  //   //       reply_to: form.email,
  //   //     },
  //   //     {
  //   //       publicKey: PUBLIC_KEY,
  //   //     },
  //   //   );

  //   //   toast.success("Message sent successfully!");
  //   //   setForm(initial);
  //   // } catch (err) {
  //   //   console.error(err);
  //   //   toast.error("Failed to send. Please try again.");
  //   // } finally {
  //   //   setLoading(false);
  //   // }
  //   const onSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();

  //     const v = validate(form);
  //     setErrors(v);

  //     if (Object.keys(v).length > 0) {
  //       toast.error("Please fix the highlighted fields.");
  //       return;
  //     }

  //     setLoading(true);

  //     try {
  //       // 1. Save to MongoDB via Express API
  //       const response = await fetch("http://localhost:5000/api/contact", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(form),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to save contact");
  //       }

  //       // 2. Send EmailJS notification (optional)
  //       if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
  //         await emailjs.send(
  //           SERVICE_ID,
  //           TEMPLATE_ID,
  //           {
  //             from_name: form.name,
  //             from_email: form.email,
  //             subject: form.subject,
  //             message: form.message,
  //             reply_to: form.email,
  //           },
  //           {
  //             publicKey: PUBLIC_KEY,
  //           },
  //         );
  //       }

  //       toast.success("Message sent successfully!");
  //       setForm(initial);
  //     } catch (error) {
  //       console.error(error);
  //       toast.error("Failed to send message");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  // };

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
      // 1. Save to MongoDB via Express API
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to save contact");
      }

      // 2. Send EmailJS notification (optional)
      if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
            reply_to: form.email,
          },
          {
            publicKey: PUBLIC_KEY,
          },
        );
      }

      toast.success("Message sent successfully!");
      setForm(initial);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
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
              placeholder="Enter your name"
              disabled={loading}
            />

            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={onChange("email")}
              error={errors.email}
              placeholder="you@domain.com"
              disabled={loading}
            />
          </div>

          <Field
            label="Subject"
            value={form.subject}
            onChange={onChange("subject")}
            error={errors.subject}
            placeholder="Project / role / collab"
            disabled={loading}
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
              disabled={loading}
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
