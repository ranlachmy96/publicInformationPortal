import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [reactRefresh()],
  optimizeDeps: {
    include: ['@babel/preset-react'], // Ensure Babel preset is included in optimization
  },
});
