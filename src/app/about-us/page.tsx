const missionValues = [
  {
    title: "Personalized Care",
    description: "Treatments tailored to your unique skin goals.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.75A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
      </svg>
    ),
  },
  {
    title: "Trusted Standards",
    description: "Certified protocols and transparent processes.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 2 4 6v6c0 5 4 9 8 10 4-1 8-5 8-10V6l-8-4z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Visible Results",
    description: "Real outcomes measured and celebrated.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="m12 2 3.5 7 7.5 1.1-5.5 5.4 1.3 7.5L12 19l-6.8 3.9 1.3-7.5L1 10.1 8.5 9 12 2z" />
      </svg>
    ),
  },
  {
    title: "Wellness First",
    description: "Comfort-focused, calm, and restorative care.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M4 14c2.5-1.5 5-.5 6 1 1-2 4-4 8-4-1 4-4 8-8 9-4-1-6-3-6-6z" />
      </svg>
    ),
  },
];

const experts = [
  {
    name: "Chris Johnson",
    role: "Lead Aesthetician & Founder",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Ava Peterson",
    role: "Senior Aesthetician",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Emma Johnson",
    role: "Therapeutic Specialist",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Mia Thompson",
    role: "Registered Nurse",
    image:
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=400&q=80",
  },
];

const certifications = [
  "Rigourously Tested Protocols",
  "ISO 9001 Quality Standards",
  "Industry-Leading Best Practices",
  "Accredited Facilities",
  "Client Safety First",
  "National Health Guidelines",
  "ABC Approved Treatments",
  "Licensed Practitioners",
  "Board Certified Staff",
  "Ongoing Staff Training & Development",
  "Sterilization & Hygiene Protocols",
];

export default function AboutUsPage() {
  return (
    <div className="bg-[#fbf7f4] text-[#2b1d17]">
      <section className="relative overflow-hidden bg-[#f7dfd3] pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-8 h-56 w-56 rounded-full bg-[#f3cdbf] opacity-70 blur-3xl" />
          <div className="absolute right-0 top-6 h-64 w-64 rounded-full bg-[#f6d7c8] opacity-70 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#e9c0b2_1px,transparent_1px)] opacity-60 [background-size:20px_20px]" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 pb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#9b6b5b]">
            About Us
          </p>
          <h1 className="font-serif text-4xl font-semibold text-[#2b1d17] sm:text-5xl">
            Your Trusted Partner
          </h1>
          <p className="max-w-2xl text-sm text-[#7c5d52] sm:text-base">
            We&apos;re dedicated to helping you achieve healthy, radiant skin
            through personalized treatments and expert care. Our mission is to
            enhance your natural beauty while prioritizing your comfort and
            safety.
          </p>

          <div className="absolute left-6 top-10 hidden h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white shadow-[0_12px_30px_rgba(160,114,90,0.2)] md:flex">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
              alt="Client portrait"
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>
          <div className="absolute right-6 top-8 hidden h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white shadow-[0_12px_30px_rgba(160,114,90,0.2)] md:flex">
            <img
              src="https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=200&q=80"
              alt="Specialist portrait"
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fbf2ee]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#2b1d17]">
              Our Story
            </h2>
            <p className="mt-4 text-sm text-[#7c5d52]">
              Sophie was founded in 2008 with a simple mission: to provide
              accessible, professional skincare treatments that deliver real
              results. What started as a small clinic has grown into a trusted
              destination for comprehensive skincare solutions.
            </p>
            <p className="mt-4 text-sm text-[#7c5d52]">
              Our founder, Dr. Sarah Mitchell, recognized the need for
              personalized skincare treatments that address individual concerns
              rather than offering a one-size-fits-all approach.
            </p>
            <p className="mt-4 text-sm text-[#7c5d52]">
              We believe that healthy skin is the foundation of confidence, and
              we are committed to helping each client achieve their unique
              skincare goals through safe, effective, and innovative treatments.
            </p>
          </div>
          <div className="rounded-[28px] border border-[#efe2db] bg-white p-4 shadow-[0_18px_45px_rgba(160,114,90,0.12)]">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80"
              alt="Sophia clinic"
              className="h-full w-full rounded-[22px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7f4]">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="font-serif text-2xl font-semibold text-[#8b4a2f]">
            Our Mission &amp; Values
          </h2>
          <p className="mt-3 text-sm text-[#7c5d52]">
            We are guided by core principles that ensure every client receives
            exceptional care and results.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {missionValues.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-[#f0d9d0] bg-white px-5 py-6 shadow-[0_12px_30px_rgba(160,114,90,0.12)]"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#f7d9c8] text-[#8b4a2f]">
                  {value.icon}
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-[#2b1d17]">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-[#7c5d52]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111111]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-12 text-[#f8f1ec] md:grid-cols-[1.1fr_1fr]">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80"
              alt="Treatment session"
              className="h-56 w-full rounded-2xl object-cover md:h-64"
            />
            <div className="absolute -bottom-6 left-6 rounded-xl bg-[#c16a3a] px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em]">
              Treatment Options
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0c7b5]">
                Satisfaction Rate
              </p>
              <div className="mt-3 h-3 w-full rounded-full bg-[#2a1e19]">
                <div className="h-3 w-4/5 rounded-full bg-[#c16a3a]" />
              </div>
              <p className="mt-2 text-sm text-[#e7d4c8]">
                96% of clients report glowing, long-lasting results.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0c7b5]">
                Repeat Clients
              </p>
              <div className="mt-3 h-3 w-full rounded-full bg-[#2a1e19]">
                <div className="h-3 w-3/4 rounded-full bg-[#f0c7b5]" />
              </div>
              <p className="mt-2 text-sm text-[#e7d4c8]">
                82% return for ongoing care and personalized plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7f4]">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="font-serif text-2xl font-semibold text-[#8b4a2f]">
            Meet our Experts
          </h2>
          <p className="mt-3 text-sm text-[#7c5d52]">
            Our certified professionals bring years of experience and passion
            for skincare excellence.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {experts.map((expert) => (
              <div
                key={expert.name}
                className="rounded-2xl border border-[#f0d9d0] bg-white text-left shadow-[0_12px_30px_rgba(160,114,90,0.12)]"
              >
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="h-52 w-full rounded-t-2xl object-cover"
                />
                <div className="px-4 pb-5 pt-4">
                  <h3 className="font-serif text-base font-semibold text-[#2b1d17]">
                    {expert.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#8b4a2f]">
                    {expert.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf2ee]">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="font-serif text-2xl font-semibold text-[#8b4a2f]">
            Certification &amp; Standards
          </h2>
          <p className="mt-3 text-sm text-[#7c5d52]">
            We maintain the highest industry standards and certifications to
            ensure your safety and satisfaction.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {certifications.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#f0d9d0] bg-white px-4 py-2 text-xs font-semibold text-[#8b4a2f]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
