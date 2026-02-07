"use client";

import { AliProductsResponse } from "@/type/aliexpress-product";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

export default function FeaturedSection({
  products,
}: {
  products: AliProductsResponse[];
}) {
  const loopProducts = products.length ? [...products, ...products] : [];
  const cardHeight = 200;
  const cardGap = 24;
  const listHeight =
    products.length * cardHeight +
    Math.max(products.length - 1, 0) * cardGap +
    20;
  const containerHeight = cardHeight * 2 + cardGap;

  return (
    <section
      id="featured"
      className="mx-auto max-w-7xl rounded-3xl bg-white mb-20"
    >
      <div className=" ">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center mx-auto py-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-rose">
              Featured
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              This is what our popular picks are
            </h2>
            <p className="mt-3 text-muted">
              Honest picks that reflect our dedication to client care and
              outcomes
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Best sellers", "Limited deals", "New arrivals"].map(
                (label) => (
                  <Chip
                    key={label}
                    label={label}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: "var(--accent-rose)",
                      color: "var(--accent-rose)",
                      fontWeight: 500,
                    }}
                  />
                ),
              )}
            </div>
          </div>
          <div
            className="scroll-container relative overflow-hidden"
            style={{ height: containerHeight }}
          >
            <div
              className="scroll-track grid gap-6"
              style={{
                animation: "featured-scroll 28s linear infinite",
              }}
            >
              {loopProducts.map((product, index) => (
                <Link
                  key={`${product.id}-${index}`}
                  href={`/shop/${product.id}`}
                  className="block"
                  aria-label={`View ${product.productTitle}`}
                >
                  <Card
                    className="border-y overflow-hidden"
                    elevation={0}
                    sx={{
                      borderRadius: 0,
                      borderColor: "var(--brand-ink-soft)",
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image?.[0]}
                      alt={product.productTitle}
                      sx={{
                        width: { xs: "100%", sm: 160 },
                        height: { xs: 160, sm: "100%" },
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="body2" className="text-muted">
                        “{product.productTitle}”
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        className="mt-4 text-brand-ink"
                        sx={{ fontWeight: 600 }}
                      >
                        {product.storeName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes featured-scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-${listHeight}px);
          }
        }
        .scroll-track:has(:hover) {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}
