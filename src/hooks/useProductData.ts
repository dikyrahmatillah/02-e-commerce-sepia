import { useState, useCallback, useEffect } from "react";
import {
  ProductDetail,
  RelatedProduct,
  PRODUCT_ENDPOINT,
} from "@/type/product-detail";
import { formatCurrency } from "@/lib/utils";

export function useProductData(productId: string) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);

  const fetchRelated = useCallback(async (keyword: string) => {
    try {
      const res = await fetch(
        `/api/products?page=1&q=${encodeURIComponent(keyword)}`,
      );
      if (!res.ok) return;

      const payload = await res.json();

      const items =
        payload?.data?.data?.list ||
        payload?.data?.list ||
        payload?.data?.result ||
        payload?.data?.items ||
        payload?.data ||
        payload?.list ||
        [];

      if (!Array.isArray(items)) return;

      const mapped = items.slice(0, 6).map((it): RelatedProduct => {
        const srcCandidates = [
          it.imagePathList,
          it.data?.imagePathList,
          it.posterUrl,
          it.data?.posterUrl,
          it.image,
          it.data?.image,
          it.pictureUrl,
          it.data?.pictureUrl,
        ];

        let rawImage = undefined;
        for (const cand of srcCandidates) {
          if (Array.isArray(cand) && cand.length) {
            rawImage = cand[0];
            break;
          }
          if (typeof cand === "string" && cand.trim() !== "") {
            rawImage = cand;
            break;
          }
        }

        let imageSrc: string | undefined = undefined;
        if (typeof rawImage === "string") {
          const trimmed = rawImage.trim();
          if (trimmed.startsWith("//")) {
            imageSrc = `https:${trimmed}`;
          } else if (/^https?:\/\//i.test(trimmed)) {
            imageSrc = trimmed;
          } else {
            imageSrc = undefined;
          }
        }

        const id = String(
          it.productId ??
            it.id ??
            it.itemId ??
            it.sku ??
            Math.random().toString(36).slice(2),
        );
        const name =
          it.productTitle ??
          it.title ??
          it.name ??
          it.data?.productTitle ??
          "Related product";
        const price = it.salePrice
          ? formatCurrency(Number(it.salePrice))
          : (it.salePriceString ?? undefined);
        const oldPrice = it.originalPrice
          ? formatCurrency(Number(it.originalPrice))
          : undefined;
        const badge = it.discountPercentage ?? undefined;

        return { id, name, price, oldPrice, badge, imageSrc };
      });

      setRelatedProducts(mapped);
    } catch (e) {
      console.error("Failed to fetch related products", e);
    }
  }, []);

  useEffect(() => {
    if (!productId) {
      setIsLoading(false);
      setErrorMessage("Product id is missing.");
      return;
    }

    let isMounted = true;

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await fetch(
          `${PRODUCT_ENDPOINT}/${encodeURIComponent(productId)}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load product details.");
        }

        const payload = await response.json();
        const data = payload?.data?.data;

        if (!data) {
          throw new Error("Product data is unavailable.");
        }

        const categories = Array.isArray(data.categories)
          ? data.categories
              .map((item: { name?: string }) => item?.name)
              .filter(Boolean)
          : [];

        const keywords = Array.isArray(data.keywords)
          ? data.keywords.filter((item: string) => Boolean(item))
          : [];

        const additionalInfo = Array.isArray(data.showedProps)
          ? data.showedProps
              .map((info: { attrName?: string; attrValue?: string }) => ({
                label: info?.attrName ?? "",
                value: info?.attrValue ?? "",
              }))
              .filter((info: { label: string; value: string }) =>
                Boolean(info.label && info.value),
              )
          : [];

        const mappedProduct: ProductDetail = {
          id: String(data.productId ?? data.id ?? ""),
          name: data.productTitle ?? "Product",
          category: categories[0] ?? "Product",
          brand: data.sellerInfo?.storeName ?? "Store",
          tags: keywords.slice(0, 3),
          sku: String(data.productId ?? data.id ?? ""),
          rating: Number(data.rating ?? 0),
          reviews: Array.isArray(data.reviews)
            ? data.reviews.map(
                (review: {
                  id?: number | string;
                  author?: string;
                  rating?: number;
                  content?: string;
                  images?: string[];
                }) => ({
                  id: review?.id ?? Math.random().toString(36).slice(2),
                  author: review?.author ?? "Anonymous",
                  rating: Number(review?.rating ?? 0),
                  content: review?.content ?? "",
                  images: review?.images ?? [],
                }),
              )
            : [],
          price: formatCurrency(Number(data.salePrice ?? data.salePrice ?? 0)),
          oldPrice: data.originalPrice
            ? formatCurrency(Number(data.originalPrice))
            : undefined,
          badge: data.discountPercentage ?? undefined,
          shortDescription: data.shortDesc ?? "",
          imageSrc:
            (Array.isArray(data.imagePathList) && data.imagePathList[0]) ||
            data.posterUrl ||
            "/products/product-pouch.svg",
          gallery: Array.isArray(data.imagePathList)
            ? data.imagePathList
            : data.posterUrl
              ? [data.posterUrl]
              : [],
          description: data.shortDesc ?? "",
          features: keywords.slice(0, 6),
          additionalInfo: additionalInfo.slice(0, 6),
        };

        if (isMounted) {
          setProduct(mappedProduct);
          const words = (mappedProduct.name || "")
            .split(/[^A-Za-z0-9]+/)
            .filter(Boolean);
          const candidate = words.find((w) => w.length > 3) ?? words[0] ?? "";
          if (candidate) {
            fetchRelated(candidate);
          }
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Something went wrong while loading the product.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [productId, fetchRelated]);

  return { product, isLoading, errorMessage, relatedProducts };
}
