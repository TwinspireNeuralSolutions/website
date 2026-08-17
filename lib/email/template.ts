/**
 * Shared branded email shell.
 *
 * Email clients are hostile to modern CSS: no flexbox, no grid, no external
 * stylesheets, no SVG, inconsistent media query support. Everything here is
 * table-based layout with inline styles, which is the only reliable approach.
 */

const SITE = 'https://twinspire.ai'

export const BRAND = {
  navy:   '#0802A3',
  ink:    '#1a1a18',
  body:   '#3f3f46',
  muted:  '#71717a',
  line:   '#e4e4e7',
  paper:  '#f7f7f5',
  white:  '#ffffff',
  green:  '#1D9E75',
  amber:  '#BA7517',
} as const

export function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

interface ShellOptions {
  /** Small uppercase label above the headline */
  eyebrow?: string
  /** Main headline */
  heading: string
  /** Body HTML — paragraphs, tables, whatever */
  body: string
  /** Optional CTA button */
  cta?: { label: string; url: string }
  /** Preview text shown in the inbox list */
  preheader?: string
}

/**
 * Wraps content in the Twinspire branded shell:
 * navy header bar with logo → white content card → footer with legal line.
 */
export function emailShell({ eyebrow, heading, body, cta, preheader }: ShellOptions) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.paper};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  ${preheader ? `<div style="display:none;font-size:1px;color:${BRAND.paper};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</div>` : ''}

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND.paper};padding:32px 16px;">
    <tr>
      <td align="center">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:${BRAND.white};border-radius:6px;overflow:hidden;border:1px solid ${BRAND.line};">

          <!-- Header -->
          <tr>
            <td style="background-color:${BRAND.navy};padding:28px 40px;">
              <img src="${SITE}/email/logo-email.png"
                   width="200" height="14" alt="Twinspire"
                   style="display:block;border:0;width:200px;height:auto;" />
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px;">
              ${eyebrow ? `<p style="margin:0 0 12px;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND.navy};">${escapeHtml(eyebrow)}</p>` : ''}
              <h1 style="margin:0 0 20px;font-size:24px;line-height:1.25;font-weight:800;color:${BRAND.ink};letter-spacing:-0.01em;">${escapeHtml(heading)}</h1>
              ${body}
              ${cta ? `
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;">
                <tr>
                  <td style="background-color:${BRAND.navy};border-radius:6px;">
                    <a href="${cta.url}" style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:600;color:${BRAND.white};text-decoration:none;">${escapeHtml(cta.label)}</a>
                  </td>
                </tr>
              </table>` : ''}
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="padding:0 40px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="border-top:1px solid ${BRAND.line};padding-top:24px;">
                  <img src="${SITE}/email/logo-email-ink.png"
                       width="130" height="18" alt="Twinspire"
                       style="display:block;border:0;width:130px;height:auto;margin-bottom:10px;" />
                  <p style="margin:0;font-size:12px;line-height:1.6;color:${BRAND.muted};">
                    Individual athlete intelligence<br />
                    Copenhagen, Denmark ·
                    <a href="mailto:info@twinspire.ai" style="color:${BRAND.navy};text-decoration:none;">info@twinspire.ai</a> ·
                    <a href="${SITE}" style="color:${BRAND.navy};text-decoration:none;">twinspire.ai</a>
                  </p>
                </td></tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Legal footer -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;line-height:1.6;color:${BRAND.muted};">
                Twinspire is a decision support platform. It is not intended to diagnose or treat medical conditions.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`
}

/** Body paragraph with correct spacing and colour. */
export function p(text: string) {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${BRAND.body};">${text}</p>`
}

/** Key/value detail table used in internal notification emails. */
export function detailTable(rows: [string, string][], highlightLast = false) {
  const cells = rows.map(([k, v], i) => {
    const isLast = highlightLast && i === rows.length - 1
    return `<tr>
      <td style="padding:9px 20px 9px 0;font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:${BRAND.muted};white-space:nowrap;vertical-align:top;">${escapeHtml(k)}</td>
      <td style="padding:9px 0;font-size:14px;color:${isLast ? BRAND.navy : BRAND.ink};font-weight:${isLast ? '700' : '400'};">${escapeHtml(v)}</td>
    </tr>`
  }).join('')

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="margin:8px 0 0;border-top:1px solid ${BRAND.line};border-bottom:1px solid ${BRAND.line};">
    ${cells}
  </table>`
}
