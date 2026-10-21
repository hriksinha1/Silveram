import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "silveram_mvp";

if (!uri) {
  // If not loaded from process.env, check if .env.local needs manual loading for standalone scripts
  console.warn("Notice: MONGODB_URI is not currently set in process.env");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve connection across HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri || "", {
      maxPoolSize: 10,
      minPoolSize: 2,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, avoid global variables
  client = new MongoClient(uri || "", {
    maxPoolSize: 20,
    minPoolSize: 5,
  });
  clientPromise = client.connect();
}

/**
 * Returns the connected MongoClient instance.
 */
export async function getMongoClient(): Promise<MongoClient> {
  return clientPromise;
}

/**
 * Returns the target database instance.
 */
export async function getDb(): Promise<Db> {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

export default clientPromise;
