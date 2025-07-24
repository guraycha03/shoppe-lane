import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isGitHub = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  plugins: [react()],
  base: isGitHub ? '/shoppe-lane/' : '/',
});
