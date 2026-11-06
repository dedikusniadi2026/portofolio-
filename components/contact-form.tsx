"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Loader2, Send } from "lucide-react"

type Status = "idle" | "sending" | "sent" | "error"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [companyWebsite, setCompanyWebsite] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")

  const sending = status === "sending"

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (sending) return

    setError("")
    setNotice("")
    setStatus("sending")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company_website: companyWebsite }),
      })

      const data = await response.json().catch(() => null)

      if (response.ok && data?.success) {
        setName("")
        setEmail("")
        setMessage("")
        setCompanyWebsite("")
        setStatus("sent")
        return
      }

      console.error("[contact] send failed", {
        httpStatus: response.status,
        serverError: data?.error ?? "no JSON response body",
      })

      if (data?.fallback === "mailto" && typeof data.mailto === "string") {
        setNotice("Email delivery isn't configured on this site yet — opening your mail app instead.")
        window.location.href = data.mailto
        setStatus("idle")
        return
      }

      setError(data?.error ?? "Something went wrong. Please try again.")
      setStatus("error")
    } catch (submitError) {
      console.error("[contact] request failed", submitError)
      setError("Could not reach the server. Check your connection and try again.")
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/5 p-6 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-success" />
        <p className="mt-3 text-sm font-bold">Message sent! I'll reply within a day.</p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          Thanks for reaching out — your message is on its way.
        </p>
        <Button variant="outline" className="btn-pill mt-5 border-border bg-card text-[13px] hover:bg-secondary"
                onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cf-name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</Label>
        <Input id="cf-name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
               autoComplete="name" required className="h-11 rounded-xl border-border bg-card text-sm" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cf-email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</Label>
        <Input id="cf-email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
               placeholder="you@company.com" autoComplete="email" required
               className="h-11 rounded-xl border-border bg-card text-sm" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cf-message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message</Label>
        <Textarea id="cf-message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5}
                  placeholder="What breaks, and what should it do instead?" required
                  className="min-h-[130px] rounded-xl border-border bg-card text-sm" />
      </div>

      {/* Honeypot: real people never see or fill this, bots that auto-fill every input do. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0 left-[-9999px] top-[-9999px]">
        <label htmlFor="cf-company">Company website</label>
        <input id="cf-company" name="company_website" type="text" tabIndex={-1} autoComplete="off"
               value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} />
      </div>

      {error && <p className="text-xs font-semibold text-destructive" role="alert">{error}</p>}
      {notice && <p className="text-xs leading-relaxed text-muted-foreground" role="status">{notice}</p>}

      <Button type="submit" disabled={sending}
              className="btn-pill w-full bg-primary px-6 text-primary-foreground shadow-[0_16px_30px_-18px_rgba(37,99,235,0.95)]">
        {sending
          ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending…</>
          : <><Send className="mr-2 h-4 w-4" />Send message</>}
      </Button>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Replies go to your email, I usually reply within a day.
      </p>
    </form>
  )
}
