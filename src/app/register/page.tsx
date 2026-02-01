"use client";

import Link from "next/link";
import HeaderSection from "../components/Header";
import FooterSection from "../components/Footer";

export default function RegisterPage() {
  return (
    <div className="bg-[#fbf7f4] text-[#2b1d17]">
      <HeaderSection />

      <section className="relative overflow-hidden bg-[#fbf2ee] pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-16 h-60 w-60 rounded-full bg-[#f3e1d8] blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-[#f2ded6] blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#ead7ce_1px,transparent_1px)] opacity-60 [background-size:18px_18px]" />
        </div>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pb-14 text-center">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#a37866]">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#ead7ce] bg-white text-[#8b4a2f]">
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c1.8-3 5-5 8-5s6.2 2 8 5" />
              </svg>
            </span>
            My account
          </div>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-[#2b1d17] sm:text-5xl">
            Register
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="rounded-[28px] border border-[#efe2db] bg-white px-6 py-12 shadow-[0_20px_50px_rgba(160,114,90,0.14)] sm:px-12">
          <form className="mx-auto flex max-w-xl flex-col gap-6">
            <label className="text-sm font-semibold text-[#2b1d17]">
              Username <span className="text-[#8b4a2f]">*</span>
              <input
                type="text"
                name="username"
                className="mt-2 w-full rounded-lg border border-[#e5cdbf] bg-white px-4 py-3 text-sm text-[#2b1d17] outline-none transition focus:border-[#8b4a2f]"
              />
            </label>

            <label className="text-sm font-semibold text-[#2b1d17]">
              Email address <span className="text-[#8b4a2f]">*</span>
              <input
                type="email"
                name="email"
                className="mt-2 w-full rounded-lg border border-[#e5cdbf] bg-white px-4 py-3 text-sm text-[#2b1d17] outline-none transition focus:border-[#8b4a2f]"
              />
            </label>

            <label className="text-sm font-semibold text-[#2b1d17]">
              Password <span className="text-[#8b4a2f]">*</span>
              <div className="relative mt-2">
                <input
                  type="password"
                  name="password"
                  className="w-full rounded-lg border border-[#e5cdbf] bg-white px-4 py-3 pr-12 text-sm text-[#2b1d17] outline-none transition focus:border-[#8b4a2f]"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8b4a2f]">
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
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M3 3l18 18" />
                  </svg>
                </span>
              </div>
            </label>

            <p className="text-xs text-[#7c5d52]">
              Your personal data will be used to support your experience on this
              website, to manage access to your account, and for other purposes
              described in our privacy policy.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="rounded-lg bg-[#8b4a2f] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#7a4029]"
              >
                Create Account
              </button>
              <Link href="/login" className="text-sm text-[#6e5146] underline">
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
