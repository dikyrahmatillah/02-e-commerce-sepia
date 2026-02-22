"use client";

import SearchFilter from "./_components/SearchFilter";
import CategoryFilter from "./_components/CategoryFilter";
import PriceFilter from "./_components/PriceFilter";
import DiscountFilter from "./_components/DiscountFilter";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import ShopHero from "@/components/shop/ShopHero";
import { useRouter, useSearchParams } from "next/navigation";
import { useShop } from "@/hooks/useShop";

const formatPrice = (value: number | null) => {
  if (value === null || Number.isNaN(value)) {
    return "N/A";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export default function ShopPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productsPerPage = 6;
  const searchQuery = searchParams.get("query") ?? "";

  const {
    isLoading,
    error,
    currentPage,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    selectedDiscounts,
    maxPriceFilter,
    setMaxPriceFilter,
    categoryOptions,
    minPrice,
    maxPrice,
    pagedProducts,
    totalPages,
    goToPage,
    toggleCategory,
    toggleDiscount,
  } = useShop(searchQuery, productsPerPage);

  return (
    <>
      <ShopHero />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-8">
            <CategoryFilter
              categoryOptions={categoryOptions}
              selectedCategories={selectedCategories}
              onToggle={(label) => toggleCategory(label)}
            />

            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              maxPriceFilter={maxPriceFilter}
              onChange={(v) => setMaxPriceFilter(v)}
              formatPrice={formatPrice}
            />

            <DiscountFilter
              selectedDiscounts={selectedDiscounts}
              onToggle={(v) => toggleDiscount(v)}
            />

            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={(trimmed) => {
                const nextUrl = trimmed
                  ? `/shop?query=${encodeURIComponent(trimmed)}`
                  : "/shop";
                router.push(nextUrl);
              }}
            />
          </aside>

          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {isLoading
                ? Array.from({ length: 6 }, (_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))
                : pagedProducts.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
            </div>

            {error && (
              <div className="rounded-2xl border border-dashed border-brand-ink-soft bg-white px-6 py-10 text-center text-sm text-[#b43a2a]">
                {error}
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => goToPage(page)}
            />
          </div>
        </div>
      </section>
    </>
  );
}
