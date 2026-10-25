import { MongoClient, Db } from "mongodb";

const dbName = process.env.MONGODB_DB || "silveram_mvp";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * Returns the connected MongoClient instance lazily.
 * Guarantees zero top-level evaluation errors during build on platforms like Vercel.
 */
export async function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri || !uri.startsWith("mongodb")) {
    throw new Error("Notice: MONGODB_URI is not currently set or valid in process.env");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, {
        maxPoolSize: 10,
        minPoolSize: 2,
      });
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    client = new MongoClient(uri, {
      maxPoolSize: 20,
      minPoolSize: 5,
    });
    clientPromise = client.connect();
  }

  return clientPromise;
}

/**
 * Returns the target database instance.
 */
export async function getDb(): Promise<Db> {
  const connectedClient = await getMongoClient();
  return connectedClient.db(dbName);
}

export default getMongoClient;
