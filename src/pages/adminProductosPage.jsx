// src/pages/adminProductosPage.jsx
import React, { useState, useEffect } from 'react';
import '../styles/productostyle.css';
import { getProductos } from '../services/productServices';

export function AdminProductosPage() {
  
  // Estados de la pagina
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  // estado formulario
  const [nuevoProducto, setNuevoProducto] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0
  });
  
  // estado errores
  const [errores, setErrores] = useState({});

  // Carga inicial de productos
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

  // maneja cambios en el form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({
      ...prev,
      [name]: value 
    }));
  };

  // validar form
  const validarFormulario = () => {
    let nuevosErrores = {};
    
    if (!nuevoProducto.id) nuevosErrores.id = "El ID es obligatorio";
    if (!nuevoProducto.nombre) nuevosErrores.nombre = "El Nombre es obligatorio";
    if (nuevoProducto.precio <= 0) nuevosErrores.precio = "El Precio debe ser mayor a 0";
    if (nuevoProducto.stock < 0) nuevosErrores.stock = "El Stock no puede ser negativo";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // limpiar form y abrir modal
  const handleAbrirModal = () => {
    setNuevoProducto({
      id: '',
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0
    });
    setErrores({});
    setModalVisible(true);
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
  };
  
  // guardar producto
  const handleGuardarProducto = (e) => {
    e.preventDefault();
    
    // valida
    const esValido = validarFormulario();
    
    if (esValido) {
      alert("¡Formulario válido! Guardando producto (simulación)...");
      // aqui va la llamada a la API
      handleCerrarModal();
    }
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
              {/* Mapeo de productos */}
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

      {/* Modal (dinamico) */}
      {modalVisible && (
        <div id="modalProducto" className="modal">
          <div className="modal-content card">
            <h2 id="modalProductoTitulo">Agregar Producto</h2>
            
            <form id="formProducto" onSubmit={handleGuardarProducto}>
              
              <label>ID
                <input 
                  type="text" 
                  id="id"       
                  name="id"      
                  value={nuevoProducto.id} 
                  onChange={handleFormChange}
                />
              </label>
              {/* mostrar error */}
              {errores.id && <p style={{color: 'red'}}>{errores.id}</p>}

              <label>Nombre
                <input 
                  type="text" 
                  id="nombre"   
                  name="nombre"   
                  value={nuevoProducto.nombre} 
                  onChange={handleFormChange}
                />
              </label>
              {errores.nombre && <p style={{color: 'red'}}>{errores.nombre}</p>}

              <label>Descripción
                <input 
                  type="text" 
                  id="descripcion"  
                  name="descripcion"  
                  value={nuevoProducto.descripcion} 
                  onChange={handleFormChange}
                />
              </label>
              
              <label>Precio
                <input 
                  type="number" 
                  id="precio"    
                  name="precio"    
                  value={nuevoProducto.precio} 
                  onChange={handleFormChange}
                />
              </label>
              {errores.precio && <p style={{color: 'red'}}>{errores.precio}</p>}

              <label>Stock
                <input 
                  type="number" 
                  id="stock"     
                  name="stock"     
                  value={nuevoProducto.stock} 
                  onChange={handleFormChange}
                />
              </label>
              {errores.stock && <p style={{color: 'red'}}>{errores.stock}</p>}
              
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