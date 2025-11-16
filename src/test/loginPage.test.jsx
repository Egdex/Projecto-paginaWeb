// src/test/pages/loginPage.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../pages/loginPage.jsx';
import { AuthContext } from '../context/authContext.jsx';

// (La "imitación" del Proveedor)
// ¡NUEVO! Le pasamos el 'mockLogin' para poder espiarlo
const MockAuthProvider = ({ children, authValue, mockLogin }) => {
  const mockValue = {
    login: mockLogin || vi.fn(), // Usamos el 'espía' que nos pasen
    ...authValue,
  };
  return (
    <AuthContext.Provider value={mockValue}>
      {children}
    </AuthContext.Provider>
  );
};

// (La función de renderizado)
const renderLoginPage = (authValue = {}, mockLogin = vi.fn()) => {
  const user = userEvent.setup();
  
  const utils = render(
    <MockAuthProvider authValue={authValue} mockLogin={mockLogin}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </MockAuthProvider>
  );

  // Devolvemos el 'user' y el 'espía'
  return { ...utils, user, mockLogin };
};

// ----- ¡LAS PRUEBAS! -----

describe('Página de Login', () => {

  test('debe renderizar (dibujar) el formulario correctamente', () => {
    renderLoginPage(); 
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo electrónico:')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña:')).toBeInTheDocument();
  });

  test('debe mostrar el botón para ver contraseña (con el emoji correcto)', () => {
    renderLoginPage();
    
    // --- ¡AQUÍ ESTÁ EL ARREGLO QUE PEDISTE! ---
    // Ahora busca el mono (🙈)
    const botonOjo = screen.getByRole('button', { name: '🙈' }); 
    expect(botonOjo).toBeInTheDocument();
  });

  test('debe actualizar el estado (state) cuando el usuario escribe', async () => {
    const { user } = renderLoginPage();
    const emailInput = screen.getByLabelText('Correo electrónico:');
    const passwordInput = screen.getByLabelText('Contraseña:');

    await user.type(emailInput, 'test@usuario.com');
    await user.type(passwordInput, 'clave123');

    expect(emailInput.value).toBe('test@usuario.com');
    expect(passwordInput.value).toBe('clave123');
  });

  // --- ¡¡NUEVA PRUEBA DE "CLIC"!! ---
  test('debe llamar a la función "login" del contexto al hacer clic en "Entrar"', async () => {
    
    // 1. Arrange (Preparar)
    // Creamos un "espía" (vi.fn) para la función login
    const mockLogin = vi.fn();
    // Renderizamos la página y le pasamos nuestro "espía"
    const { user } = renderLoginPage({}, mockLogin);
    
    // Buscamos los campos y el botón
    const emailInput = screen.getByLabelText('Correo electrónico:');
    const passwordInput = screen.getByLabelText('Contraseña:');
    const loginButton = screen.getByRole('button', { name: 'Entrar' });

    // 2. Act (Actuar)
    // Simulamos al usuario escribiendo
    await user.type(emailInput, 'admin@test.com');
    await user.type(passwordInput, 'admin123');
    // Simulamos el clic en "Entrar"
    await user.click(loginButton);

    // 3. Assert (Confirmar)
    // Verificamos que nuestro "espía" (mockLogin) haya sido llamado
    expect(mockLogin).toHaveBeenCalled();
    
    // (Opcional, pero bacán) Verificamos que se llamó CON los datos correctos
    expect(mockLogin).toHaveBeenCalledWith('admin@test.com', 'admin123');
  });

});