// src/componentes/sidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ¡Importamos useNavigate!
import { useAuth } from '../context/authContext'; // ¡Importamos el cerebro!

// Importamos los estilos de admin
import '../styles/adminstyle.css'; 

export function Sidebar() {
  
  // --- ¡AQUÍ LA MAGIA! ---
  const { logout } = useAuth();
  const navigate = useNavigate(); // Para redirigir

  const handleLogout = (e) => {
    e.preventDefault();
    logout(); // Llama a la función logout del cerebro
    navigate('/login'); // Patea al usuario de vuelta al login
  };

  return (
    <aside className="sidebar" aria-label="Menú">
      <div className="logo" aria-hidden="true">
        <img src="/imagenes/poyo.jpg" alt="Logo Poyo" />
        <nav className="menu">
          <ul>
            {/* Links de Admin */}
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/productos">Productos</Link></li>
            <li><Link to="/admin/usuarios">Usuarios</Link></li>
            
            {/* Links Públicos */}
            <hr style={{ borderColor: '#ff8ac6' }} />
            <li><Link to="/">Ver Tienda (Público)</Link></li>
            
            {/* --- ¡NUEVO BOTÓN DE LOGOUT! --- */}
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