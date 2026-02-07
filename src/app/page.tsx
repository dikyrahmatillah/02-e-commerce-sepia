import { randomInt } from "crypto";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection, {
  Category,
} from "@/components/home/CategoriesSection";
import ProductsSection from "@/components/home/ProductsSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import AboutSection from "@/components/home/AboutSection";
import { ApiResponse, AliProductsResponse } from "@/type/aliexpress-product";

const mapCategories = (items: AliProductsResponse[]): Category[] => {
  const seen = new Set<string>();
  const categories: Category[] = [];
  for (const item of items) {
    if (!item.category2) continue;
    if (seen.has(item.category2)) continue;

    categories.push({
      title: item.category2,
      image: item.image[0],
      url: `/shop/${item.id}`,
    });

    seen.add(item.category2);

    if (categories.length >= 5) break;
  }
  return categories;
};

export default async function Home() {
  let products: AliProductsResponse[] = [];
  let categories: Category[] = [];

  try {
    const randomPage = randomInt(1, 101);
    const response = await fetch(
      `${process.env.API_BASE_URL}/products?page=${randomPage}`,
      {
        next: { revalidate: 60 },
      },
    );
    const payload: ApiResponse = await response.json();
    products = (payload.data ?? []) as AliProductsResponse[];
    const categorySource = products.slice(10);

    categories = mapCategories(categorySource);
  } catch {
    products = [];
    categories = [];
  }
  const productSource = products.slice(10, 24);
  const reviewProducts = products.slice(24, 30);

  return (
    <>
      <HeroSection />
      <CategoriesSection categories={categories} />
      <ProductsSection products={productSource} />
      <FeaturedSection products={reviewProducts} />
      <AboutSection />
    </>
  );
}
