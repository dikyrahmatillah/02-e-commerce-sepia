"use client";

import { AliProductsResponse, ApiResponse } from "@/type/aliexpress-product";
import SearchIcon from "@/components/icons/SearchIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import ShopHero from "@/components/shop/ShopHero";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

const discountOptions = [
  { name: "On Sale", value: "sale", color: "#8b4a2f" },
  { name: "Full Price", value: "full", color: "#d9c4ba" },
];

const formatPrice = (value: number | null) => {
  if (value === null || Number.isNaN(value)) {
    return "N/A";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

function ShopPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productsPerPage = 6;
  const [products, setProducts] = useState<AliProductsResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const searchQuery = searchParams.get("q") ?? "";
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | null>(null);

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async (query: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const params = new URLSearchParams({ page: "2" });
        if (query.trim()) {
          params.set("q", query.trim());
        }
        const response = await fetch(`/api/products?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const payload = (await response.json()) as ApiResponse;
        if (isMounted) {
          const valid = ((payload.data ?? []) as AliProductsResponse[]).filter(
            (p) =>
              p.productTitle?.trim() &&
              Array.isArray(p.image) &&
              p.image.some((url) => url?.trim()) &&
              (p.salePrice != null || p.originalPrice != null),
          );
          setProducts(valid);
          setCurrentPage(1);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Unable to load products.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts(searchQuery);

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  const categoryOptions = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((item) => {
      if (item.category1) {
        counts.set(item.category1, (counts.get(item.category1) ?? 0) + 1);
      }
    });

    return Array.from(counts.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [products]);

  const { minPrice, maxPrice } = useMemo(() => {
    const values = products
      .map((item) => item.salePrice ?? item.originalPrice)
      .filter((value): value is number => value !== null);

    if (values.length === 0) {
      return { minPrice: 0, maxPrice: 100 };
    }

    return {
      minPrice: Math.min(...values),
      maxPrice: Math.max(...values),
    };
  }, [products]);

  useEffect(() => {
    setMaxPriceFilter((current) => {
      if (current === null) {
        return maxPrice;
      }

      return Math.min(current, maxPrice);
    });
  }, [maxPrice]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (selectedCategories.length > 0) {
        const matchesCategory = selectedCategories.some(
          (category) => item.category1 === category,
        );
        if (!matchesCategory) {
          return false;
        }
      }

      if (selectedDiscounts.length === 1) {
        const hasSale =
          item.salePrice !== null &&
          item.salePrice !== undefined &&
          item.originalPrice !== null &&
          item.salePrice < item.originalPrice;
        if (selectedDiscounts.includes("sale") && !hasSale) {
          return false;
        }
        if (selectedDiscounts.includes("full") && hasSale) {
          return false;
        }
      }

      if (maxPriceFilter !== null) {
        const priceValue = item.salePrice ?? item.originalPrice;
        if (priceValue !== null && priceValue > maxPriceFilter) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategories, selectedDiscounts, maxPriceFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage),
  );

  const pagedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(start, start + productsPerPage);
  }, [currentPage, filteredProducts, productsPerPage]);

  const toggleSelection = (
    value: string,
    setter: Dispatch<SetStateAction<string[]>>,
  ) => {
    setter((currentValues) =>
      currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value],
    );
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedDiscounts, maxPriceFilter]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(totalPages, Math.max(1, page)));
  };

  return (
    <>
      <ShopHero />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-8">
            <div className="flex items-center gap-3 text-sm font-semibold text-[#3a2a24]">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-[#ead7ce] bg-white">
                <FilterIcon width={16} height={16} className="text-[#8b4a2f]" />
              </span>
              Filter
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a37866]">
                Category
              </p>
              <div className="space-y-3">
                {categoryOptions.map((item) => (
                  <label
                    key={item.label}
                    className="flex items-center gap-3 text-sm text-[#5f4338]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(item.label)}
                      onChange={() =>
                        toggleSelection(item.label, setSelectedCategories)
                      }
                      className="h-4 w-4 rounded border-[#d9c4ba] text-[#8b4a2f] accent-[#8b4a2f]"
                    />
                    <span>
                      {item.label} ({item.count})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a37866]">
                Price
              </p>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={maxPriceFilter ?? maxPrice}
                step={0.01}
                onChange={(event) =>
                  setMaxPriceFilter(Number(event.target.value))
                }
                className="w-full accent-[#8b4a2f]"
              />
              <div className="flex items-center justify-between text-xs text-[#7c5d52]">
                <div className="rounded-md border border-[#ead7ce] bg-white px-3 py-2">
                  {formatPrice(minPrice)}
                </div>
                <div className="rounded-md border border-[#ead7ce] bg-white px-3 py-2">
                  {formatPrice(maxPriceFilter ?? maxPrice)}
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#a37866]">
                <span>Min. Price</span>
                <span>Max. Price</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a37866]">
                Discount
              </p>
              <div className="space-y-2">
                {discountOptions.map((item) => (
                  <label
                    key={item.name}
                    className="flex items-center gap-3 text-sm text-[#5f4338]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDiscounts.includes(item.value)}
                      onChange={() =>
                        toggleSelection(item.value, setSelectedDiscounts)
                      }
                      className="h-4 w-4 rounded border-[#d9c4ba] text-[#8b4a2f] accent-[#8b4a2f]"
                    />
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a37866]">
                Search
              </p>
              <form
                className="flex items-center rounded-full border border-[#ead7ce] bg-white px-4 py-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  const trimmed = searchTerm.trim();
                  const nextUrl = trimmed
                    ? `/shop?q=${encodeURIComponent(trimmed)}`
                    : "/shop";
                  router.push(nextUrl);
                }}
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full bg-transparent text-sm text-[#5f4338] outline-none placeholder:text-[#b19c92]"
                />
                <button
                  type="submit"
                  className="grid h-8 w-8 place-items-center rounded-full bg-[#8b4a2f] text-white"
                  aria-label="Search products"
                >
                  <SearchIcon width={14} height={14} />
                </button>
              </form>
            </div>
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

            {error ? (
              <div className="rounded-2xl border border-dashed border-[#f0ddd5] bg-white px-6 py-10 text-center text-sm text-[#b43a2a]">
                {error}
              </div>
            ) : null}

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

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#fbf7f4] text-[#2b1d17]">
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="rounded-2xl border border-dashed border-[#ead7ce] bg-white px-6 py-10 text-center text-sm text-[#7c5d52]">
              Loading shop...
            </div>
          </section>
        </div>
      }
    >
      <ShopPageContent />
    </Suspense>
  );
}
