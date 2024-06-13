import { resolve } from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    alias: {
      "@": resolve(__dirname, "src")
    },
    include: ["__tests__/**/*.spec.ts"]
  }
})