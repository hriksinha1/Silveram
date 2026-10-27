# Silveram

India-first gifting and keepsakes storefront. The flagship product is **The Sacred Keepsake Frame • Lakshmi-Ganesha Edition** (₹1,200), a 999 fine-silver-clad devotional frame with a personalised, engraved rear plaque.

| Layer      | Technology                                              |
| ---------- | ------------------------------------------------------- |
| Frontend   | React 19, TypeScript, **Vite 6**, Tailwind CSS 3, GSAP  |
| Backend    | **Appwrite** (Database, Storage, Functions)             |
| Hosting    | **Vercel** (static SPA)                                 |

Design direction: *Midnight Gallery + The Gift Ritual*, a dark navy canvas (`#0C1B36`) alternating with warm porcelain (`#F7F5F0`), with cobalt used sparingly. See [DESIGN.md](DESIGN.md).

## Features

- Cinematic hero with an interactive 3D frame viewer (turn, blueprint mode, live inscription)
- "Letter ritual" personalisation, gifting occasions, unboxing suite, real-moments gallery
- Honest materiality specs, pincode transit estimator, corporate gifting enquiries, FAQ
- Cart drawer with ribbon choice and archival photo upload, then a three-step checkout
- English / Hindi toggle and subtle Web Audio micro-interactions (mutable, preference remembered)
- Respects `prefers-reduced-motion`; keyboard-visible focus rings

## Architecture

```
Browser (Vite SPA on Vercel)
   │
   ├── Databases.listDocuments   → products            (public read)
   ├── Databases.createDocument  → corporate_enquiries (public create, no read)
   ├── Storage.createFile        → order-photos bucket (public create, no read)
   └── Functions.createExecution → create-order        (server-side validation + pricing)
                                       └── writes → orders (no client access)
```

Design decisions:

- **Prices are never trusted from the browser.** The `create-order` function re-reads the product price from the database and computes totals in integer paise.
- **`orders` has no client permissions.** Only the function (via its scoped API key) can write it; customer PII is never readable from the browser.
- **Graceful degradation.** If `VITE_APPWRITE_PROJECT_ID` is unset or Appwrite is unreachable, the storefront still renders from a bundled catalogue entry ([src/data/fallbackProduct.ts](src/data/fallbackProduct.ts)). Ordering and enquiries show a clear error instead of failing silently.
- Money is stored as exact rupee strings (`"1200.00"`), per the project's data-model decision.

## Project structure

```
src/
  components/    UI sections (product, gifting, trust, cart, layout, commerce, corporate)
  context/       Cart, Language (en/hi) and Sound providers
  lib/           appwrite/ (client, products, orders, enquiries), schemas.ts (zod), audio, format
  data/          Bundled fallback product
  pages/         HomePage, NotFound
public/          Product + lifestyle images, favicon, robots.txt
appwrite/        create-order function source
scripts/         setup-appwrite.mjs (provisions the backend)
appwrite.json    Appwrite CLI project config
vercel.json      SPA rewrites, cache and security headers
```

## Getting started

Requires Node.js ≥ 20.19.

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

Without any Appwrite configuration the site runs on bundled data, which is enough for front-end work.

### Scripts

| Command                | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Vite dev server with HMR on port 3000           |
| `npm run build`        | Type-check, then production build into `dist/`  |
| `npm run preview`      | Serve the production build locally              |
| `npm run typecheck`    | TypeScript check only                           |
| `npm run appwrite:setup` | Provision the Appwrite database/bucket/seed   |

## Backend setup (Appwrite)

