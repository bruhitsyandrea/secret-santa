// /api/sendEmail.js
export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const RESEND_API_KEY = process.env.VITE_RESEND_API_KEY;
    const FROM_EMAIL = process.env.VITE_FROM_EMAIL;
  
    try {
      const { to, subject, html } = req.body;
  
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (err) {
      console.error("Error sending email:", err);
      res.status(500).json({ error: "Failed to send email" });
    }
  }
  