"use client";

import Button from "@mui/material/Button";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";

const benefits = [
  {
    title: "Returns & Exchange",
    description: "Hassle free 15 day returns",
    icon: ReplayRoundedIcon,
  },
  {
    title: "Free Fast Shipping",
    description: "For orders above $100",
    icon: LocalShippingRoundedIcon,
  },
  {
    title: "Quality Products",
    description: "Premium skincare brands",
    icon: FactCheckRoundedIcon,
  },
  {
    title: "Secure Payments",
    description: "Trusted payment platforms",
    icon: MemoryRoundedIcon,
  },
];

export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/50 to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-24 pt-40 text-white">
          <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.25em] text-white/90">
            <span className="flex items-center gap-1 text-[#e28a3c]">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarRoundedIcon key={index} sx={{ fontSize: 18 }} />
              ))}
            </span>
            <span>102+ FIVE STAR RATINGS</span>
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
            Always high-quality items
          </h1>
          <p className="max-w-2xl text-base text-white/80 sm:text-lg">
            Skincare treatments that&apos;s personalised to each
            individual&apos;s needs, providing the best possible outcomes.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Button
              variant="outlined"
              sx={{
                borderRadius: "999px",
                borderColor: "rgba(255, 255, 255, 0.7)",
                color: "#fff",
                paddingX: 3,
                paddingY: 1.2,
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                },
              }}
            >
              Request a Free Consultation
            </Button>
            <Button
              variant="text"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                color: "#fff",
                paddingX: 0,
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 600,
                "&:hover": { backgroundColor: "transparent", opacity: 0.85 },
              }}
            >
              Book Online
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-[#fdeee7]">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8cdb6] text-[#1f1f1f]">
                  <Icon sx={{ fontSize: 26 }} />
                </div>
                <div>
                  <p className="text-base font-semibold text-[#1f1f1f]">
                    {benefit.title}
                  </p>
                  <p className="text-sm text-[#3b3b3b]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
