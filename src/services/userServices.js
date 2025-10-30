// src/services/userServices.js

// URL base del backend
const API_URL = 'http://localhost:8080';

// ---
// FUNCIÓN 1: Trae los usuarios (¡AHORA DESDE LA API!)
// ---
export const getUsuarios = async () => {
  try {
    // Llama al endpoint de Swagger: GET /api/usuarios
    const response = await fetch(`${API_URL}/api/usuarios`);
    
    if (!response.ok) {
      throw new Error('Error al cargar usuarios desde la API');
    }
    
    const data = await response.json();
    return data; // La API devuelve la lista de usuarios

  } catch (error) {
    console.error("Error en getUsuarios:", error);
    return []; // Devuelve lista vacía en caso de error
  }
};

// ---
// FUNCIÓN 2: Guarda un usuario nuevo (¡AHORA EN LA API!)
// (Cambiamos 'registrarUsuario' por 'guardarUsuario' para ser consistentes)
// ---
export const guardarUsuario = async (nuevoUsuario) => {
  try {
    // Llama al endpoint de Swagger: POST /api/usuarios
    const response = await fetch(`${API_URL}/api/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Enviamos el body que espera Swagger
      body: JSON.stringify(nuevoUsuario) 
    });

    if (response.ok) {
      return { exito: true };
    } else {
      // Si falla (ej: 400 Bad Request o 500)
      const errorData = await response.json();
      return { exito: false, error: errorData.message || "Error del servidor" };
    }

  } catch (error) {
    console.error("Error en guardarUsuario:", error);
    return { exito: false, error: "Error de red." };
  }
};