import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Receives contact / interest / funding form submissions and forwards them to
 * the endpoint in FORM_ENDPOINT (Formspree or a Google Form / Apps Script URL).
 * No database. When FORM_ENDPOINT is empty in development, submissions are
 * logged to the server console instead.
 */
const payload = z
  .object({
    form: z.enum(["contact", "interest", "funding"]),
    website: z.string().optional(), // honeypot: anything non-empty is a bot
  })
  .passthrough();

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = payload.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
  // Bots that fill the honeypot get a quiet 200.
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const endpoint = process.env.FORM_ENDPOINT;
  const data = { ...parsed.data, submittedAt: new Date().toISOString() };

  if (!endpoint) {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "[form submission — FORM_ENDPOINT not set]",
        JSON.stringify(data, null, 2),
      );
      return NextResponse.json({ ok: true, dev: true });
    }
    return NextResponse.json(
      {
        error:
          "The form is not configured yet. Please email sgarv@montgomerycollege.edu.",
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "The form service rejected the submission." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the form service." },
      { status: 502 },
    );
  }
}
