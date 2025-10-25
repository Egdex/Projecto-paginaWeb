// src/context/authContext.jsx
import React, { createContext, useState, useContext } from 'react';

// 1. Creamos el Contexto
const AuthContext = createContext();

// 2. Creamos el "Proveedor"
// (Asegúrate de que esta línea tenga el 'export' al inicio)
export function AuthProvider({ children }) {

  const [usuario, setUsuario] = useState(null);

  // 4. La función (falsa) de login
  const login = (email, password) => {
    // SIMULACIÓN:
    if (email === 'admin@admin.com' && password === '1234') {
      const usuarioSimulado = {
        id: 1,
        email: 'admin@admin.com',
        rol: 'Administrador'
      };
      setUsuario(usuarioSimulado); // Guarda el usuario
      return true; // Login exitoso
    }
    return false; // Login fallido
  };

  // 5. La función de logout
  const logout = () => {
    setUsuario(null); // Borra al usuario
  };

  const valor = { usuario, login, logout };

  return (
    <AuthContext.Provider value={valor}>
      {children}
    </AuthContext.Provider>
  );
}

// 7. Un "Hook" personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};