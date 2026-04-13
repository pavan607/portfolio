import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AnalyticsTracker } from "@/components/site/AnalyticsTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Y Pavan Kumar — Full-Stack Software Engineer",
    template: "%s | Y Pavan Kumar",
  },
  description:
    "Full-stack engineer building scalable web apps and industrial monitoring — Python, Django, React, Next.js, TypeScript, PostgreSQL.",
  openGraph: {
    title: "Y Pavan Kumar — Full-Stack Software Engineer",
    description: "Portfolio and resume — Hyderabad, India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <ThemeProvider>
          <AnalyticsTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
