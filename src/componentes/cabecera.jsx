// src/componentes/cabecera.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext'; 

export function Cabecera() {
  
  const { usuario, logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout(); 
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
          
          {/* --- ¡AQUÍ ESTÁ EL ARREGLO! --- */}
          {/* Comparamos con el ROL real que viene del backend ('ADMIN') */}
          {usuario && usuario.rol === 'ADMIN' && (
            <li><Link to="/admin" style={{ color: '#d94e8f' }}>Admin</Link></li>
          )}
        </ul>
        <ul className="nav-login">
          {usuario ? (
            <>
              {/* Usamos el email real del objeto usuario */}
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