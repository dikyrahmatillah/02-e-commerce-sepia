import Image from "next/image";
import Link from "next/link";
import { AliProductsResponse } from "@/type/aliexpress-product";

interface ProductCardProps {
  product: AliProductsResponse;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white">
      {product.discountPercentage && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-cream px-3 py-1 text-xs font-semibold text-brand-ink">
          {product.discountPercentage}
        </span>
      )}

      <div className="flex items-center justify-center px-6 pt-4">
        <Image
          src={product.image[0]}
          alt={product.productTitle}
          width={220}
          height={220}
          unoptimized
          className="h-36 w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col px-6 py-4">
        <div className="flex items-center gap-2">
          {product.originalPrice ? (
            <>
              <span className="text-sm font-semibold text-muted line-through">
                ${product.originalPrice}
              </span>
              <span className="text-base font-bold">${product.salePrice}</span>
            </>
          ) : (
            <span className="text-sm font-bold">${product.salePrice}</span>
          )}
        </div>
        <h3 className="mt-4 line-clamp-5 text-md font-semibold">
          {product.productTitle}
        </h3>
        <p className="mt-4 line-clamp-3 text-sm leading-5 text-brand-ink-soft">
          {product.shortDesc}
        </p>
      </div>
      <div className=" flex flex-col gap-3">
        <Link href={`/shop/${product.id}`}>
          <button
            type="button"
            className="w-full bg-brand-ink tracking-widest py-3 text-xs font-semibold text-white transition-colors hover:bg-brand-ink-soft"
          >
            View Details
          </button>
        </Link>
      </div>
    </article>
  );
}
