"use client";

import Link from "next/link";
import { AliProductsResponse } from "@/type/aliexpress-product";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function CollectionSection({
  products,
}: {
  products: AliProductsResponse[];
}) {
  return (
    <section id="collection" className="bg-cream/70 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-rose">
            Collections
          </p>
          <h2 className="mt-2 text-3xl font-semibold ">
            Discover Our Latest Additions
          </h2>
          <p className="mt-4 text-muted">
            Browse through our handpicked selection of premium items, ready to
            be shipped directly to your doorstep.
          </p>
          <Button
            variant="outlined"
            sx={{
              marginTop: 2,
              borderRadius: "999px",
              borderColor: "var(--brand-ink)",
              color: "var(--brand-ink-soft)",
              paddingX: 3,
              paddingY: 1.1,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "var(--brand-ink-transparent)",
              },
            }}
          >
            Explore More
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {products.map((item) => (
            <Link
              key={item.id}
              href={`/shop/${item.id}`}
              className="block h-full"
            >
              <Card
                className="h-full rounded-3xl border border-brand-ink-soft shadow-soft transition hover:-translate-y-0.5"
                elevation={0}
              >
                <CardContent>
                  <Typography
                    variant="body2"
                    className="text-brand-ink"
                    sx={{ fontWeight: 600 }}
                  >
                    {item.productTitle}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
