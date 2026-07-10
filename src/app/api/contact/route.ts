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
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ContactBody;

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are required." },
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
