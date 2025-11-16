import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: 'jsdom',
    
    // --- ¡AQUÍ ESTÁ EL CAMBIO! ---
    // Le decimos a Vitest que busque pruebas en CUALQUIER
    // carpeta que se llame 'test' o '__tests__'.
    include: ['src/test/**/*.{test,spec}.{js,jsx}'],
    
    setupFiles: './src/setupTests.js', // (Esto se queda igual)
  },
  // --- FIN DE LO AGREGADO ---
})

