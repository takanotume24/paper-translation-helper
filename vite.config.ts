import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "npm:vite-plugin-vue-devtools";

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  base: "/paper-translation-helper/",
  build: {
    outDir: "dist",
  },
});
