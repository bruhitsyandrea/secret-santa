export async function sendEmail({ to, subject, html }) {
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    const FROM_EMAIL = import.meta.env.FROM_EMAIL;
  
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
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
        console.error("Email failed:", await response.text());
      }
    } catch (err) {
      console.error("Error sending email:", err);
    }
  }
  