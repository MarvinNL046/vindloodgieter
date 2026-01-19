import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { ContactFormEmail } from '@/emails/ContactFormEmail';
import { ContactConfirmationEmail } from '@/emails/ContactConfirmationEmail';

// Initialize Resend only when API key is available (prevents build errors)
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Subject label mapping
const subjectLabels: Record<string, string> = {
  general: 'Algemene vraag',
  information: 'Informatie toevoegen/wijzigen',
  partnership: 'Samenwerking',
  technical: 'Technisch probleem',
  other: 'Anders',
};

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Alle velden zijn verplicht' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ongeldig e-mailadres' },
        { status: 400 }
      );
    }

    const subjectLabel = subjectLabels[subject] || subject;

    // Render email templates
    const adminEmailHtml = await render(
      ContactFormEmail({
        name,
        email,
        subject,
        subjectLabel,
        message,
      })
    );

    const confirmationEmailHtml = await render(
      ContactConfirmationEmail({
        name,
        subjectLabel,
        message,
      })
    );

    // Plain text version for better deliverability
    const adminEmailText = `
Nieuw contactbericht via VindLoodgieter.nl

Van: ${name}
E-mail: ${email}
Onderwerp: ${subjectLabel}

Bericht:
${message}

---
Dit bericht is verzonden via het contactformulier op vindloodgieter.nl
    `.trim();

    // Check if Resend is configured
    if (!resend) {
      console.warn('Resend API key not configured');
      return NextResponse.json(
        { error: 'E-mail service niet geconfigureerd' },
        { status: 500 }
      );
    }

    // Send email to site owner with tags
    const { error } = await resend.emails.send({
      from: 'VindLoodgieter.nl <noreply@vindloodgieter.nl>',
      to: ['info@vindloodgieter.nl'],
      replyTo: email,
      subject: `[Contact] ${subjectLabel} - ${name}`,
      html: adminEmailHtml,
      text: adminEmailText,
      headers: {
        'List-Unsubscribe': '<https://www.vindloodgieter.nl/unsubscribe>',
      },
      tags: [
        { name: 'platform', value: 'vindloodgieter' },
        { name: 'type', value: 'contact-form' },
        { name: 'category', value: subject },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Er is iets misgegaan bij het versturen van uw bericht' },
        { status: 500 }
      );
    }

    // Plain text confirmation
    const confirmationEmailText = `
Beste ${name},

Bedankt voor uw bericht. Wij hebben uw bericht ontvangen en zullen zo spoedig mogelijk reageren.

Onderwerp: ${subjectLabel}

Uw bericht:
${message}

Met vriendelijke groet,
Team VindLoodgieter.nl

---
Dit is een automatische bevestiging. U hoeft niet te antwoorden op deze e-mail.
https://www.vindloodgieter.nl
    `.trim();

    // Send confirmation email to the sender with tags
    await resend.emails.send({
      from: 'VindLoodgieter.nl <noreply@vindloodgieter.nl>',
      to: [email],
      subject: 'Bevestiging: Uw bericht is ontvangen',
      html: confirmationEmailHtml,
      text: confirmationEmailText,
      headers: {
        'List-Unsubscribe': '<https://www.vindloodgieter.nl/unsubscribe>',
      },
      tags: [
        { name: 'platform', value: 'vindloodgieter' },
        { name: 'type', value: 'contact-confirmation' },
        { name: 'category', value: subject },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Er is iets misgegaan bij het verwerken van uw bericht' },
      { status: 500 }
    );
  }
}
