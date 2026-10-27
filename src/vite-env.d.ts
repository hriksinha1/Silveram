/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL?: string;
  readonly VITE_APPWRITE_ENDPOINT?: string;
  readonly VITE_APPWRITE_PROJECT_ID?: string;
  readonly VITE_APPWRITE_DATABASE_ID?: string;
  readonly VITE_APPWRITE_PRODUCTS_COLLECTION_ID?: string;
  readonly VITE_APPWRITE_ENQUIRIES_COLLECTION_ID?: string;
  readonly VITE_APPWRITE_CREATE_ORDER_FUNCTION_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
