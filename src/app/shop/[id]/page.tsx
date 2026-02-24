"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Search from "@mui/icons-material/Search";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import Check from "@mui/icons-material/Check";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import LocalShipping from "@mui/icons-material/LocalShipping";
import Verified from "@mui/icons-material/Verified";

type ProductDetail = {
  id: string;
  name: string;
  category: string;
  brand: string;
  tags: string[];
  sku: string;
  rating: number;
  reviews: Array<{
    id: number | string;
    author: string;
    rating: number;
    content: string;
    images?: string[];
  }>;
  price: string;
  oldPrice?: string;
  badge?: string;
  shortDescription: string;
  imageSrc: string;
  gallery: string[];
  description: string;
  features: string[];
  additionalInfo: Array<{ label: string; value: string }>;
};

const PRODUCT_ENDPOINT = "/api/products/details";

const formatCurrency = (value?: number) => {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return "-";
  }
  return `$${value.toFixed(2)}`;
};

export default function ProductDetailPage() {
  const params = useParams<{ id?: string }>();
  const productId = params?.id ?? "";
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [activeImage, setActiveImage] = useState(0);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<
    Array<{
      id: string;
      name: string;
      price?: string;
      oldPrice?: string;
      badge?: string;
      imageSrc?: string;
    }>
  >([]);

  const stars = useMemo(() => Array.from({ length: 5 }, (_, i) => i), []);

  const tabItems = useMemo(
    () => [
      { key: "Description", label: "Description" },
      { key: "Additional information", label: "Additional information" },
      {
        key: "Reviews",
        label: `Reviews (${product?.reviews.length ?? 0})`,
      },
    ],
    [product?.reviews.length],
  );

  const decrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increase = () => setQuantity((prev) => prev + 1);

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

        console.log("Product detail response status:", response);

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
          setActiveImage(0);
          // fetch related products using a random word from the title
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
  }, [productId]);

  async function fetchRelated(keyword: string) {
    try {
      const res = await fetch(
        `/api/products?page=1&q=${encodeURIComponent(keyword)}`,
      );
      console.log("Related fetch status:", res.status);
      if (!res.ok) return;

      const payload = await res.json();
      console.debug("Related payload:", payload);

      // try common locations for list of items (support nested shapes)
      const items =
        payload?.data?.data?.list ||
        payload?.data?.list ||
        payload?.data?.result ||
        payload?.data?.items ||
        payload?.data ||
        payload?.list ||
        [];

      if (!Array.isArray(items)) return;

      const mapped = items.slice(0, 6).map((it) => {
        // support nested shapes (it or it.data)
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

        // normalize protocol-relative URLs
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

      console.debug("Mapped related products:", mapped);
      setRelatedProducts(mapped);
    } catch (e) {
      console.error("Failed to fetch related products", e);
    }
  }

  if (isLoading) {
    return (
      <div className="bg-[#fbf7f4] text-brand-ink">
        <section className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6 py-24">
          <div className="rounded-2xl border border-brand-ink-soft bg-white px-8 py-6 text-sm text-brand-ink shadow-[0_18px_45px_rgba(160,114,90,0.18)]">
            Loading product details...
          </div>
        </section>
      </div>
    );
  }

  if (!product || errorMessage) {
    return (
      <div className="bg-[#fbf7f4] text-brand-ink">
        <section className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6 py-24">
          <div className="rounded-2xl border border-brand-ink-soft bg-white px-8 py-6 text-sm text-brand-ink shadow-[0_18px_45px_rgba(160,114,90,0.18)]">
            {errorMessage ?? "Product not found."}
          </div>
        </section>
      </div>
    );
  }

  const galleryImages = product.gallery.length
    ? product.gallery
    : [product.imageSrc];

  return (
    <div className="bg-white text-brand-ink">
      <section className="relative overflow-hidden bg-white pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-16 h-60 w-60 rounded-full bg-white blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#ead7ce_1px,transparent_1px)] opacity-60 bg-size-[18px_18px]" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-4">
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-ink">
            <Link href="/" className="underline underline-offset-4">
              Home
            </Link>
            <span className="text-brand-ink-soft">/</span>
            <Link href="/shop" className="underline underline-offset-4">
              {product.category}
            </Link>
            <span className="text-brand-ink-soft">/</span>
            <span className="font-normal text-brand-ink">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-brand-ink-soft bg-white p-8 shadow-[0_18px_45px_rgba(160,114,90,0.18)]">
              <div className="relative flex h-full items-center justify-center rounded-2xl bg-white p-6">
                <Image
                  src={galleryImages[activeImage] ?? product.imageSrc}
                  alt={product.name}
                  width={520}
                  height={460}
                  className="h-90 w-full object-contain"
                  unoptimized
                />
                <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-brand-ink-soft bg-white text-brand-ink">
                  <Search fontSize="small" className="text-brand-ink" />
                </span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`rounded-2xl border bg-white p-3 transition-colors ${
                    activeImage === index
                      ? "border-[#8b4a2f]"
                      : "border-[#efe2db]"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <div className="flex h-16 items-center justify-center">
                    <Image
                      src={image}
                      alt={product.name}
                      width={120}
                      height={120}
                      className="h-12 w-full object-contain"
                      unoptimized
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-brand-ink">
                <div className="flex items-center gap-1 text-brand-ink">
                  {stars.map((index) => {
                    const filled = index < Math.round(product.rating);
                    const Icon = filled ? Star : StarBorder;
                    return (
                      <Icon
                        key={index}
                        fontSize="small"
                        className={
                          filled ? "text-brand-ink" : "text-brand-ink-soft"
                        }
                      />
                    );
                  })}
                </div>
                <span>
                  ({product.reviews.length} customer review) • {product.rating}
                </span>
              </div>
              <h1 className="text-3xl font-semibold text-brand-ink">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-3 text-lg">
              {product.oldPrice ? (
                <span className="font-semibold text-[#b8aaa3] line-through">
                  {product.oldPrice}
                </span>
              ) : null}
              <span className="text-2xl font-semibold text-brand-ink">
                {product.price}
              </span>
              {product.badge ? (
                <span className="rounded-full bg-[#f0ddd5] px-3 py-1 text-xs font-semibold text-brand-ink">
                  {product.badge}
                </span>
              ) : null}
            </div>

            <p className="text-sm leading-6 text-brand-ink-soft">
              {product.shortDescription}
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center overflow-hidden rounded-lg border border-brand-ink-soft bg-white">
                <button
                  type="button"
                  onClick={decrease}
                  className="h-10 w-10 text-lg text-brand-ink-soft"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="grid h-10 w-12 place-items-center text-sm font-semibold text-brand-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={increase}
                  className="h-10 w-10 text-lg text-brand-ink-soft"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="flex-1 rounded-lg bg-[#8b4a2f] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7a4029]"
              >
                Add To Cart +
              </button>
            </div>

            <div className="flex flex-wrap gap-4 border-t border-brand-ink-soft pt-4 text-xs text-brand-ink-soft">
              <span>
                SKU: <strong className="text-brand-ink">{product.sku}</strong>
              </span>
              <span>
                Category:{" "}
                <strong className="text-brand-ink">{product.category}</strong>
              </span>
              <span>
                Brands:{" "}
                <strong className="text-brand-ink">{product.brand}</strong>
              </span>
              <span>
                Tags:{" "}
                <strong className="text-brand-ink">
                  {product.tags.join(", ")}
                </strong>
              </span>
            </div>

            <div className="rounded-2xl border border-brand-ink-soft bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-ink-soft">
                Shop with confidence
              </p>
              <ul className="mt-4 space-y-3 text-sm text-brand-ink">
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-brand-ink">
                    <ShoppingCart fontSize="small" className="text-brand-ink" />
                  </span>
                  Easy returns and exchanges (40 days)
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-brand-ink">
                    <LocalShipping
                      fontSize="small"
                      className="text-brand-ink"
                    />
                  </span>
                  Free shipping on orders over $50
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-brand-ink">
                    <Verified fontSize="small" className="text-brand-ink" />
                  </span>
                  All products are backed by our 100% quality guarantee
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="flex flex-wrap gap-3">
          {tabItems.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                activeTab === tab.key
                  ? "bg-white text-[#2b1d17] shadow-[0_12px_30px_rgba(160,114,90,0.18)]"
                  : "bg-[#f7eee9] text-[#6e5146]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-brand-ink-soft bg-white p-6 text-sm leading-6 text-brand-ink-soft">
          {activeTab === "Description" && (
            <div className="space-y-4">
              <p>{product.description}</p>
              <div>
                <p className="text-sm font-semibold text-brand-ink">
                  Key Features:
                </p>
                {product.features.length ? (
                  <ul className="mt-3 space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-brand-ink">
                          <Check fontSize="small" className="text-brand-ink" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-brand-ink">
                    No feature highlights available yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === "Additional information" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {product.additionalInfo.length ? (
                product.additionalInfo.map((info) => (
                  <div
                    key={info.label}
                    className="rounded-xl border border-brand-ink-soft bg-white p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-ink-soft">
                      {info.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-brand-ink">
                      {info.value}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-brand-ink">
                  Additional details are not available yet.
                </p>
              )}
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="space-y-4">
              {product.reviews.length ? (
                product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border border-brand-ink-soft bg-white p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-brand-ink">
                        {review.author}
                      </p>
                      <div className="flex items-center gap-1 text-brand-ink">
                        {stars.map((index) => {
                          const filled = index < Math.round(review.rating);
                          const Icon = filled ? Star : StarBorder;
                          return (
                            <Icon
                              key={index}
                              fontSize="small"
                              className={
                                filled
                                  ? "text-brand-ink"
                                  : "text-brand-ink-soft"
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-brand-ink">
                      {review.content || "No review text provided."}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-brand-ink">
                  No reviews have been posted yet.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <h2 className="text-2xl font-semibold text-[#2b1d17]">
            Related products
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {relatedProducts.map((item) => (
              <article
                key={item.id}
                className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-ink-soft bg-white shadow-[0_18px_45px_rgba(160,114,90,0.18)]"
              >
                {item.badge ? (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-ink">
                    {item.badge}
                  </span>
                ) : null}
                <Link
                  href={`/shop/${item.id}`}
                  className="flex items-center justify-center bg-white px-6 pt-10"
                >
                  {typeof item.imageSrc === "string" &&
                  item.imageSrc.trim() !== "" ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      width={240}
                      height={128}
                      className="h-32 w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-32 w-full" />
                  )}
                </Link>
                <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                  <div className="flex items-center gap-2 text-sm">
                    {item.oldPrice ? (
                      <span className="font-semibold text-brand-ink line-through">
                        {item.oldPrice}
                      </span>
                    ) : null}
                    <span className="font-semibold text-brand-ink">
                      {item.price ?? "-"}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-brand-ink">
                    {item.name}
                  </h3>
                  <button
                    type="button"
                    className="mt-6 w-full rounded-b-2xl rounded-t-md bg-brand-ink py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7a4029]"
                  >
                    Add To Cart +
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
