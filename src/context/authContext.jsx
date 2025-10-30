// src/context/authContext.jsx
import React, { createContext, useState, useContext } from 'react';

// URL base del backend (Asegúrate que el puerto sea el 8080)
const API_URL = 'http://localhost:8080';

// 1. Creamos el Contexto
const AuthContext = createContext();

// 2. Creamos el "Proveedor"
export function AuthProvider({ children }) {
  
  const [usuario, setUsuario] = useState(null);

  // 4. ¡FUNCIÓN DE LOGIN (REAL CON FETCH)!
  const login = async (email, password) => {
    
    try {
      // Llamamos al endpoint que SÍ funciona (el de Swagger)
      const response = await fetch(`${API_URL}/api/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Enviamos el body que espera Swagger
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      // Si la respuesta es OK (código 200)
      if (response.ok) {
        
        // Creamos el objeto de usuario en el frontend
        // (porque el backend nos devuelve un JSON vacío)
        const usuarioLogueado = {
          email: email,
          rol: 'Administrador' // Asumimos que si hizo login aquí, es Admin
        };
        
        setUsuario(usuarioLogueado); // ¡Guardamos el usuario!
        return true; // Devolvemos 'true' (login exitoso)
      } else {
        // Si el backend nos da un 401 (clave mala) o 500
        setUsuario(null);
        return false; // Devolvemos 'false' (login fallido)
      }

    } catch (error) {
      // Si hay un error de red (backend apagado)
      console.error("Error al intentar hacer login:", error);
      setUsuario(null);
      return false;
    }
  };

  // 5. La función de logout
  const logout = () => {
    setUsuario(null);
  };

  const valor = { usuario, login, logout };
  
  return (
    <AuthContext.Provider value={valor}>
      {children}
    </AuthContext.Provider>
  );
}

// 7. Un "Hook" personalizado
export const useAuth = () => {
  return useContext(AuthContext);
};