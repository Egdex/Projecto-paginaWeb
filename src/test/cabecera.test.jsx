// src/test/componentes/cabecera.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { Cabecera } from '../componentes/cabecera.jsx'; 
import { AuthContext } from '../context/authContext.jsx';// ¡Ajusta la ruta!

// ----- "Imitaciones" (Mocks) -----

// Creamos un "Proveedor Falso"
const MockAuthProvider = ({ children, authValue }) => {
  const mockValue = {
    usuario: null, // Por defecto, no hay usuario
    logout: vi.fn(),
    ...authValue, // Permite que la prueba reemplace el 'usuario'
  };
  return (
    <AuthContext.Provider value={mockValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Creamos una función que renderiza todo junto
const renderCabecera = (authValue = {}) => {
  return render(
    <MockAuthProvider authValue={authValue}>
      <MemoryRouter>
        <Cabecera />
      </MemoryRouter>
    </MockAuthProvider>
  );
};

// ----- ¡LAS PRUEBAS! -----

describe('Componente: Cabecera', () => {

  // --- PRUEBA 1: El Visitante (Sin Login) ---
  test('debe mostrar "Iniciar Sesión" si el usuario NO está logueado', () => {
    
    // 1. Arrange (Preparar)
    // Renderizamos sin pasarle ningún 'usuario'
    renderCabecera();

    // 2. Assert (Confirmar)
    // DEBE estar el link para loguearse
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    
    // NO DEBE estar el link de Admin
    // 'queryByText' es como 'getByText', pero devuelve 'null' si no lo encuentra
    // (en vez de fallar el test)
    expect(screen.queryByText('Admin')).toBeNull();
  });


  // --- PRUEBA 2: El Cliente (Logueado pero no Admin) ---
  test('NO debe mostrar "Admin" si el usuario es un "CLIENTE"', () => {
    
    // 1. Arrange (Preparar)
    // Simulamos un usuario 'CLIENTE' logueado
    const clienteLogueado = {
      usuario: { email: 'cliente@test.com', rol: 'CLIENTE' }
    };
    renderCabecera(clienteLogueado);

    // 2. Assert (Confirmar)
    // DEBE mostrar la bienvenida
    expect(screen.getByText('Bienvenido, cliente@test.com')).toBeInTheDocument();

    // NO DEBE estar el link de Admin
    expect(screen.queryByText('Admin')).toBeNull();
  });


  // --- PRUEBA 3: El Admin (Logueado) ---
  test('SÍ debe mostrar "Admin" si el usuario es "ADMIN"', () => {
    
    // 1. Arrange (Preparar)
    // Simulamos un usuario 'ADMIN' logueado
    const adminLogueado = {
      usuario: { email: 'admin@test.com', rol: 'ADMIN' }
    };
    renderCabecera(adminLogueado);

    // 2. Assert (Confirmar)
    // DEBE mostrar la bienvenida
    expect(screen.getByText('Bienvenido, admin@test.com')).toBeInTheDocument();

    // ¡SÍ DEBE estar el link de Admin!
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

});