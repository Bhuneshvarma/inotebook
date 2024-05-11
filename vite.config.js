import { defineConfig } from 'vite';
import { createProxy } from 'vite-plugin-middleware';

export default defineConfig({
  server: {
    proxy: createProxy({
      '/api': {
        target: 'https://inotebook-backend-rust.vercel.app/',
        changeOrigin: true,
        secure: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
      },
      '/api/auth/createuser': {
        target: 'https://inotebook-backend-rust.vercel.app/',
        changeOrigin: true,
        secure: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
      },
      '/api/auth/login': {
        target: 'https://inotebook-backend-rust.vercel.app/',
        changeOrigin: true,
        secure: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
      },
      '/api/auth/getuser': {
        target: 'https://inotebook-backend-rust.vercel.app/',
        changeOrigin: true,
        secure: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
      },
      '/api/auth/updateuser': {
        target: 'https://inotebook-backend-rust.vercel.app/',
        changeOrigin: true,
        secure: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'PUT',
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
      },
    }),
  },
});
