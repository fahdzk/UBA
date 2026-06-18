// @uba/email/templates — Professional HTML email templates
const BASE_STYLES = `
  body { margin: 0; padding: 0; background: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
  .header { background: #032B66; padding: 24px; text-align: center; }
  .header img { max-width: 120px; }
  .content { padding: 32px 24px; }
  .title { font-size: 22px; font-weight: 700; color: #032B66; margin: 0 0 16px; }
  .text { font-size: 15px; color: #374151; line-height: 1.7; margin: 0 0 16px; }
  .btn { display: inline-block; background: #032B66; color: #fff !important; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; }
  .btn-red { background: #F21B23; }
  .footer { background: #f4f4f7; padding: 20px 24px; text-align: center; font-size: 13px; color: #9ca3af; }
  .divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
  .card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 16px 0; }
  .card-title { font-weight: 600; color: #032B66; font-size: 14px; margin: 0 0 8px; }
  .card-text { font-size: 14px; color: #4b5563; margin: 0; }
`;

function wrapEmail(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${BASE_STYLES}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="color: white; font-size: 20px; font-weight: 800; letter-spacing: 2px;">UBA</div>
      <div style="color: #93c5fd; font-size: 11px; letter-spacing: 3px; margin-top: 4px;">UNION OF BRAND AMBASSADORS</div>
    </div>
    <div class="content">${content}</div>
    <div class="divider"></div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} UBA — Union of Brand Ambassadors. All rights reserved.</p>
      <p>Protecting the People Who Build Brands™</p>
      <p style="margin-top: 12px;">
        <a href="{{unsubscribe_url}}" style="color: #9ca3af;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

