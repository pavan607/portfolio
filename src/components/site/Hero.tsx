"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  name: string;
  title: string;
  email: string;
  location: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
};

export function Hero({ name, title, email, location, linkedinUrl, githubUrl }: Props) {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80">
      <div
        className="pointer-events-none absolute inset-0 opacity-90 dark:opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -20%, color-mix(in oklab, var(--accent) 28%, transparent), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm font-medium uppercase tracking-[0.2em] text-accent"
        >
          Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
        >
          {name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-3 max-w-2xl text-lg text-muted"
        >
          {title}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-6 flex flex-wrap gap-3 text-sm text-muted"
        >
          <a href={`mailto:${email}`} className="hover:text-foreground">
            {email}
          </a>
          {location && <span className="hidden sm:inline">·</span>}
          {location && <span>{location}</span>}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-sm transition hover:opacity-90"
          >
            Get in touch
          </Link>
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
          >
            Download resume
          </Link>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-transparent px-4 py-2.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              GitHub
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-transparent px-4 py-2.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              LinkedIn
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
