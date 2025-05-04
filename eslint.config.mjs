// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./tsconfig.dev.json",
                tsconfigRootDir: import.meta.dirname,
                sourceType: "module",
            },
        },
        plugins: {
            prettier,
        },
        rules: {
            "prettier/prettier": "warn",
            "no-console": "off",
            "no-debugger": "off",
            quotes: ["warn", "double"],
            semi: ["warn", "always"],
        },
    },
];
