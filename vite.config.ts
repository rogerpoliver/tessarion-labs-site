import { defineConfig } from "vite";

// `base: "./"` keeps every asset reference relative, so the same build serves
// correctly from a GitHub Pages project subpath, from a custom domain root, and
// from a local static server. There is only one HTML document, so relative
// resolution has exactly one context — see design.md, "Deployment".
export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    target: "es2022",
  },
  server: {
    port: 5173,
  },
});
