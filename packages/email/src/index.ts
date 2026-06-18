// @uba/email — Email service using Resend
import { prisma } from "@uba/database";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const FROM_EMAIL = process.env.EMAIL_FROM || "UBA <noreply@uba-platform.com>";

export type EmailTemplateId =
  | "welcome"
  | "email_verification"
  | "password_reset"
  | "complaint_received"
  | "ticket_created"
  | "lawyer_assigned"
  | "membership_renewal"
  | "payment_success"
  | "payment_failed"
  | "suspension_notice"
  | "appeal_notice";

interface SendEmailParams {
  to: string;
  userId?: string;
  templateId: EmailTemplateId;
  subject: string;
  html: string;
  metadata?: Record<string, unknown>;
}

export async function sendEmail({
  to,
  userId,
  templateId,
  subject,
  html,
  metadata,
}: SendEmailParams): Promise<{ success: boolean; emailLogId?: string; error?: string }> {
  // Create email log entry
  const emailLog = await prisma.emailLog.create({
    data: {
      userId,
      templateId,
      recipient: to,
      subject,
      body: html,
      status: "QUEUED",
      metadata,
    },
  });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      await prisma.emailLog.update({
        where: { id: emailLog.id },
        data: {
          status: "FAILED",
          failedAt: new Date(),
          failureReason: errorData,
        },
      });
      return { success: false, emailLogId: emailLog.id, error: errorData };
    }

    const data = await response.json();

    await prisma.emailLog.update({
      where: { id: emailLog.id },
      data: {
        status: "SENT",
        sentAt: new Date(),
        metadata: {
          ...(metadata as any),
          resendId: data.id,
        },
      },
    });

    return { success: true, emailLogId: emailLog.id };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    await prisma.emailLog.update({
      where: { id: emailLog.id },
      data: {
        status: "FAILED",
        failedAt: new Date(),
        failureReason: message,
      },
    });
    return { success: false, emailLogId: emailLog.id, error: message };
  }
}

// Track email events from Resend webhooks
export async function trackEmailEvent(
  emailId: string,
  event: "delivered" | "opened" | "bounced" | "complained"
): Promise<void> {
  const statusMap = {
    delivered: "DELIVERED",
    opened: "OPENED",
    bounced: "BOUNCED",
    complained: "COMPLAINED",
  };

  const fieldMap = {
    delivered: "deliveredAt",
    opened: "openedAt",
    bounced: "bouncedAt",
    complained: "bouncedAt",
  };

  await prisma.emailLog.updateMany({
    where: { metadata: { path: ["resendId"], equals: emailId } },
    data: {
      status: statusMap[event] as any,
      [fieldMap[event]]: new Date(),
    },
  });
}
