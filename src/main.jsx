// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
// ¡Asegurándonos que esta línea esté!
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 1. Importa tus estilos
import './styles/estilos.css'; 

// 2. Importa tus Layouts y Páginas
// --- Públicos ---
import { LayoutPublico } from './componentes/layoutPublico';
import { HomePage } from './pages/homePage';
import { Productos } from './pages/productosPage';
import { BlogPage } from './pages/blogPage';
import { CarritoPage } from './pages/carritoPage';
import { LoginPage } from './pages/loginPage';

// --- Layout y Páginas de Admin ---
import { LayoutAdmin } from './componentes/layoutAdmin';
import { DashboardPage } from './pages/dashboardPage';
import { AdminProductosPage } from './pages/adminProductosPage';
import { AdminUsuariosPage } from './pages/adminUsuariosPage';

// --- Cerebro y Guardia ---
import { AuthProvider } from './context/authContext';
// ¡AQUÍ ESTÁ LA CORRECCIÓN! Apuntando a 'componentes'
import { RutaProtegida } from './componentes/rutaProtegida.jsx';

// 3. Define las rutas
const router = createBrowserRouter([
  {
    // --- RUTAS PÚBLICAS ---
    path: '/',
    element: <LayoutPublico />, 
    children: [
      { index: true, element: <HomePage /> },
      { path: 'productos', element: <Productos /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'carrito', element: <CarritoPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
  {
    // --- RUTAS DE ADMIN (Protegidas) ---
    path: '/',
    element: <RutaProtegida />,
    children: [
      {
        path: '/admin',
        element: <LayoutAdmin />, 
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'productos', element: <AdminProductosPage /> },
          { path: 'usuarios', element: <AdminUsuariosPage /> },
        ]
      }
    ]
  }
]);

// 4. Renderiza el Router
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);