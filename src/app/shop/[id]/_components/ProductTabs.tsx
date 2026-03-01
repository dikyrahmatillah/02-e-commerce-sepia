import { useMemo, useState } from "react";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import Check from "@mui/icons-material/Check";
import { ProductDetail } from "@/type/product-detail";

export const ProductTabs = ({ product }: { product: ProductDetail }) => {
  const [activeTab, setActiveTab] = useState("Description");
  const stars = useMemo(() => Array.from({ length: 5 }, (_, i) => i), []);

  const tabItems = useMemo(
    () => [
      { key: "Description", label: "Description" },
      { key: "Additional information", label: "Additional information" },
      {
        key: "Reviews",
        label: `Reviews (${product.reviews.length})`,
      },
    ],
    [product.reviews.length],
  );

  return (
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
                              filled ? "text-brand-ink" : "text-brand-ink-soft"
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
  );
};
