import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), babel({ presets: [reactCompilerPreset()] })],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
