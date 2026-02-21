export default function ShopHero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-16 h-60 w-60 rounded-full blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#ead7ce_1.5px,transparent_1.5px)] opacity-60 bg-size-[24px_24px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 pb-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-ink-soft">
          Great Product start here
        </p>
        <h1 className="font-serif text-4xl font-semibold text-[#3a2a24] sm:text-5xl">
          Shop Our Products
        </h1>
        <p className="max-w-2xl text-sm text-[#7c5d52] sm:text-base">
          Discover and indulge in our exclusive collection of premium products,
          meticulously curated to elevate your lifestyle and bring unparalleled
          quality to your everyday experiences.
        </p>
      </div>
    </section>
  );
}
