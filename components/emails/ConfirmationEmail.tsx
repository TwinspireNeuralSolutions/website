/**
 * buildConfirmationEmail
 *
 * Returns a plain HTML string for the confirmation email sent to applicants
 * who submit the "Join Our Founding Pilot Cohort" form.
 *
 * Implemented as a plain function (not a React component) so it can be
 * called directly from a Next.js App Router route handler without requiring
 * react-dom/server.
 */
export function buildConfirmationEmail(name: string): string {
  const safeName = escapeHtml(name)

  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Thanks for reaching out &mdash; Twinspire</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5fb;padding:40px 16px;">
    <tbody>
      <tr>
        <td align="center">

          <!-- Card -->
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(8,2,163,0.07);">
            <tbody>

              <!-- Header strip -->
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
                    Hey ${safeName}, thanks for reaching out!
                  </p>
                  <p style="margin:16px 0 0;font-size:15px;color:#737373;line-height:1.8;">
                    We&rsquo;ve received your message and are excited to connect with you.
                    A member of our team will be in touch shortly to learn more about
                    your goals and how Twinspire can help.
                  </p>
                  <p style="margin:16px 0 0;font-size:15px;color:#737373;line-height:1.8;">
                    In the meantime, feel free to reply to this email if you have any
                    questions &mdash; we&rsquo;d love to hear from you.
                  </p>
                </td>
              </tr>

              <!-- Divider -->
              <tr>
                <td style="padding:0 40px;">
                  <div style="height:1px;background-color:#e5e5e5;"></div>
                </td>
              </tr>

              <!-- Signature -->
              <tr>
                <td style="padding:28px 40px 40px;">
                  <p style="margin:0;font-size:15px;color:#0a0a0a;font-weight:600;">Warm regards,</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#737373;">The Twinspire Team</p>
                </td>
              </tr>

              <!-- Footer strip -->
              <tr>
                <td style="background-color:#e6e6f3;padding:20px 40px;text-align:center;">
                  <p style="margin:0;font-size:12px;color:#737373;">
                    Twinspire Neural Solutions &middot; Copenhagen, Denmark
                  </p>
                  <p style="margin:4px 0 0;font-size:12px;">
                    <a href="mailto:info@twinspire.ai" style="color:#0802A3;text-decoration:none;">info@twinspire.ai</a>
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

/** Minimal HTML escaping to prevent injection in the email body. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
