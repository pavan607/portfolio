"use client";

import { Section } from "./Section";

type Item = {
  id: string;
  role: string;
  company: string;
  location: string | null;
  period: string;
  highlights: unknown;
};

export function Experience({ items }: { items: Item[] }) {
  return (
    <Section
      id="experience"
      title="Work experience"
      subtitle="Software Engineer at Techfluent Solutions — production systems for defence and enterprise clients."
    >
      <div className="space-y-10">
        {items.map((job) => {
          const bullets = Array.isArray(job.highlights) ? (job.highlights as string[]) : [];
          return (
            <article key={job.id} className="relative border-l-2 border-accent/40 pl-6">
              <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-accent" />
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-lg font-semibold text-foreground">{job.role}</h3>
                <span className="text-sm text-muted">· {job.company}</span>
              </div>
              <p className="mt-1 text-sm text-muted">
                {job.period}
                {job.location ? ` · ${job.location}` : ""}
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
                {bullets.map((b, i) => (
                  <li key={`${job.id}-${i}`}>{b.replace(/\*\*/g, "")}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
