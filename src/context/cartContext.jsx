// src/context/cartContext.jsx
import React, { createContext, useState, useContext } from 'react';

// (No necesitamos importar 'cartServices.js' porque no usamos localStorage)

// 1. Creamos el Contexto
const CartContext = createContext();

// 2. Creamos el "Proveedor"
export function CartProvider({ children }) {
  
  // ¡El estado vive solo en la memoria!
  const [cartItems, setCartItems] = useState([]);

  // (Quitamos los useEffect de localStorage)

  // Función para AGREGAR
  const addToCart = (producto) => {
    setCartItems((prevItems) => [...prevItems, producto]);
    alert(`¡${producto.nombre} fue agregado al carrito!`);
  };

  // Función para QUITAR (borra por índice)
  const removeFromCart = (indexToRemove) => {
    setCartItems((prevItems) => 
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  // Función para OBTENER TOTAL
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.precio, 0);
  };

  const valor = {
    cartItems: cartItems,
    addToCart,
    removeFromCart,
    getTotalPrice,
  };
  
  return (
    <CartContext.Provider value={valor}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Hook personalizado
export const useCart = () => {
  return useContext(CartContext);
};