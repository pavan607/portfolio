"use client";

import { Section } from "./Section";

type Category = { id: string; name: string; skills: unknown };

export function Skills({ categories }: { categories: Category[] }) {
  return (
    <Section id="skills" title="Technical skills" subtitle="Languages, frameworks, databases, and tooling.">
      <div className="grid gap-6 sm:grid-cols-2">
        {categories.map((cat) => {
          const list = Array.isArray(cat.skills) ? (cat.skills as string[]) : [];
          return (
            <div
              key={cat.id}
              className="rounded-2xl border border-slate-200/80 bg-card p-5 shadow-sm dark:border-slate-800/80"
            >
              <h3 className="font-medium text-foreground">{cat.name}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {list.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-foreground dark:bg-slate-800"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
