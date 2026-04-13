import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

/** GET /api/health/db — verify Prisma can connect and count contact rows (open in browser while debugging). */
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const contactMessageCount = await prisma.contactMessage.count();
    return NextResponse.json({
      ok: true,
      contactMessageCount,
      hint: "If count stays 0 after submitting the form, check the Network tab for POST /api/contact and the terminal for errors.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        ok: false,
        error: message,
        hint: "Fix DATABASE_URL in .env, ensure PostgreSQL is running, create database portfolio, then: npx prisma db push",
      },
      { status: 503 },
    );
  }
}
