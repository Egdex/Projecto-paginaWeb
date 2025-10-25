// src/services/userServices.js

// Esta función lee el JSON que acabamos de crear
export const getUsuarios = async () => {
  const res = await fetch('/data/usuarios.json');
  const data = await res.json();
  return data.usuarios;
}

// (Aquí irán después las funciones de 'crearUsuario', 'editarUsuario', etc.)