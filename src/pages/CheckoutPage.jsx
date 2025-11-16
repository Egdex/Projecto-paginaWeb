// src/pages/CheckoutPage.jsx
// ¡PÁGINA FINAL DE "COMPRAR" (CHECKOUT)!

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartContext.jsx'; // Para el resumen
import { useAuth } from '../context/authContext.jsx'; // Para auto-rellenar
import { getRegiones, getComunas } from '../services/userServices.js'; // Para los dropdowns

// --- Estilos rápidos (puedes moverlos a un CSS) ---
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    maxWidth: '1200px',
    margin: '40px auto',
    flexWrap: 'wrap' // Para que sea responsive
  },
  formSection: {
    flex: 2, // Ocupa 2/3 del espacio
    minWidth: '350px',
    padding: '25px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  },
  summarySection: {
    flex: 1, // Ocupa 1/3 del espacio
    minWidth: '300px',
    padding: '25px',
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '8px',
    height: 'fit-content' // Para que no se estire
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
    borderRadius: '5px'
  },
  button: {
    padding: '15px 20px',
    fontSize: '18px',
    color: '#fff',
    backgroundColor: '#28a745', // Verde "pagar"
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};
// --- Fin de los estilos ---


export function CheckoutPage() {
  
  const { cartItems, getTotalPrice } = useCart();
  const { usuario } = useAuth(); // ¡Para auto-rellenar!
  const navigate = useNavigate();

  // Estados para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    direccion: '',
    regionId: '',
    comunaId: ''
  });

  // Estados para los dropdowns
  const [regiones, setRegiones] = useState([]);
  const [comunasMasterList, setComunasMasterList] = useState([]);
  const [comunasFiltradas, setComunasFiltradas] = useState([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(true);

  // --- 1. Cargar Regiones y Comunas (para los dropdowns) ---
  useEffect(() => {
    const cargarDatosDropdowns = async () => {
      setLoadingDropdowns(true);
      try {
        const [regionesData, comunasData] = await Promise.all([
          getRegiones(),
          getComunas()
        ]);
        setRegiones(regionesData);
        setComunasMasterList(comunasData);
      } catch (err) {
        console.error("Error al cargar datos de formulario:", err);
      } finally {
        setLoadingDropdowns(false);
      }
    };
    cargarDatosDropdowns();
  }, []);

  // --- 2. Auto-rellenar el formulario si el usuario está logueado ---
  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre || '',
        apellidos: usuario.apellidos || '',
        email: usuario.email || '',
        direccion: usuario.direccion || '',
        regionId: usuario.region?.id || '',
        comunaId: usuario.comuna?.id || ''
      });
    }
  }, [usuario]); // Se activa cuando 'usuario' carga

  // --- 3. Filtrar comunas cuando la región cambia ---
  useEffect(() => {
    if (formData.regionId) {
      const filtradas = comunasMasterList.filter(comuna => 
        comuna.region?.id === parseInt(formData.regionId)
      );
      setComunasFiltradas(filtradas);
    } else {
      setComunasFiltradas([]);
    }
  }, [formData.regionId, comunasMasterList]);

  // Manejador simple para los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'regionId') {
      setFormData(prev => ({ ...prev, comunaId: '' })); // Resetea comuna
    }
  };

  // --- 4. Manejador del "PAGO" ---
  const handleSubmit = (e) => {
    e.preventDefault();
    // (Aquí iría la lógica de 'fetch' al backend para crear la "Orden/Boleta")
    
    // Como no tenemos esa parte del backend, solo mostramos una alerta
    // y redirigimos (simulando la página "Pago Correcto" de la pauta)
    alert('¡Pago simulado con éxito!\nGracias por tu compra.');
    
    // (Aquí también deberíamos vaciar el carrito)
    // clearCart(); --> (Habría que agregar 'clearCart' al cartContext)
    
    navigate('/'); // Volvemos al Home
  };

  return (
    <div style={styles.container}>

      {/* --- SECCIÓN 1: FORMULARIO DE DATOS --- */}
      <section style={styles.formSection}>
        <h3>Información del cliente</h3>
        <p style={{ marginBottom: '20px' }}>
          {usuario ? `¡Hola ${usuario.nombre}! Tus datos están casi listos.` : 'Completa la siguiente información.'}
        </p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input style={styles.input} type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
          <input style={styles.input} type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} placeholder="Apellidos" required />
          <input style={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          
          <hr />
          <h3>Dirección de entrega</h3>
          <input style={styles.input} type="text" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Calle y Número" required />
          
          <select style={styles.select} name="regionId" value={formData.regionId} onChange={handleChange} required>
            <option value="">{loadingDropdowns ? 'Cargando...' : 'Seleccione Región'}</option>
            {regiones.map(region => (
              <option key={region.id} value={region.id}>{region.nombre}</option>
            ))}
          </select>
          
          <select style={styles.select} name="comunaId" value={formData.comunaId} onChange={handleChange} required disabled={!formData.regionId}>
            <option value="">Seleccione Comuna</option>
            {comunasFiltradas.map(comuna => (
              <option key={comuna.id} value={comuna.id}>{comuna.nombre}</option>
            ))}
          </select>
          
          <button type="submit" style={styles.button} disabled={loadingDropdowns}>
            Pagar ahora ${getTotalPrice().toLocaleString()}
          </button>
        </form>
      </section>

      {/* --- SECCIÓN 2: RESUMEN DEL CARRITO --- */}
      <aside style={styles.summarySection}>
        <h4>Resumen de tu compra</h4>
        <hr style={{ margin: '15px 0' }} />
        
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
              <span>{item.nombre}</span>
              <span style={{ fontWeight: 'bold' }}>${item.precio.toLocaleString()}</span>
            </div>
          ))
        )}
        
        <hr style={{ margin: '15px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px' }}>
          <span>Total:</span>
          <span>${getTotalPrice().toLocaleString()}</span>
        </div>
      </aside>

    </div>
  );
}