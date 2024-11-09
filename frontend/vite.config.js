import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: { "/api": { target: "https://www.chat-app-mern-backend-theta.vercel.app" } }, // this is remove cors error
  },
});
