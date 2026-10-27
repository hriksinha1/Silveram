import { Account, Client, Databases, Functions, Storage } from "appwrite";

const env = import.meta.env;

export const appwriteConfig = {
  endpoint: env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
  projectId: env.VITE_APPWRITE_PROJECT_ID || "",
  databaseId: env.VITE_APPWRITE_DATABASE_ID || "silveram",
  productsCollectionId: env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID || "products",
  enquiriesCollectionId: env.VITE_APPWRITE_ENQUIRIES_COLLECTION_ID || "corporate_enquiries",
  createOrderFunctionId: env.VITE_APPWRITE_CREATE_ORDER_FUNCTION_ID || "create-order",
  orderPhotosBucketId: "order-photos",
} as const;

/** True when a project ID is configured. Without it the storefront runs on bundled static data. */
export const isAppwriteConfigured = Boolean(appwriteConfig.projectId);

const client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);

export const databases = new Databases(client);
export const functions = new Functions(client);
export const storage = new Storage(client);
export const account = new Account(client);
