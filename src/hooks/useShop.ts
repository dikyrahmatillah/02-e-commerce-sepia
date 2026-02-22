"use client";

import { useEffect, useMemo, useState } from "react";
import { AliProductsResponse, ApiResponse } from "@/type/aliexpress-product";

export function useShop(searchQuery: string, productsPerPage = 6) {
  const [products, setProducts] = useState<AliProductsResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
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
    setter: React.Dispatch<React.SetStateAction<string[]>>,
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

  return {
    products,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    setSelectedCategories,
    selectedDiscounts,
    setSelectedDiscounts,
    maxPriceFilter,
    setMaxPriceFilter,
    categoryOptions,
    minPrice,
    maxPrice,
    pagedProducts,
    totalPages,
    goToPage,
    toggleCategory: (label: string) =>
      toggleSelection(label, setSelectedCategories),
    toggleDiscount: (label: string) =>
      toggleSelection(label, setSelectedDiscounts),
  } as const;
}

export default useShop;
