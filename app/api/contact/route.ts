import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      subject = '',
      firstName = '',
      lastName = '',
      phone = '',
      email = '',
      message = '',
      notifications = false,
    } = body || {};

    if (!email && !phone) {
      return NextResponse.json({ error: 'Missing contact info' }, { status: 400 });
    }

    const to = process.env.MAIL_TO || 'keflatet@gmail.com';

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: (process.env.SMTP_SECURE || 'false') === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `
      <h2>פנייה חדשה מהאתר</h2>
      <p><strong>נושא:</strong> ${subject || '-'}</p>
      <p><strong>שם פרטי:</strong> ${firstName || '-'}</p>
      <p><strong>שם משפחה:</strong> ${lastName || '-'}</p>
      <p><strong>טלפון:</strong> ${phone || '-'}</p>
      <p><strong>אימייל:</strong> ${email || '-'}</p>
      <p><strong>רוצה קבלת הודעות:</strong> ${notifications ? 'כן' : 'לא'}</p>
      <p><strong>הודעה:</strong></p>
      <pre style="white-space:pre-wrap">${message || '-'}</pre>
    `;

    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to,
      subject: subject ? `פנייה מהאתר: ${subject}` : 'פנייה חדשה מהאתר',
      replyTo: email || undefined,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
