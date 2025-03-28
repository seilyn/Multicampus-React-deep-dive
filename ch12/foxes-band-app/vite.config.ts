import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-axios": ["axios"],
          "vendor-react": ["react", "react-dom"],
          "vendor-react-youtube": ["react-youtube"],
          "vendor-react-router": ["react-router-dom"],
        },
      },
    },
  },
});
