import { NextResponse } from "next/server";

const RESEND_API_URL = "https://api.resend.com/emails";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactRequestBody = {
  name?: string;
  email?: string;
  message?: string;
};

function sanitizeField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactRequestBody | null;

  const name = sanitizeField(body?.name);
  const email = sanitizeField(body?.email).toLowerCase();
  const message = sanitizeField(body?.message);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("Contact form is missing required email configuration.");
    return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
  }

  const text = [
    "New portfolio contact form submission",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <h1>New portfolio contact form submission</h1>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
  `;

  const resendResponse = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `Portfolio contact from ${name}`,
      replyTo: email,
      text,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const providerError = await resendResponse.text();
    console.error("Resend send failed:", providerError);

    return NextResponse.json({ error: "Unable to send message right now" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
