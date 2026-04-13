"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Section } from "./Section";

export function Contact({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: from, subject: subject || undefined, message }),
      });
      let data: {
        error?: string;
        code?: string;
        issues?: { fieldErrors?: Record<string, string[] | undefined> };
      };
      try {
        data = (await res.json()) as typeof data;
      } catch {
        setStatus("err");
        setErrMsg(`Request failed (${res.status}). Check the terminal or Network tab.`);
        return;
      }
      if (!res.ok) {
        setStatus("err");
        const fe = data.issues?.fieldErrors;
        const fromFields =
          fe &&
          (["name", "email", "message", "subject"] as const)
            .map((k) => fe[k]?.[0])
            .find(Boolean);
        setErrMsg(
          data.error ??
            fromFields ??
            (res.status >= 500
              ? "Server error — is PostgreSQL running and did you run npx prisma db push?"
              : "Something went wrong."),
        );
        return;
      }
      setStatus("ok");
      setName("");
      setFrom("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("err");
      setErrMsg("Network error. Try again.");
    }
  }

  function touchForm() {
    if (status === "ok") setStatus("idle");
  }

  return (
    <Section
      id="contact"
      title="Contact"
      subtitle={`Messages are stored securely. Prefer email? ${email}`}
    >
      <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4">
        <AnimatePresence mode="wait">
          {status === "ok" && (
            <motion.div
              key="success"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-2 rounded-2xl border border-emerald-300/80 bg-emerald-50 px-4 py-3 text-emerald-950 shadow-sm dark:border-emerald-700/80 dark:bg-emerald-950/35 dark:text-emerald-50"
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white dark:bg-emerald-500"
                  aria-hidden
                >
                  ✓
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-emerald-950 dark:text-emerald-100">Message sent successfully</p>
                  <p className="mt-0.5 text-sm text-emerald-900/90 dark:text-emerald-100/85">
                    Thanks for reaching out. Your message has been saved and we&apos;ll get back to you soon.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-emerald-800 underline-offset-2 hover:underline dark:text-emerald-200"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-muted">Name</span>
            <input
              required
              value={name}
              onChange={(e) => {
                touchForm();
                setName(e.target.value);
              }}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-card px-3 py-2 text-foreground outline-none ring-ring focus:ring-2 dark:border-slate-700"
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted">Email</span>
            <input
              required
              type="email"
              value={from}
              onChange={(e) => {
                touchForm();
                setFrom(e.target.value);
              }}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-card px-3 py-2 text-foreground outline-none ring-ring focus:ring-2 dark:border-slate-700"
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="text-muted">Subject (optional)</span>
          <input
            value={subject}
            onChange={(e) => {
              touchForm();
              setSubject(e.target.value);
            }}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-card px-3 py-2 text-foreground outline-none ring-ring focus:ring-2 dark:border-slate-700"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Message</span>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => {
              touchForm();
              setMessage(e.target.value);
            }}
            className="mt-1 w-full resize-y rounded-xl border border-slate-200 bg-card px-3 py-2 text-foreground outline-none ring-ring focus:ring-2 dark:border-slate-700"
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition enabled:hover:opacity-90 disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Send message"}
          </button>
          {status === "err" && (
            <span className="text-sm text-red-600 dark:text-red-400" role="alert">
              {errMsg}
            </span>
          )}
        </div>
      </form>
    </Section>
  );
}
