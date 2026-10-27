import { z } from "zod";

const indianMobile = z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number");
const indianPincode = z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit Indian PIN code");

export const CorporateEnquirySchema = z.object({
  companyName: z.string().min(2).max(150),
  contactName: z.string().min(2).max(100),
  businessEmail: z.string().email().max(254),
  estimatedQuantity: z.number().int().min(10, "Minimum corporate enquiry quantity is 10 units").max(100000),
  message: z.string().min(10).max(1000),
  locale: z.enum(["en", "hi"]).default("en"),
});
export type CorporateEnquiryInput = z.input<typeof CorporateEnquirySchema>;

export const CreateOrderSchema = z.object({
  locale: z.enum(["en", "hi"]).default("en"),
  productSlug: z.string().min(1),
  variantKey: z.string().default("default"),
  quantity: z.number().int().min(1).max(5).default(1),
  customer: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(254),
    phone: indianMobile,
  }),
  shippingAddress: z.object({
    recipientName: z.string().min(2).max(100),
    addressLine1: z.string().min(5).max(300),
    postalCode: indianPincode,
    countryCode: z.literal("IN").default("IN"),
  }),
  gift: z.object({ isGift: z.boolean(), giftMessage: z.string().max(100).optional() }),
  personalisation: z.object({
    recipient: z.string().max(80),
    message: z.string().max(400),
    date: z.string().max(40),
    ribbon: z.string().max(40),
    photoOption: z.enum(["installed", "envelope"]),
    photoFileId: z.string().max(40).optional(),
  }),
  paymentMethod: z.enum(["upi", "card", "cod"]),
});
export type CreateOrderInput = z.input<typeof CreateOrderSchema>;

export interface CreateOrderResult {
  orderNumber: string;
  status: string;
  totalRupees: string;
}
