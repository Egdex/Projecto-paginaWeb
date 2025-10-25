// src/componentes/layoutPublico.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

// (Asegúrate que la ruta a 'cabecera' y 'footer' esté bien)
import { Cabecera } from './cabecera'; 
import Footer from './footer';

// Esta es la ÚNICA función LayoutPublico
export function LayoutPublico() {
  return (
    <>
      <Cabecera />

      <main>
        <Outlet /> 
      </main>

      <Footer />
    </>
  );
}