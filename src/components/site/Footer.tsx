import Link from "next/link";

export function Footer({ githubUrl, linkedinUrl }: { githubUrl: string | null; linkedinUrl: string | null }) {
  return (
    <footer className="border-t border-slate-200/80 py-10 dark:border-slate-800/80">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} Y Pavan Kumar. Built with Next.js & Prisma.</p>
        <div className="flex gap-4">
          {githubUrl && (
            <Link href={githubUrl} className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          )}
          {linkedinUrl && (
            <Link href={linkedinUrl} className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Link>
          )}
          <Link href="/admin/login" className="hover:text-foreground">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
