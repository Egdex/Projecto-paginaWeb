// src/test/setup.js
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Limpia el JSDOM después de cada prueba para evitar fugas de memoria
afterEach(() => {
  cleanup();
});