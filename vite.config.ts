import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
    }),
  ],
  build: {
    target: 'esnext',
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
      }
    },
  },
});