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
  // Diagnostic: Log if credentials are missing
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    // eslint-disable-next-line no-console
    console.error("EmailJS not configured. Missing:", {
      SERVICE_ID: !SERVICE_ID ? "MISSING" : "OK",
      TEMPLATE_ID: !TEMPLATE_ID ? "MISSING" : "OK",
      PUBLIC_KEY: !PUBLIC_KEY ? "MISSING" : "OK"
    });
    return false;
  }

  try {
    // eslint-disable-next-line no-console
    console.log("Sending email with ServiceID:", SERVICE_ID, "TemplateID:", TEMPLATE_ID);

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: params.toEmail,
        to_name: params.toName || params.toEmail.split("@")[0],
        reset_link: params.resetLink
      },
      PUBLIC_KEY
    );
    // eslint-disable-next-line no-console
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("EmailJS API Error:", {
      message: error instanceof Error ? error.message : String(error),
      status: (error as any)?.status,
      statusText: (error as any)?.statusText
    });
    return false;
  }
};
