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
    <section id="categories" className="bg-[#fbf4ee] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-semibold text-rose-950 md:text-5xl">
            Explore our Product Category
          </h2>
          <p className="mt-3 text-base text-rose-950/70">
            Complete your beauty routine with sun and body care.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-3xl border border-rose-100/60 bg-white shadow-soft"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={520}
                  height={420}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-between gap-4 bg-[#9b5a34] px-6 py-5 text-white">
                <p className="text-base font-semibold leading-snug">
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
