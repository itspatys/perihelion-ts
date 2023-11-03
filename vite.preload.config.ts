import { defineConfig } from "vite"

export default defineConfig({
    build: {
        lib: {
            entry: "./src/preload/preload.ts",
            fileName: "preload",
        },
    },
})
