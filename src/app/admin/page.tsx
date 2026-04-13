import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { LogoutButton } from "./LogoutButton";

export default async function AdminDashboardPage() {
  if (!(await getAdminSession())) {
    redirect("/admin/login");
  }

  const [messages, viewCount] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.pageView.count(),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">Contact messages and site analytics.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm dark:border-slate-600"
          >
            View site
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-card p-5 dark:border-slate-800">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Page views (logged)</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">{viewCount}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-card p-5 dark:border-slate-800">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Messages</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">{messages.length}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">Recent messages</h2>
        <div className="mt-4 space-y-4">
          {messages.length === 0 && <p className="text-sm text-muted">No messages yet.</p>}
          {messages.map((m) => (
            <article
              key={m.id}
              className="rounded-xl border border-slate-200 bg-card p-4 text-sm dark:border-slate-800"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-medium text-foreground">{m.name}</span>
                <time className="text-xs text-muted" dateTime={m.createdAt.toISOString()}>
                  {m.createdAt.toLocaleString()}
                </time>
              </div>
              <p className="mt-1 text-muted">{m.email}</p>
              {m.subject && <p className="mt-2 text-foreground">Subject: {m.subject}</p>}
              <p className="mt-2 whitespace-pre-wrap leading-relaxed text-muted">{m.message}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
