import { Collection } from "mongodb";
import { getDb } from "./mongodb";
import { ProductDocument } from "../domain/products/schema";
import { OrderDocument } from "../domain/orders/schema";
import { CorporateEnquiryDocument } from "../domain/corporate/schema";
import { MarketingSubscriptionDocument } from "../domain/marketing/schema";
import { IntegrationEventReceiptDocument } from "../domain/events/schema";

export async function getProductsCollection(): Promise<Collection<ProductDocument>> {
  const db = await getDb();
  return db.collection<ProductDocument>("products");
}

export async function getOrdersCollection(): Promise<Collection<OrderDocument>> {
  const db = await getDb();
  return db.collection<OrderDocument>("orders");
}

export async function getCorporateEnquiriesCollection(): Promise<Collection<CorporateEnquiryDocument>> {
  const db = await getDb();
  return db.collection<CorporateEnquiryDocument>("corporateEnquiries");
}

export async function getMarketingSubscriptionsCollection(): Promise<Collection<MarketingSubscriptionDocument>> {
  const db = await getDb();
  return db.collection<MarketingSubscriptionDocument>("marketingSubscriptions");
}

export async function getIntegrationEventReceiptsCollection(): Promise<Collection<IntegrationEventReceiptDocument>> {
  const db = await getDb();
  return db.collection<IntegrationEventReceiptDocument>("integrationEventReceipts");
}
