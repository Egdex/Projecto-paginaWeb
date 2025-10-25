// src/pages/adminProductosPage.jsx
import React, { useState, useEffect } from 'react';
import '../styles/productostyle.css';
import { getProductos } from '../services/productServices';

export function AdminProductosPage() {
  
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    cargarProductos();
  }, []);

  const handleAbrirModal = () => {
    setModalVisible(true);
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
  };
  
  const handleGuardarProducto = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    alert("Guardando producto (simulación)...");
    // (Aquí irá la lógica para llamar a la API y crear el producto)
    handleCerrarModal(); // Cierra el modal después de guardar
  };

  return (
    <div className="menusito"> 
      <header className="la barrita de arriba">
        <h1>Productos</h1>
      </header>

      <main className="el coso que muestra el otro coso">
        <button id="btnAgregarProducto" className="button" onClick={handleAbrirModal}>
          Agregar Producto
        </button>

        <section className="card">
          <h2>Lista de Productos</h2>
          <table id="tablaProductos" className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.descripcion}</td>
                  <td>${prod.precio.toLocaleString()}</td>
                  <td>{prod.stock}</td>
                  <td>
                    <button>✏️</button>
                    <button>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* --- MODAL DINÁMICO (AHORA CON EL FORMULARIO) --- */}
      {modalVisible && (
        <div id="modalProducto" className="modal">
          <div className="modal-content card">
            <h2 id="modalProductoTitulo">Agregar Producto</h2>
            
            {/* Agregamos 'onSubmit' al form */}
            <form id="formProducto" onSubmit={handleGuardarProducto}>
              
              {/* --- ¡AQUÍ ESTÁ TU FORMULARIO! --- */}
              <label>ID <input type="text" id="idProducto" required /></label>
              <label>Nombre <input type="text" id="nombreProducto" required /></label>
              <label>Descripción <input type="text" id="descripcionProducto" required /></label>
              <label>Precio <input type="number" id="precioProducto" required /></label>
              <label>Stock <input type="number" id="stockProducto" required /></label>
              {/* ---------------------------------- */}
              
              <div className="modal-actions">
                <button type="submit" className="button">Guardar</button>
                <button type="button" className="button danger" onClick={handleCerrarModal}>
                  Cancelar
                </button>
              </div>
            </form>
            
          </div>
        </div>
      )}

    </div>
  );
}