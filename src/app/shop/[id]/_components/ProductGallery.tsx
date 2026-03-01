import Image from "next/image";
import { useState } from "react";
import Search from "@mui/icons-material/Search";
import { ProductDetail } from "@/type/product-detail";

export const ProductGallery = ({ product }: { product: ProductDetail }) => {
  const [activeImage, setActiveImage] = useState(0);
  const galleryImages = product.gallery.length
    ? product.gallery
    : [product.imageSrc];

  return (
    <div className="space-y-6">
      <div className="relative rounded-3xl">
        <Image
          src={galleryImages[activeImage] ?? product.imageSrc}
          alt={product.name}
          width={520}
          height={460}
          className="h-full w-full rounded-3xl"
          unoptimized
        />
        <span className="absolute right-2 top-2">
          <Search fontSize="medium" className="text-brand-ink" />
        </span>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {galleryImages.slice(0, 5).map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImage(index)}
            className={`transition-colors border rounded-2xl overflow-hidden ${
              activeImage === index ? "" : "brightness-50 hover:brightness-100"
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={image}
              alt={product.name}
              width={120}
              height={120}
              className="h-25 w-full object-cover cursor-pointer"
              unoptimized
            />
          </button>
        ))}
      </div>
    </div>
  );
};
