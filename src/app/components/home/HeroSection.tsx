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
    description: "Free shipping on orders over $100",
    icon: LocalShippingRoundedIcon,
  },
  {
    title: "Quality Products",
    description: "Premium  brands",
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
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-5 px-6 pt-85">
          <div className="flex gap-2 text-sm font-semibold tracking-[0.25em]">
            <span className="flex items-center gap-1 text-orange-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarRoundedIcon key={index} sx={{ fontSize: 18 }} />
              ))}
            </span>
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
            High-quality items you can trust
          </h1>
          <p className="text-base sm:text-lg">
            {process.env.MAIN_PRODUCT} that&apos;s personalised to each
            individual&apos;s needs, providing the best possible outcomes.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Button
              variant="outlined"
              sx={{
                borderRadius: "999px",
                borderColor: "var(--foreground)",
                color: "var(--foreground)",
                paddingX: 3,
                paddingY: 1.2,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "var(--foreground)",
                  backgroundColor: "var(--accent-peach)",
                },
              }}
            >
              Shop Bestsellers
            </Button>
            <Button
              variant="text"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                color: "var(--foreground)",
                paddingX: 0,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "var(--accent-peach)",
                },
              }}
            >
              Explore Collections
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid grid-cols-4 justify-items-center gap-8 px-4 py-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-peach text-background">
                  <Icon sx={{ fontSize: 26 }} />
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {benefit.title}
                  </p>
                  <p className="text-sm text-gray-700">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
