'use server'

import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const orderSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  phone: z.string().max(30).optional(),
  serviceType: z.string().min(1),
  serviceTitle: z.string().min(1),
  tier: z.enum(['starter', 'standard', 'premium']),
  timeline: z.enum(['rush', 'standard', 'flexible']),
  priceBDT: z.number().positive(),
  priceUSD: z.number().positive(),
  description: z.string().max(4000).optional(),
})

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

function esc(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = orderSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
    }

    const d = parsed.data
    const timestamp = new Date().toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' })

    const timelineLabels = { rush: 'Rush (×1.4)', standard: 'Standard', flexible: 'Flexible (×0.9)' }
    const tierLabels     = { starter: 'Starter', standard: 'Standard', premium: 'Premium' }

    const htmlBody = `<!doctype html>
<html>
<head><meta charset="utf-8"><title>New Order Inquiry</title></head>
<body style="font-family:Inter,ui-sans-serif,system-ui,Arial;background:#f1f5f9;margin:0;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#2563eb,#7c3aed);padding:32px 32px 24px;">
      <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">🎉 New Order Inquiry</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Received ${esc(timestamp)} (Bangladesh Time)</p>
    </div>

    <!-- Service summary -->
    <div style="padding:24px 32px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
            <span style="color:#64748b;font-size:13px;">Service</span>
            <p style="margin:2px 0 0;font-size:16px;font-weight:600;color:#0f172a;">${esc(d.serviceTitle)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
            <span style="color:#64748b;font-size:13px;">Package</span>
            <p style="margin:2px 0 0;font-size:15px;font-weight:600;color:#0f172a;">${esc(tierLabels[d.tier])}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
            <span style="color:#64748b;font-size:13px;">Timeline</span>
            <p style="margin:2px 0 0;font-size:15px;color:#0f172a;">${esc(timelineLabels[d.timeline])}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:2px solid #2563eb;">
            <span style="color:#64748b;font-size:13px;">Estimated Price</span>
            <p style="margin:2px 0 0;font-size:20px;font-weight:700;color:#2563eb;">৳${d.priceBDT.toLocaleString()} BDT <span style="font-size:14px;color:#475569">/ $${d.priceUSD.toLocaleString()} USD</span></p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Client info -->
    <div style="padding:16px 32px 24px;">
      <h2 style="margin:0 0 12px;font-size:15px;color:#475569;text-transform:uppercase;letter-spacing:0.05em;">Client Information</h2>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:6px 0;font-size:14px;color:#0f172a;border-bottom:1px solid #f1f5f9;"><b>Name:</b> ${esc(d.name)}</td></tr>
        <tr><td style="padding:6px 0;font-size:14px;color:#0f172a;border-bottom:1px solid #f1f5f9;"><b>Email:</b> <a href="mailto:${esc(d.email)}" style="color:#2563eb;">${esc(d.email)}</a></td></tr>
        ${d.phone ? `<tr><td style="padding:6px 0;font-size:14px;color:#0f172a;border-bottom:1px solid #f1f5f9;"><b>Phone:</b> ${esc(d.phone)}</td></tr>` : ''}
        ${d.description ? `<tr><td style="padding:12px 0;font-size:14px;color:#0f172a;"><b>Project Description:</b><br><span style="color:#475569;line-height:1.6;">${esc(d.description)}</span></td></tr>` : ''}
      </table>
    </div>

    <!-- Footer -->
    <div style="background:#f8fafc;padding:16px 32px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="margin:0;font-size:12px;color:#94a3b8;">Gen Stella IT — genstellait.site</p>
    </div>
  </div>
</body>
</html>`

    await transporter.sendMail({
      from: `"Gen Stella IT Website" <${process.env.EMAIL_USER}>`,
      to: 'niloykumarmohonta@gmail.com',
      replyTo: d.email,
      subject: `New Order: ${d.serviceTitle} (${tierLabels[d.tier]}) — ৳${d.priceBDT.toLocaleString()}`,
      html: htmlBody,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Order API error:', err)
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 })
  }
}
