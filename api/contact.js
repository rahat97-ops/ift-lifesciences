export async function POST(request) {
  try {
    const data = await request.json();
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const phone = String(data.phone || "").trim();
    const subject = String(data.subject || "").trim();
    const message = String(data.message || "").trim();

    if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid form data" }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) {
      return new Response(JSON.stringify({ error: "Contact form is not configured." }), { 
        status: 503, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `IFT Life Sciences website: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`
      })
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Unable to send enquiry" }), { 
        status: 502, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    return new Response(JSON.stringify({ ok: true }), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { 
      status: 400, 
      headers: { "Content-Type": "application/json" } 
    });
  }
}
