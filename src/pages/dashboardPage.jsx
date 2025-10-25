// src/pages/dashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// ¡ASEGÚRATE DE QUE ESTA LÍNEA TENGA EL 'export' AL INICIO!
export function DashboardPage() {

  // (Más adelante, estos números vendrán de la API)
  const totalUsuarios = 0;
  const totalProductos = 0;
  const stockBajo = 0;

  return (
    // Este div es el que faltaba en el layout anterior
    <div className="main-area"> 
      <header className="topbar" role="banner">
        <h1>Panel de Administración</h1>
      </header>
      
      <main id="contenido" className="content" role="main">
        
        <article className="card kpi">
          <h2>Usuarios</h2>
          <p className="kpi-value" id="kpi-usuarios">{totalUsuarios}</p>
          <Link to="/admin/usuarios" className="button">
            Agregar Usuario
          </Link>
        </article>

        <article className="card kpi">
          <h2>Productos</h2>
          <p className="kpi-value" id="kpi-productos">{totalProductos}</p>
          <Link to="/admin/productos" className="button">
            Agregar Producto
          </Link>
        </article>

        <article className="card kpi">
          <h2>Stock bajo</h2>
          <p className="kpi-value" id="kpi-stock-bajo">{stockBajo}</p>
          <Link to="/admin/productos" className="button">
            Reponer Stock
          </Link>
        </article>

      </main>
    </div>
  );
}