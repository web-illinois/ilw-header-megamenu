import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    root: "src",
    build: {
        outDir: "../dist/cdn",
        lib: {
            name: "ilw-header-megamenu",
            entry: "ilw-header-megamenu.ts",
            fileName: "ilw-header-megamenu",
            formats: ["es"],
        },
        rollupOptions: {
            output: {
                 assetFileNames: (chunkInfo) => {
                    if (chunkInfo.name === "style.css") return "ilw-header-megamenu.css";
                    return "assets/[name]-[hash][extname]"; // vite default
                },
            },
        },
    },
    server: {
        hmr: false,
    },
});
