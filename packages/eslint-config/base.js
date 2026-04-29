import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

import importBoundaryPlugin from "./src/plugins/index.js";

// This plugin is not supported in Tailwind CSS v4 yet, but should be added later.
// import tailwind from "eslint-plugin-tailwindcss"
// https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/325

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */

// Verify eslintConfigPrettier order.
export const config = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
      "import-boundary": importBoundaryPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "import/no-unresolved": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-duplicates": "error",
      "import/no-self-import": "error",
      "import/no-useless-path-segments": "error",
      "import/no-unused-modules": "error",
      "prettier/prettier": "error",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "no-console": "error",
      semi: ["error", "never"],
      "import-boundary/feature-import-boundary": "error",
      "import-boundary/module-import-boundary": "error",
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
        },
        typescript: {
          alwaysTryTypes: true,
          project: ["./packages/*/tsconfig.json", "./apps/*/tsconfig.json"],
        },
      },
    },
  },
  {
    ignores: ["dist/**"],
  },
  // Prettier config MUST be last to turn off rules that conflict with Prettier
  eslintConfigPrettier,
];
