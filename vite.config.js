import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages: base must match your repo name
// Live URL: https://teivasystems.github.io/mockup-intellicampus/
export default defineConfig({
  base: "/mockup-intellicampus/",
  plugins: [react()],
  server: { port: 3000, open: true },
});
