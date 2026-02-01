import HeaderSection from "../components/Header";
import FooterSection from "../components/Footer";

const contactOptions = [
  {
    title: "Phone",
    description: "Call us for immediate assistance or to book an appointment.",
    lines: ["(01) 123-4567", "Mon-Fri: 9AM-7PM"],
    icon: (
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.82.3 1.61.54 2.36a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.81-1.09a2 2 0 0 1 2.11-.45c.75.24 1.54.42 2.36.54A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: "Email",
    description: "Send us a message and we'll respond within 24 hours.",
    lines: ["info@sophiastheme.com", "booking@sophiatheme.com"],
    icon: (
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    ),
  },
  {
    title: "Live Chat",
    description: "Chat with our customer service team in real-time.",
    lines: ["Available Mon-Fri", "9AM-6PM AEST"],
    icon: (
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        <path d="M8 9h8" />
        <path d="M8 13h6" />
      </svg>
    ),
  },
  {
    title: "Location",
    description: "Visit us in the heart of the wellness district.",
    lines: ["Level 1, 18 Beauty Lane", "Wellness City, NSW 12345"],
    icon: (
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 1 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const businessHours = [
  ["Monday", "9:00 AM - 7:00 PM"],
  ["Tuesday", "9:00 AM - 7:00 PM"],
  ["Wednesday", "9:00 AM - 7:00 PM"],
  ["Thursday", "9:00 AM - 7:00 PM"],
  ["Friday", "9:00 AM - 7:00 PM"],
  ["Saturday", "9:00 AM - 5:00 PM"],
  ["Sunday", "Closed"],
];

const infoAccordions = [
  {
    title: "Parking",
    description: "Parking Details: Everything You Need to Know",
    body: "We have dedicated parking spaces right next to the clinic entrance. Additional street parking is available for visitors, and we validate tickets for appointments longer than one hour.",
  },
  {
    title: "Public Transport",
    description:
      "Public Transport Information: Essential Insights You Should Have",
    body: "Take the Green Line to Wellness Station and walk two blocks east. The 403 bus stops directly in front of Beauty Lane every 15 minutes on weekdays.",
  },
  {
    title: "New Patient Information",
    description: "New Patient Insights: Key Details You Need to Know",
    body: "Please arrive 10 minutes early to complete the intake form. Bring any relevant medical information so we can tailor your consultation and skincare plan.",
  },
];

export default function ContactUsPage() {
  return (
    <div className="bg-[#fbf7f4] text-[#2b1d17]">
      <HeaderSection />

      <section className="relative overflow-hidden bg-[#f7dfd3] pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-12 h-56 w-56 rounded-full bg-[#f3cdbf] opacity-70 blur-3xl" />
          <div className="absolute right-0 top-6 h-64 w-64 rounded-full bg-[#f6d7c8] opacity-70 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#e9c0b2_1px,transparent_1px)] opacity-60 [background-size:20px_20px]" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 pb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#9b6b5b]">
            Contact Us
          </p>
          <h1 className="font-serif text-4xl font-semibold text-[#2b1d17] sm:text-5xl">
            Get in Touch
          </h1>
          <p className="max-w-2xl text-sm text-[#7c5d52] sm:text-base">
            We&apos;re here to answer your questions, help you book
            appointments, and support your skincare journey every step of the
            way.
          </p>

          <div className="absolute left-6 top-10 hidden h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#f7e6df] to-[#d9b1a4] shadow-[0_12px_30px_rgba(160,114,90,0.2)] md:flex">
            <span className="text-sm font-semibold text-[#4a2e26]">A</span>
          </div>
          <div className="absolute right-6 top-8 hidden h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#e6d7f6] to-[#c4a9d8] shadow-[0_12px_30px_rgba(160,114,90,0.2)] md:flex">
            <span className="text-sm font-semibold text-[#3d2a4a]">E</span>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf2ee]">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {contactOptions.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#f0d9d0] bg-[#fdf6f2] px-5 py-6 text-center shadow-[0_14px_35px_rgba(160,114,90,0.12)]"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#f7d9c8] text-[#8b4a2f]">
                {item.icon}
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-[#2b1d17]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[#7c5d52]">{item.description}</p>
              <div className="mt-4 space-y-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#8b4a2f]">
                {item.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-[28px] border border-[#efe2db] bg-white px-6 py-10 shadow-[0_18px_45px_rgba(160,114,90,0.12)] sm:px-10">
            <h2 className="font-serif text-2xl font-semibold text-[#2b1d17]">
              Send us Message
            </h2>
            <p className="mt-2 text-sm text-[#7c5d52]">
              Tell us what you&apos;re looking for and we&apos;ll respond within
              1 business day.
            </p>
            <form className="mt-8 grid gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7c5d52]">
                  First name <span className="text-[#8b4a2f]">*</span>
                  <input
                    type="text"
                    name="firstName"
                    className="mt-2 w-full rounded-lg border border-[#e5cdbf] bg-white px-4 py-3 text-sm text-[#2b1d17] outline-none transition focus:border-[#8b4a2f]"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7c5d52]">
                  Last name
                  <input
                    type="text"
                    name="lastName"
                    className="mt-2 w-full rounded-lg border border-[#e5cdbf] bg-white px-4 py-3 text-sm text-[#2b1d17] outline-none transition focus:border-[#8b4a2f]"
                  />
                </label>
              </div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7c5d52]">
                Email <span className="text-[#8b4a2f]">*</span>
                <input
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-lg border border-[#e5cdbf] bg-white px-4 py-3 text-sm text-[#2b1d17] outline-none transition focus:border-[#8b4a2f]"
                />
              </label>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7c5d52]">
                Subject <span className="text-[#8b4a2f]">*</span>
                <input
                  type="text"
                  name="subject"
                  className="mt-2 w-full rounded-lg border border-[#e5cdbf] bg-white px-4 py-3 text-sm text-[#2b1d17] outline-none transition focus:border-[#8b4a2f]"
                />
              </label>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7c5d52]">
                Comments <span className="text-[#8b4a2f]">*</span>
                <textarea
                  name="comments"
                  rows={5}
                  className="mt-2 w-full resize-none rounded-lg border border-[#e5cdbf] bg-white px-4 py-3 text-sm text-[#2b1d17] outline-none transition focus:border-[#8b4a2f]"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-[#8b4a2f] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(139,74,47,0.3)] transition hover:bg-[#7a4029] sm:w-auto"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-[#efe2db] bg-white px-6 py-8 shadow-[0_18px_45px_rgba(160,114,90,0.12)]">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#2b1d17]">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f7e8e1] text-[#8b4a2f]">
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                </span>
                Business Hours
              </div>
              <div className="mt-5 space-y-3 text-sm text-[#6e5146]">
                {businessHours.map(([day, time]) => (
                  <div key={day} className="flex items-center justify-between">
                    <span>{day}</span>
                    <span className="font-semibold text-[#2b1d17]">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-[#efe2db] bg-white px-6 py-8 shadow-[0_18px_45px_rgba(160,114,90,0.12)]">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#2b1d17]">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f7e8e1] text-[#8b4a2f]">
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 9v4" />
                    <path d="M12 16h.01" />
                  </svg>
                </span>
                Frequently Asked Questions
              </div>
              <p className="mt-4 text-sm text-[#7c5d52]">
                Check out the frequently asked questions and their answers that
                we receive regularly.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8b4a2f]"
              >
                View FAQ&apos;s
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <div className="rounded-[24px] border border-[#efe2db] bg-white px-6 py-8 shadow-[0_18px_45px_rgba(160,114,90,0.12)]">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#2b1d17]">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f7e8e1] text-[#8b4a2f]">
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 8a2 2 0 0 1-2 2H5l-4 4V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
                    <path d="M7 8h.01" />
                    <path d="M12 8h.01" />
                    <path d="M17 8h.01" />
                  </svg>
                </span>
                Follow Us
              </div>
              <p className="mt-4 text-sm text-[#7c5d52]">
                Stay connected for skincare tips and special offers.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Facebook", "Twitter", "Instagram", "TikTok"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="rounded-full border border-[#ead7ce] bg-[#fff6f2] px-4 py-2 text-xs font-semibold text-[#2b1d17]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf2ee]">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-semibold text-[#8b4a2f]">
              Other Important Information
            </h2>
            <p className="mt-2 text-sm text-[#7c5d52]">
              Find essential details regarding parking, transportation options,
              and what new patients need to know.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {infoAccordions.map((item) => (
              <details
                key={item.title}
                className="group rounded-2xl border border-[#efe2db] bg-white px-6 py-4 shadow-[0_14px_35px_rgba(160,114,90,0.12)]"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f7e8e1] text-[#8b4a2f]">
                      <svg
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 7h16" />
                        <path d="M4 12h10" />
                        <path d="M4 17h16" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#2b1d17]">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#7c5d52]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-lg text-[#8b4a2f] transition group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="mt-4 text-sm text-[#6e5146]">{item.body}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
