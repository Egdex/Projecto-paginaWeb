// src/pages/adminUsuariosPage.jsx
import React, { useState, useEffect } from 'react';
import '../styles/userstyle.css';
import { getUsuarios, guardarUsuario } from '../services/userServices.js';

// (Mini-BD de Comunas y Mapas de ID)
const comunasPorRegion = {
  "Metropolitana": ["Pudahuel", "Maipú", "Puente Alto", "Santiago", "Las Condes", "La Florida"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Concón"],
  "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"]
};
// ¡AQUÍ ESTÁ LA CLAVE! Mapeamos el NOMBRE que selecciona el usuario al ID que está en la BBDD
const regionMap = { "Metropolitana": 1, "Valparaíso": 2, "Biobío": 3 };
const comunaMap = { "Santiago": 1, "Puente Alto": 2, "Valparaíso": 3, "Pudahuel": 4, "Maipú": 5 }; // (Asegúrate de tener estos IDs en tu BBDD)

export function AdminUsuariosPage() {

  // (Todos los 'useState' se quedan igual)
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    run: '', nombre: '', apellidos: '', correo: '', password: '', rol: '', region: '', comuna: '', direccion: ''
  });
  const [errores, setErrores] = useState({});

  // (useEffect, cargarUsuarios, handleFormChange, validar, abrir/cerrar modal se quedan igual)
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
    if (name === "region") {
      const comunas = comunasPorRegion[value] || [];
      setComunasDisponibles(comunas);
      setNuevoUsuario((prev) => ({ ...prev, comuna: "" }));
    }
  };

  const validarFormulario = () => {
    let nuevosErrores = {};
    const runRegex = /^[0-9]{7,8}-[0-9Kk]$/;
    if (!nuevoUsuario.run) {
      nuevosErrores.run = "El RUN es obligatorio";
    } else if (!runRegex.test(nuevoUsuario.run)) {
      nuevosErrores.run = "El formato del RUN es inválido (Ej: 12345678-9)";
    }
    if (!nuevoUsuario.nombre) nuevosErrores.nombre = "El Nombre es obligatorio";
    if (!nuevoUsuario.apellidos) nuevosErrores.apellidos = "Los Apellidos son obligatorios";
    if (!/\S+@\S+\.\S+/.test(nuevoUsuario.correo)) {
      nuevosErrores.correo = "El formato de correo no es válido";
    }
    if (!nuevoUsuario.password) nuevosErrores.password = "La Contraseña es obligatoria"; 
    if (!nuevoUsuario.rol) nuevosErrores.rol = "Debe seleccionar un Rol";
    if (!nuevoUsuario.region) nuevosErrores.region = "Debe seleccionar una Región";
    if (!nuevoUsuario.comuna) nuevosErrores.comuna = "Debe seleccionar una Comuna";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleAbrirModal = () => {
    setNuevoUsuario({
      run: '', nombre: '', apellidos: '', correo: '', password: '', rol: '', region: '', comuna: '', direccion: ''
    });
    setErrores({});
    setComunasDisponibles([]);
    setModalVisible(true);
  };
  const handleCerrarModal = () => {
    setModalVisible(false);
  };

  // --- ¡GUARDAR USUARIO (CORREGIDO OTRA VEZ)! ---
  const handleGuardarUsuario = async (e) => {
    e.preventDefault();
    setErrores({}); 
    const esValido = validarFormulario();
    
    if (esValido) {
      
      // 1. Mapeo de IDs (Buscamos el ID de la comuna/region seleccionada)
      const regionId = regionMap[nuevoUsuario.region];
      const comunaId = comunaMap[nuevoUsuario.comuna];
      
      // 2. Mapeo de Rol
      const rolApi = nuevoUsuario.rol === 'Administrador' ? 'ADMIN' : 'CLIENTE';

      // 3. Construimos el JSON que pide Swagger
      const usuarioParaEnviar = {
        run: nuevoUsuario.run,
        nombre: nuevoUsuario.nombre,
        apellidos: nuevoUsuario.apellidos,
        email: nuevoUsuario.correo,
        password: nuevoUsuario.password,
        rol: rolApi, 
        estado: true,
        direccion: nuevoUsuario.direccion,
        creacionUsu: new Date().toISOString(),
        
        // --- ¡EL HACK FINAL! ---
        // En vez de mandar el objeto, le mandamos SOLO el ID
        // de la comuna y región que YA EXISTEN en la BBDD.
        comuna: { "id": comunaId },
        region: { "id": regionId }
        // -----------------------
      };
      
      try {
        // 4. Llama al servicio (POST /api/usuarios)
        const resultado = await guardarUsuario(usuarioParaEnviar);

        if (resultado.exito) {
          alert("¡Usuario guardado en la Base de Datos!");
          handleCerrarModal();
          cargarUsuarios(); 
        } else {
          setErrores({ general: resultado.error || "Error al guardar." });
        }
      } catch (err) {
        setErrores({ general: "Error de red al guardar." });
      }
    }
  };

  return (
    <div className="menusito"> 
      {/* ... (header y main se quedan igual) ... */}
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
                  <td>{user.email}</td>
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
              
              {/* ... (Todos los inputs de antes se quedan igual) ... */}
               <label>RUN 
                <input type="text" name="run" value={nuevoUsuario.run} onChange={handleFormChange} placeholder="Ej: 12345678-9"/>
              </label>
              {errores.run && <p style={{color: 'red'}}>{errores.run}</p>}
               <label>Nombre 
                <input type="text" name="nombre" value={nuevoUsuario.nombre} onChange={handleFormChange} />
              </label>
              {errores.nombre && <p style={{color: 'red'}}>{errores.nombre}</p>}
               <label>Apellidos 
                <input type="text" name="apellidos" value={nuevoUsuario.apellidos} onChange={handleFormChange} />
              </label>
              {errores.apellidos && <p style={{color: 'red'}}>{errores.apellidos}</p>}
               <label>Correo Electrónico 
                <input type="email" name="correo" value={nuevoUsuario.correo} onChange={handleFormChange} />
              </label>
              {errores.correo && <p style={{color: 'red'}}>{errores.correo}</p>}
               <label>Contraseña
                <input type="password" name="password" value={nuevoUsuario.password} onChange={handleFormChange} />
              </label>
              {errores.password && <p style={{color: 'red'}}>{errores.password}</p>}
               <label>Rol
                <select name="rol" value={nuevoUsuario.rol} onChange={handleFormChange}>
                  <option value="">Seleccione un rol</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Cliente">Cliente</option>
                </select>
              </label>
              {errores.rol && <p style={{color: 'red'}}>{errores.rol}</p>}
               <label>Región
                <select name="region" value={nuevoUsuario.region} onChange={handleFormChange}>
                  <option value="">Seleccione una región</option>
                  {Object.keys(comunasPorRegion).map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </label>
              {errores.region && <p style={{color: 'red'}}>{errores.region}</p>}
               <label>Comuna
                <select name="comuna" value={nuevoUsuario.comuna} onChange={handleFormChange} disabled={comunasDisponibles.length === 0}>
                  <option value="">Seleccione una comuna</option>
                  {comunasDisponibles.map((comuna) => (
                    <option key={comuna} value={comuna}>{comuna}</option>
                  ))}
                </select>
              </label>
              {errores.comuna && <p style={{color: 'red'}}>{errores.comuna}</p>}
               <label>Dirección
                <input type="text" name="direccion" value={nuevoUsuario.direccion} onChange={handleFormChange} />
              </label>
              
              {errores.general && <p style={{color: 'red'}}>{errores.general}</p>}

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