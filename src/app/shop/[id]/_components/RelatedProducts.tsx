import Image from "next/image";
import Link from "next/link";
import { RelatedProduct } from "@/type/product-detail";

export const RelatedProducts = ({
  products,
}: {
  products: RelatedProduct[];
}) => {
  if (!products.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <h2 className="text-2xl font-semibold text-[#2b1d17]">
        Related products
      </h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {products.map((item) => (
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
  );
};
