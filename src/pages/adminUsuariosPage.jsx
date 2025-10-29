// src/pages/adminUsuariosPage.jsx
import React, { useState, useEffect } from 'react';
import '../styles/userstyle.css';
import { getUsuarios } from '../services/userServices';

// --- ¡NUEVO! Mini-BD de Comunas ---
// (Podemos agregar más regiones después)
const comunasPorRegion = {
  "Metropolitana": ["Pudahuel", "Maipú", "Puente Alto", "Santiago", "Las Condes", "La Florida"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Concón"],
  "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"]
};
// ---------------------------------

export function AdminUsuariosPage() {

  // Estados de la pagina
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  // ¡NUEVO! Estado para las comunas del dropdown
  const [comunasDisponibles, setComunasDisponibles] = useState([]);

  // estado formulario
  const [nuevoUsuario, setNuevoUsuario] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    rol: '',
    region: '',
    comuna: '',
    direccion: ''
  });

  // estado errores
  const [errores, setErrores] = useState({});

  // Carga inicial de usuarios
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    cargarUsuarios();
  }, []);

  // --- ¡ACTUALIZADO! Maneja cambios en el form ---
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    setNuevoUsuario((prev) => ({
      ...prev,
      [name]: value
    }));

    // --- ¡NUEVA LÓGICA! ---
    // Si el campo que cambió es "region"...
    if (name === "region") {
      // Busca las comunas para esa región. Si no hay (ej: "Seleccione"), usa un array vacío.
      const comunas = comunasPorRegion[value] || [];
      setComunasDisponibles(comunas);
      
      // ¡Importante! Resetea la comuna seleccionada
      setNuevoUsuario((prev) => ({
        ...prev,
        comuna: "" 
      }));
    }
    // -----------------------
  };

  // validar form
  const validarFormulario = () => {
    let nuevosErrores = {};
    
    if (!nuevoUsuario.run) nuevosErrores.run = "El RUN es obligatorio";
    if (!nuevoUsuario.nombre) nuevosErrores.nombre = "El Nombre es obligatorio";
    if (!nuevoUsuario.apellidos) nuevosErrores.apellidos = "Los Apellidos son obligatorios";
    if (!nuevoUsuario.correo) {
      nuevosErrores.correo = "El Correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(nuevoUsuario.correo)) {
      nuevosErrores.correo = "El formato de correo no es válido";
    }
    if (!nuevoUsuario.rol) nuevosErrores.rol = "Debe seleccionar un Rol";
    if (!nuevoUsuario.region) nuevosErrores.region = "Debe seleccionar una Región";
    if (!nuevoUsuario.comuna) nuevosErrores.comuna = "Debe seleccionar una Comuna"; // ¡Nueva validación!

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // limpiar form y abrir modal
  const handleAbrirModal = () => {
    setNuevoUsuario({
      run: '',
      nombre: '',
      apellidos: '',
      correo: '',
      rol: '',
      region: '',
      comuna: '',
      direccion: ''
    });
    setErrores({});
    setComunasDisponibles([]); // ¡NUEVO! Limpia las comunas al abrir
    setModalVisible(true);
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
  };

  // guardar usuario
  const handleGuardarUsuario = (e) => {
    e.preventDefault();
    const esValido = validarFormulario();
    
    if (esValido) {
      alert("¡Formulario válido! Guardando usuario (simulación)...");
      handleCerrarModal();
    }
  };

  return (
    <div className="menusito"> 
      <header className="la barrita de arriba">
        <h1>Usuarios</h1>
      </header>

      <main className="el coso que muestra el otro coso">
        {/* ... (Botón y tabla se quedan igual) ... */}
        <button id="btnAgregarUsuario" className="button" onClick={handleAbrirModal}>
          Agregar Usuario
        </button>
        <section className="card">
          <h2>Lista de Usuarios</h2>
          <table id="tablaUsuarios" className="table">
            {/* ... (thead y tbody se quedan igual) ... */}
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

      {/* Modal (dinamico) */}
      {modalVisible && (
        <div id="modalUsuario" className="modal">
          <div className="modal-content card">
            <h2 id="modalUsuarioTitulo">Agregar Usuario</h2>
            
            <form id="formUsuario" onSubmit={handleGuardarUsuario}>
              
              {/* ... (Inputs de RUN, Nombre, Apellidos, Correo, Rol se quedan igual) ... */}
              <label>RUN 
                <input type="text" name="run" value={nuevoUsuario.run} onChange={handleFormChange} placeholder="Ej: 19011022K" />
              </label>
              {errores.run && <p style={{color: 'red'}}>{errores.run}</p>}

              <label>Nombre 
                <input type="text" name="nombre" value={nuevoUsuario.nombre} onChange={handleFormChange} maxLength="50" />
              </label>
              {errores.nombre && <p style={{color: 'red'}}>{errores.nombre}</p>}

              <label>Apellidos 
                <input type="text" name="apellidos" value={nuevoUsuario.apellidos} onChange={handleFormChange} maxLength="100" />
              </label>
              {errores.apellidos && <p style={{color: 'red'}}>{errores.apellidos}</p>}

              <label>Correo Electrónico 
                <input type="email" name="correo" value={nuevoUsuario.correo} onChange={handleFormChange} placeholder="ejemplo@duoc.cl" />
              </label>
              {errores.correo && <p style={{color: 'red'}}>{errores.correo}</p>}

              <label>Rol
                <select name="rol" value={nuevoUsuario.rol} onChange={handleFormChange}>
                  <option value="">Seleccione un rol</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Cliente">Cliente</option>
                </select>
              </label>
              {errores.rol && <p style={{color: 'red'}}>{errores.rol}</p>}
              
              {/* --- ¡DROPDOWNS ACTUALIZADOS! --- */}
              <label>Región
                <select name="region" value={nuevoUsuario.region} onChange={handleFormChange}>
                  <option value="">Seleccione una región</option>
                  {/* Mapeamos las llaves de nuestro objeto de comunas */}
                  {Object.keys(comunasPorRegion).map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </label>
              {errores.region && <p style={{color: 'red'}}>{errores.region}</p>}

              <label>Comuna
                {/* Se deshabilita si no hay región seleccionada */}
                <select 
                  name="comuna" 
                  value={nuevoUsuario.comuna} 
                  onChange={handleFormChange} 
                  disabled={comunasDisponibles.length === 0}
                >
                  <option value="">Seleccione una comuna</option>
                  {/* Mapeamos las comunas disponibles del estado */}
                  {comunasDisponibles.map((comuna) => (
                    <option key={comuna} value={comuna}>{comuna}</option>
                  ))}
                </select>
              </label>
              {errores.comuna && <p style={{color: 'red'}}>{errores.comuna}</p>}
              {/* ---------------------------------- */}
              
              <label>Dirección
                <input type="text" name="direccion" value={nuevoUsuario.direccion} onChange={handleFormChange} maxLength="300" />
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