import { randomInt } from "crypto";
import HeaderSection from "./components/Header";
import FooterSection from "./components/Footer";
import HeroSection from "./components/home/HeroSection";
import CategoriesSection, {
  Category,
} from "./components/home/CategoriesSection";
import ProductsSection, { Product } from "./components/home/ProductsSection";
import ReviewsSection from "./components/home/ReviewsSection";
import ConsultSection from "./components/home/ConsultSection";
import AboutSection from "./components/home/AboutSection";

type ApiProduct = {
  id: string | number;
  productTitle?: string | null;
  shortDesc?: string | null;
  salePrice?: number | string | null;
  originalPrice?: number | string | null;
  discountPercentage?: string | null;
  image?: string[] | null;
  imge?: string[] | null;
  category1?: string | null;
};

type ApiResponse = {
  message?: string;
  data?: ApiProduct[];
};

const formatMoney = (value?: number | string | null) => {
  if (value === null || value === undefined || value === "") return undefined;
  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return undefined;
  return `$${num.toFixed(2)}`;
};

const mapProducts = (items: ApiProduct[]): Product[] =>
  items
    .filter((item) => Boolean(item.productTitle))
    .slice(0, 12)
    .map((item) => {
      const images = item.image ?? item.imge ?? [];
      const salePrice = formatMoney(item.salePrice);
      const originalPrice = formatMoney(item.originalPrice);
      return {
        id: String(item.id),
        name: item.productTitle || "Untitled product",
        description: item.shortDesc || "",
        price: salePrice ?? originalPrice ?? "$0.00",
        oldPrice: salePrice && originalPrice ? originalPrice : undefined,
        badge: item.discountPercentage ? `-${item.discountPercentage}` : "Sale",
        imageSrc: images[0] || "/products/product-bottle.svg",
      };
    });

const mapCategories = (items: ApiProduct[]): Category[] => {
  const seen = new Set<string>();
  const categories: Category[] = [];
  for (const item of items) {
    if (!item.category1) continue;
    if (seen.has(item.category1)) continue;
    const images = item.image ?? item.imge ?? [];
    categories.push({
      title: item.category1,
      image: images[0] || "/products/product-pouch.svg",
    });
    seen.add(item.category1);
    if (categories.length >= 5) break;
  }
  return categories;
};

export default async function Home() {
  let products: Product[] = [];
  let categories: Category[] = [];

  try {
    const randomPage = randomInt(1, 101);
    const response = await fetch(
      `${process.env.API_BASE_URL}/products?page=${randomPage}`,
      {
        next: { revalidate: 60 },
      },
    );
    const payload = (await response.json()) as ApiResponse;
    const items = payload.data ?? [];
    const productSource = items;
    const categorySource = items.slice(12).length ? items.slice(12) : items;
    products = mapProducts(productSource);
    categories = mapCategories(categorySource);
  } catch {
    products = [];
    categories = [];
  }

  return (
    <div className="bg-cream text-foreground">
      <HeaderSection />
      <HeroSection />
      <CategoriesSection categories={categories} />
      <ProductsSection products={products} />
      <ReviewsSection />
      <ConsultSection />
      <AboutSection />
      <FooterSection />
    </div>
  );
}
