// src/componentes/layoutAdmin.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';

export function LayoutAdmin() {
  
  // 'sidebar.jsx' ya importa el 'adminstyle.css', 
  // así que no necesitamos importarlo aquí.

  return (
    // Esta es la estructura base de
    <div className="Contenido"> 
      
      <Sidebar /> 
      
      {/* El <Outlet> AHORA renderizará toda la 
          columna de la derecha (el <div class="main-area">) */}
      <Outlet />
      
    </div>
  );
}