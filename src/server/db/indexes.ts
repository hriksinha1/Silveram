import {
  getProductsCollection,
  getOrdersCollection,
  getCorporateEnquiriesCollection,
  getMarketingSubscriptionsCollection,
  getIntegrationEventReceiptsCollection,
} from "./collections";

/**
 * Ensures all indexes defined in Database Design v0.2 Section 8 are created.
 */
export async function ensureDatabaseIndexes(): Promise<void> {
  const products = await getProductsCollection();
  const orders = await getOrdersCollection();
  const corporate = await getCorporateEnquiriesCollection();
  const marketing = await getMarketingSubscriptionsCollection();
  const events = await getIntegrationEventReceiptsCollection();

  // Products indexes
  await products.createIndex({ slug: 1 }, { unique: true });
  await products.createIndex({ sku: 1 }, { unique: true });
  await products.createIndex({ status: 1, type: 1, featuredRank: 1 });

  // Orders indexes
  await orders.createIndex({ orderNumber: 1 }, { unique: true });
  await orders.createIndex(
    { publicTrackingTokenHash: 1 },
    { unique: true, sparse: true }
  );
  await orders.createIndex(
    { idempotencyKeyHash: 1 },
    { unique: true, sparse: true }
  );
  await orders.createIndex({ status: 1, createdAt: -1 });

  // Corporate Enquiries indexes
  await corporate.createIndex({ status: 1, createdAt: -1 });

  // Marketing Subscriptions indexes
  await marketing.createIndex({ emailNormalized: 1 }, { unique: true });

  // Integration Event Receipts indexes
  await events.createIndex({ provider: 1, eventId: 1 }, { unique: true });
  await events.createIndex({ processingStatus: 1, receivedAt: 1 });
}
