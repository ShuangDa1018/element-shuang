import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
export default {
  base: "./",
  plugins: [vue()],
  optimizeDeps: {
    include: ["schart.js"],
  },
  server: {
    open: true,
    port: 8080,
  },
  resolve: {
    extensions: [".vue", ".js", ".scss", ".css"],
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
};
