// src/componentes/sidebar.jsx
// Versión con roles (Admin/Vendedor)

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; 
import '../styles/adminstyle.css'; 

export function Sidebar() {
  
  // Sacamos el 'usuario' (para ver su rol) y 'logout'
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = (e) => {
    e.preventDefault();
    logout(); 
    navigate('/login');
  };

  return (
    <aside className="sidebar" aria-label="Menú">
      <div className="logo" aria-hidden="true">
        <img src="/imagenes/poyo.jpg" alt="Logo Poyo" />
        <nav className="menu">
          <ul>
            {/* Links que ve el Admin y el Vendedor */}
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/productos">Productos</Link></li>
            
            {/* --- ¡OJO AQUÍ! Lógica de Roles --- */}
            {/* Este link SOLO se muestra si el rol es 'ADMIN' */}
            {usuario && usuario.rol === 'ADMIN' && (
              <li><Link to="/admin/usuarios">Usuarios</Link></li>
            )}
            
            {/* Links Públicos */}
            <hr style={{ borderColor: '#ff8ac6' }} />
            <li><Link to="/">Ver Tienda (Público)</Link></li>
            
            {/* Botón de Logout */}
            <li>
              <a href="#" className="danger" onClick={handleLogout}>
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}