// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { getResendClient, EMAIL_FROM, EMAIL_TO } from "@/lib/resend";
import {
  renderNotificationEmail,
  renderPlainText,
  encodeMimeSubject,
} from "@/lib/email/layout";

export const runtime = "nodejs";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  // Honeypot field: real users never fill this in (hidden off-screen in the form).
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const rateLimitHits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitHits.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ContactBody;

  // Honeypot: bots tend to fill in every field, real users never see this one.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json(
      { ok: false, error: "One or more fields are too long." },
      { status: 400 }
    );
  }

  const sections = [
    {
      title: "Contact details",
      rows: [
        { label: "Name", value: name },
        { label: "Email", value: email },
      ],
    },
    {
      title: "Message",
      rows: [{ label: "Message", value: message }],
      variant: "quote" as const,
    },
  ];

  const { error } = await getResendClient().emails.send({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    replyTo: email,
    subject: encodeMimeSubject(`New message from the contact form – ${name}`),
    html: renderNotificationEmail({
      eyebrow: "Contact form",
      heading: "New message via the contact form",
      sections,
      replyTo: email,
    }),
    text: renderPlainText({ heading: "New message via the contact form", sections }),
  });

  if (error) {
    console.error("Resend – error sending (contact) ❌", error);
    return NextResponse.json(
      { ok: false, error: "Could not send right now." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
