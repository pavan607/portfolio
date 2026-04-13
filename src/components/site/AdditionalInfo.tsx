"use client";

import { Section } from "./Section";

export function AdditionalInfo({ rows }: { rows: { id: string; label: string; value: string }[] }) {
  return (
    <Section id="additional" title="Additional information" subtitle="Availability and preferences.">
      <dl className="grid gap-4 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.id} className="rounded-xl border border-slate-200/80 bg-card p-4 dark:border-slate-800/80">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">{r.label}</dt>
            <dd className="mt-1 text-sm text-foreground">{r.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
