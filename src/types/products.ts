export type ProductType = "decorative_frame" | "jewellery";
export type ProductStatus = "draft" | "active" | "archived";

export interface PublicProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  position: number;
}

export interface PublicProductVariant {
  key: string;
  label: string;
  priceRupees: string; // Exact decimal string e.g. "1200.00"
  options: Record<string, string>;
  active: boolean;
}

/**
 * Client-safe Public Product DTO
 */
export interface PublicProductDto {
  slug: string;
  sku: string;
  type: ProductType;
  title: string;
  shortDescription?: string;
  description: string;
  materialDisclosure: string;
  priceRupees: string; // exact decimal string "1200.00"
  compareAtPriceRupees: string | null;
  currency: "INR";
  images: PublicProductImage[];
  variants: PublicProductVariant[];
  featuredRank: number;
}
