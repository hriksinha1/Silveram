import { ObjectId, Decimal128 } from "mongodb";
import { z } from "zod";
import { toRupeeString } from "@/server/db/decimal";

export type ProductType = "decorative_frame" | "jewellery";
export type ProductStatus = "draft" | "active" | "archived";

export interface LocalizedContent {
  title: string;
  shortDescription?: string;
  description: string;
  materialDisclosure: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProductImage {
  key: string; // R2 object key
  alt: {
    en: string;
    hi?: string;
  };
  width: number;
  height: number;
  position: number;
}

export interface ProductVariant {
  key: string;
  label: string;
  options: Record<string, string>;
  priceOverrideRupees: Decimal128 | null;
  active: boolean;
}

export interface ProductDocument {
  _id: ObjectId;
  schemaVersion: number;
  sku: string; // Silveram internal SKU only; never supplier SKU
  slug: string;
  type: ProductType;
  status: ProductStatus;
  content: {
    en: LocalizedContent;
    hi: LocalizedContent;
  };
  priceRupees: Decimal128;
  compareAtPriceRupees: Decimal128 | null;
  currency: "INR";
  images: ProductImage[];
  variants: ProductVariant[];
  featuredRank: number;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Public DTO returned over API / rendered on client.
 * Strictly rupee strings, never exposes raw Decimal128 or supplier information.
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
  images: Array<{
    url: string;
    alt: string;
    width: number;
    height: number;
    position: number;
  }>;
  variants: Array<{
    key: string;
    label: string;
    priceRupees: string;
    options: Record<string, string>;
    active: boolean;
  }>;
  featuredRank: number;
}

/**
 * Maps a ProductDocument to PublicProductDto for a requested locale.
 */
export function toPublicProductDto(
  doc: ProductDocument,
  locale: "en" | "hi" = "en",
  r2Domain: string = process.env.R2_MEDIA_DOMAIN || "https://media.silveram.example"
): PublicProductDto {
  const content = doc.content[locale] || doc.content.en;
  const basePriceStr = toRupeeString(doc.priceRupees);

  return {
    slug: doc.slug,
    sku: doc.sku,
    type: doc.type,
    title: content.title,
    shortDescription: content.shortDescription,
    description: content.description,
    materialDisclosure: content.materialDisclosure,
    priceRupees: basePriceStr,
    compareAtPriceRupees: doc.compareAtPriceRupees ? toRupeeString(doc.compareAtPriceRupees) : null,
    currency: "INR",
    images: (doc.images || []).map((img) => ({
      url: `${r2Domain.replace(/\/$/, "")}/${img.key}`,
      alt: img.alt[locale] || img.alt.en || "",
      width: img.width,
      height: img.height,
      position: img.position,
    })),
    variants: (doc.variants || []).map((v) => ({
      key: v.key,
      label: v.label,
      priceRupees: v.priceOverrideRupees ? toRupeeString(v.priceOverrideRupees) : basePriceStr,
      options: v.options,
      active: v.active,
    })),
    featuredRank: doc.featuredRank || 0,
  };
}

// Zod Validation Schema for creating/updating products
export const ProductContentSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  shortDescription: z.string().max(500).optional(),
  description: z.string().min(1, "Description is required"),
  materialDisclosure: z.string().min(1, "Material disclosure is mandatory before publication"),
  seoTitle: z.string().max(100).optional(),
  seoDescription: z.string().max(300).optional(),
});

export const ProductInputSchema = z.object({
  sku: z.string().regex(/^SIL-[A-Z0-9-]+$/, "SKU must match Silveram format e.g. SIL-FRAME-001"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  type: z.enum(["decorative_frame", "jewellery"]),
  status: z.enum(["draft", "active", "archived"]),
  content: z.object({
    en: ProductContentSchema,
    hi: ProductContentSchema,
  }),
  priceRupees: z.string().regex(/^\d+(\.\d{2})?$/, "Price must be a valid rupee string e.g. '1200.00'"),
  compareAtPriceRupees: z.string().regex(/^\d+(\.\d{2})?$/).optional().nullable(),
  featuredRank: z.number().int().default(0),
});
