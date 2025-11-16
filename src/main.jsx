// src/main.jsx
// ¡Versión final con la ruta del blog/detalle!

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 1. Importa tus estilos
import './styles/estilos.css';

// 2. Importa tus Layouts y Páginas
// --- Públicos ---
import { LayoutPublico } from './componentes/layoutPublico.jsx';
import { HomePage } from './pages/homePage.jsx';
import { Productos } from './pages/productosPage.jsx';
import { BlogPage } from './pages/blogPage.jsx';
import { CarritoPage } from './pages/carritoPage.jsx';
import { LoginPage } from './pages/loginPage.jsx';
import { RegistroPage } from './pages/registroPage.jsx';
import { CheckoutPage } from './pages/CheckoutPage.jsx';

// --- ¡AQUÍ ESTÁ LA LÍNEA 1 QUE FALTA! ---
// Importamos la página nueva que creamos
import { DetalleBlogPage } from './pages/DetalleBlogPage.jsx'; 

// --- Layout y Páginas de Admin ---
import { LayoutAdmin } from './componentes/layoutAdmin.jsx';
import { DashboardPage } from './pages/dashboardPage.jsx';
import { AdminProductosPage } from './pages/adminProductosPage.jsx';
import { AdminUsuariosPage } from './pages/adminUsuariosPage.jsx';

// --- Cerebros (Contexts) y Guardia ---
import { AuthProvider } from './context/authContext.jsx';
import { CartProvider } from './context/cartContext.jsx';
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
      { path: 'blog', element: <BlogPage /> }, // La lista de posts
      
      // --- ¡AQUÍ ESTÁ LA LÍNEA 2 QUE FALTA! ---
      // Esta es la ruta "dinámica" para el detalle.
      // El ':idPost' es el número (1 o 2) que viene de la URL.
      { path: 'blog/:idPost', element: <DetalleBlogPage /> },

      { path: 'carrito', element: <CarritoPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'registro', element: <RegistroPage /> },
      { path: 'comprar', element: <CheckoutPage /> },
    ],
  },
  {
    // --- RUTAS DE ADMIN (Protegidas) ---
    // (Esto se queda igual)
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
      <CartProvider> 
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);