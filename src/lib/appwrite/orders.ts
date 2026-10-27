import { ExecutionMethod, ID } from "appwrite";
import { CreateOrderSchema, type CreateOrderInput, type CreateOrderResult } from "@/lib/schemas";
import { appwriteConfig, functions, isAppwriteConfigured, storage } from "./client";

export const MAX_PHOTO_BYTES = 10 * 1024 * 1024;

/** Uploads the customer's keepsake photo to the write-only `order-photos` bucket. */
export async function uploadOrderPhoto(file: File): Promise<string> {
  if (!isAppwriteConfigured) throw new Error("Photo upload is unavailable: the backend is not configured.");
  if (file.size > MAX_PHOTO_BYTES) throw new Error("Photo must be 10 MB or smaller.");
  const uploaded = await storage.createFile(appwriteConfig.orderPhotosBucketId, ID.unique(), file);
  return uploaded.$id;
}

/**
 * Places an order via the `create-order` Appwrite Function. Prices are always recomputed
 * server-side from the catalogue, so the client never dictates what it pays.
 */
export async function placeOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  const payload = CreateOrderSchema.parse(input);
  if (!isAppwriteConfigured) {
    throw new Error("Ordering is unavailable: the backend is not configured.");
  }
  const execution = await functions.createExecution(
    appwriteConfig.createOrderFunctionId,
    JSON.stringify(payload),
    false,
    "/orders",
    ExecutionMethod.POST,
    { "content-type": "application/json" },
  );
  let body: { ok?: boolean; error?: string; order?: CreateOrderResult } = {};
  try {
    body = JSON.parse(execution.responseBody || "{}");
  } catch {
    /* fall through to generic error */
  }
  if (execution.responseStatusCode >= 400 || !body.ok || !body.order) {
    throw new Error(body.error || "We could not place your order. Please try again.");
  }
  return body.order;
}
