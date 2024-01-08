import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // server: {
    //   hmr: false,
    // },
    // vite config
    optimizeDeps: {
      // 👈 optimizedeps
      esbuildOptions: {
        target: 'esnext',
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
        supported: {
          bigint: true,
        },
      },
    },

    build: {
      target: ['esnext'], // 👈 build.target
    },
    plugins: [
      react({
        babel: {
          plugins: ['macros'],
        },
      }),
      VitePWA({
        manifest: {
          icons: [
            {
              src: '/AppLogo.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),
    ],

    define: {
      __APP_ENV__: env.APP_ENV,
    },
  };
});