export const emailTemplates = {
  welcome: (data: { firstName: string }) => wrapEmail(`
    <p class="title">Welcome to UBA, ${data.firstName}!</p>
    <p class="text">Thank you for joining the Union of Brand Ambassadors — the premier platform protecting and empowering brand ambassadors across the nation.</p>
    <p class="text">With your UBA membership, you now have access to:</p>
    <ul style="font-size: 15px; color: #374151; line-height: 2;">
      <li>Exclusive job opportunities from verified agencies</li>
      <li>Complaint filing and tracking system</li>
      <li>Legal resources and protection</li>
      <li>Community support network</li>
    </ul>
    <div style="text-align: center; margin: 24px 0;">
      <a href="{{dashboard_url}}" class="btn">Go to Dashboard</a>
    </div>
    <p class="text">If you have any questions, our support team is here to help.</p>
    <p class="text" style="margin-top: 24px;">Stronger Together,<br><strong>The UBA Team</strong></p>
  `),

  email_verification: (data: { firstName: string; verifyUrl: string }) => wrapEmail(`
    <p class="title">Verify Your Email</p>
    <p class="text">Hi ${data.firstName},</p>
    <p class="text">Please verify your email address to activate your UBA account and access all member benefits.</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="${data.verifyUrl}" class="btn">Verify Email Address</a>
    </div>
    <p class="text">This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.</p>
  `),

  password_reset: (data: { firstName: string; resetUrl: string }) => wrapEmail(`
    <p class="title">Reset Your Password</p>
    <p class="text">Hi ${data.firstName},</p>
    <p class="text">We received a request to reset your UBA account password. Click the button below to set a new password.</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="${data.resetUrl}" class="btn btn-red">Reset Password</a>
    </div>
    <p class="text">This link expires in 1 hour. If you didn't request this, please secure your account immediately.</p>
  `),

  complaint_received: (data: { firstName: string; complaintTitle: string; caseNumber: string }) => wrapEmail(`
    <p class="title">Complaint Received</p>
    <p class="text">Hi ${data.firstName},</p>
    <p class="text">We've received your complaint and it's being reviewed by our team. Here are the details:</p>
    <div class="card">
      <p class="card-title">Case: ${data.caseNumber}</p>
      <p class="card-text">${data.complaintTitle}</p>
    </div>
    <p class="text">Our team will review your case and respond within 48 hours. You can track the status anytime from your dashboard.</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="{{dashboard_url}}" class="btn">Track Complaint</a>
    </div>
    <p class="text">Your voice matters. We're here to protect you.</p>
  `),

  ticket_created: (data: { firstName: string; ticketNumber: string; subject: string }) => wrapEmail(`
    <p class="title">Ticket Created</p>
    <p class="text">Hi ${data.firstName},</p>
    <p class="text">A support ticket has been created for your case:</p>
    <div class="card">
      <p class="card-title">Ticket: ${data.ticketNumber}</p>
      <p class="card-text">${data.subject}</p>
    </div>
    <p class="text">Our team will respond as soon as possible. You'll receive updates as your ticket progresses.</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="{{ticket_url}}" class="btn">View Ticket</a>
    </div>
  `),

  lawyer_assigned: (data: { firstName: string; lawyerName: string; caseNumber: string }) => wrapEmail(`
    <p class="title">Attorney Assigned to Your Case</p>
    <p class="text">Hi ${data.firstName},</p>
    <p class="text">We've assigned a qualified attorney to your legal case:</p>
    <div class="card">
      <p class="card-title">${data.lawyerName}</p>
      <p class="card-text">Case: ${data.caseNumber}</p>
    </div>
    <p class="text">Your attorney will contact you within 24 hours to discuss your case. You can message them directly from your dashboard.</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="{{case_url}}" class="btn">View Case Details</a>
    </div>
  `),

  membership_renewal: (data: { firstName: string; planName: string; amount: string; date: string }) => wrapEmail(`
    <p class="title">Membership Renewal Confirmation</p>
    <p class="text">Hi ${data.firstName},</p>
    <p class="text">Your UBA membership has been renewed successfully:</p>
    <div class="card">
      <p class="card-title">${data.planName}</p>
      <p class="card-text">Amount: ${data.amount}<br>Next billing date: ${data.date}</p>
    </div>
    <p class="text">Thank you for your continued membership. Together, we're stronger.</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="{{billing_url}}" class="btn">Manage Billing</a>
    </div>
  `),

  payment_success: (data: { firstName: string; amount: string; description: string }) => wrapEmail(`
    <p class="title">Payment Confirmation</p>
    <p class="text">Hi ${data.firstName},</p>
    <p class="text">Your payment has been processed successfully:</p>
    <div class="card">
      <p class="card-title">${data.description}</p>
      <p class="card-text">Amount charged: ${data.amount}</p>
    </div>
    <p class="text">Your receipt has been generated and can be accessed from your billing dashboard.</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="{{billing_url}}" class="btn">View Receipt</a>
    </div>
  `),

  payment_failed: (data: { firstName: string; amount: string; updateUrl: string }) => wrapEmail(`
    <p class="title">Payment Failed — Action Required</p>
    <p class="text">Hi ${data.firstName},</p>
    <p class="text">We were unable to process your payment of <strong>${data.amount}</strong>. This could be due to an expired card or insufficient funds.</p>
    <div class="card" style="border-left: 4px solid #F21B23;">
      <p class="card-text">Please update your payment method within 7 days to avoid service interruption.</p>
    </div>
    <div style="text-align: center; margin: 24px 0;">
      <a href="${data.updateUrl}" class="btn btn-red">Update Payment Method</a>
    </div>
    <p class="text">Need help? Contact our support team anytime.</p>
  `),

  suspension_notice: (data: { firstName: string; reason: string; appealUrl: string }) => wrapEmail(`
    <p class="title">Account Suspension Notice</p>
    <p class="text">Hi ${data.firstName},</p>
    <p class="text">Your UBA account has been suspended due to:</p>
    <div class="card" style="border-left: 4px solid #F21B23;">
      <p class="card-text">${data.reason}</p>
    </div>
    <p class="text">If you believe this is an error, you have the right to appeal this decision.</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="${data.appealUrl}" class="btn btn-red">File an Appeal</a>
    </div>
    <p class="text" style="font-size: 13px; color: #9ca3af;">Appeals are reviewed within 5 business days.</p>
  `),

  appeal_notice: (data: { firstName: string; appealStatus: string }) => wrapEmail(`
    <p class="title">Appeal Status Update</p>
    <p class="text">Hi ${data.firstName},</p>
    <p class="text">Your appeal has been reviewed. The current status is:</p>
    <div class="card">
      <p class="card-title">Status: ${data.appealStatus}</p>
    </div>
    <p class="text">If you have additional questions or evidence to submit, please contact our support team.</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="{{support_url}}" class="btn">Contact Support</a>
    </div>
  `),
} as const;

export type EmailTemplateName = keyof typeof emailTemplates;
