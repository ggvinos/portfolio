import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import a11y from "eslint-plugin-jsx-a11y";
import hooks from "eslint-plugin-react-hooks";
export default defineConfig([
  globalIgnores([
    ".next/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
  ]),
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "jsx-a11y": a11y, "react-hooks": hooks },
    rules: {
      ...a11y.flatConfigs.recommended.rules,
      ...hooks.configs.recommended.rules,
    },
  },
]);
