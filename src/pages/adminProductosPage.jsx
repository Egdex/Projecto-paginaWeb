// src/pages/adminProductosPage.jsx
import React, { useState, useEffect } from 'react';
import '../styles/productostyle.css';
// ¡Importamos las funciones que usan la API!
import { getProductos, guardarProducto } from '../services/productServices.js';

export function AdminProductosPage() {
  
  // Estados de la pagina
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  // estado formulario (los campos del modal)
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagen: ''
  });
  
  // estado errores
  const [errores, setErrores] = useState({});

  // Carga inicial de productos (desde la API)
  useEffect(() => {
    cargarProductos();
  }, []);

  // Función para cargar (reutilizable)
  const cargarProductos = async () => {
    try {
      const data = await getProductos(); 
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

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
    if (!nuevoProducto.nombre) nuevosErrores.nombre = "El Nombre es obligatorio";
    if (nuevoProducto.precio <= 0) nuevosErrores.precio = "El Precio debe ser mayor a 0";
    if (nuevoProducto.stock <= 0) nuevosErrores.stock = "El Stock debe ser mayor a 0"; // (Cambiado de <0 a <=0)
    if (!nuevoProducto.imagen) nuevosErrores.imagen = "La Ruta de Imagen es obligatoria";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // limpiar form y abrir modal
  const handleAbrirModal = () => {
    setNuevoProducto({
      nombre: '', descripcion: '', precio: 0, stock: 0, imagen: '' 
    });
    setErrores({});
    setModalVisible(true);
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
  };
  
  // --- ¡GUARDAR PRODUCTO (CONECTADO A LA API)! ---
  const handleGuardarProducto = async (e) => {
    e.preventDefault();
    
    const esValido = validarFormulario();
    
    if (esValido) {
      
      // 1. Construimos el objeto EXACTO que pide Swagger
      const productoParaEnviar = {
        nombre: nuevoProducto.nombre,
        descripcion: nuevoProducto.descripcion,
        precio: parseInt(nuevoProducto.precio),
        stock: parseInt(nuevoProducto.stock),
        estado: true, // Lo ponemos como 'true' por defecto
        creacionProducto: new Date().toISOString(), // Genera la fecha string
        imagen: nuevoProducto.imagen, // La ruta de texto
        
        // --- ¡EL HACK QUE ARREGLA EL ERROR DEL BACKEND! ---
        // Asigna la Categoría ID 1 (que ya existe en tu BBDD)
        categoria: { "id": 1 }
        // --------------------------------------------------
      };
      
      try {
        // 2. Llama al servicio (POST /api/productos)
        const resultado = await guardarProducto(productoParaEnviar);

        if (resultado.exito) {
          alert("¡Producto guardado en la Base de Datos!");
          handleCerrarModal();
          cargarProductos(); // ¡Recarga la tabla (leyendo de la API)!
        } else {
          setErrores({ general: resultado.error });
        }
      } catch (err) {
        setErrores({ general: "Error al guardar." });
      }
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
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeo de productos (ahora lee de la API) */}
              {productos.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>
                    <img src={prod.imagen} alt={prod.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                  </td>
                  <td>{prod.nombre}</td>
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
              
              {/* (Quitamos el input de 'ID' porque el backend lo genera) */}

              <label>Nombre
                <input type="text" name="nombre" value={nuevoProducto.nombre} onChange={handleFormChange} />
              </label>
              {errores.nombre && <p style={{color: 'red'}}>{errores.nombre}</p>}

              <label>Descripción
                <input type="text" name="descripcion" value={nuevoProducto.descripcion} onChange={handleFormChange} />
              </label>
              
              <label>Precio
                <input type="number" name="precio" value={nuevoProducto.precio} onChange={handleFormChange} />
              </label>
              {errores.precio && <p style={{color: 'red'}}>{errores.precio}</p>}

              <label>Stock
                <input type="number" name="stock" value={nuevoProducto.stock} onChange={handleFormChange} />
              </label>
              {errores.stock && <p style={{color: 'red'}}>{errores.stock}</p>}

              {/* Seguimos usando el input de texto para la imagen */}
              <label>Ruta de Imagen (Texto)
                <input 
                  type="text" 
                  name="imagen" 
                  value={nuevoProducto.imagen} 
                  onChange={handleFormChange} 
                  placeholder="Ej: /imagenes/Productos/Cat.png" 
                />
              </label>
              {errores.imagen && <p style={{color: 'red'}}>{errores.imagen}</p>}
              
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