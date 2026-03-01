import Link from "next/link";

export const Breadcrumbs = ({
  category,
  name,
}: {
  category: string;
  name: string;
}) => (
  <section className="relative overflow-hidden bg-cream pt-24">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-0 top-16 h-60 w-60 rounded-full bg-cream blur-3xl" />
      <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-cream blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(#ead7ce_1px,transparent_1px)] opacity-60 bg-size-[18px_18px]" />
    </div>

    <div className="relative mx-auto flex flex-col max-w-7xl px-6 pt-8">
      <nav className="flex flex-wrap items-center gap-2 text-sm font-bold text-brand-ink">
        <Link href="/" className="underline underline-offset-4">
          Home
        </Link>
        <span className="text-brand-ink-soft">/</span>
        <Link href="/shop" className="underline underline-offset-4">
          {category}
        </Link>
        <span className="text-brand-ink-soft">/</span>
        <span className="font-normal text-brand-ink">{name}</span>
      </nav>
    </div>
  </section>
);
