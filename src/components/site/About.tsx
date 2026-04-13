"use client";

import { Section } from "./Section";

export function About({ summary }: { summary: string }) {
  return (
    <Section id="about" title="Professional summary" subtitle="What I build and how I deliver.">
      <p className="max-w-3xl leading-relaxed text-muted">{summary}</p>
    </Section>
  );
}
