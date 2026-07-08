import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    // Stub out Node-only deps pulled in by react-router v7's SSR chunk
    {
      name: 'stub-server-only',
      enforce: 'pre',
      resolveId(id) {
        if (id === 'set-cookie-parser') return '\0set-cookie-parser';
        return null;
      },
      load(id) {
        if (id === '\0set-cookie-parser') {
          return 'export function splitCookiesString() { return []; }';
        }
        return null;
      },
    },
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["set-cookie-parser"],
    esbuildOptions: {
      plugins: [
        {
          name: 'external-set-cookie-parser',
          setup(build) {
            build.onResolve({ filter: /^set-cookie-parser$/ }, () => ({
              path: 'set-cookie-parser',
              external: true,
            }))
          },
        },
      ],
    },
  },
});
