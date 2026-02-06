"use client";

import Image from "next/image";
import Link from "next/link";

export type Category = {
  title: string;
  image: string;
  url: string;
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
        <p className="mt-3 text-brand-ink-soft text-base">
          Complete your beauty routine with sun and body care.
        </p>
        <div className="mt-12 grid grid-cols-5 gap-6">
          {categories.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-xl flex flex-col justify-between "
            >
              <div className="relative h-64">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={520}
                  height={520}
                  className="h-full w-full object-cover block transition duration-1000 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <Link
                href={item.url}
                className="flex items-center justify-between bg-brand-ink px-6 py-5 text-background"
              >
                <p className="text-sm font-semibold leading-snug">
                  {item.title}
                </p>
                <span className="text-xl font-light">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
