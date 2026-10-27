import { ID } from "appwrite";
import { CorporateEnquirySchema, type CorporateEnquiryInput } from "@/lib/schemas";
import { appwriteConfig, databases, isAppwriteConfigured } from "./client";

export async function submitCorporateEnquiry(input: CorporateEnquiryInput): Promise<void> {
  const data = CorporateEnquirySchema.parse(input);
  if (!isAppwriteConfigured) {
    throw new Error("The enquiry service is not configured. Please try again later.");
  }
  await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.enquiriesCollectionId, ID.unique(), {
    ...data,
    businessEmail: data.businessEmail.trim().toLowerCase(),
    source: "web-corporate-section",
    status: "new",
  });
}
