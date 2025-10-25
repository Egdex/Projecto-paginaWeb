// src/pages/adminUsuariosPage.jsx
import React, { useState, useEffect } from 'react'; // ¡Importamos!

// Importamos los estilos
import '../styles/userstyle.css';

// ¡Importamos el NUEVO servicio!
import { getUsuarios } from '../services/userServices';

export function AdminUsuariosPage() {

  // --- ESTADO ---
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // --- EFECTO ---
  // Se ejecuta al cargar la página
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await getUsuarios(); // Llama al nuevo servicio
        setUsuarios(data); // Guarda los usuarios en el estado
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    
    cargarUsuarios();
  }, []);

  // --- HANDLERS (Manejadores de eventos) ---
  const handleAbrirModal = () => {
    setModalVisible(true);
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
  };
  
  const handleGuardarUsuario = (e) => {
    e.preventDefault();
    alert("Guardando usuario (simulación)...");
    handleCerrarModal(); // Cierra el modal
  };

  return (
    <div className="menusito"> 
      <header className="la barrita de arriba">
        <h1>Usuarios</h1>
      </header>

      <main className="el coso que muestra el otro coso">
        <button id="btnAgregarUsuario" className="button" onClick={handleAbrirModal}>
          Agregar Usuario
        </button>

        <section className="card">
          <h2>Lista de Usuarios</h2>
          <table id="tablaUsuarios" className="table">
            <thead>
              <tr>
                <th>RUN</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* --- ¡AQUÍ LA MAGIA! ---
                  Mapeamos la lista de usuarios del estado */}
              {usuarios.map((user) => (
                <tr key={user.id}>
                  <td>{user.run}</td>
                  <td>{user.nombre}</td>
                  <td>{user.apellidos}</td>
                  <td>{user.correo}</td>
                  <td>{user.rol}</td>
                  <td>
                    <button>✏️</button>
                    <button>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* --- MODAL DINÁMICO (CON EL FORMULARIO DE USUARIOS) --- */}
      {modalVisible && (
        <div id="modalUsuario" className="modal">
          <div className="modal-content card">
            <h2 id="modalUsuarioTitulo">Agregar Usuario</h2>
            
            {/* Usamos el formulario de tu Usuarios.html */}
            <form id="formUsuario" onSubmit={handleGuardarUsuario}>
              
              <label>RUN 
                <input type="text" id="runUsuario" required placeholder="Ej: 19011022K" />
              </label>
              <label>Nombre 
                <input type="text" id="nombreUsuario" required maxLength="50" />
              </label>
              <label>Apellidos 
                <input type="text" id="apellidosUsuario" required maxLength="100" />
              </label>
              <label>Correo Electrónico 
                <input type="email" id="correoUsuario" required placeholder="ejemplo@duoc.cl" />
              </label>
              <label>Rol
                <select id="rolUsuario" required>
                  <option value="">Seleccione un rol</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Cliente">Cliente</option>
                </select>
              </label>
              <label>Región
                <select id="comunaPorRegion" required>
                  <option value="">Seleccione una región</option>
                  <option value="Metropolitana">Región Metropolitana</option>
                  {/* (Puedes agregar el resto de regiones de tu HTML) */}
                </select>
              </label>
              <label>Comuna
                <select id="comunaUsuario" required>
                  <option value="">Seleccione una comuna</option>
                  {/* (Esto lo haremos dinámico más adelante) */}
                </select>
              </label>
              <label>Dirección
                <input type="text" id="direccionUsuario" required maxLength="300" />
              </label>

              <div className="modal-actions">
                <button type="submit" className="button">Guardar</button>
                <button type="button" className="button danger" onClick={handleCerrarModal}>
                  Cancelar
                </button>
              </div>
            </form>
            
          </div>
        </div>
      )}
    </div>
  );
}