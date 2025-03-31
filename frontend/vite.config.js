import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
// import { defineConfig } from "vite";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    build: {
      chunkSizeWarningLimit: 1000, // Increase this limit (default is 500)
    },
  },
})

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


