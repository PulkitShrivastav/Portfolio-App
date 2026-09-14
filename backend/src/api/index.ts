import { Router } from 'express';
import nodemailer from 'nodemailer';

const route = Router();

const smtpEmail = process.env.SMTP_EMAIL ?? process.env.smtp_email;
const smtpPassword = process.env.SMTP_PASSWORD ?? process.env.smtp_password;
const fromAddress = process.env.EMAIL_FROM ?? smtpEmail ?? 'noreply@example.com';

const transporter = smtpEmail && smtpPassword
    ? nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: smtpEmail,
            pass: smtpPassword,
        },
    })
    : null;

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

route.post('/send-inquiry', async (req, res) => {
    const { name, senderEmail, message } = req.body;

    if (!senderEmail || !message) {
        return res.status(400).json({ error: 'Email and message are required fields.' });
    }

    if (!transporter) {
        console.error('Email delivery is not configured. Set SMTP_EMAIL and SMTP_PASSWORD.');
        return res.status(500).json({ success: false, error: 'Email delivery is not configured.' });
    }

    const safeMessage = escapeHtml(String(message));
    const mailOptions = {
        from: `"Website Inquiry" <${fromAddress}>`,
        to: process.env.INQUIRY_TO ?? 'srivas.p117@gmail.com',
        replyTo: senderEmail,
        subject: `New Inquiry from ${name || 'Website User'}`,
        text: `You received an inquiry:\n\nName: ${name || 'N/A'}\nEmail: ${senderEmail}\n\nMessage:\n${message}`,
        html: `
      <h3>New Inquiry</h3>
      <p><strong>Name:</strong> ${escapeHtml(String(name || 'N/A'))}</p>
      <p><strong>Email:</strong> ${escapeHtml(String(senderEmail))}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage.replace(/\n/g, '<br>')}</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Inquiry sent successfully!' });
    } catch (error) {
        console.error('Email error:', error);
        return res.status(500).json({ success: false, error: 'Failed to send inquiry.' });
    }
});

export default route