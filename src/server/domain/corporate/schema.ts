import { ObjectId, Decimal128 } from "mongodb";
import { z } from "zod";

export type CorporateEnquiryStatus = "new" | "reviewing" | "quoted" | "won" | "lost" | "spam";

export interface CorporateEnquiryDocument {
  _id: ObjectId;
  companyName: string;
  contactName: string;
  role?: string;
  businessEmail: string;
  businessEmailNormalized: string;
  phone: string;
  estimatedQuantity: number;
  budgetPerGiftMinRupees?: Decimal128 | null;
  budgetPerGiftMaxRupees?: Decimal128 | null;
  expectedDeliveryDate?: Date | null;
  destinationCity?: string;
  destinationPinCodes?: string[];
  brandingRequirements?: string;
  message: string;
  locale: "en" | "hi";
  source: string;
  status: CorporateEnquiryStatus;
  followUpDate?: Date | null;
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const CorporateEnquiryInputSchema = z.object({
  companyName: z.string().min(2).max(150),
  contactName: z.string().min(2).max(100),
  role: z.string().max(100).optional(),
  businessEmail: z.string().email(),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  estimatedQuantity: z.number().int().min(10, "Minimum corporate enquiry quantity is 10 units"),
  budgetPerGiftRange: z.string().max(100).optional(),
  expectedDeliveryDate: z.string().optional(),
  destinationCity: z.string().max(100).optional(),
  brandingRequirements: z.string().max(500).optional(),
  message: z.string().min(10).max(1000),
  locale: z.enum(["en", "hi"]).default("en"),
});
