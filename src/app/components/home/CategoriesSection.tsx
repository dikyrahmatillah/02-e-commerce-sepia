"use client";

import Image from "next/image";

export type Category = {
  title: string;
  description?: string;
  image: string;
};

export default function CategoriesSection({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-semibold text-brand-ink text-4xl">
          Explore our Product Category
        </h2>
        <p className="mt-3 text-brand-ink-soft">
          Complete your beauty routine with sun and body care.
        </p>
        <div className="mt-12 grid grid-cols-5 gap-6">
          {categories.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-3xl bg-white"
            >
              <div className="relative h-56 ">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={520}
                  height={420}
                  className="h-full w-full object-cover transition duration-1000 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-between  bg-brand-ink px-6 py-5 text-background">
                <p className="text-sm font-semibold leading-snug">
                  {item.title}
                </p>
                <span className="text-xl font-light">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
