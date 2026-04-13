import { NextResponse } from "next/server";
import { setAdminCookie } from "@/lib/session";

export async function POST(req: Request) {
  let password = "";
  try {
    const body = (await req.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const expected = (process.env.ADMIN_PASSWORD ?? "").trim();
  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await setAdminCookie();
  return NextResponse.json({ ok: true });
}
