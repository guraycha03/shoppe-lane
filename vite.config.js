import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGitHubPages ? '/shoppe-lane/' : '/';

export default defineConfig({
  plugins: [react()],
  base: basePath,
});
