export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const phone = String(data.phone || "").trim();
    const subject = String(data.subject || "Website enquiry").trim();
    const message = String(data.message || "").trim();
    if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response("Invalid form data", { status: 400 });
    }
    if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
      return new Response("Contact form is not configured. Please email support@iftlifesciences.com.", { status: 503 });
    }
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `IFT Life Sciences website: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`
      })
    });
    if (!response.ok) return new Response("Unable to send enquiry", { status: 502 });
    return Response.json({ ok: true });
  } catch {
    return new Response("Invalid request", { status: 400 });
  }
}
