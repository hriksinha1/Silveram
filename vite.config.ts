import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

/** Replaces %VITE_APP_URL% in index.html, falling back to localhost so tags are never left unresolved. */
function appUrlPlugin(appUrl: string): Plugin {
  return {
    name: "silveram-app-url",
    transformIndexHtml: (html) => html.replaceAll("%VITE_APP_URL%", appUrl.replace(/\/$/, "")),
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const appUrl = env.VITE_APP_URL || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

  return {
    plugins: [react(), appUrlPlugin(appUrl)],
    resolve: { alias: { "@": path.resolve(__dirname, "src") } },
    server: { port: 3000 },
    preview: { port: 3000 },
    build: {
      target: "es2022",
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            gsap: ["gsap", "@gsap/react"],
            appwrite: ["appwrite"],
          },
        },
      },
    },
  };
});
