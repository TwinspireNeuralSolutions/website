/**
 * Shared branded email shell.
 *
 * Email clients are hostile to modern CSS: no flexbox, no grid, no external
 * stylesheets, no SVG, inconsistent media query support. Everything here is
 * table-based layout with inline styles, which is the only reliable approach.
 */

const SITE = 'https://twinspire.ai'

export const BRAND = {
  navy:   '#1F2C7C',
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
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(heading)}</title>
  <style type="text/css">
    :root { color-scheme: light; supported-color-schemes: light; }

    /* Gmail app (Android + iOS) dark mode: it rewrites colours via [data-ogsc]/[data-ogsb].
       Force our brand values back so the navy header stays navy. */
    [data-ogsc] .ts-header,
    [data-ogsb] .ts-header      { background-color: ${BRAND.navy} !important; }
    [data-ogsc] .ts-card,
    [data-ogsb] .ts-card        { background-color: ${BRAND.white} !important; }
    [data-ogsc] .ts-canvas,
    [data-ogsb] .ts-canvas      { background-color: ${BRAND.paper} !important; }
    [data-ogsc] .ts-btn,
    [data-ogsb] .ts-btn         { background-color: ${BRAND.navy} !important; }
    [data-ogsc] .ts-btn a,
    [data-ogsb] .ts-btn a       { color: ${BRAND.white} !important; }
    [data-ogsc] .ts-sig,
    [data-ogsb] .ts-sig         { background-color: ${BRAND.navy} !important; }
    [data-ogsc] .ts-h1,
    [data-ogsb] .ts-h1          { color: ${BRAND.ink} !important; }
    [data-ogsc] .ts-body,
    [data-ogsb] .ts-body        { color: ${BRAND.body} !important; }
    [data-ogsc] .ts-eyebrow,
    [data-ogsb] .ts-eyebrow     { color: ${BRAND.navy} !important; }
    [data-ogsc] .ts-muted,
    [data-ogsb] .ts-muted       { color: ${BRAND.muted} !important; }

    /* Apple Mail / native dark mode */
    @media (prefers-color-scheme: dark) {
      .ts-header  { background-color: ${BRAND.navy} !important; }
      .ts-card    { background-color: ${BRAND.white} !important; }
      .ts-canvas  { background-color: ${BRAND.paper} !important; }
      .ts-btn     { background-color: ${BRAND.navy} !important; }
      .ts-btn a   { color: ${BRAND.white} !important; }
      .ts-sig     { background-color: ${BRAND.navy} !important; }
      .ts-h1      { color: ${BRAND.ink} !important; }
      .ts-body    { color: ${BRAND.body} !important; }
      .ts-eyebrow { color: ${BRAND.navy} !important; }
      .ts-muted   { color: ${BRAND.muted} !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.paper};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  ${preheader ? `<div style="display:none;font-size:1px;color:${BRAND.paper};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</div>` : ''}

  <table role="presentation" class="ts-canvas" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND.paper};padding:32px 16px;">
    <tr>
      <td align="center">

        <table role="presentation" class="ts-card" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:${BRAND.white};border-radius:6px;overflow:hidden;border:1px solid ${BRAND.line};">

          <!-- Header -->
          <tr>
            <td class="ts-header" style="background-color:${BRAND.navy};padding:28px 40px;">
              <img src="${SITE}/email/logo-email.png"
                   width="200" height="14" alt="Twinspire"
                   style="display:block;border:0;width:200px;height:auto;" />
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px;">
              ${eyebrow ? `<p class="ts-eyebrow" style="margin:0 0 12px;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND.navy};">${escapeHtml(eyebrow)}</p>` : ''}
              <h1 class="ts-h1" style="margin:0 0 20px;font-size:24px;line-height:1.25;font-weight:800;color:${BRAND.ink};letter-spacing:-0.01em;">${escapeHtml(heading)}</h1>
              ${body}
              ${cta ? `
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;">
                <tr>
                  <td class="ts-btn" style="background-color:${BRAND.navy};border-radius:6px;">
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
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
                    <tr><td class="ts-sig" style="background-color:${BRAND.navy};border-radius:4px;padding:9px 14px;">
                      <img src="${SITE}/email/logo-email-sig.png"
                           width="120" alt="Twinspire"
                           style="display:block;border:0;width:120px;height:auto;" />
                    </td></tr>
                  </table>
                  <p class="ts-muted" style="margin:0;font-size:12px;line-height:1.6;color:${BRAND.muted};">
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
              <p class="ts-muted" style="margin:0;font-size:11px;line-height:1.6;color:${BRAND.muted};">
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
  return `<p class="ts-body" style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${BRAND.body};">${text}</p>`
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
