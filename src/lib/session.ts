import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "portfolio_admin";

function getExpectedToken(): string {
  const secret = process.env.SESSION_SECRET ?? "dev-insecure-secret-change-me";
  const password = process.env.ADMIN_PASSWORD ?? "change-me-in-production";
  return createHmac("sha256", secret).update(`admin:${password}`).digest("hex");
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  const expected = getExpectedToken();
  try {
    const a = Buffer.from(token, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function getAdminSession(): Promise<boolean> {
  const store = await cookies();
  return verifyAdminToken(store.get(COOKIE_NAME)?.value);
}

export async function setAdminCookie(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, getExpectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
