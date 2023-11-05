import { defineConfig } from "vite"
import wasm from "vite-plugin-wasm"
import topLevelAwait from "vite-plugin-top-level-await"
import { viteStaticCopy } from "vite-plugin-static-copy"

import glob from "glob"
import path from "node:path"
import commonjs from "@rollup/plugin-commonjs"

function getEntries() {
    const a = Object.fromEntries(
        glob
            .sync("./src/main/nodes/filters/*.ts")
            .map((file) => [path.basename(file, ".ts"), file]),
    )
    a.main = "./src/main/main.ts"
    return a
}
getEntries()
export default defineConfig({
    build: {
        /* lib: {
            entry: "./src/main/main.ts",
            fileName: "main",
        }, */
        commonjsOptions: { include: [] },
        rollupOptions: {
            input: getEntries(),
            output: {
                preserveModules: true,
            },
        },
    },
    resolve: {
        browserField: false,
        mainFields: ["module", "jsnext:main", "jsnext"],
    },
    plugins: [
        wasm(),
        topLevelAwait(),
        viteStaticCopy({
            targets: [
                {
                    src: "node_modules/opencv-wasm/opencv.wasm",
                    dest: "node_modules/opencv-wasm/",
                },
                {
                    src: "node_modules/electron",
                    dest: "node_modules",
                },
            ],
        }),
        commonjs({
            /* dynamicRequireTargets: [
                ".vite/build/gaussian.filter.js",
                ".vite/build/main.js",
            ], */
            //exclude: [".vite/build/node_modules/**/*.js"],
            ignoreDynamicRequires: true,
        }),
    ],

    optimizeDeps: {
        exclude: ["opencv-wasm"],
    },
})
