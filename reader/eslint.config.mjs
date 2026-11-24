import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Installed by @mangacn/sidebar as is; its setState-in-effect trips react-hooks (FINDINGS.md).
    "hooks/use-mobile.ts",
    // Installed by @mangacn/spread-viewer as is; React Compiler lint rejects its useCallbacks (FINDINGS.md).
    "components/blocks/spread-viewer/use-spread.ts",
  ]),
]);

export default eslintConfig;
