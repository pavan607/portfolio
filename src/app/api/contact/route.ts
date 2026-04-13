import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

/** Prisma requires Node.js; Edge would fail to connect. */
export const runtime = "nodejs";

const bodySchema = z
  .object({
    name: z.string().trim().min(1, "Enter your name").max(120),
    email: z.string().trim().min(1, "Enter your email").max(254).email("Enter a valid email address"),
    subject: z.string().trim().max(200).optional(),
    message: z.string().trim().min(1, "Enter a message").max(8000),
  })
  .transform((data) => ({
    ...data,
    subject: data.subject && data.subject.length > 0 ? data.subject : undefined,
  }));

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    const first =
      flat.fieldErrors.name?.[0] ??
      flat.fieldErrors.email?.[0] ??
      flat.fieldErrors.message?.[0] ??
      flat.fieldErrors.subject?.[0] ??
      flat.formErrors[0] ??
      "Check your input and try again.";
    return NextResponse.json({ error: first, issues: flat }, { status: 400 });
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const row = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject ?? null,
        message,
      },
    });
    if (process.env.NODE_ENV === "development") {
      console.log("[api/contact] saved", row.id);
    }
  } catch (err) {
    console.error("[api/contact] save failed:", err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? `[${err.code}] ${err.message}`
              : "Could not save your message. The database may be unavailable or not set up.",
          code: err.code,
        },
        { status: 503 },
      );
    }

    if (err instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? err.message
              : "Cannot connect to the database. Check DATABASE_URL in .env and run: npx prisma db push",
          code: "INIT",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development" && err instanceof Error
            ? err.message
            : "Could not save your message. Please try again later.",
        code: "UNKNOWN",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