1. Create a project at [cloud.appwrite.io](https://cloud.appwrite.io) (or self-host).
2. **Add a Web platform** to the project for each origin: `localhost` and your Vercel domain (Settings → Platforms). Requests from unlisted origins are rejected.
3. Create an API key with scopes `databases.read`, `databases.write`, `collections.write`, `attributes.write`, `indexes.write`, `documents.write`, `buckets.write`, `files.read`.
4. Fill `.env.local`: `VITE_APPWRITE_PROJECT_ID` plus `APPWRITE_API_KEY` (the key is only read by the setup script, never bundled).
5. Provision everything (idempotent, safe to re-run):

   ```bash
   npm run appwrite:setup
   ```

   This creates the `silveram` database, the `products`, `corporate_enquiries` and `orders` collections with their indexes and permissions, the `order-photos` bucket (10 MB, jpg/png/webp), and seeds `SIL-FRAME-001`.
6. Deploy the order function with the [Appwrite CLI](https://appwrite.io/docs/tooling/command-line/installation):

   ```bash
   npm i -g appwrite-cli
   appwrite login
   # set "projectId" in appwrite.json, then:
   appwrite push function --function-id create-order
   ```

   In the Appwrite console, add the function variable `DATABASE_ID=silveram` (only needed if you changed the default).

### Data model

| Collection / bucket   | Client permissions | Notes                                                    |
| --------------------- | ------------------ | -------------------------------------------------------- |
| `products`            | read: any          | Public catalogue; `priceRupees` is a decimal string      |
| `corporate_enquiries` | create: any        | B2B leads; read via console/API key only                 |
| `orders`              | none               | Written only by `create-order`                           |
| `order-photos`        | create: any        | Customers can upload but not list or download            |

## Deploying to Vercel

1. Push the repo and import it in Vercel. The Vite framework preset is detected from [vercel.json](vercel.json) (build `npm run build`, output `dist`).
2. Add Environment Variables (Production and Preview):

   | Variable                                   | Value                                  |
   | ------------------------------------------ | -------------------------------------- |
   | `VITE_APP_URL`                             | Your production URL (canonical/OG tags) |
   | `VITE_APPWRITE_ENDPOINT`                   | `https://cloud.appwrite.io/v1` (or your self-hosted endpoint) |
   | `VITE_APPWRITE_PROJECT_ID`                 | Your project ID                        |
   | `VITE_APPWRITE_DATABASE_ID`                | `silveram`                             |
   | `VITE_APPWRITE_PRODUCTS_COLLECTION_ID`     | `products`                             |
   | `VITE_APPWRITE_ENQUIRIES_COLLECTION_ID`    | `corporate_enquiries`                  |
   | `VITE_APPWRITE_CREATE_ORDER_FUNCTION_ID`   | `create-order`                         |

   Do **not** add `APPWRITE_API_KEY` to Vercel; the browser build never needs it.
3. Add the Vercel domain as a Web platform in Appwrite (step 2 above).

`vercel.json` rewrites unknown paths to `index.html` (the app renders its own 404), caches hashed assets for a year, and sets `nosniff`, `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy` headers.

## Known gaps before taking real payments

- **No payment gateway is integrated.** Prepaid orders (UPI/card) are saved as `pending_payment` and the customer is told a payment link will follow; COD orders are saved as `confirmed`. Wire a gateway (e.g. Razorpay) webhook into a second Appwrite Function to flip `paymentStatus`.
- **No transactional email** (Brevo is planned): order confirmations and tax invoices are not sent yet.
- **No order tracking page or admin UI**; manage orders from the Appwrite console for now.
- **No rate limiting beyond Appwrite's platform defaults** on the public create endpoints. Consider Appwrite's abuse protection or a CAPTCHA before launch.
- Confirm tax/invoice treatment, shipping fees, returns policy and the 999-silver material claims (see the `Silvaram_Project_Documentation_v1` implementation gate) before going live.

## Documentation

Product and architecture history lives in [Silvaram_Project_Documentation_v1/](Silvaram_Project_Documentation_v1). Start with `00_Start_Here/README.md`. The older HLD/LLD/DB/API documents describe the former Next.js + MongoDB design and are superseded by this README for stack decisions.
