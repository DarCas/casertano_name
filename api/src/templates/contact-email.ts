/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

function esc(s: string): string {
    return s.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
}

function nl2br(s: string): string {
    return esc(s).replace(/\n/g, "<br>")
}

export function contactEmailHtml(name: string, email: string, message: string): string {
    return `<table style="width:100%;max-width:560px;margin:0 auto;font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;color:#1a1a1a">
  <tr><td style="padding:24px 0 16px;border-bottom:1px solid #e5e5e5;font-size:18px;font-weight:600;color:#6C63FF">Nuovo messaggio da casertano.name</td></tr>
  <tr><td style="padding:16px 0">
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:4px 0;color:#666;width:80px">Nome</td><td style="padding:4px 0">${esc(name)}</td></tr>
      <tr><td style="padding:4px 0;color:#666;width:80px">E-Mail</td><td style="padding:4px 0"><a href="mailto:${esc(email)}" style="color:#6C63FF;text-decoration:none">${esc(email)}</a></td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:16px 20px;background:#f5f5f5;border-radius:8px;white-space:pre-wrap;font-size:13px">${nl2br(message)}</td></tr>
  <tr><td style="padding:24px 0 0;font-size:11px;color:#999;border-top:1px solid #e5e5e5">Inviato dal form di contatto casertano.name</td></tr>
</table>`
}
