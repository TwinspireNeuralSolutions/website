/**
 * buildApplyConfirmationEmail
 *
 * Returns a plain HTML string for the confirmation email sent to job applicants.
 * Same visual style as ConfirmationEmail — reusable, no React server rendering needed.
 */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function buildApplyConfirmationEmail(
  name: string,
  jobTitle: string
): string {
  const safeName = escapeHtml(name)
  const safeJob = escapeHtml(jobTitle)

  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Application received &mdash; Twinspire</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5fb;padding:40px 16px;">
    <tbody>
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(8,2,163,0.07);">
            <tbody>

              <!-- Header -->
              <tr>
                <td style="background-color:#0802A3;padding:32px 40px;text-align:center;">
                  <img
                    src="https://twinspire.ai/logo-text/logo-white.png"
                    alt="Twinspire"
                    width="150"
                    style="display:inline-block;max-width:150px;"
                  />
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:40px 40px 32px;">
                  <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0a0a0a;line-height:1.2;">
                    Thanks for applying, ${safeName}!
                  </p>
                  <p style="margin:16px 0 0;font-size:15px;color:#737373;line-height:1.8;">
                    We&rsquo;ve received your application for <strong style="color:#0a0a0a;">${safeJob}</strong>
                    and will review it carefully.
                  </p>
                  <p style="margin:16px 0 0;font-size:15px;color:#737373;line-height:1.8;">
                    If your background looks like a strong fit, someone from the team will be
                    in touch directly. Either way, we appreciate you taking the time to apply.
                  </p>
                  <p style="margin:16px 0 0;font-size:15px;color:#737373;line-height:1.8;">
                    Feel free to reply to this email with any questions in the meantime.
                  </p>
                </td>
              </tr>

              <!-- Divider -->
              <tr>
                <td style="padding:0 40px;">
                  <div style="border-top:1px solid #e5e5e5;"></div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:24px 40px 32px;">
                  <p style="margin:0;font-size:13px;color:#a3a3a3;line-height:1.6;">
                    Twinspire Neural Solutions &mdash; DTU, Copenhagen<br/>
                    <a href="https://twinspire.ai" style="color:#0802A3;text-decoration:none;">twinspire.ai</a>
                  </p>
                </td>
              </tr>

            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>

</body>
</html>`
}
