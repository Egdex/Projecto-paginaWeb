// src/context/cartContext.jsx
// ¡VERSIÓN CORREGIDA CON LOCALSTORAGE!

import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. ¡Importamos los servicios que SÍ usan localStorage!
import { 
    getCartItems, 
    addItemToCart, 
    removeItemFromCart 
} from '../services/cartServices.js';

// 2. Creamos el Contexto
const CartContext = createContext();

// 3. Creamos el "Proveedor"
export function CartProvider({ children }) {
  
  // Este estado sigue siendo el "corazón"
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Para la carga inicial

  // 4. ¡NUEVO! Carga inicial desde localStorage
  // Esto se ejecuta 1 sola vez cuando la app carga
  useEffect(() => {
    const loadCart = async () => {
      try {
        const items = await getCartItems(); // Lee el localStorage
        setCartItems(items);
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []); // El [] vacío asegura que solo se ejecute 1 vez

  // 5. Función para AGREGAR (Actualizada)
  const addToCart = async (producto) => {
    // A. Actualiza el estado (rápido)
    const newItems = [...cartItems, producto];
    setCartItems(newItems);
    
    // B. Guarda en localStorage (lento)
    try {
      await addItemToCart(producto); // Llama al servicio
    } catch (error) {
      console.error("Error al guardar en carrito:", error);
      // (Si falla, podríamos revertir el estado, pero por ahora lo dejamos simple)
    }
    alert(`¡${producto.nombre} fue agregado al carrito!`);
  };

  // 6. Función para QUITAR (Actualizada)
  // (Ojo: tu servicio borraba por 'índice', así que mantendremos esa lógica)
  const removeFromCart = async (indexToRemove) => {
    // A. Actualiza el estado (rápido)
    const newItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(newItems);

    // B. Guarda en localStorage (lento)
    try {
      await removeItemFromCart(indexToRemove); // Llama al servicio
    } catch (error) {
      console.error("Error al borrar del carrito:", error);
    }
  };

  // 7. Función para OBTENER TOTAL (sin cambios)
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.precio, 0);
  };

  const valor = {
    cartItems: cartItems,
    addToCart,
    removeFromCart,
    getTotalPrice,
    loadingCart: loading // (Por si lo necesitas)
  };
  
  // No renderiza nada hasta que el carrito haya cargado
  if (loading) {
    return null; 
  }

  return (
    <CartContext.Provider value={valor}>
      {children}
    </CartContext.Provider>
  );
}

// 8. Hook personalizado (sin cambios)
export const useCart = () => {
  return useContext(CartContext);
};