// src/componentes/layoutPublico.jsx
// (Asegúrate que tenga el <div>!)

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Cabecera } from './cabecera'; 
import Footer from './footer';

export function LayoutPublico() {
  return (
    // --- ¡Este div es la clave! ---
    <div className="layout-publico-wrapper">
      <Cabecera />

      {/* El <main> es donde se carga el login, home, etc. */}
      <main>
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
}