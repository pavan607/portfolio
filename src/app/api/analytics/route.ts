import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  let path = "/";
  try {
    const body = (await req.json()) as { path?: unknown };
    if (typeof body.path === "string" && body.path.length < 500) path = body.path;
  } catch {
    /* ignore */
  }

  await prisma.pageView.create({ data: { path } });
  return NextResponse.json({ ok: true });
}
