// src/pages/registroPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export function RegistroPage() {
  
  return (
    <section 
      className="login" 
      style={{ 
        maxWidth: '400px', 
        margin: '40px auto', 
        textAlign: 'left',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f0f4f8'
      }}
    >
      <h2 style={{ color: '#1a73e8' }}>📝 Crear Nueva Cuenta</h2>
      
      {/* Mensaje de deshabilitado */}
      <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '5px', textAlign: 'center' }}>
        <p>El registro de nuevos usuarios está deshabilitado.</p>
        <p>Solo los administradores pueden crear cuentas desde el panel de admin.</p>
      </div>

      <p style={{ marginTop: '20px' }}>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
    </section>
  );
}