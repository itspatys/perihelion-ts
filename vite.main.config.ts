import { defineConfig } from "vite"
import wasm from "vite-plugin-wasm"
import topLevelAwait from "vite-plugin-top-level-await"
import { viteStaticCopy } from "vite-plugin-static-copy"

export default defineConfig({
    build: {
        lib: {
            entry: "./src/main/main.ts",
            fileName: "main",
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
                    dest: "",
                },
            ],
        }),
    ],
    optimizeDeps: {
        exclude: ["opencv-wasm"],
    },
})
