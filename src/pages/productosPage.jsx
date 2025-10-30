// src/pages/productosPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductos } from '../services/productServices.js';
// ¡Importamos el carrito para el botón "Comprar"!
import { useCart } from '../context/cartContext.jsx';

export function Productos() {
  
  const [productos, setProductos] = useState([]);
  
  // ¡Traemos la función del contexto del carrito!
  const { addToCart } = useCart();

  // Carga inicial de productos (¡desde la API real!)
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
  }, []); // El '[]' vacío significa "ejecutar solo al montar"

  // Función para el botón "Comprar"
  const handleAgregar = (producto) => {
    addToCart(producto);
  };
  
  return (
    <section>
      <h2 style={{ textAlign: 'center' }}>Todos Nuestros Productos</h2>
      
      {/* Usamos el mismo estilo de tu Pag.html */}
      <div style={{ textAlign: 'center' }}>
        
        {/* Mapeamos la lista de productos (de la API) */}
        {productos.length === 0 ? (
          <p>Aún no hay productos en la base de datos.</p>
        ) : (
          productos.map((prod) => (
            <div className="producto" key={prod.id}>
              
              {/* ¡La Imagen! */}
              <img src={prod.imagen} alt={prod.nombre} />
              
              {/* Usamos Link para el título */}
              <h3><Link to={`/producto/${prod.id}`}>{prod.nombre}</Link></h3>
              
              <p>{prod.descripcion}</p>
              
              <p className="precio">${prod.precio.toLocaleString()} CLP</p>
              
              {/* ¡Botón conectado al carrito! */}
              <button 
                className="btn-comprar"
                onClick={() => handleAgregar(prod)}
              >
                Comprar
              </button>
            </div>
          ))
        )}
        
      </div>
    </section>
  );
}