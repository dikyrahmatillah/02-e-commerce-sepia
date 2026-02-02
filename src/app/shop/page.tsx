"use client";

import Image from "next/image";
import Link from "next/link";
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

type ApiProduct = {
  id: string;
  productTitle: string;
  shortDesc: string;
  image?: string[];
  salePrice: number | null;
  originalPrice: number | null;
  discountPercentage: string | null;
  category1?: string | null;
  category2?: string | null;
  storeName?: string | null;
};

type ApiResponse = {
  message: string;
  data: ApiProduct[];
  page: number;
  limit: number;
  maxPage: number;
  total: number;
};

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
  const [products, setProducts] = useState<ApiProduct[]>([]);
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
          setProducts(payload.data ?? []);
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
    <div className="bg-[#fbf7f4] text-[#2b1d17]">
      <section className="relative overflow-hidden bg-[#fbf2ee] pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-16 h-60 w-60 rounded-full bg-[#f3e1d8] blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-[#f2ded6] blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#ead7ce_1px,transparent_1px)] opacity-60 [background-size:18px_18px]" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 pb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#a37866]">
            Beautiful skin starts here
          </p>
          <h1 className="font-serif text-4xl font-semibold text-[#3a2a24] sm:text-5xl">
            Shop Our Products
          </h1>
          <p className="max-w-2xl text-sm text-[#7c5d52] sm:text-base">
            Discover and indulge in our exclusive collection of skincare
            solutions, meticulously crafted to enhance your natural beauty and
            cater to your unique skin needs.
          </p>

          <div className="relative mt-6 flex w-full items-center justify-between">
            <div className="hidden flex-1 items-center justify-start sm:flex">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/80 shadow-[0_18px_45px_rgba(160,114,90,0.18)]">
                <Image
                  src="/products/product-pouch.svg"
                  alt="Skincare mask"
                  width={120}
                  height={120}
                  className="h-16 w-16"
                />
              </div>
            </div>
            <div className="hidden flex-1 items-center justify-end sm:flex">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/80 shadow-[0_18px_45px_rgba(160,114,90,0.18)]">
                <Image
                  src="/products/product-jar.svg"
                  alt="Skincare jar"
                  width={120}
                  height={120}
                  className="h-16 w-16"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-8">
            <div className="flex items-center gap-3 text-sm font-semibold text-[#3a2a24]">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-[#ead7ce] bg-white">
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#8b4a2f]"
                >
                  <path d="M4 6h16" />
                  <path d="M8 12h8" />
                  <path d="M10 18h4" />
                </svg>
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
                {categoryOptions.length === 0 ? (
                  <p className="text-xs text-[#b19c92]">No categories found.</p>
                ) : null}
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
                  <svg
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-3.5-3.5" />
                  </svg>
                </button>
              </form>
            </div>
          </aside>

          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pagedProducts.map((item) => {
                const imageSrc =
                  item.image?.[0] ?? "/products/product-bottle.svg";
                const hasSale =
                  item.salePrice !== null &&
                  item.originalPrice !== null &&
                  item.salePrice < item.originalPrice;
                const badgeText =
                  item.discountPercentage || (hasSale ? "Sale" : null);
                const priceLabel =
                  item.salePrice !== null
                    ? formatPrice(item.salePrice)
                    : formatPrice(item.originalPrice);
                const oldPriceLabel =
                  hasSale && item.originalPrice !== null
                    ? formatPrice(item.originalPrice)
                    : null;

                return (
                  <article
                    key={item.id}
                    className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#efe2db] bg-white shadow-[0_18px_45px_rgba(160,114,90,0.18)]"
                  >
                    {badgeText ? (
                      <span className="absolute left-4 top-4 z-10 rounded-full bg-[#f0ddd5] px-3 py-1 text-xs font-semibold text-[#8b4a2f]">
                        {badgeText}
                      </span>
                    ) : null}
                    <Link
                      href={`/shop/${item.id}`}
                      className="flex items-center justify-center bg-white px-6 pt-10"
                    >
                      <Image
                        src={imageSrc}
                        alt={item.productTitle}
                        width={240}
                        height={200}
                        className="h-36 w-full object-contain"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                      <div className="flex items-center gap-2 text-sm">
                        {oldPriceLabel ? (
                          <span className="font-semibold text-[#b8aaa3] line-through">
                            {oldPriceLabel}
                          </span>
                        ) : null}
                        <span className="font-semibold text-[#2b1d17]">
                          {priceLabel}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-[#2b1d17]">
                        <Link
                          href={`/shop/${item.id}`}
                          className="transition-colors hover:text-[#8b4a2f]"
                        >
                          {item.productTitle}
                        </Link>
                      </h3>
                      <p className="mt-4 text-sm leading-6 text-[#7c5d52]">
                        {item.shortDesc}
                      </p>
                      <div className="mt-6 flex flex-col gap-3">
                        <button
                          type="button"
                          className="w-full rounded-b-2xl rounded-t-md bg-[#8b4a2f] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7a4029]"
                        >
                          Add To Cart +
                        </button>
                        <Link
                          href={`/shop/${item.id}`}
                          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#8b4a2f]"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {isLoading ? (
              <div className="rounded-2xl border border-dashed border-[#ead7ce] bg-white px-6 py-10 text-center text-sm text-[#7c5d52]">
                Loading products...
              </div>
            ) : null}

            {error ? (
              <div className="rounded-2xl border border-dashed border-[#f0ddd5] bg-white px-6 py-10 text-center text-sm text-[#b43a2a]">
                {error}
              </div>
            ) : null}

            {!isLoading && !error && filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#ead7ce] bg-white px-6 py-10 text-center text-sm text-[#7c5d52]">
                No products match the selected filters.
              </div>
            ) : null}

            <div className="flex items-center justify-center gap-2 text-sm">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    className={`h-9 w-9 rounded-md border border-[#ead7ce] ${
                      page === currentPage
                        ? "bg-[#8b4a2f] text-white"
                        : "bg-white text-[#5f4338]"
                    }`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-9 rounded-md border border-[#ead7ce] bg-white px-4 text-[#5f4338] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
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
