// src/componentes/cabecera.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // ¡Importamos el cerebro!

export function Cabecera() {
  
  // --- ¡AQUÍ LA MAGIA! ---
  // Obtenemos los datos del cerebro
  const { usuario, logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout(); // Llama a la función logout del cerebro
    // (No necesitamos redirigir, la app se actualizará sola)
  };

  return (
    <header>
      <h1>🐥 Tienda Porcelana Fría</h1>
      <nav className="nav-flex">
        <ul className="nav-menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
          {/* Si el usuario es admin, muestra el link a /admin */}
          {usuario && usuario.rol === 'Administrador' && (
            <li><Link to="/admin" style={{ color: '#d94e8f' }}>Admin</Link></li>
          )}
        </ul>
        <ul className="nav-login">
          {/* --- AHORA ES DINÁMICO --- */}
          {usuario ? (
            <>
              <div id="bienvenida" style={{ marginRight: '10px', color: '#333' }}>
                Bienvenido, {usuario.email}
              </div>
              <button id="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
            </>
          ) : (
            <li><Link to="/login" id="btn-login">Iniciar Sesión</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}