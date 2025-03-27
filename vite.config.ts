import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import terser from "@rollup/plugin-terser";
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("chat-"),
        },
      },
    }),
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
    }),
  ],
  build: {
    minify: "terser",
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
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
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
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
