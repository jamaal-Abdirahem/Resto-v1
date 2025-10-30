import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useSEO } from "../lib/useSEO";

export default function Contact() {
  useSEO({
    title: "Contact Resto — Get Started Free",
    description:
      "Talk to our team about the $0/month Resto system. Installation, training, and ongoing local support included.",
    path: "/contact",
    image: "/media/CTA%20img.jpg",
  });
  const TARGET_EMAIL =
    import.meta.env.VITE_CONTACT_EMAIL || "jamaalabdirahim@gmail.com";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentVia, setSentVia] = useState(
    /** 'emailjs' | 'mailto' | null */ null
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const subject = `New Resto Inquiry - ${name || "Website"}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;

    // Try EmailJS if configured
    const sid = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const tid = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const pk = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      from_name: name,
      from_email: email,
      phone,
      message,
      subject,
      to_email: TARGET_EMAIL,
    };

    let usedEmailJS = false;
    try {
      if (sid && tid && pk) {
        await emailjs.send(sid, tid, templateParams, { publicKey: pk });
        usedEmailJS = true;
      }
    } catch {
      // fall back to mailto below
    }

    if (usedEmailJS) {
      setSent(true);
      setSentVia("emailjs");
      setSending(false);
      // Optionally clear fields
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      return;
    }

    // Fallback: open email client
    const mailto = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
    setSentVia("mailto");
    setSending(false);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 reveal">
      <h1 className="title text-gray-900">Get In Touch</h1>
      <p className="mt-3 body text-gray-600 max-w-2xl">
        Tell us about your restaurant and we’ll help you get started with
        Resto—installation, training and ongoing support are all included.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 reveal-children">
        {/* Contact form */}
        <form
          className="grid gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
          onSubmit={onSubmit}
        >
          <label className="text-sm text-gray-700">
            Name
            <input
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E6533C]/60"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="text-sm text-gray-700">
            Email
            <input
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E6533C]/60"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="text-sm text-gray-700">
            Phone
            <input
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E6533C]/60"
              placeholder="+252 61 000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <label className="text-sm text-gray-700">
            Message
            <textarea
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E6533C]/60"
              rows="4"
              placeholder="How can we help?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <button
            disabled={sending}
            className="inline-flex w-fit items-center rounded-lg bg-[#E6533C] px-5 py-2.5 text-white text-sm font-semibold hover:opacity-95 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send Email"}
          </button>
          {sent && sentVia === "mailto" && (
            <div className="rounded-md bg-green-50 text-green-700 px-3 py-2 text-sm">
              We opened your email app with the message pre-filled. If it didn’t
              open, email us directly at{" "}
              <a className="underline" href={`mailto:${TARGET_EMAIL}`}>
                {TARGET_EMAIL}
              </a>
              .
            </div>
          )}
          {sent && sentVia === "emailjs" && (
            <div className="rounded-md bg-green-50 text-green-700 px-3 py-2 text-sm">
              Thanks! Your message was sent successfully. We’ll get back to you
              shortly.
            </div>
          )}
          <p className="text-xs text-gray-500">
            We’ll never share your information. By contacting us you agree to
            our privacy policy.
          </p>
          <div className="mt-2 flex gap-3 text-sm text-gray-700">
            <a
              className="inline-flex items-center gap-1 text-[#2E4BFF] hover:underline"
              href={`mailto:${TARGET_EMAIL}`}
            >
              <Mail className="h-4 w-4" />
              {TARGET_EMAIL}
            </a>
            <a
              className="inline-flex items-center gap-1 text-[#2E4BFF] hover:underline"
              href="tel:+252610000000"
            >
              <Phone className="h-4 w-4" />
              +252 61 000 0000
            </a>
          </div>
        </form>

        {/* Direct contact + map */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-900">
              Direct Contact
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>
                Email:{" "}
                <a
                  className="text-[#2E4BFF] hover:underline"
                  href="mailto:hello@resto.so"
                >
                  hello@resto.so
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  className="text-[#2E4BFF] hover:underline"
                  href="tel:+252610000000"
                >
                  +252 61 000 0000
                </a>
              </li>
              <li>Hours: Sat–Thu, 9:00–18:00 EAT</li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              We’re based in Mogadishu and support customers across Somalia.
            </p>
          </div>

          <div className="rounded-xl overflow-hidden ring-1 ring-gray-200">
            <iframe
              title="Resto Location"
              className="w-full aspect-video"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=2.038639,45.29825&z=15&output=embed"
            />
            <div className="flex items-center justify-between bg-white/80 px-3 py-2 text-xs text-gray-600">
              <span>Coordinates: 2.038639, 45.29825</span>
              <a
                className="text-[#2E4BFF] hover:underline"
                href="https://maps.google.com/?q=2.038639,45.29825"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
