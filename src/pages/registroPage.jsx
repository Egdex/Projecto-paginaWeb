// src/pages/registroPage.jsx
// ¡LÓGICA CORREGIDA PARA FILTRAR COMUNAS!

import React, { useState, useEffect } from 'react';
import { 
    registrarUsuarioPublico, 
    getRegiones, 
    getComunas // ¡AQUÍ ESTÁ EL CAMBIO!
} from '../services/userServices.js';

// --- Estilos (Los mismos de antes) ---
const styles = {
  formContainer: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '25px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px' 
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff'
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#1a73e8',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  buttonDisabled: {
    backgroundColor: '#aaa'
  },
  error: {
    color: 'red',
    margin: 0
  }
};
// --- Fin de los estilos ---

export function RegistroPage() {
    
    const [formData, setFormData] = useState({
        run: '', nombre: '', apellidos: '', email: '', 
        password: '', direccion: '',
        regionId: '', comunaId: ''
    });

    // --- ¡NUEVA LÓGICA DE ESTADOS! ---
    const [regiones, setRegiones] = useState([]);
    const [comunasMasterList, setComunasMasterList] = useState([]); // ¡Guarda TODAS las comunas!
    const [comunasFiltradas, setComunasFiltradas] = useState([]); // Las que se muestran
    
    const [loading, setLoading] = useState(true); // Un solo loading
    const [error, setError] = useState(null);

    // --- ¡NUEVA LÓGICA DE CARGA! ---
    // 3. Carga TODOS los datos (regiones y comunas) al inicio
    useEffect(() => {
        const cargarDatos = async () => {
            setLoading(true);
            try {
                // Hacemos las 2 llamadas a la API en paralelo
                const [regionesData, comunasData] = await Promise.all([
                    getRegiones(),
                    getComunas() // ¡AQUÍ ESTÁ EL CAMBIO!
                ]);
                
                setRegiones(regionesData);
                setComunasMasterList(comunasData); // Guarda la lista maestra
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Error al cargar regiones o comunas. ¿Backend OK?');
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, []); // El [] vacío asegura que se ejecuta solo 1 vez

    // 4. ¡NUEVA LÓGICA DE FILTRADO!
    // Este useEffect ahora FILTRA, no llama a la API
    useEffect(() => {
        if (formData.regionId) {
            // Filtramos la lista maestra
            // Asumimos que la API de 'comunas' devuelve: { id: 1, nombre: 'Santiago', region: { id: 1 } }
            const filtradas = comunasMasterList.filter(comuna => 
                comuna.region.id === parseInt(formData.regionId)
            );
            setComunasFiltradas(filtradas);
        } else {
            setComunasFiltradas([]); // Si no hay región, la lista se vacía
        }
    }, [formData.regionId, comunasMasterList]); // Se gatilla si cambia la region o si carga la lista maestra

    // 5. Manejador de inputs (actualizado)
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Si cambia la región, reseteamos la comuna
        if (name === 'regionId') {
            setFormData(prevState => ({
                ...prevState,
                regionId: value, // Actualiza la región
                comunaId: '' // Resetea la comuna
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        // Armamos el payload
        const payload = {
            run: formData.run,
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            email: formData.email,
            password: formData.password,
            direccion: formData.direccion,
            estado: true, 
            region: { id: parseInt(formData.regionId, 10) },
            comuna: { id: parseInt(formData.comunaId, 10) },
            
            // --- ¡AQUÍ ESTÁ EL ARREGLO! ---
            // El backend nos exige un rol, así que le mandamos 'CLIENTE'
            rol: 'CLIENTE'
            // --------------------------------
        };

        try {
            const data = await registrarUsuarioPublico(payload);
            
            // ¡ESTO SIGUE IGUAL!
            alert('¡Admin "CLIENTE" creado con éxito! Ahora anda a la BD y cámbiale el ROL a "ADMIN".');
            console.log('Usuario registrado:', data);

        } catch (error) {
            console.error('Error en handleSubmit:', error);
            alert(`Error al crear la cuenta: ${error.message || error}`);
        }
    };
    // 6. Manejador de Submit (sin cambios)
    
    return (
        <section style={styles.formContainer}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>
              Crear Admin (Temporal)
            </h2>
            
            <form onSubmit={handleSubmit} style={styles.form}>
                
                <input style={styles.input} name="run" value={formData.run} onChange={handleChange} placeholder="RUN (12345678-9)" required />
                <input style={styles.input} name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre (admin)" required />
                <input style={styles.input} name="apellidos" value={formData.apellidos} onChange={handleChange} placeholder="Apellidos (admin)" required />
                <input style={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="admin@test.com" required />
                <input style={styles.input} type="password" name="password" value={formData.password} onChange={handleChange} placeholder="admin123" required />
                <input style={styles.input} name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" required />
                
                {/* Select de Región */}
                <select style={styles.select} name="regionId" value={formData.regionId} onChange={handleChange} required>
                    <option value="">{loading ? 'Cargando...' : 'Seleccione Región'}</option>
                    {regiones.map(region => (
                        <option key={region.id} value={region.id}>{region.nombre}</option>
                    ))}
                </select>
                
                {/* Select de Comuna (Ahora usa 'comunasFiltradas') */}
                <select style={styles.select} name="comunaId" value={formData.comunaId} onChange={handleChange} required disabled={!formData.regionId}>
                    <option value="">Seleccione Comuna</option>
                    {comunasFiltradas.map(comuna => (
                        <option key={comuna.id} value={comuna.id}>{comuna.nombre}</option>
                    ))}
                </select>
                
                {error && <p style={styles.error}>{error}</p>}
                
                <button 
                  type="submit" 
                  style={ loading ? {...styles.button, ...styles.buttonDisabled} : styles.button }
                  disabled={loading}
                >
                    Crear Admin (como Cliente)
                </button>
            </form>
        </section>
    );
}