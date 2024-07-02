import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: false,
    proxy: {
      "/api": {
        // target: "http://localhost:9977", // java+spring+MySQL
        target: "http://localhost:3000", // nest/express
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
