"use client";

import { Section } from "./Section";

type Project = {
  id: string;
  title: string;
  client: string | null;
  description: string;
  highlights: unknown;
};

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <Section
      id="projects"
      title="Selected projects"
      subtitle="Web platforms, industrial monitoring, and desktop tooling."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => {
          const hl = Array.isArray(p.highlights) ? (p.highlights as string[]) : [];
          return (
            <article
              key={p.id}
              className="flex flex-col rounded-2xl border border-slate-200/80 bg-card p-5 shadow-sm transition hover:border-accent/40 dark:border-slate-800/80"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                {p.client && (
                  <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-muted dark:bg-slate-800">
                    {p.client}
                  </span>
                )}
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
              <ul className="mt-4 space-y-1 text-xs text-foreground/90">
                {hl.map((h) => (
                  <li key={h}>· {h}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
