// src/services/productServices.js

// URL base del backend (Asegúrate que el puerto sea el 8080)
const API_URL = 'http://localhost:8080';

// ---
// FUNCIÓN 1: Trae los productos (¡AHORA DESDE LA API!)
// ---
export const getProductos = async () => {
  try {
    // Llamamos al endpoint que vimos en Swagger: GET /api/productos
    const response = await fetch(`${API_URL}/api/productos`);
    
    if (!response.ok) {
      // Si el backend da un error (ej: 500)
      throw new Error('Error al cargar productos desde la API');
    }
    
    const data = await response.json();
    return data; // La API debería devolver la lista de productos

  } catch (error) {
    console.error("Error en getProductos:", error);
    return []; // Devuelve una lista vacía en caso de error
  }
};

// ---
// FUNCIÓN 2: Guarda un producto nuevo (¡AHORA EN LA API!)
// ---
export const guardarProducto = async (nuevoProducto) => {
  try {
    // Llamamos al endpoint de Swagger: POST /api/productos
    const response = await fetch(`${API_URL}/api/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // (Asegúrate de que el backend espere este formato.
      // ¡Revisaremos el 'Request Body' en Swagger para esto después!)
      body: JSON.stringify(nuevoProducto) 
    });

    if (response.ok) {
      return { exito: true };
    } else {
      // Si falla (ej: 400 Bad Request o 500)
      const errorData = await response.json();
      return { exito: false, error: errorData.message || "Error del servidor" };
    }

  } catch (error) {
    console.error("Error en guardarProducto:", error);
    return { exito: false, error: "Error de red." };
  }
};