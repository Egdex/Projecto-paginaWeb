// src/componentes/rutaProtegida.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Importa el cerebro del login

// ¡Asegúrate de que esta línea tenga el 'export'!
export function RutaProtegida() {

  // 1. Obtenemos el 'usuario' de nuestro cerebro
  const { usuario } = useAuth();

  // 2. Comprobamos si el usuario existe (si está logueado)
  if (!usuario) {
    // 3. Si NO está logueado, lo redirigimos a /login
    return <Navigate to="/login" replace />;
  }

  // 4. Si SÍ está logueado, lo dejamos pasar
  return <Outlet />; // Muestra el contenido (el layoutAdmin)
}