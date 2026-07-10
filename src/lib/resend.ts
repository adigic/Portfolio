import { Resend } from "resend";

let client: Resend | null = null;

// Lazy singleton – avoids crashing the build/app if RESEND_API_KEY
// isn't set yet (e.g. locally without .env.local).
export function getResendClient() {
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY || "re_missing_api_key");
  }
  return client;
}

// Must be a sender address on a domain verified in Resend.
export const EMAIL_FROM =
  process.env.RESEND_FROM || "Adis Hegic <formular@contact.adigic.se>";

// Where contact form notifications are sent.
export const EMAIL_TO = process.env.RESEND_TO || "adigic@hotmail.com";
