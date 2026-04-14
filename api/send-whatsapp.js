const META_GRAPH_VERSION = "v21.0";

const normalizePhone = (value) => String(value || "").replace(/[^\d]/g, "");

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

  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipientPhone = normalizePhone(
    process.env.WHATSAPP_RECIPIENT_PHONE || "33749718652"
  );

  if (!accessToken || !phoneNumberId || !recipientPhone) {
    return res.status(500).json({
      error:
        "WhatsApp API is not configured. Add WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_RECIPIENT_PHONE.",
    });
  }

  const fullName = `${String(firstName).trim()} ${String(lastName).trim()}`.trim();
  const sender = fullName || "Portfolio";
  const textBody = [
    "Nouveau message depuis le portfolio",
    `Nom: ${sender}`,
    "",
    cleanMessage,
  ].join("\n");

  try {
    const response = await fetch(
      `https://graph.facebook.com/${META_GRAPH_VERSION}/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: recipientPhone,
          type: "text",
          text: {
            preview_url: false,
            body: textBody,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(502).json({
        error: "WhatsApp API request failed",
        details: data,
      });
    }

    return res.status(200).json({
      ok: true,
      messageId: data?.messages?.[0]?.id || null,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected server error while sending WhatsApp message",
    });
  }
}
