// src/pages/productosPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// ¡Importamos la función PÚBLICA con el nombre nuevo!
import { getProductosPublic } from '../services/productServices.js';
import { useCart } from '../context/cartContext.jsx';

export function Productos() {
  
  const [productos, setProductos] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        // ¡Llamamos a la función pública!
        const data = await getProductosPublic();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    cargarProductos();
  }, []);

  const handleAgregar = (producto) => {
    addToCart(producto);
  };
  
  return (
    <section>
      <h2 style={{ textAlign: 'center' }}>Todos Nuestros Productos</h2>
      <div style={{ textAlign: 'center' }}>
        {productos.length === 0 ? (
          <p>Cargando productos...</p>
        ) : (
          productos.map((prod) => (
            <div className="producto" key={prod.id}>
              <img src={prod.imagen} alt={prod.nombre} />
              <h3><Link to={`/producto/${prod.id}`}>{prod.nombre}</Link></h3>
              <p>{prod.descripcion}</p>
              <p className="precio">${prod.precio.toLocaleString()} CLP</p>
              <button className="btn-comprar" onClick={() => handleAgregar(prod)}>
                Comprar
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}