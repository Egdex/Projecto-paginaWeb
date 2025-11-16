// src/context/authContext.jsx
// ¡VERSIÓN FINAL (con localStorage para que NO se cierre la sesión)!

import React, { createContext, useState, useContext } from 'react';

const API_URL = 'http://localhost:8080';

// 1. Creamos el Contexto
export const AuthContext = createContext();

// 2. Creamos el Proveedor (el que tiene la lógica)
export function AuthProvider({ children }) {
  
  // --- ¡AQUÍ ESTÁ LA MAGIA! ---
  // Al iniciar, tratamos de leer el usuario desde localStorage.
  // Si no hay nada guardado, 'savedUser' es null, y usamos null.
  const [usuario, setUsuario] = useState(() => {
    try {
      const savedUser = localStorage.getItem('usuario');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error al leer usuario de localStorage", error);
      return null;
    }
  });

  // (El estado de 'loading' ya no es tan necesario aquí)

  // 4. Función de LOGIN (la que usa la página de Login)
  const login = async (email, password) => {
    
    try {
      const response = await fetch(`${API_URL}/api/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      // Si el backend dijo 200 OK (datos correctos)
      if (response.ok) {
        
        // Sacamos el objeto de usuario (como vimos en tu foto)
        const usuarioLogueado = await response.json(); 

        if (usuarioLogueado.id && usuarioLogueado.rol) {
          
          // --- ¡AQUÍ ESTÁ EL CAMBIO! ---
          // 1. Guardamos el usuario en localStorage
          localStorage.setItem('usuario', JSON.stringify(usuarioLogueado));
          // 2. Guardamos el usuario en el estado
          setUsuario(usuarioLogueado);
          
          return true; // ¡Éxito!
        }
      }
      
      // Si el response no fue OK (clave mala)
      setUsuario(null);
      localStorage.removeItem('usuario'); // Limpiamos por si acaso
      return false; // Login fallido

    } catch (error) {
      // Si el backend está apagado
      console.error("Error al intentar hacer login:", error);
      setUsuario(null);
      localStorage.removeItem('usuario'); // Limpiamos por si acaso
      return false;
    }
  };

  // 5. Función de Logout
  const logout = () => {
    // --- ¡AQUÍ ESTÁ EL CAMBIO! ---
    // 1. Borramos el usuario de localStorage
    localStorage.removeItem('usuario');
    // 2. Limpiamos el estado
    setUsuario(null);
    // (Faltaría llamar a /api/logout si el backend la tiene)
  };

  // 6. El valor que compartimos con toda la app
  const valor = { 
    usuario: usuario, // El objeto del usuario
    login, 
    logout 
  };

  return (
    <AuthContext.Provider value={valor}>
      {children}
    </AuthContext.Provider>
  );
}

// 7. El 'hook' bonito
export const useAuth = () => {
  return useContext(AuthContext);
};