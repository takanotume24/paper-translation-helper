import { defineConfig } from "npm:vite@^6.2.4";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "npm:vite-plugin-vue-devtools";

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  base: "/paper-translation-helper/",
  build: {
    outDir: "dist",
  },
});
