// src/pages/carritoPage.jsx
// ¡PÁGINA DEL CARRITO CONECTADA A LOCALSTORAGE!

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext.jsx'; // ¡Importamos el cerebro del carrito!

export function CarritoPage() {
  
  // 1. Obtenemos todo lo que necesitamos del "cerebro" (useCart)
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  const handleRemove = (index) => {
    // (Opcional) Pedir confirmación
    // if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
    //   removeFromCart(index);
    // }
    removeFromCart(index);
  };

  // 2. Renderizado de la página
  return (
    <section style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>🛒 Mi Carrito de Compras</h2>

      {/* --- OPCIÓN A: CARRITO VACÍO --- */}
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <p>Tu carrito está vacío.</p>
          <Link to="/productos" className="button" style={{ textDecoration: 'none' }}>
            Ver Productos
          </Link>
        </div>
      ) : (
        
        /* --- OPCIÓN B: CARRITO CON PRODUCTOS --- */
        <div>
          {/* 3. Mapeamos los productos del carrito */}
          {cartItems.map((item, index) => (
            <div className="carrito-item" key={index}>
              <img src={item.imagen} alt={item.nombre} />
              <div className="carrito-info">
                <h4>{item.nombre}</h4>
                <p>Precio: ${item.precio.toLocaleString()}</p>
              </div>
              <button 
                className="btn-eliminar"
                onClick={() => handleRemove(index)}
              >
                Eliminar
              </button>
            </div>
          ))}

          {/* 4. Mostramos el Total */}
          <hr style={{ margin: '30px 0' }} />
          <div style={{ textAlign: 'right', fontSize: '24px', fontWeight: 'bold' }}>
            <p>TOTAL: ${getTotalPrice().toLocaleString()}</p>
          </div>

          {/* 5. Botón de Pagar */}
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <Link 
              to="/comprar" 
              className="button" 
              style={{ 
                textDecoration: 'none', 
                backgroundColor: '#28a745', // Un verde "pagar"
                padding: '15px 30px',
                fontSize: '18px'
              }}
            >
              Ir a Pagar
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}