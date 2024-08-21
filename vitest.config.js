// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// import { fileURLToPath, URL } from "node:url";

// export default defineConfig({
//   plugins: [vue()],
//   test: {
//     // Vitest options
//     environment: "jsdom",
//     globals: true,
//     // include: ["tests/**/*.test.js"],
//     // exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
//   },

//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL("./src", import.meta.url)),
//     },
//   },
// });

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/**/*.test.js"], // Ensure this line is uncommented
  },
});