"use client";

import { Section } from "./Section";

export function Achievements({ items }: { items: { id: string; text: string }[] }) {
  return (
    <Section id="achievements" title="Key achievements" subtitle="Impact across defence labs and enterprise delivery.">
      <ul className="space-y-3">
        {items.map((a) => (
          <li
            key={a.id}
            className="flex gap-3 rounded-xl border border-slate-200/80 bg-card px-4 py-3 text-sm leading-relaxed text-muted dark:border-slate-800/80"
          >
            <span className="mt-0.5 text-accent">✓</span>
            <span>{a.text.replace(/\*\*/g, "")}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
