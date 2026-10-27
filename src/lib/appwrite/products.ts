import { Query } from "appwrite";
import type { PublicProductDto, PublicProductImage, PublicProductVariant } from "@/types/products";
import { FALLBACK_PRODUCT } from "@/data/fallbackProduct";
import { appwriteConfig, databases, isAppwriteConfigured } from "./client";

/** Shape of a document in the Appwrite `products` collection (see appwrite/schema.md). */
interface ProductDoc {
  slug: string;
  sku: string;
  type: PublicProductDto["type"];
  status: string;
  titleEn: string;
  shortDescriptionEn?: string;
  descriptionEn: string;
  materialDisclosureEn: string;
  priceRupees: string;
  compareAtPriceRupees?: string | null;
  featuredRank?: number;
  imagesJson?: string;
  variantsJson?: string;
}

function parseJson<T>(raw: string | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function toDto(doc: ProductDoc): PublicProductDto {
  const images = parseJson<PublicProductImage[]>(doc.imagesJson, FALLBACK_PRODUCT.images);
  const variants = parseJson<PublicProductVariant[]>(doc.variantsJson, [
    { key: "default", label: "Standard", priceRupees: doc.priceRupees, options: {}, active: true },
  ]);
  return {
    slug: doc.slug,
    sku: doc.sku,
    type: doc.type,
    title: doc.titleEn,
    shortDescription: doc.shortDescriptionEn,
    description: doc.descriptionEn,
    materialDisclosure: doc.materialDisclosureEn,
    priceRupees: doc.priceRupees,
    compareAtPriceRupees: doc.compareAtPriceRupees ?? null,
    currency: "INR",
    images: images.length ? images : FALLBACK_PRODUCT.images,
    variants,
    featuredRank: doc.featuredRank ?? 0,
  };
}

/** Loads active products from Appwrite, ordered by featured rank. Returns [] on any failure. */
export async function fetchFeaturedProducts(): Promise<PublicProductDto[]> {
  if (!isAppwriteConfigured) return [];
  try {
    const res = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.productsCollectionId, [
      Query.equal("status", "active"),
      Query.orderAsc("featuredRank"),
      Query.limit(12),
    ]);
    return (res.documents as unknown as ProductDoc[]).map(toDto);
  } catch (error) {
    console.error("Failed to load products from Appwrite; using bundled catalogue.", error);
    return [];
  }
}
