interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail(options: EmailOptions) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('email mock:', options);
    return;
  }
  try {
    await fetch('https://api.resend.com/v1/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'StatPad <noreply@thestatpad.com>',
        to: options.to,
        subject: options.subject,
        html: options.html,
      }),
    });
  } catch (error) {
    console.error('Resend email error:', error);
  }
}

export async function sendWaitlistConfirmation(name: string, email: string) {
  const subject = 'Thanks for joining the StatPad waitlist!';
  const html = `<p>Hi ${name || 'there'},</p><p>Thanks for joining the StatPad waitlist! We will notify you when the app is ready for you.</p><p>– The StatPad Team</p>`;
  await sendEmail({ to: email, subject, html });
}

export async function sendContactNotification(name: string, email: string, message: string) {
  const subject = 'New contact message from StatPad website';
  const html = `<p><strong>Name:</strong> ${name}<br/><strong>Email:</strong> ${email}</p><p>${message}</p>`;
  // send to internal address
  await sendEmail({ to: 'hello@thestatpad.com', subject, html });
}