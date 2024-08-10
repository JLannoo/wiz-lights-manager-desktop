import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config
export default defineConfig({
    plugins: [tsconfigPaths(), TanStackRouterVite()],
    resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
        browserField: false,
        mainFields: ["module", "jsnext:main", "jsnext"],
    },
});
