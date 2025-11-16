// src/services/userServices.js
// Versión Final (usa Sesiones/Cookies, sin tokens)

const API_URL = 'http://localhost:8080';

// ======================================================
// === FUNCIÓN PÚBLICA (Para registroPage.jsx) ===
// ======================================================

export const registrarUsuarioPublico = async (nuevoUsuario) => {
  try {
    const response = await fetch(`${API_URL}/api/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario) 
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error del servidor al registrar");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en registrarUsuarioPublico:", error);
    throw error;
  }
};


// ======================================================
// === FUNCIONES DE ADMIN (La cookie viaja sola) ===
// ======================================================

export const crearUsuarioAdmin = async (nuevoUsuario) => {
  try {
    const response = await fetch(`${API_URL}/api/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Ya no mandamos 'Authorization', el navegador manda la cookie
      body: JSON.stringify(nuevoUsuario) 
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error creando usuario (admin)");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en crearUsuarioAdmin:", error);
    throw error;
  }
};

export const getUsuariosAdmin = async () => {
  try {
    // Ya no necesita el header de Auth
    const response = await fetch(`${API_URL}/api/usuarios`);
    if (!response.ok) throw new Error('Error al cargar usuarios (requiere admin)');
    return await response.json();
  } catch (error) {
    console.error("Error en getUsuariosAdmin:", error);
    throw error;
  }
};

export const updateUsuarioAdmin = async (id, usuarioData) => {
  try {
    const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioData) 
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en updateUsuarioAdmin:", error);
    throw error;
  }
};

export const deleteUsuarioAdmin = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar");
    }
    return { exito: true }; 
  } catch (error) {
    console.error("Error en deleteUsuarioAdmin:", error);
    throw error;
  }
};

// ======================================================
// === FUNCIONES PARA LOS FORMULARIOS (Región/Comuna) ===
// ======================================================

export const getRegiones = async () => {
  try {
    // Ruta en INGLÉS (de tu Swagger)
    const response = await fetch(`${API_URL}/api/regions`); 
    if (!response.ok) throw new Error('Error al cargar regiones');
    return await response.json();
  } catch (error) {
    console.error("Error en getRegiones:", error);
    throw error;
  }
};

export const getComunas = async () => {
  try {
    // Ruta en ESPAÑOL (de tu Swagger)
    const response = await fetch(`${API_URL}/api/comunas`);
    if (!response.ok) throw new Error('Error al cargar comunas');
    return await response.json();
  } catch (error) {
    console.error("Error en getComunas:", error);
    throw error;
  }
};