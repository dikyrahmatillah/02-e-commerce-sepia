import { useMemo, useState } from "react";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import LocalShipping from "@mui/icons-material/LocalShipping";
import Verified from "@mui/icons-material/Verified";
import { ProductDetail } from "@/type/product-detail";

export const ProductInfo = ({ product }: { product: ProductDetail }) => {
  const [quantity, setQuantity] = useState(1);
  const decrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increase = () => setQuantity((prev) => prev + 1);
  const stars = useMemo(() => Array.from({ length: 5 }, (_, i) => i), []);

  return (
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
                  className={filled ? "text-brand-ink" : "text-brand-ink-soft"}
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
          Brands: <strong className="text-brand-ink">{product.brand}</strong>
        </span>
        <span>
          Tags:{" "}
          <strong className="text-brand-ink">{product.tags.join(", ")}</strong>
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
              <LocalShipping fontSize="small" className="text-brand-ink" />
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
  );
};
