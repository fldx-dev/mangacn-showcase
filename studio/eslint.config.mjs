import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Installed mangacn files are kept as shipped; these trip Next's rules (see FINDINGS.md).
  {
    files: ["components/app-sidebar.tsx"],
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
  {
    files: ["hooks/use-mobile.ts", "components/profile-form.tsx", "components/upload-form.tsx"],
    rules: { "react-hooks/set-state-in-effect": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
