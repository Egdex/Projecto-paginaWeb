// src/pages/adminUsuariosPage.jsx
// Versión Final (con CRUD completo)

import React, { useState, useEffect, useContext } from 'react';
import '../styles/userstyle.css'; // Asegúrate que aquí estén los estilos .modal
import { AuthContext } from '../context/authContext.jsx';

// Importamos todos los servicios (sin token)
import { 
    getUsuariosAdmin, 
    crearUsuarioAdmin, 
    deleteUsuarioAdmin,
    updateUsuarioAdmin, // El que faltaba para editar
    getRegiones,
    getComunas
} from '../services/userServices.js';

// Un formulario vacío para resetear
const FORMULARIO_VACIO = {
    run: '', nombre: '', apellidos: '', email: '', 
    password: '', rol: 'CLIENTE', regionId: '', 
    comunaId: '', direccion: ''
};

export function AdminUsuariosPage() {

  // Sacamos el usuario del cerebro
  const { usuario } = useContext(AuthContext);

  // Estados de la página
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState({});

  // Estados para el Modal (Crear vs Editar)
  const [nuevoUsuario, setNuevoUsuario] = useState(FORMULARIO_VACIO);
  const [isEditing, setIsEditing] = useState(false); 
  const [currentUserId, setCurrentUserId] = useState(null); 

  // Estados para los <select>
  const [regiones, setRegiones] = useState([]);
  const [comunasMasterList, setComunasMasterList] = useState([]);
  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  
  // Carga todo al iniciar (si estás logueado)
  useEffect(() => {
    if (usuario) { 
      cargarUsuarios();
      cargarDatosFormulario();
    }
  }, [usuario]); // Se activa cuando el 'usuario' aparece

  // Trae la lista de usuarios
  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const data = await getUsuariosAdmin();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      setErrores({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Trae los datos para los <select> del modal
  const cargarDatosFormulario = async () => {
    try {
        const [regionesData, comunasData] = await Promise.all([
            getRegiones(), getComunas() 
        ]);
        setRegiones(regionesData);
        setComunasMasterList(comunasData); // Guarda la lista "maestra"
    } catch (err) {
        setErrores(prev => ({ ...prev, form: "Error al cargar regiones/comunas" }));
    }
  };

  // Filtra las comunas (lógica de frontend)
  useEffect(() => {
    if (nuevoUsuario.regionId) {
        // Filtramos la lista maestra
        const filtradas = comunasMasterList.filter(comuna => 
            comuna.region?.id === parseInt(nuevoUsuario.regionId)
        );
        setComunasDisponibles(filtradas);
    } else {
        setComunasDisponibles([]); // Si no hay región, vaciamos la lista
    }
  }, [nuevoUsuario.regionId, comunasMasterList]);

  // Maneja los cambios en los inputs del formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
    // Si cambia la región, resetea la comuna
    if (name === "regionId") {
      setNuevoUsuario((prev) => ({ ...prev, comunaId: "" }));
    }
  };

  // --- LÓGICA DE MODALES ---

  // Botón "Agregar Usuario" (el rosado)
  const handleAbrirModalCrear = () => {
    setIsEditing(false); // Estamos "Creando"
    setNuevoUsuario(FORMULARIO_VACIO); // Limpia el form
    setErrores({});
    setModalVisible(true); // ¡Abre el modal!
  };

  // Botón "Modificar" (el ✏️)
  const handleAbrirModalEditar = (user) => {
    setIsEditing(true); // Estamos "Editando"
    setCurrentUserId(user.id); // Guardamos el ID
    // Rellenamos el formulario con los datos del usuario
    setNuevoUsuario({
      run: user.run,
      nombre: user.nombre,
      apellidos: user.apellidos,
      email: user.email,
      password: '', // La clave no se carga, solo se cambia si se escribe
      rol: user.rol,
      direccion: user.direccion || '',
      regionId: user.region?.id || '', 
      comunaId: user.comuna?.id || '',
    });
    setErrores({});
    setModalVisible(true); // ¡Abre el modal!
  };

  const handleCerrarModal = () => setModalVisible(false);

  // Botón "Guardar" (el de adentro del modal)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores({}); 
    
    // Armamos el JSON para el backend
    const payload = {
      run: nuevoUsuario.run,
      nombre: nuevoUsuario.nombre,
      apellidos: nuevoUsuario.apellidos,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol, 
      estado: true,
      direccion: nuevoUsuario.direccion,
      comuna: { "id": parseInt(nuevoUsuario.comunaId) },
      region: { "id": parseInt(nuevoUsuario.regionId) }
    };

    // Si el usuario escribió una clave nueva, la mandamos
    if (nuevoUsuario.password) {
      payload.password = nuevoUsuario.password;
    }

    try {
      if (isEditing) {
        // Lógica de MODIFICAR
        await updateUsuarioAdmin(currentUserId, payload);
        alert("¡Usuario actualizado con éxito!");
      } else {
        // Lógica de CREAR
        await crearUsuarioAdmin(payload);
        alert("¡Usuario creado con éxito!");
      }
      handleCerrarModal();
      cargarUsuarios(); // Recargamos la tabla
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      setErrores({ general: error.message });
    }
  };

  // Borrar usuario (el 🗑️)
  const handleBorrarUsuario = async (id) => {
    if (window.confirm(`¿Seguro que quieres eliminar al usuario ID ${id}?`)) {
      try {
        await deleteUsuarioAdmin(id);
        alert('Usuario eliminado');
        cargarUsuarios(); 
      } catch (error) {
        alert(`Error al eliminar: ${error.message}`);
      }
    }
  };
  
  // Protección por si acaso
  if (!usuario) {
    return <h2>Acceso Denegado.</h2>;
  }

  // --- RENDERIZADO (El HTML) ---
  return (
    <div className="menusito"> 
      <header className="la barrita de arriba"><h1>Usuarios</h1></header>
      <main className="el coso que muestra el otro coso">
        
        {/* Botón A (el rosado) */}
        <button id="btnAgregarUsuario" className="button" onClick={handleAbrirModalCrear}>
          Agregar Usuario
        </button>
        
        <section className="card">
          <h2>Lista de Usuarios</h2>
          {errores.general && <p style={{color: 'red'}}>{errores.general}</p>}
          <table id="tablaUsuarios" className="table">
            <thead>
              <tr>
                <th>RUN</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5">Cargando...</td></tr>
              ) : (
                usuarios.map((user) => (
                  <tr key={user.id}>
                    <td>{user.run}</td>
                    <td>{user.nombre} {user.apellidos}</td>
                    <td>{user.email}</td>
                    <td>{user.rol}</td>
                    <td>
                      {/* Botón Editar (✏️) */}
                      <button onClick={() => handleAbrirModalEditar(user)}>✏️</button>
                      {/* Botón Borrar (🗑️) */}
                      <button onClick={() => handleBorrarUsuario(user.id)}>🗑️</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>

      {/* --- MODAL (El formulario que aparece) --- */}
      {modalVisible && (
        <div id="modalUsuario" className="modal">
          <div className="modal-content card">
            
            {/* Título dinámico */}
            <h2>{isEditing ? 'Modificar Usuario' : 'Agregar Usuario'}</h2>
            
            <form id="formUsuario" onSubmit={handleSubmit}>
              
              <label>RUN <input type="text" name="run" value={nuevoUsuario.run} onChange={handleFormChange} /></label>
              <label>Nombre <input type="text" name="nombre" value={nuevoUsuario.nombre} onChange={handleFormChange} /></label>
              <label>Apellidos <input type="text" name="apellidos" value={nuevoUsuario.apellidos} onChange={handleFormChange} /></label>
              <label>Correo <input type="email" name="email" value={nuevoUsuario.email} onChange={handleFormChange} /></label>
              <label>Contraseña 
                <input type="password" name="password" value={nuevoUsuario.password} onChange={handleFormChange} 
                       placeholder={isEditing ? '(Dejar en blanco para no cambiar)' : 'Contraseña'} />
              </label>
              <label>Dirección <input type="text" name="direccion" value={nuevoUsuario.direccion} onChange={handleFormChange} /></label>
              
              <label>Rol
                <select name="rol" value={nuevoUsuario.rol} onChange={handleFormChange}>
                  <option value="CLIENTE">Cliente</option>
                  <option value="ADMIN">Administrador</option>
                  <option value="VENDEDOR">Vendedor</option>
                </select>
              </label>

              <label>Región
                <select name="regionId" value={nuevoUsuario.regionId} onChange={handleFormChange} required>
                  <option value="">Seleccione región</option>
                  {regiones.map((region) => (
                    <option key={region.id} value={region.id}>{region.nombre}</option>
                  ))}
                </select>
              </label>
              <label>Comuna
                <select name="comunaId" value={nuevoUsuario.comunaId} onChange={handleFormChange} required disabled={comunasDisponibles.length === 0}>
                  <option value="">Seleccione comuna</option>
                  {comunasDisponibles.map((comuna) => (
                    <option key={comuna.id} value={comuna.id}>{comuna.nombre}</option>
                  ))}
                </select>
              </label>
              
              {errores.form && <p style={{color: 'red'}}>{errores.form}</p>}
              {errores.general && <p style={{color: 'red'}}>{errores.general}</p>}
              
              <div className="modal-actions">
                <button type="submit" className="button">Guardar</button>
                <button type="button" className="button danger" onClick={handleCerrarModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}