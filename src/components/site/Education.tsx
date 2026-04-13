"use client";

import { Section } from "./Section";

type Row = { id: string; degree: string; institution: string; period: string };

export function Education({
  education,
  careerNotes,
}: {
  education: Row[];
  careerNotes: { id: string; title: string; period: string; body: string }[];
}) {
  return (
    <Section id="education" title="Education & career" subtitle="Academic background and continuous learning.">
      <div className="space-y-8">
        <div className="space-y-6">
          {education.map((e) => (
            <div key={e.id} className="rounded-xl border border-slate-200/80 bg-card p-5 dark:border-slate-800/80">
              <p className="font-medium text-foreground">{e.degree}</p>
              <p className="mt-1 text-sm text-muted">{e.institution}</p>
              <p className="mt-1 text-xs text-muted">{e.period}</p>
            </div>
          ))}
        </div>
        {careerNotes.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Career break</h3>
            <div className="mt-3 space-y-4">
              {careerNotes.map((n) => (
                <div key={n.id} className="rounded-xl border border-dashed border-slate-300 p-5 dark:border-slate-600">
                  <p className="font-medium text-foreground">{n.title}</p>
                  <p className="text-xs text-muted">{n.period}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{n.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
