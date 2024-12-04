/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    resolve: {},
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_PORT),
    },
    plugins: [react()],
  };
});
