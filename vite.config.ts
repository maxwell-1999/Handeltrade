import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
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
              src: 'android/android-launchericon-512-512.png',
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
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
