"use client";

import Image from "next/image";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useMemo, useRef, useState } from "react";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  imageSrc: string;
};

function formatPricePair(oldPrice?: string, price?: string) {
  if (oldPrice && price) return { oldPrice, price };
  if (price) return { price };
  return {};
}

export default function ProductsSection({ products }: { products: Product[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const pages = useMemo(
    () => Array.from({ length: pageCount }, (_, i) => i),
    [pageCount],
  );

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let rafId = 0;
    const updatePages = () => {
      const nextPageCount = Math.max(
        1,
        Math.ceil(el.scrollWidth / el.clientWidth),
      );
      setPageCount(nextPageCount);
      const nextActive = Math.min(
        nextPageCount - 1,
        Math.max(0, Math.round(el.scrollLeft / el.clientWidth)),
      );
      setActivePage(nextActive);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePages);
    };

    const ro = new ResizeObserver(() => updatePages());
    ro.observe(el);
    el.addEventListener("scroll", onScroll, { passive: true });
    updatePages();

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>(".product-card");
    const cardWidth = firstCard?.offsetWidth ?? 0;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    const scrollAmount = (cardWidth + gap) * direction;
    if (!scrollAmount) return;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollToPage = (pageIndex: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * pageIndex, behavior: "smooth" });
  };

  return (
    <section id="products" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-brand-ink">
            Popular Skin Products for your Daily Use
          </h2>
          <p className="mx-auto mt-4 text-base text-brand-ink-soft">
            Our picks for your skin: the products we love and recommend for a
            glowing you
          </p>
        </div>

        <div className="relative mt-12">
          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 pb-8 overflow-x-auto "
            aria-label="Product carousel"
          >
            {products.map((item) => {
              const prices = formatPricePair(item.oldPrice, item.price);
              return (
                <article
                  key={item.id}
                  className="product-card relative flex w-70 flex-none snap-start flex-col overflow-hidden rounded-2xl bg-white sm:w-80"
                >
                  {item.badge ? (
                    <div className="absolute left-4 top-4 z-10">
                      <span className="inline-flex items-center rounded-full bg-brand-ink-soft px-3 py-1 text-xs font-semibold text-background">
                        {item.badge}
                      </span>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-center px-6 pt-10">
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      width={520}
                      height={320}
                      unoptimized
                      className="h-40 w-full max-w-65 object-contain"
                    />
                  </div>

                  <div className="flex flex-1 justify-between flex-col mt-10">
                    <div className="flex items-center gap-2 px-6">
                      {prices.oldPrice ? (
                        <span className="text-sm font-semibold text-muted line-through">
                          {prices.oldPrice}
                        </span>
                      ) : null}
                      {prices.price ? (
                        <span className="text-base font-bold">
                          {prices.price}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-2 text-xl line-clamp-5 font-semibold px-6">
                      {item.name}
                    </h3>
                    <p className="mt-4 line-clamp-3 text-sm leading-5 text-brand-ink-soft px-6">
                      {item.description}
                    </p>

                    <Link
                      href={`/shop/${item.id}`}
                      className="mt-8 bg-brand-ink py-3 text-sm font-semibold text-background text-center hover:bg-brand-ink-soft hover:text-brand-ink  cursor-pointer"
                    >
                      See Details
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous products"
            className="absolute -left-12 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-none text-brand-ink hover:shadow-sm transition duration-500 hover:bg-white cursor-pointer md:grid"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next products"
            className="absolute -right-12 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-none text-brand-ink hover:shadow-sm transition duration-500 hover:bg-white cursor-pointer md:grid"
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          <div
            className="mt-2 flex items-center justify-center gap-2"
            aria-label="Carousel pagination"
          >
            {pages.map((pageIndex) => (
              <button
                key={pageIndex}
                type="button"
                onClick={() => scrollToPage(pageIndex)}
                aria-label={`Go to page ${pageIndex + 1}`}
                aria-current={pageIndex === activePage ? "true" : "false"}
                className={
                  pageIndex === activePage
                    ? "h-2.5 w-2.5 rounded-full bg-brand-ink"
                    : "h-2.5 w-2.5 rounded-full bg-brand-ink-soft"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
