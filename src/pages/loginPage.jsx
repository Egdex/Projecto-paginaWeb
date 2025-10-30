// src/pages/loginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export function LoginPage() {
  
  // Estados locales
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Contexto y Navegación
  const { login } = useAuth();
  const navigate = useNavigate();

  // --- ¡HANDLER ACTUALIZADO! ---
  // Se convierte en 'async' para poder usar 'await'
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null); 

    try {
      // ¡AQUÍ EL CAMBIO!
      // Ahora 'esperamos' (await) a que la función 'login' termine
      const exito = await login(email, password);

      if (exito) {
        // Login exitoso -> redirige al panel de admin
        navigate('/admin');
      } else {
        // Login fallido (la API dijo que no)
        setError("Correo o contraseña incorrectos.");
      }
    } catch (err) {
      // Error de red (ej: backend apagado)
      setError("Error de conexión. Inténtalo más tarde.");
    }
  };

  return (
    <section className="login" style={{ maxWidth: '400px', margin: '40px auto', textAlign: 'left' }}>
      <h2>Iniciar Sesión</h2>
      
      <form id="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          style={{ width: '100%', padding: '8px' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" style={{ marginTop: '10px', display: 'block' }}>Contraseña:</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          required 
          style={{ width: '100%', padding: '8px' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Mostramos el error si existe */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={{ marginTop: '20px' }}>Entrar</button>
      </form>
      
      <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
    </section>
  );
}