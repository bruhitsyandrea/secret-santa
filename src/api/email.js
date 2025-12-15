export async function sendEmail({ to, subject, html }) {
    const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
    const FROM_EMAIL = import.meta.env.VITE_FROM_EMAIL;
  
    if (!RESEND_API_KEY || !FROM_EMAIL) {
      console.error("❌ Missing VITE_RESEND_API_KEY or VITE_FROM_EMAIL in environment variables.");
      return;
    }
  
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
  
      const text = await response.text();
  
      if (!response.ok) {
        console.error("❌ Email send failed:", text);
      } else {
        console.log("📧 Email sent successfully to", to);
      }
    } catch (err) {
      console.error("⚠️ Error sending email:", err);
    }
  }
  