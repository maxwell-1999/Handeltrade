import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        crypto: 'empty-module',
        assert: 'empty-module',
        http: 'empty-module',
        https: 'empty-module',
        os: 'empty-module',
        url: 'empty-module',
        zlib: 'empty-module',
        stream: 'empty-module',
        _stream_duplex: 'empty-module',
        _stream_passthrough: 'empty-module',
        _stream_readable: 'empty-module',
        _stream_writable: 'empty-module',
        _stream_transform: 'empty-module',
      },
    },
    define: {
      global: 'globalThis',
      __APP_ENV__: env.APP_ENV,
    },
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
  };
});
