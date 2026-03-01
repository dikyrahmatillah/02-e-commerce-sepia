"use client";

import { useParams } from "next/navigation";
import { useProductData } from "@/hooks/useProductData";
import { Breadcrumbs } from "./_components/Breadcrumbs";
import { ProductGallery } from "./_components/ProductGallery";
import { ProductInfo } from "./_components/ProductInfo";
import { ProductTabs } from "./_components/ProductTabs";
import { RelatedProducts } from "./_components/RelatedProducts";
import { LoadingState, ErrorState } from "./_components/StatusStates";

export default function ProductDetailPage() {
  const params = useParams<{ id?: string }>();
  const productId = params?.id ?? "";

  const { product, isLoading, errorMessage, relatedProducts } =
    useProductData(productId);

  if (isLoading) return <LoadingState />;
  if (!product || errorMessage) {
    return <ErrorState message={errorMessage ?? "Product not found."} />;
  }

  return (
    <div className="bg-cream text-brand-ink">
      <Breadcrumbs category={product.category} name={product.name} />

      <section className="mx-auto max-w-7xl px-6 pt-6 pb-16">
        <div className="grid gap-12 grid-cols-2">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
      </section>

      <ProductTabs product={product} />
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
