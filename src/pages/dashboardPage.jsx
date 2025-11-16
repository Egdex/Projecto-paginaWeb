// src/pages/dashboardPage.jsx
// ¡VERSIÓN FINAL (SIN TOKENS)!

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';

// ¡Importamos los servicios SIN token!
import { getProductosAdmin } from '../services/productServices.js';
import { getUsuariosAdmin } from '../services/userServices.js';

export function DashboardPage() {
    
    // Obtenemos solo el 'usuario' del contexto
    const { usuario } = useContext(AuthContext);

    const [totalProductos, setTotalProductos] = useState(0);
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [stockBajo, setStockBajo] = useState(0);
    const [loading, setLoading] = useState(true);

    // Cargar KPIs (ya no necesita el token)
    useEffect(() => {
        // Solo se ejecuta si hay un usuario logueado
        if (usuario) {
            const cargarKPIs = async () => {
                setLoading(true);
                try {
                    // Carga Productos (sin token)
                    const productos = await getProductosAdmin();
                    setTotalProductos(productos.length);
                    const bajoStock = productos.filter(p => p.stock <= 2).length;
                    setStockBajo(bajoStock);

                    // Carga Usuarios (sin token)
                    const usuarios = await getUsuariosAdmin();
                    setTotalUsuarios(usuarios.length);

                } catch (error) {
                    console.error("Error al cargar KPIs desde la API:", error);
                } finally {
                    setLoading(false);
                }
            };

            cargarKPIs();
        }
    }, [usuario]); // Se activa cuando el usuario aparece

    // Protección (¡Ahora solo revisa si existe el 'usuario'!)
    if (loading) return <h2>Cargando Dashboard...</h2>;
    
    // Este mensaje de "Acceso Denegado" es el que estabas viendo.
    // Ahora que 'usuario' existe, esto se saltará.
    if (!usuario) {
        return <h2>Acceso Denegado. Debes iniciar sesión como Admin.</h2>;
    }

    return (
        <div className="main-area">
            <header className="topbar" role="banner">
                <h1>Panel de Administración</h1>
                {/* Mostramos el email real del usuario logueado */}
                {usuario && <p>Bienvenido, {usuario.email}</p>}
            </header>
            
            <main id="contenido" className="content" role="main">
                <article className="card kpi">
                    <h2>Usuarios</h2>
                    <p className="kpi-value">{totalUsuarios}</p>
                    <Link to="/admin/usuarios" className="button">
                        Agregar Usuario
                    </Link>
                </article>

                <article className="card kpi">
                    <h2>Productos</h2>
                    <p className="kpi-value">{totalProductos}</p>
                    <Link to="/admin/productos" className="button">
                        Agregar Producto
                    </Link>
                </article>

                <article className="card kpi">
                    <h2>Stock bajo</h2>
                    <p className="kpi-value">{stockBajo}</p>
                    <Link to="/admin/productos" className="button">
                        Reponer Stock
                    </Link>
                </article>
            </main>
        </div>
    );
}