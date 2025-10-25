// src/pages/loginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ¡Importamos 'useNavigate'!
import { useAuth } from '../context/authContext'; // ¡Importamos nuestro "cerebro"!

export function LoginPage() {
  
  // --- ESTADO LOCAL ---
  // Estados para guardar lo que el usuario escribe en los inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Para mostrar errores

  // --- CONTEXTO Y NAVEGACIÓN ---
  const { login } = useAuth(); // Obtenemos la función 'login' del cerebro
  const navigate = useNavigate(); // Herramienta para redirigir al usuario

  // --- HANDLER ---
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setError(null); // Limpia errores antiguos

    // Llamamos a la función 'login' del cerebro con los datos del estado
    const exito = login(email, password);

    if (exito) {
      // ¡Login exitoso! Redirigimos al panel de admin
      navigate('/admin');
    } else {
      // Login fallido
      setError("Correo o contraseña incorrectos. (Pista: admin@admin.com y 1234)");
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
          // Conectamos el input al estado 'email'
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
          // Conectamos el input al estado 'password'
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