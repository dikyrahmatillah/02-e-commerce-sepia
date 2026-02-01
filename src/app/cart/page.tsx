import Image from "next/image";
import Link from "next/link";
import HeaderSection from "../components/Header";
import FooterSection from "../components/Footer";

const newInStore = [
  {
    id: "zen-essentials-tote",
    name: "Zen Essentials Tote Bag",
    price: "$14.40",
    oldPrice: "$18.00",
    badge: "Sale",
    imageSrc: "/products/product-pouch.svg",
    cta: "Add To Cart",
  },
  {
    id: "time-reverse-retinol",
    name: "Time Reverse Retinol Treatment",
    price: "$25.60 - $54.00",
    badge: "Sale",
    imageSrc: "/products/product-tube.svg",
    cta: "View Products",
  },
  {
    id: "rose-silk-eye-cream",
    name: "Rose Silk Eye Cream",
    price: "$48.00",
    imageSrc: "/products/product-bottle.svg",
    cta: "Buy From Alpha",
  },
];

export default function CartPage() {
  return (
    <div className="bg-[#fbf7f4] text-[#2b1d17]">
      <HeaderSection />

      <section className="relative overflow-hidden bg-[#fbf2ee] pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-16 h-60 w-60 rounded-full bg-[#f3e1d8] blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-[#f2ded6] blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#ead7ce_1px,transparent_1px)] opacity-60 [background-size:18px_18px]" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-[32px] border border-[#efe2db] bg-white/70 px-6 py-16 shadow-[0_18px_45px_rgba(160,114,90,0.12)] sm:px-10">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-[#f7e8e1] text-[#2b1d17]">
              <svg
                aria-hidden="true"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
                <path d="M5 6h16l-1.5 9h-11z" />
                <path d="M6 6l-1-3H3" />
              </svg>
            </span>
            <h2 className="font-serif text-2xl font-semibold text-[#2b1d17] sm:text-3xl">
              Your cart is currently empty!
            </h2>
            <p className="text-sm text-[#7c5d52] sm:text-base">
              Browse our skincare essentials and find your next favorite ritual.
            </p>
            <Link
              href="/shop"
              className="rounded-full bg-[#8b4a2f] px-6 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(139,74,47,0.3)] transition hover:bg-[#7a4029]"
            >
              Browse Store
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a37866]">
              New in store
            </p>
            <h3 className="mt-2 font-serif text-2xl font-semibold text-[#2b1d17]">
              Fresh arrivals curated for you
            </h3>
          </div>

          <div className="grid w-full gap-6 md:grid-cols-3">
            {newInStore.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-[#efe2db] bg-white shadow-[0_12px_35px_rgba(160,114,90,0.12)]"
              >
                <div className="relative flex h-52 items-center justify-center bg-[#fff9f6]">
                  {item.badge ? (
                    <span className="absolute left-4 top-4 rounded-full bg-[#f0ddd5] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b4a2f]">
                      {item.badge}
                    </span>
                  ) : null}
                  <Image
                    src={item.imageSrc}
                    alt={item.name}
                    width={180}
                    height={180}
                    className="h-32 w-full object-contain"
                  />
                </div>
                <div className="space-y-3 px-5 pb-5 pt-4">
                  <h4 className="text-base font-semibold text-[#2b1d17]">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm">
                    {item.oldPrice ? (
                      <span className="text-[#b8aaa3] line-through">
                        {item.oldPrice}
                      </span>
                    ) : null}
                    <span className="font-semibold text-[#2b1d17]">
                      {item.price}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="w-full rounded-full bg-[#8b4a2f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7a4029]"
                  >
                    {item.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
