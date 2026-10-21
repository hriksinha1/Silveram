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

    // Product 1: Sacred Keepsake Frame (Active)
    const frameDoc = {
      schemaVersion: 1,
      sku: "SIL-FRAME-001",
      slug: "silver-coated-frame",
      type: "decorative_frame",
      status: "active",
      content: {
        en: {
          title: "The Sacred Keepsake Frame • Lakshmi-Ganesha Edition",
          shortDescription: "An architectural devotional keepsake frame featuring pure 999 fine silver clad relief of Sri Lakshmi & Sri Ganesha in monolithic optical acrylic with custom engraved rear plaque.",
          description: "Crafted with precision geometry, this architectural devotional sanctuary preserves your most sacred blessings and cherished memories. Featuring an embossed 999 fine silver clad relief of Sri Lakshmi and Sri Ganesha with auspicious 'Shubh Labh' floral arches, an ultra-clear monolithic acrylic casing with built-in desktop stand, and a personalized engraved silver keepsake plaque on the reverse.",
          materialDisclosure: "Verified Composition: Precision engineered structural composite core with verified electroformed 999 fine silver cladding (non-solid, non-sterling). Sealed with permanent nano-ceramic anti-tarnish molecular matrix. Encased within optical-grade monolithic acrylic casing.",
          seoTitle: "The Sacred Keepsake Frame • Lakshmi-Ganesha Edition | Silveram",
          seoDescription: "Pure 999 silver clad devotional keepsake frame with personalized rear engraved plaque. Silveram.",
        },
        hi: {
          title: "सैक्रेड कीपसेक फ्रेम • श्री लक्ष्मी-गणेश संस्करण",
          shortDescription: "999 फाइन सिल्वर-क्लैड श्री लक्ष्मी और गणेश जी का नक्काशीदार पवित्र फ्रेम, व्यक्तिगत संदेश पट्टिका के साथ।",
          description: "सटीक ज्यामिति के साथ तैयार किया गया यह पवित्र फ्रेम आपकी सबसे प्रिय स्मृतियों और आशीर्वाद को एक सुंदर स्थान देता है।",
          materialDisclosure: "सत्यापित विवरण: प्रीमियम कोर पर 999 शुद्ध फाइन सिल्वर इलेक्ट्रोफॉर्म्ड क्लैडिंग (ठोस चांदी नहीं)। नैनो-सिरेमिक एंटी-टार्निश सुरक्षा।",
          seoTitle: "सैक्रेड कीपसेक फ्रेम | सिलवेराम",
          seoDescription: "अपनों के लिए एक अनमोल पवित्र उपहार। सिलवेराम का प्रीमियम सिल्वर-क्लैड फ्रेम।",
        },
      },
      priceRupees: Decimal128.fromString("1200.00"),
      compareAtPriceRupees: null,
      currency: "INR",
      images: [
        {
          key: "/products/frame-01.webp",
          alt: {
            en: "Silveram Sacred Keepsake Frame front view with Sri Lakshmi and Ganesha",
            hi: "सिल्वर-कोटेड पवित्र फ्रेम का मुख्य दृश्य",
          },
          width: 933,
          height: 1400,
          position: 0,
        },
        {
          key: "/products/frame-02.webp",
          alt: {
            en: "Perspective view showing monolithic acrylic casing and bevel",
            hi: "ऐक्रेलिक केसिंग का कोणीय दृश्य",
          },
          width: 933,
          height: 1400,
          position: 1,
        },
        {
          key: "/products/frame-03.webp",
          alt: {
            en: "Lakshmi and Ganesha idols on royal blue velvet",
            hi: "शाही नीले मखमली कपड़े पर श्री लक्ष्मी-गणेश",
          },
          width: 933,
          height: 1400,
          position: 2,
        },
        {
          key: "/products/frame-04.webp",
          alt: {
            en: "Macro close-up of 999 fine silver embossed relief",
            hi: "सिल्वर नक्काशी का नजदीकी दृश्य",
          },
          width: 933,
          height: 1400,
          position: 3,
        },
      ],
      variants: [
        {
          key: "default",
          label: "Standard Tabletop (18.5 × 23.5 cm)",
          options: { size: "tabletop" },
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
