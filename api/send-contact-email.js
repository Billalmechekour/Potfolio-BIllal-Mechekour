const parseBody = (body) => {
  if (!body) {
    return {};
  }
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName = "", lastName = "", message = "" } = parseBody(req.body);
  const cleanMessage = String(message).trim();

  if (!cleanMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "billalmechekour@gmail.com";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  if (!resendApiKey) {
    return res.status(500).json({
      error: "Missing RESEND_API_KEY in server environment.",
    });
  }

  const fullName = `${String(firstName).trim()} ${String(lastName).trim()}`.trim();
  const senderName = fullName || "Visiteur du portfolio";

  const subject = `Nouveau message portfolio - ${senderName}`;
  const text = [
    `Nom: ${senderName}`,
    "",
    "Message:",
    cleanMessage,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject,
        text,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(502).json({
        error: "Email API request failed",
        details: data,
      });
    }

    return res.status(200).json({
      ok: true,
      emailId: data?.id || null,
    });
  } catch {
    return res.status(500).json({
      error: "Unexpected server error while sending email.",
    });
  }
}
