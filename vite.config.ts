import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "src/api"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@services": path.resolve(__dirname, "src/services"),
      "@store": path.resolve(__dirname, "src/store"),
      "@sagas": path.resolve(__dirname, "src/sagas"),
      "@slices": path.resolve(__dirname, "src/slices"),
      "@types": path.resolve(__dirname, "src/types"),
      "@ui": path.resolve(__dirname, "src/ui"),
      "@src": path.resolve(__dirname, "src"),
    },
  },
});
