// src/services/productServices.js
// Versión Final (usa Sesiones/Cookies, sin tokens)

const API_URL = 'http://localhost:8080';

// ======================================================
// === FUNCIÓN PÚBLICA (Para la tienda) ===
// ======================================================

// La usamos en la página de /productos pública
export const getProductosPublic = async () => {
  try {
    const response = await fetch(`${API_URL}/api/productos`);
    if (!response.ok) {
      throw new Error('Error al cargar productos desde la API');
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getProductosPublic:", error);
    throw error;
  }
};

// ======================================================
// === FUNCIONES DE ADMIN (La cookie viaja sola) ===
// ======================================================

// Para la tabla de /admin/productos
export const getProductosAdmin = async () => {
  try {
    const response = await fetch(`${API_URL}/api/productos`);
    if (!response.ok) throw new Error('Error al cargar productos (Admin)');
    return await response.json();
  } catch (error) {
    console.error("Error en getProductosAdmin:", error);
    throw error;
  }
};

// Para el botón "Guardar" (Crear)
export const guardarProductoAdmin = async (nuevoProducto) => {
  try {
    const response = await fetch(`${API_URL}/api/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto) 
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al guardar producto");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en guardarProductoAdmin:", error);
    throw error; 
  }
};

// Para el botón "Guardar" (Modificar)
export const updateProductoAdmin = async (id, productoData) => {
  try {
    const response = await fetch(`${API_URL}/api/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productoData) 
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar producto");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en updateProductoAdmin:", error);
    throw error;
  }
};

// Para el botón de la basura (🗑️)
export const deleteProductoAdmin = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/productos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar producto");
    }
    return { exito: true };
  } catch (error) {
    console.error("Error en deleteProductoAdmin:", error);
    throw error;
  }
};