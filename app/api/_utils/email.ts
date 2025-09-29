interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail(options: EmailOptions) {
  // Email functionality disabled - using admin@thestatpad.com instead
  console.log('Email would be sent:', {
    to: options.to,
    subject: options.subject,
    from: 'admin@thestatpad.com'
  });
  // TODO: Implement direct email sending via admin@thestatpad.com
}

export async function sendWaitlistConfirmation(name: string, email: string) {
  const subject = '🎮 Welcome to the StatPad waitlist!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2563eb; margin: 0;">StatPad</h1>
        <p style="color: #6b7280; margin: 5px 0;">Track your game. Level up your skills.</p>
      </div>
      
      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
        <h2 style="color: #1f2937; margin-top: 0;">Hi ${name || 'there'}! 👋</h2>
        <p style="color: #374151; line-height: 1.6;">
          Welcome to the StatPad community! You're now on the waitlist for early access to our game tracking platform.
        </p>
        <p style="color: #374151; line-height: 1.6;">
          We're working hard to bring you the best gaming analytics experience. You'll be among the first to know when StatPad is ready to help you level up your gameplay!
        </p>
      </div>
      
      <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin-bottom: 25px;">
        <h3 style="color: #1e40af; margin-top: 0;">What's next?</h3>
        <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
          <li>We'll send you updates on our development progress</li>
          <li>You'll get early access when we launch</li>
          <li>Be the first to try new features and provide feedback</li>
        </ul>
      </div>
      
      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; margin: 0;">
          Questions? Reply to this email - we'd love to hear from you!
        </p>
        <p style="color: #6b7280; margin: 10px 0 0 0;">
          <strong>– The StatPad Team</strong>
        </p>
      </div>
    </div>`;
  await sendEmail({ to: email, subject, html });
}

export async function sendContactNotification(name: string, email: string, message: string) {
  const subject = 'New contact message from StatPad website';
  const html = `<p><strong>Name:</strong> ${name}<br/><strong>Email:</strong> ${email}</p><p>${message}</p>`;
  // send to admin address
  await sendEmail({ to: 'admin@thestatpad.com', subject, html });
}