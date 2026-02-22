"use client";

import { AliProductsResponse, ApiResponse } from "@/type/aliexpress-product";
import SearchFilter from "./_components/SearchFilter";
import CategoryFilter from "./_components/CategoryFilter";
import PriceFilter from "./_components/PriceFilter";
import DiscountFilter from "./_components/DiscountFilter";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import ShopHero from "@/components/shop/ShopHero";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

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
  const [products, setProducts] = useState<AliProductsResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const searchQuery = searchParams.get("query") ?? "";
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
        const params = new URLSearchParams();
        if (query.trim()) {
          params.set("query", query.trim());
        }
        const response = await fetch(`/api/products?${params.toString()}`);

        if (!response.ok) throw new Error("Failed to fetch products.");

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
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category1);

      const hasSale =
        item.salePrice != null &&
        item.originalPrice != null &&
        item.salePrice < item.originalPrice;

      const matchesDiscount = !selectedDiscounts.includes("sale") || hasSale;

      const price = item.salePrice ?? item.originalPrice;
      const matchesPrice =
        maxPriceFilter === null || price === null || price <= maxPriceFilter;

      return matchesCategory && matchesDiscount && matchesPrice;
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
            <CategoryFilter
              categoryOptions={categoryOptions}
              selectedCategories={selectedCategories}
              onToggle={(label) =>
                toggleSelection(label, setSelectedCategories)
              }
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
              onToggle={(v) => toggleSelection(v, setSelectedDiscounts)}
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
