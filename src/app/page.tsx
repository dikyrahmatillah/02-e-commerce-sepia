import { randomInt } from "crypto";
import HeroSection from "./components/home/HeroSection";
import CategoriesSection, {
  Category,
} from "./components/home/CategoriesSection";
import ProductsSection from "./components/home/ProductsSection";
import ReviewsSection from "./components/home/ReviewsSection";
import ConsultSection from "./components/home/ConsultSection";
import AboutSection from "./components/home/AboutSection";
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
    const items = (payload.data ?? []) as AliProductsResponse[];
    const categorySource = items.slice(10);
    const productSource = items.slice(10, 20);
    products = productSource;
    categories = mapCategories(categorySource);
  } catch {
    products = [];
    categories = [];
  }

  return (
    <>
      <HeroSection />
      <CategoriesSection categories={categories} />
      <ProductsSection products={products} />
      <ReviewsSection />
      <ConsultSection />
      <AboutSection />
    </>
  );
}
