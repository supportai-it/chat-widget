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
      fileName: (format) => {
        if (format === 'es') return 'chat-widget.es.js';
        if (format === 'umd') return 'chat-widget.umd.js';
        return 'chat-widget.js';
      },
      formats: ["es", "umd"],
    },
    rollupOptions: {
      output: {
        globals: {
          ChatWidget: 'ChatWidget'
        }
      },
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