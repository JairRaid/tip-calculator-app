import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // Enables global test functions like `describe`, `it`, `expect`
    environment: "jsdom", // Simulates a browser DOM environment
    setupFiles: "./src/setupTests.js", // Runs setup script before tests
  },
});
