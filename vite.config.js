import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react({ jsxRuntime: "automatic" }),
    tsconfigPaths(),
  ],
  server: {
    hmr: {
      overlay: true, // shows errors in browser overlay
    },
    watch: {
      ignored: ['**/node_modules/**'] // ignore unnecessary files
    }
  },
  logLevel: 'info', // or 'warn' to reduce logs
});
