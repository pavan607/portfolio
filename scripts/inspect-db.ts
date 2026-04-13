/**
 * Run from project root: npx tsx scripts/inspect-db.ts
 * Confirms which DATABASE_URL is used and how many ContactMessage rows exist.
 */
import { readFileSync } from "fs";
import { resolve } from "path";
import { PrismaClient } from "@prisma/client";

function loadDatabaseUrlFromEnvFile() {
  const p = resolve(process.cwd(), ".env");
  try {
    const text = readFileSync(p, "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const eq = trimmed.indexOf("=");
      const key = trimmed.slice(0, eq).trim();
      if (key !== "DATABASE_URL") continue;
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env.DATABASE_URL = val;
      return;
    }
  } catch {
    /* use process.env only */
  }
}

loadDatabaseUrlFromEnvFile();

function maskUrl(url: string) {
  try {
    const u = new URL(url);
    if (u.password) u.password = "****";
    return u.toString();
  } catch {
    return url.replace(/:([^:@/]+)@/, ":****@");
  }
}

async function main() {
  const url = process.env.DATABASE_URL ?? "";
  console.log("DATABASE_URL (masked):", url ? maskUrl(url) : "(missing)");
  if (!url) {
    console.error("Set DATABASE_URL in .env");
    process.exit(1);
  }

  const prisma = new PrismaClient();
  try {
    const count = await prisma.contactMessage.count();
    console.log('Table "ContactMessage" row count:', count);
    if (count > 0) {
      const rows = await prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, email: true, message: true, createdAt: true },
      });
      console.log("Latest rows:", JSON.stringify(rows, null, 2));
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
