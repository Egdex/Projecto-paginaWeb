// src/pages/loginPage.jsx
// Versión con estilos y botón de ver clave

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export function LoginPage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Para el botón del ojo/mono
  const { login } = useAuth();
  const navigate = useNavigate();

  // Esta función llama al cerebro (authContext)
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null); 
    try {
      const exito = await login(email, password);
      if (exito) {
        navigate('/admin'); // ¡Redirige al panel de admin!
      } else {
        setError("Correo o contraseña incorrectos.");
      }
    } catch (err) {
      setError("Error de conexión. Inténtalo más tarde.");
    }
  };

  // Esta función cambia entre 'text' y 'password'
  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Invierte el estado
  };

  return (
    <section className="login" style={{ 
      maxWidth: '400px', 
      margin: '40px auto', 
      padding: '25px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Iniciar Sesión</h2>
      
      <form id="loginForm" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Correo electrónico:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            style={{ width: '100%', padding: '12px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          
          {/* Contenedor para el input y el botón del ojo/mono */}
          <div style={{ position: 'relative', display: 'flex' }}>
            <input 
              type={showPassword ? 'text' : 'password'} // ¡Tipo dinámico!
              id="password" 
              name="password" 
              required 
              style={{ width: '100%', padding: '12px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Botón para ver/ocultar */}
            <button 
              type="button" 
              onClick={toggleShowPassword}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#555'
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {error && <p style={{ color: 'red', textAlign: 'center', margin: '10px 0 0 0' }}>{error}</p>}

        {/* Botón de Entrar (grande) */}
        <button type="submit" style={{
          marginTop: '10px',
          padding: '12px 20px',
          fontSize: '17px',
          color: '#fff',
          backgroundColor: '#1a73e8',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
          width: '100%'
        }}>
          Entrar
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </section>
  );
}