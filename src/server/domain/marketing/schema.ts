import { ObjectId } from "mongodb";
import { z } from "zod";

export type SubscriptionStatus = "pending_confirmation" | "active" | "unsubscribed" | "bounced";

export interface MarketingSubscriptionDocument {
  _id: ObjectId;
  email: string;
  emailNormalized: string;
  preferredLocale: "en" | "hi";
  status: SubscriptionStatus;
  consentSource: string; // e.g. "footer_newsletter", "checkout_optin"
  consentTextVersion: string;
  consentTimestamp: Date;
  confirmationTokenHash?: string;
  confirmationTokenExpiresAt?: Date;
  confirmedAt?: Date | null;
  unsubscribedAt?: Date | null;
  brevoContactId?: string | null;
  lastSyncedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const SubscribeInputSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  locale: z.enum(["en", "hi"]).default("en"),
  source: z.string().default("footer_newsletter"),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: "Affirmative marketing consent is required" }),
  }),
});
