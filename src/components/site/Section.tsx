"use client";

import { motion } from "framer-motion";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function Section({ id, title, subtitle, children }: Props) {
  return (
    <section id={id} className="scroll-mt-20 border-b border-slate-200/80 py-16 dark:border-slate-800/80 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="mt-2 max-w-2xl text-muted">{subtitle}</p>}
        </motion.div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
