export async function sendEmail({ to, subject, html }) {
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, html }),
      });
  
      const text = await response.text();
      console.log("📨 Server response:", response.status, text);
  
      if (!response.ok) {
        console.error("❌ Email failed:", text);
      }
    } catch (err) {
      console.error("⚠️ Error sending email:", err);
    }
  }
  