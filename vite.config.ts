import { resolve } from "node:path";

import { defineConfig } from "vite";

// `base: "./"` keeps every asset reference relative. Vite resolves it per
// document, so the root page and the two under /pt/ and /es/ each get a correct
// relative path to the same hashed assets — and the same build serves from a
// GitHub Pages project subpath, from a custom domain root, or from a local
// static server. See design.md, "Deployment" and "Three documents, not one".
export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    target: "es2022",
    rollupOptions: {
      input: {
        en: resolve(import.meta.dirname, "index.html"),
        pt: resolve(import.meta.dirname, "pt/index.html"),
        es: resolve(import.meta.dirname, "es/index.html"),
      },
    },
  },
  server: {
    port: 5173,
  },
});
