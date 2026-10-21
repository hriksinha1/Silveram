import { MongoClient, Decimal128 } from "mongodb";
import * as fs from "fs";
import * as path from "path";

// Load .env.local manually
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const value = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "silveram_mvp";

if (!uri) {
  console.error("❌ MONGODB_URI is not set!");
  process.exit(1);
}

async function run() {
  console.log(`Connecting to MongoDB Atlas at: ${uri.replace(/:([^@]+)@/, ":****@")}`);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Successfully connected to MongoDB Atlas cluster!");

    const db = client.db(dbName);
    const pingResult = await db.command({ ping: 1 });
    console.log("✅ Ping result:", pingResult);

    // 1. Ensure Indexes
    console.log("\nEnsuring collections and indexes per Database Design v0.2...");
    const products = db.collection("products");
    const orders = db.collection("orders");
    const corporate = db.collection("corporateEnquiries");
    const marketing = db.collection("marketingSubscriptions");
    const events = db.collection("integrationEventReceipts");

    await products.createIndex({ slug: 1 }, { unique: true });
    await products.createIndex({ sku: 1 }, { unique: true });
    await products.createIndex({ status: 1, type: 1, featuredRank: 1 });

    await orders.createIndex({ orderNumber: 1 }, { unique: true });
    await orders.createIndex({ publicTrackingTokenHash: 1 }, { unique: true, sparse: true });
    await orders.createIndex({ idempotencyKeyHash: 1 }, { unique: true, sparse: true });
    await orders.createIndex({ status: 1, createdAt: -1 });

    await corporate.createIndex({ status: 1, createdAt: -1 });
    await marketing.createIndex({ emailNormalized: 1 }, { unique: true });
    await events.createIndex({ provider: 1, eventId: 1 }, { unique: true });
    await events.createIndex({ processingStatus: 1, receivedAt: 1 });
    console.log("✅ All collection indexes created successfully.");

    // 2. Seed Initial Catalogue Products
    console.log("\nSeeding initial catalogue products...");

    // Product 1: Silver-Coated Frame (Active)
    const frameDoc = {
      schemaVersion: 1,
      sku: "SIL-FRAME-001",
      slug: "silver-coated-frame",
      type: "decorative_frame",
      status: "active",
      content: {
        en: {
          title: "Silver-Coated Keepsake Frame",
          shortDescription: "An art-directed, silver-coated tabletop photo frame crafted to preserve personal milestones.",
          description: "Crafted with precision, this silver-coated tabletop frame offers an enduring haven for your most cherished memories. Featuring clean architectural lines, a tarnish-resistant protective finish, and an anti-glare display panel, it elevates any living space or workplace desk.",
          materialDisclosure: "Verified Composition: Precision engineered base alloy core with verified electroplated high-purity silver coating (non-solid, non-sterling). Coated with an anti-tarnish protective sealant.",
          seoTitle: "Silver-Coated Keepsake Frame | Silveram",
          seoDescription: "Thoughtful keepsakes for the people who make life matter. Premium silver-coated photo frame for gifting.",
        },
        hi: {
          title: "सिल्वर-कोटेड कीपसेक फ्रेम",
          shortDescription: "अनमोल यादों को सहेजने के लिए विशेष रूप से तैयार किया गया सिल्वर-कोटेड फोटो फ्रेम।",
          description: "सटीकता के साथ तैयार किया गया यह सिल्वर-कोटेड फ्रेम आपकी सबसे प्रिय स्मृतियों को एक सुंदर स्थान देता है।",
          materialDisclosure: "सत्यापित विवरण: प्रीमियम बेस मेटल कोर पर उच्च शुद्धता वाली सिल्वर-कोटिंग (ठोस चांदी नहीं)।",
          seoTitle: "सिल्वर-कोटेड कीपसेक फ्रेम | सिलवेराम",
          seoDescription: "अपनों के लिए एक अनमोल उपहार। सिलवेराम का प्रीमियम सिल्वर-कोटेड फोटो फ्रेम।",
        },
      },
      priceRupees: Decimal128.fromString("1200.00"),
      compareAtPriceRupees: null,
      currency: "INR",
      images: [
        {
          key: "products/sil-frame-001/hero.webp",
          alt: {
            en: "Silver-coated keepsake frame on dark navy background",
            hi: "गहरे नीले बैकग्राउंड पर सिल्वर-कोटेड फोटो फ्रेम",
          },
          width: 1600,
          height: 2000,
          position: 0,
        },
        {
          key: "products/sil-frame-001/detail.webp",
          alt: {
            en: "Close up of silver-coated frame edge and tarnish-resistant finish",
            hi: "सिल्वर-कोटेड फ्रेम के किनारे का विवरण",
          },
          width: 1600,
          height: 2000,
          position: 1,
        },
      ],
      variants: [
        {
          key: "default",
          label: "Standard (4x6 in)",
          options: { size: "4x6" },
          priceOverrideRupees: null,
          active: true,
        },
      ],
      featuredRank: 1,
      publishedAt: new Date("2026-10-21T00:00:00Z"),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Product 2: Peacock Statement Ring (Strictly Draft pending publication gate)
    const ringDoc = {
      schemaVersion: 1,
      sku: "SIL-RING-001",
      slug: "peacock-statement-ring",
      type: "jewellery",
      status: "draft", // STRICT PUBLICATION GATE: unpurchasable until verified!
      content: {
        en: {
          title: "Peacock Statement Ring",
          shortDescription: "Intricately detailed peacock motif statement ring with silver plating.",
          description: "An evocative tribute to Indian heritage and modern sculptural elegance.",
          materialDisclosure: "Draft / Pending Verification: Silver-plated artisanal finish over base metal. Claims pending laboratory hallmark verification.",
          seoTitle: "Peacock Statement Ring | Silveram",
          seoDescription: "Intricate peacock statement ring by Silveram.",
        },
        hi: {
          title: "मयूर स्टेटमेंट रिंग",
          shortDescription: "पारंपरिक मयूर डिजाइन से प्रेरित सिल्वर-प्लेटेड रिंग।",
          description: "भारतीय विरासत और आधुनिक डिजाइन का अनुपम संगम।",
          materialDisclosure: "सत्यापन प्रक्रियाधीन: बेस मेटल पर सिल्वर-प्लेटेड फिनिश।",
          seoTitle: "मयूर स्टेटमेंट रिंग | सिलवेराम",
          seoDescription: "सिलवेराम मयूर स्टेटमेंट रिंग।",
        },
      },
      priceRupees: Decimal128.fromString("12500.00"),
      compareAtPriceRupees: null,
      currency: "INR",
      images: [
        {
          key: "products/sil-ring-001/hero.webp",
          alt: {
            en: "Peacock statement ring detailed view",
            hi: "मयूर स्टेटमेंट रिंग का दृश्य",
          },
          width: 1600,
          height: 2000,
          position: 0,
        },
      ],
      variants: [
        {
          key: "size-12",
          label: "Size 12",
          options: { size: "12" },
          priceOverrideRupees: null,
          active: true,
        },
        {
          key: "size-14",
          label: "Size 14",
          options: { size: "14" },
          priceOverrideRupees: null,
          active: true,
        },
      ],
      featuredRank: 2,
      publishedAt: null, // Unpublished
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await products.updateOne(
      { sku: frameDoc.sku },
      { $set: frameDoc },
      { upsert: true }
    );
    console.log(`✅ Upserted Product 1: ${frameDoc.sku} (${frameDoc.slug}) - Status: ${frameDoc.status} - Price: ₹${frameDoc.priceRupees}`);

    await products.updateOne(
      { sku: ringDoc.sku },
      { $set: ringDoc },
      { upsert: true }
    );
    console.log(`✅ Upserted Product 2: ${ringDoc.sku} (${ringDoc.slug}) - Status: ${ringDoc.status} (Publication Gate Gated) - Price: ₹${ringDoc.priceRupees}`);

    // Verify count
    const totalProducts = await products.countDocuments();
    const activeProducts = await products.countDocuments({ status: "active" });
    console.log(`\nVerification summary: Total Products = ${totalProducts}, Active Public Products = ${activeProducts}`);
    console.log("🎉 Database initialization and verification completed successfully!");
  } catch (err) {
    console.error("❌ Error during database test and seed:", err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

run();
