import { ObjectId } from "mongodb";

export type EventProcessingStatus = "received" | "processed" | "ignored" | "failed";

export interface IntegrationEventReceiptDocument {
  _id: ObjectId;
  provider: string; // e.g. "razorpay", "brevo"
  eventId: string;
  eventType: string;
  processingStatus: EventProcessingStatus;
  payloadHash: string;
  relatedOrderId?: ObjectId | null;
  attemptCount: number;
  lastErrorCode?: string | null;
  receivedAt: Date;
  processedAt?: Date | null;
  createdAt: Date;
}
