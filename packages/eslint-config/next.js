import pluginNext from "@next/eslint-plugin-next";
import pluginI18next from "eslint-plugin-i18next";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
  ...baseConfig,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    plugins: {
      i18next: pluginI18next,
    },
    rules: {
      ...pluginI18next.configs["flat/recommended"].rules,
      "i18next/no-literal-string": "error",
    },
  },
  // Add global rules for arrow functions
  {
    rules: {
      "arrow-body-style": ["error", "as-needed"],
      "func-style": ["error", "expression"],
    },
  },
  // i18n navigation rules - ensure consistent usage of locale-aware navigation
  {
    rules: {
      // Consistently import navigation APIs from `@/i18n/navigation`
      "no-restricted-imports": [
        "error",
        {
          name: "next/navigation",
          importNames: [
            "redirect",
            "permanentRedirect",
            "useRouter",
            "usePathname",
          ],
          message: "Please import from `@/i18n/navigation` instead.",
        },
      ],
    },
  },
];
