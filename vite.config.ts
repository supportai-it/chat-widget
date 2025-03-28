import { defineConfig } from "vite";
import terser from "@rollup/plugin-terser";
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
    }),
  ],
  build: {
    minify: "terser",
    target: 'esnext',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log"],
      },
      format: {
        comments: false,
      },
    },
    lib: {
      entry: "./src/main.ts",
      name: "ChatWidget",
      fileName: "chat-widget",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      plugins: [
        terser({
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ["console.log"],
          },
          format: {
            comments: false,
          },
        }),
      ],
    },
  },
});