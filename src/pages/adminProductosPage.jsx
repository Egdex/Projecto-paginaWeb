// src/pages/adminProductosPage.jsx
// Versión Final (con CRUD completo)

import React, { useState, useEffect, useContext } from 'react';
import '../styles/productostyle.css'; // ¡Asegúrate que aquí estén los estilos .modal!
import { AuthContext } from '../context/authContext.jsx';

// Importamos todos los servicios (sin token)
import { 
  getProductosAdmin, 
  guardarProductoAdmin,
  deleteProductoAdmin,
  updateProductoAdmin // El que faltaba
} from '../services/productServices.js';

// Un formulario vacío para resetear
const FORMULARIO_VACIO = {
    nombre: '', 
    descripcion: '', 
    precio: 0, 
    stock: 0, 
    imagen: ''
};

export function AdminProductosPage() {
  
  const { usuario } = useContext(AuthContext);

  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState({});

  // Estados para el Modal (Crear vs Editar)
  const [nuevoProducto, setNuevoProducto] = useState(FORMULARIO_VACIO);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  // Carga inicial
  useEffect(() => {
    if (usuario) { 
      cargarProductos();
    }
  }, [usuario]);

  // Trae la lista de productos
  const cargarProductos = async () => {
    setLoading(true);
    try {
      const data = await getProductosAdmin();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setErrores({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Maneja los cambios en los inputs del formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  // --- LÓGICA DE MODALES ---

  // Botón "Agregar Producto" (el de afuera)
  const handleAbrirModalCrear = () => {
    setIsEditing(false);
    setNuevoProducto(FORMULARIO_VACIO);
    setErrores({});
    setModalVisible(true); // ¡Abre el modal!
  };

  // Botón "Modificar" (el ✏️)
  const handleAbrirModalEditar = (prod) => {
    setIsEditing(true);
    setCurrentProductId(prod.id);
    // Rellenamos el formulario con los datos
    setNuevoProducto({
      nombre: prod.nombre,
      descripcion: prod.descripcion,
      precio: prod.precio,
      stock: prod.stock,
      imagen: prod.imagen,
    });
    setErrores({});
    setModalVisible(true); // ¡Abre el modal!
  };

  const handleCerrarModal = () => setModalVisible(false);

  // Botón "Guardar" (el de adentro del modal)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores({});
    
    // Armamos el JSON
    const payload = {
      nombre: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion,
      precio: parseInt(nuevoProducto.precio),
      stock: parseInt(nuevoProducto.stock),
      estado: true, // Siempre activo
      imagen: nuevoProducto.imagen,
      categoria: { "id": 1 } // El "Hack" de la categoría 1
    };

    try {
      if (isEditing) {
        // Lógica de MODIFICAR
        await updateProductoAdmin(currentProductId, payload);
        alert("¡Producto actualizado con éxito!");
      } else {
        // Lógica de CREAR
        await guardarProductoAdmin(payload);
        alert("¡Producto creado con éxito!");
      }
      
      handleCerrarModal();
      cargarProductos(); // Recargamos la tabla

    } catch (error) {
      console.error("Error al guardar producto:", error);
      // Ojo: Si el error es el del 'stock', saldrá esta alerta
      alert(`Error al guardar: ${error.message}`);
      setErrores({ general: error.message });
    }
  };

  // Borrar producto (el 🗑️)
  const handleBorrarProducto = async (id) => {
    if (window.confirm(`¿Seguro que quieres eliminar el producto ID ${id}?`)) {
      try {
        await deleteProductoAdmin(id);
        alert('Producto eliminado');
        cargarProductos();
      } catch (error) {
        alert(`Error al eliminar: ${error.message}`);
      }
    }
  };
  
  if (!usuario) {
    return <h2>Acceso Denegado.</h2>;
  }

  // --- RENDERIZADO (El HTML) ---
  return (
    <div className="menusito"> 
      <header className="la barrita de arriba"><h1>Productos</h1></header>
      <main className="el coso que muestra el otro coso">
        
        {/* Botón A (el de afuera) */}
        <button id="btnAgregarProducto" className="button" onClick={handleAbrirModalCrear}>
          Agregar Producto
        </button>
        
        <section className="card">
          <h2>Lista de Productos</h2>
          {errores.general && <p style={{color: 'red'}}>{errores.general}</p>}
          <table id="tablaProductos" className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6">Cargando...</td></tr>
              ) : (
                productos.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td><img src={prod.imagen} alt={prod.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                    <td>{prod.nombre}</td>
                    <td>${prod.precio.toLocaleString()}</td>
                    <td>{prod.stock}</td>
                    <td>
                      {/* Botón Editar (✏️) */}
                      <button onClick={() => handleAbrirModalEditar(prod)}>✏️</button>
                      {/* Botón Borrar (🗑️) */}
                      <button onClick={() => handleBorrarProducto(prod.id)}>🗑️</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>

      {/* --- MODAL (El formulario que aparece) --- */}
      {modalVisible && (
        <div id="modalProducto" className="modal">
          <div className="modal-content card">
            
            <h2>{isEditing ? 'Modificar Producto' : 'Agregar Producto'}</h2>
            
            <form id="formProducto" onSubmit={handleSubmit}>
              
              <label>Nombre
                <input type="text" name="nombre" value={nuevoProducto.nombre} onChange={handleFormChange} />
              </label>
              <label>Descripción
                <input type="text" name="descripcion" value={nuevoProducto.descripcion} onChange={handleFormChange} />
              </label>
              <label>Precio
                <input type="number" name="precio" value={nuevoProducto.precio} onChange={handleFormChange} />
              </label>
              <label>Stock
                <input type="number" name="stock" value={nuevoProducto.stock} onChange={handleFormChange} />
              </label>
              <label>Ruta de Imagen (Texto)
                <input 
                  type="text" 
                  name="imagen" 
                  value={nuevoProducto.imagen} 
                  onChange={handleFormChange} 
                  placeholder="Ej: /imagenes/Productos/Cat.png" 
                />
              </label>
              
              {errores.general && <p style={{color: 'red'}}>{errores.general}</p>}
              
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