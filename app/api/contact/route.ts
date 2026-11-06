import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

const RATE_LIMIT_MS = 30_000
const MAX_NAME = 120
const MAX_EMAIL = 254
const MAX_MESSAGE = 5_000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Single-instance, in-memory. Good enough for a portfolio form; it resets on deploy or restart.
const lastSubmitAt = new Map<string, number>()

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function buildMailto(input: { to: string; name: string; email: string; message: string }) {
  const subject = `Portfolio enquiry from ${input.name}`
  const body = `${input.message}\n\n— ${input.name}${input.email ? ` (${input.email})` : ""}`
  return `mailto:${input.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function emailTemplate(input: { name: string; email: string; message: string; sentAt: Date }) {
  const sentAt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(input.sentAt)

  const rows = [
    { label: "Name", value: input.name },
    { label: "Email", value: input.email },
  ]
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e6ebf5;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#5b6b8c;">${row.label}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e6ebf5;font-size:14px;color:#0b1b3a;">${escapeHtml(row.value)}</td>
        </tr>`,
    )
    .join("")

  return `
    <div style="margin:0;padding:28px 16px;background:#f5f7fb;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e6ebf5;border-radius:14px;overflow:hidden;">
        <div style="background:#2563eb;padding:18px 22px;">
          <p style="margin:0;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#c7d7fe;">Portfolio enquiry</p>
          <p style="margin:6px 0 0;font-size:19px;font-weight:700;color:#ffffff;">New message from ${escapeHtml(input.name)}</p>
        </div>
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
          ${rows}
          <tr>
            <td style="padding:10px 14px;border-bottom:1px solid #e6ebf5;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#5b6b8c;">Sent</td>
            <td style="padding:10px 14px;border-bottom:1px solid #e6ebf5;font-size:14px;color:#0b1b3a;">${sentAt} WIB</td>
          </tr>
        </table>
        <div style="padding:20px 22px;">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#5b6b8c;">Message</p>
          <p style="margin:0;font-size:15px;line-height:1.65;color:#0b1b3a;white-space:pre-wrap;">${escapeHtml(input.message)}</p>
        </div>
      </div>
      <p style="max-width:560px;margin:14px auto 0;font-size:12px;line-height:1.6;color:#7c8aa5;">
        Sent from dedikusniadi.my.id — reply directly to this email to answer ${escapeHtml(input.name)}.
      </p>
    </div>`
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"

  const last = lastSubmitAt.get(ip)
  if (last !== undefined && Date.now() - last < RATE_LIMIT_MS) {
    return NextResponse.json(
      { success: false, error: "Please wait a moment before sending again." },
      { status: 429 },
    )
  }

  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: "Malformed request." }, { status: 400 })
  }

  const name = String(payload.name ?? "").trim()
  const email = String(payload.email ?? "").trim()
  const message = String(payload.message ?? "").trim()
  const honeypot = String(payload.company_website ?? "").trim()

  // Bots fill every field they see. Tell them it worked, send nothing.
  if (honeypot) {
    lastSubmitAt.set(ip, Date.now())
    return NextResponse.json({ success: true })
  }

  if (name.length < 2) {
    return NextResponse.json({ success: false, error: "Please enter your name (at least 2 characters)." }, { status: 400 })
  }
  if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
    return NextResponse.json({ success: false, error: "That message is too long." }, { status: 413 })
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ success: false, error: "Please enter a valid email so I can reply." }, { status: 400 })
  }
  if (message.length < 10) {
    return NextResponse.json({ success: false, error: "Please add a bit more detail (at least 10 characters)." }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL

  // No key configured (local dev, or env not set on the host): don't leave the visitor stuck.
  // The address stays server-side — we hand back a ready-to-open mailto instead of exposing it.
  if (!apiKey) {
    console.error("contact/route: RESEND_API_KEY is not set — falling back to mailto")
    return NextResponse.json(
      {
        success: false,
        fallback: "mailto",
        mailto: to ? buildMailto({ to, name, email, message }) : undefined,
        error: "Email delivery is not configured on this deployment.",
      },
      { status: 503 },
    )
  }
  if (!to) {
    console.error("contact/route: CONTACT_TO_EMAIL is not set")
    return NextResponse.json({ success: false, error: "Email delivery is not configured on this deployment." }, { status: 503 })
  }

  const sentAt = new Date()
  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
    to,
    subject: `New message from portfolio - ${name}`,
    html: emailTemplate({ name, email, message, sentAt }),
    replyTo: email,
    headers: { "X-Portfolio-Contact": "true" },
  })

  if (error) {
    const detail = error as unknown as { name?: string; message?: string; statusCode?: number }
    console.error("contact/route: resend failed", {
      name: detail.name,
      message: detail.message,
      statusCode: detail.statusCode,
      from: process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
    })
    return NextResponse.json(
      { success: false, error: `Resend rejected the send: ${detail.message ?? "unknown error"}` },
      { status: 502 },
    )
  }

  lastSubmitAt.set(ip, Date.now())
  return NextResponse.json({ success: true })
}
