import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import tailwindPlugin from "eslint-plugin-tailwindcss";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.tsx"],
    ignores: ["**/*.test.ts", "**/*.test.tsx", ".config.*", ".next/**", "node_modules/*", "build/**/*"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: "module",
      globals: {
        React: "readonly",
        console: "readonly",
        process: "readonly",
        document: "readonly",
        fetch: "readonly",
        window: "readonly",
        localStorage: "readonly",
        alert: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
      tailwindcss: tailwindPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/classnames-order": "warn",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
];
