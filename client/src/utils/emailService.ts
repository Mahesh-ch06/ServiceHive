import emailjs from "@emailjs/browser";

// EmailJS configuration — set these in your .env
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";

interface ResetEmailParams {
  toEmail: string;
  toName: string;
  resetLink: string;
}

/**
 * Send a password reset email via EmailJS.
 * Returns true if sent, false if EmailJS is not configured.
 */
export const sendResetEmail = async (params: ResetEmailParams): Promise<boolean> => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    // eslint-disable-next-line no-console
    console.warn("EmailJS not configured — skipping email send");
    return false;
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email: params.toEmail,
      to_name: params.toName || params.toEmail,
      reset_link: params.resetLink
    },
    PUBLIC_KEY
  );

  return true;
};
