// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Deploy actual: GitHub Pages en subpath.
  // Si más adelante usás dominio propio: site: "https://tudominio.com" y base: "/".
  site: "https://cimasitesorg-hue.github.io",
  base: "/play-egresados",
  // Astro genera HTML estático por página (excelente SEO + performance en mobile).
  output: "static",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    // CSS inline para el above-the-fold => menos requests, primer render más rápido.
    inlineStylesheets: "auto",
  },
});
