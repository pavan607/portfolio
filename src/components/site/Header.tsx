"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";
import { motion } from "framer-motion";

const nav = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-background/80 backdrop-blur-md dark:border-slate-800/80"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="#hero" className="font-semibold tracking-tight text-foreground">
          Pavan Kumar
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-1.5 text-sm text-muted transition hover:bg-slate-200/60 hover:text-foreground dark:hover:bg-slate-800/80"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/resume.pdf"
            className="ml-2 rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground transition hover:opacity-90"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-foreground transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            aria-label="Toggle color theme"
            suppressHydrationWarning
          >
            <span suppressHydrationWarning>{resolvedTheme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-200 px-2 py-1 text-sm md:hidden dark:border-slate-700"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-800 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/resume.pdf"
              className="rounded-lg px-2 py-2 text-sm font-medium text-accent"
              target="_blank"
              onClick={() => setOpen(false)}
            >
              Resume PDF
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}
