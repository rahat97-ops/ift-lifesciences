export async function onRequestPost({ request, env }) {
  const json = (data, status = 200) => new Response(JSON.stringify(data), {
    status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return json({ error: "Contact form email service is not configured yet. Please contact the site owner directly." }, 503);
  }
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return json({ error: "Invalid request format." }, 415);
  let data;
  try { data = await request.json(); } catch { return json({ error: "Invalid form data." }, 400); }
  const clean = (value, max = 5000) => String(value ?? "").trim().slice(0, max);
  const name = clean(data.name, 100);
  const company = clean(data.company, 150);
  const email = clean(data.email, 200);
  const phone = clean(data.phone, 40);
  const topic = clean(data.topic, 100);
  const product = clean(data.product, 150);
  const message = clean(data.message, 5000);
  if (!name || !email || !topic || !message || data.consent !== "on") {
    return json({ error: "Please complete all required fields and agree to the privacy notice." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Please enter a valid email address." }, 400);
  const safe = s => s.replace(/[&<>"]/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[ch]));
  const html = `<h2>New IFT Life Sciences website enquiry</h2>
    <p><b>Name:</b> ${safe(name)}</p><p><b>Company:</b> ${safe(company || "Not provided")}</p>
    <p><b>Email:</b> ${safe(email)}</p><p><b>Phone:</b> ${safe(phone || "Not provided")}</p>
    <p><b>Enquiry type:</b> ${safe(topic)}</p><p><b>Product:</b> ${safe(product || "Not specified")}</p>
    <p><b>Message:</b><br>${safe(message).replace(/\n/g, "<br>")}</p>`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Website enquiry: ${topic}`,
      html
    })
  });
  if (!response.ok) {
    return json({ error: "We could not deliver your message right now. Please try again later or contact us directly." }, 502);
  }
  return json({ ok: true });
}
