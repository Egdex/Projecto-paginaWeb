// src/pages/DetalleBlogPage.jsx
// Muestra 1 solo post del blog

import React from 'react';
// ¡Importante! 'useParams' nos deja leer el ID de la URL
import { useParams, Link } from 'react-router-dom';
import '../styles/estilos.css'; // Reusamos los estilos

// --- "Base de datos" Falsa del Blog ---
// (Tiene que ser la misma que en blogPage.jsx)
const postsDelBlog = [
  {
    id: 1,
    titulo: 'Caso Curioso #1: ¿Por qué mi figura se agrieta?',
    descripcionCorta: '¿Alguna vez terminaste una figura y al día siguiente... CRACK! Estaba llena de grietas? Te contamos por qué pasa...',
    descripcionLarga: 'El problema principal es la humedad y el secado rápido. Cuando la porcelana fría se seca demasiado rápido (por ejemplo, dejándola al sol o cerca de un calefactor), la capa exterior se contrae antes que la interior, causando tensión y grietas. Lo ideal es dejarla secar a la sombra, en un lugar ventilado.',
    imagen: '/imagenes/Productos/Cat.png' 
  },
  {
    id: 2,
    titulo: 'Caso Curioso #2: El misterio del color que desaparece',
    descripcionCorta: 'Pintaste tu figura de un rojo vibrante, pero después de barnizarla, ¿quedó rosada? El tipo de barniz puede ser el culpable.',
    descripcionLarga: '¡No es magia, es química! Algunos barnices, especialmente los que no son al agua (como los sintéticos), pueden reaccionar con ciertos pigmentos rojos. Esta reacción "quema" el pigmento y lo decolora. Para colores vibrantes, usa siempre un barniz al agua y sella la pintura antes de barnizar.',
    imagen: '/imagenes/Productos/Kirbo.png'
  }
];
// --- Fin de la "BD" ---

export function DetalleBlogPage() {
  
  // 1. Leemos los parámetros de la URL
  // 'idPost' debe coincidir con el 'path' que pondremos en main.jsx
  const { idPost } = useParams(); 

  // 2. Buscamos el post en nuestro arreglo falso
  // (Convertimos el idPost de la URL (texto) a número)
  const post = postsDelBlog.find(p => p.id === parseInt(idPost));

  // 3. Si no encontramos el post (ej: /blog/99)
  if (!post) {
    return (
      <section style={{ textAlign: 'center', margin: '40px' }}>
        <h2>Error 404: Post no encontrado</h2>
        <p>No pudimos encontrar ese caso curioso.</p>
        <Link to="/blog">Volver al Blog</Link>
      </section>
    );
  }

  // 4. Si SÍ encontramos el post
  return (
    <section style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      
      <img 
        src={post.imagen} 
        alt={post.titulo} 
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }} 
      />
      
      <h2 style={{ color: '#333', fontSize: '2.5rem', marginTop: '20px' }}>
        {post.titulo}
      </h2>
      
      {/* ¡Mostramos la descripción LARGA! */}
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        {post.descripcionLarga}
      </p>

      <Link 
        to="/blog" 
        style={{ 
          display: 'inline-block', 
          marginTop: '30px', 
          fontWeight: 'bold', 
          textDecoration: 'none' 
        }}
      >
        &larr; Volver a todos los casos
      </Link>

    </section>
  );
}