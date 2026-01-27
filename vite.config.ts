import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig(({ command, mode }) => {
  const plugins = [vue()];

  if (command === "serve" && mode !== "test" && !process.env.VITEST) {
    plugins.push(vueDevTools());
  }

  return {
    plugins,
    base: "/paper-translation-helper/",
    build: {
      outDir: "dist",
    },
  };
});
