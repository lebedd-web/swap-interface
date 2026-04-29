import { nextJsConfig } from "@library/eslint-config/next-js"

/** @type {import("eslint").Linter.Config} */
export default [
  {
    ignores: [
      // Build outputs
      ".next/**",
      "dist/**",
      "build/**",
      "out/**",

      // Dependencies
      "node_modules/**",

      // Config files
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      ".turbo/**",

      // Static files and generated files
      "public/**",
      "next-env.d.ts",
      "middleware.ts",

      "i18n/**",
      "messages/**",
      "postcss.config.mjs",
      "lib/fastboot/fastboot.min.mjs",
    ],
  },
  ...nextJsConfig,
  {
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "@next/next/no-img-element": "off",
    },
  },
  {
    files: ["next-env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  {
    files: ["next.config.*", "next.config.*.mjs", "next.config.mjs"],
    languageOptions: {
      globals: {
        process: "readonly",
      },
    },
  },
]
