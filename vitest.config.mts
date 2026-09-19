import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Vite resolves the "@/" alias from tsconfig natively, so tests import
    // exactly the way the application does with no plugin in between.
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
