"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useMemo, useRef, useState } from "react";
import { AliProductsResponse } from "@/type/aliexpress-product";
import ProductCard from "@/components/ProductCard";

export default function ProductsSection({
  products,
}: {
  products: AliProductsResponse[];
}) {
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
    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    const getPageCount = () =>
      Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth));

    const getActivePage = (count: number) =>
      clamp(Math.round(el.scrollLeft / el.clientWidth), 0, count - 1);

    const syncPagination = () => {
      const nextCount = getPageCount();
      setPageCount(nextCount);
      setActivePage(getActivePage(nextCount));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(syncPagination);
    };

    const resizeObserver = new ResizeObserver(syncPagination);
    resizeObserver.observe(el);
    el.addEventListener("scroll", onScroll, { passive: true });
    syncPagination();

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
    };
  }, []);

  const scrollByPage = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * direction, behavior: "smooth" });
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
            Our picks for your need: the products we love and recommend for a
            well-being you
          </p>
        </div>

        <div className="relative mt-12">
          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 pb-8 overflow-x-auto "
            aria-label="Product carousel"
          >
            {products.map((item) => (
              <div key={item.id} className="product-card">
                <ProductCard product={item} />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label="Previous products"
            className="absolute -left-12 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-none text-brand-ink hover:shadow-sm transition duration-500 hover:bg-white cursor-pointer md:grid"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
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
                    ? "h-2.5 w-2.5 rounded-full bg-brand-ink transition-transform duration-500 hover:scale-125 cursor-pointer"
                    : "h-2.5 w-2.5 rounded-full bg-brand-ink-soft transition-transform duration-500 hover:scale-125 cursor-pointer"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
