// Shared HTML/text template for notification emails sent via Resend.
// Built with inline styles + tables for broad client compatibility (Gmail/Outlook etc.).
// Light "letterhead" theme with a dark header banner, matching the portfolio's
// dark/accent palette without reusing the site's dark card design.

export type EmailRow = { label: string; value: string };
export type EmailSection = {
  title: string;
  rows?: EmailRow[];
  list?: string[];
  /** "quote" renders the value as a quote block (e.g. for free-text messages). */
  variant?: "default" | "quote";
};

type EmailLayoutOptions = {
  eyebrow: string;
  heading: string;
  sections: EmailSection[];
  replyTo?: string;
};

const COLORS = {
  page: "#EDEDED",
  band: "#1A1A1A",
  card: "#FFFFFF",
  border: "#E2E2E2",
  text: "#1A1A1A",
  fade: "#75726A",
  accent: "#39597D",
  accentSoft: "#7FA1C4",
  quoteBg: "#EAF0F6",
};

// Also encodes non-ASCII characters (å/ä/ö, dashes, etc.) as numeric HTML
// entities. Some email clients ignore <meta charset> and guess the wrong
// encoding for the message's MIME header — entities render correctly regardless.
function escapeHtml(value: string) {
  return Array.from(value)
    .map((ch) => {
      if (ch === "&") return "&amp;";
      if (ch === "<") return "&lt;";
      if (ch === ">") return "&gt;";
      const code = ch.codePointAt(0)!;
      return code > 127 ? `&#${code};` : ch;
    })
    .join("");
}

// RFC 2047 encoding of the subject line – otherwise clients that don't
// assume UTF-8 for headers may show accented characters as question marks.
export function encodeMimeSubject(subject: string) {
  if (!/[^\x00-\x7F]/.test(subject)) return subject;
  return `=?UTF-8?B?${Buffer.from(subject, "utf-8").toString("base64")}?=`;
}

function renderRow(row: EmailRow, isLast: boolean) {
  const value = row.value?.trim() ? row.value : "—";
  const border = isLast ? "" : `border-bottom:1px solid ${COLORS.border};`;
  return `
    <tr>
      <td style="padding:14px 0;${border}">
        <span style="display:block;font-size:11px;letter-spacing:.08em;color:${COLORS.accent};text-transform:uppercase;font-weight:700;">${escapeHtml(row.label)}</span>
        <span style="display:block;margin-top:4px;font-size:16px;line-height:1.5;color:${COLORS.text};white-space:pre-line;">${escapeHtml(value)}</span>
      </td>
    </tr>`;
}

function renderQuoteRow(row: EmailRow) {
  const value = row.value?.trim() ? row.value : "—";
  return `
    <tr>
      <td style="padding:14px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.quoteBg};border-left:3px solid ${COLORS.accentSoft};border-radius:0 10px 10px 0;">
          <tr>
            <td style="padding:16px 20px;">
              <span style="font-size:22px;line-height:1;color:${COLORS.accentSoft};font-family:Georgia,'Times New Roman',serif;">&#10077;</span>
              <div style="margin-top:4px;font-size:16px;line-height:1.6;color:${COLORS.text};white-space:pre-line;">${escapeHtml(value)}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function renderListItem(item: string) {
  return `
    <tr>
      <td style="padding:5px 0;vertical-align:top;">
        <span style="color:${COLORS.accentSoft};font-weight:700;">&#8226;</span>
        <span style="font-size:15px;line-height:1.5;color:${COLORS.text};padding-left:8px;">${escapeHtml(item)}</span>
      </td>
    </tr>`;
}

function renderSection(section: EmailSection, isFirst: boolean) {
  const rows = section.rows ?? [];
  const list = section.list ?? [];
  if (!rows.length && !list.length) return "";

  const inner = list.length
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:2px;">
        ${list.map(renderListItem).join("")}
      </table>`
    : `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${
          section.variant === "quote"
            ? rows.map(renderQuoteRow).join("")
            : rows.map((row, i) => renderRow(row, i === rows.length - 1)).join("")
        }
      </table>`;

  const topBorder = isFirst ? "" : `border-top:1px solid ${COLORS.border};`;

  return `
    <tr>
      <td style="padding:${isFirst ? "0" : "6px"} 0 0;${topBorder}font-family:Arial,Helvetica,sans-serif;">
        <span style="display:block;margin-top:${isFirst ? "0" : "18px"};font-size:12px;font-weight:700;letter-spacing:.1em;color:${COLORS.fade};text-transform:uppercase;">${escapeHtml(section.title)}</span>
        ${inner}
      </td>
    </tr>`;
}

export function renderNotificationEmail(opts: EmailLayoutOptions) {
  const { eyebrow, heading, sections, replyTo } = opts;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0;padding:0;background:${COLORS.page};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.page};padding:28px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

            <!-- Banner -->
            <tr>
              <td style="background:${COLORS.band};border-radius:14px 14px 0 0;padding:22px 28px;font-family:Arial,Helvetica,sans-serif;">
                <span style="display:block;font-size:15px;font-weight:800;letter-spacing:.14em;color:#FFFFFF;">ADIS HEGIC<span style="color:${COLORS.accentSoft};">.</span></span>
                <span style="display:block;margin-top:2px;font-size:11px;color:${COLORS.accentSoft};">Software Engineer</span>
              </td>
            </tr>

            <!-- Card -->
            <tr>
              <td style="background:${COLORS.card};border:1px solid ${COLORS.border};border-top:none;border-radius:0 0 14px 14px;padding:28px 28px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;">
                      <span style="display:inline-block;padding:5px 12px;border-radius:999px;background:${COLORS.quoteBg};color:${COLORS.accent};font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;">${escapeHtml(eyebrow)}</span>
                      <h1 style="margin:12px 0 4px;font-size:21px;line-height:1.35;color:${COLORS.text};font-weight:700;">${escapeHtml(heading)}</h1>
                    </td>
                  </tr>
                  ${sections.map((s, i) => renderSection(s, i === 0)).join("")}
                  ${
                    replyTo
                      ? `<tr>
                    <td align="center" style="padding:26px 0 4px;font-family:Arial,Helvetica,sans-serif;">
                      <a href="mailto:${escapeHtml(replyTo)}" style="display:inline-block;padding:13px 30px;border-radius:8px;background:${COLORS.accent};color:#FFFFFF;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;">Reply to message</a>
                    </td>
                  </tr>`
                      : ""
                  }
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:22px 12px 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.7;color:${COLORS.fade};">
                Sent automatically from the contact form on Adis Hegic's portfolio<br />
                Powered by <a href="https://www.digitalsolutions.adigic.se/" style="color:${COLORS.fade};">ADIGIC Digital Solutions</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function renderPlainText(opts: { heading: string; sections: EmailSection[] }) {
  const lines = [opts.heading, ""];
  for (const section of opts.sections) {
    const rows = section.rows ?? [];
    const list = section.list ?? [];
    if (!rows.length && !list.length) continue;

    lines.push(section.title.toUpperCase());
    for (const row of rows) {
      lines.push(`${row.label}: ${row.value?.trim() || "—"}`);
    }
    for (const item of list) {
      lines.push(`• ${item}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}
