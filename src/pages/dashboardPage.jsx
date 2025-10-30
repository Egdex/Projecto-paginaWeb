// src/pages/dashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Importamos los servicios reales
import { getProductos } from '../services/productServices.js';
import { getUsuarios, guardarUsuario } from '../services/userServices.js';

export function DashboardPage() {
    
    // --- ESTADOS ---
    const [totalProductos, setTotalProductos] = useState(0);
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [stockBajo, setStockBajo] = useState(0);

    // --- EFECTO (Carga inicial de KPIs) ---
    useEffect(() => {
        cargarKPIs();
    }, []);

    const cargarKPIs = async () => {
        try {
            // Carga Productos
            const productos = await getProductos();
            setTotalProductos(productos.length);
            
            // Calcula Stock Bajo (stock <= 2, siguiendo tu lógica JS original)
            const bajoStock = productos.filter(p => p.stock <= 2).length;
            setStockBajo(bajoStock);

            // Carga Usuarios
            const usuarios = await getUsuarios();
            setTotalUsuarios(usuarios.length);

        } catch (error) {
            console.error("Error al cargar KPIs desde la API:", error);
            // Dejamos los contadores en 0 si falla
        }
    };

    return (
        <div className="main-area">
            <header className="topbar" role="banner">
                <h1>Panel de Administración</h1>
            </header>
            
            <main id="contenido" className="content" role="main">
                {/* Aquí iría la sección de 'Actividades Recientes' 
                  de tu Dashboard.html, pero la saltamos para enfocarnos en KPIs.
                */}
                
                {/* --- KPI: USUARIOS (Conectado al estado) --- */}
                <article className="card kpi">
                    <h2>Usuarios</h2>
                    <p className="kpi-value" id="kpi-usuarios">{totalUsuarios}</p>
                    <Link to="/admin/usuarios" className="button">
                        Agregar Usuario
                    </Link>
                </article>

                {/* --- KPI: PRODUCTOS (Conectado al estado) --- */}
                <article className="card kpi">
                    <h2>Productos</h2>
                    <p className="kpi-value" id="kpi-productos">{totalProductos}</p>
                    <Link to="/admin/productos" className="button">
                        Agregar Producto
                    </Link>
                </article>

                {/* --- KPI: STOCK BAJO (Conectado al estado) --- */}
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