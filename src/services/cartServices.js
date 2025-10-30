// src/services/cartServices.js

const CART_KEY = 'carrito_clon';
 
// 1. Trae los items del carrito (desde localStorage)
export const getCartItems = async () => {
  let items = localStorage.getItem(CART_KEY);
  if (items) {
    return JSON.parse(items);
  } else {
    // Si es la primera vez, empieza con una lista vacía
    const listaVacia = [];
    localStorage.setItem(CART_KEY, JSON.stringify(listaVacia));
    return listaVacia;
  }
};

// 2. Guarda un producto nuevo en el carrito
export const addItemToCart = async (producto) => {
  try {
    const itemsActuales = await getCartItems();
    // (Simulación simple: solo lo agrega, no maneja cantidades)
    itemsActuales.push(producto); 
    localStorage.setItem(CART_KEY, JSON.stringify(itemsActuales));
    return { exito: true };
  } catch (error) {
    console.error("Error al guardar item en carrito:", error);
    return { exito: false, error: "Error al guardar." };
  }
};

// 3. Elimina un item del carrito por su índice
export const removeItemFromCart = async (indice) => {
  try {
    const itemsActuales = await getCartItems();
    itemsActuales.splice(indice, 1); // Elimina 1 item en la posición 'indice'
    localStorage.setItem(CART_KEY, JSON.stringify(itemsActuales));
    return { exito: true };
  } catch (error) {
    console.error("Error al eliminar item del carrito:", error);
    return { exito: false, error: "Error al eliminar." };
  }
};