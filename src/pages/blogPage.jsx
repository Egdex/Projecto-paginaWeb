// src/pages/blogPage.jsx
// Versión estática (hardcodeada) basada en la pauta

import React from 'react';
import { Link } from 'react-router-dom';
// (Vamos a usar los estilos de 'estilos.css' de la home)
import '../styles/estilos.css'; 

// --- Estilos locales solo para el blog ---
const blogStyles = {
  blogCard: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '800px',
    margin: '30px auto',
    padding: '20px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    gap: '20px'
  },
  blogImage: {
    maxWidth: '300px',
    borderRadius: '5px'
  },
  blogContent: {
    flex: 1
  },
  blogButton: {
    display: 'inline-block',
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#1a73e8', // Un azul piola
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold'
  }
};
// --- Fin de estilos ---

// --- "Base de datos" Falsa del Blog ---
// Como pide la pauta, creamos un arreglo de productos [cite: 488]
// (o en este caso, de posts)
const postsDelBlog = [
  {
    id: 1,
    titulo: 'Caso Curioso #1: ¿Por qué mi figura se agrieta?',
    descripcionCorta: '¿Alguna vez terminaste una figura y al día siguiente... CRACK! Estaba llena de grietas? Te contamos por qué pasa...',
    descripcionLarga: 'El problema principal es la humedad y el secado rápido. Cuando la porcelana fría se seca demasiado rápido (por ejemplo, dejándola al sol o cerca de un calefactor), la capa exterior se contrae antes que la interior, causando tensión y grietas. Lo ideal es dejarla secar a la sombra, en un lugar ventilado.',
    imagen: '/imagenes/Productos/Cat.png' // (Usa la imagen que quieras)
  },
  {
    id: 2,
    titulo: 'Caso Curioso #2: El misterio del color que desaparece',
    descripcionCorta: 'Pintaste tu figura de un rojo vibrante, pero después de barnizarla, ¿quedó rosada? El tipo de barniz puede ser el culpable.',
    descripcionLarga: '¡No es magia, es química! Algunos barnices, especialmente los que no son al agua (como los sintéticos), pueden reaccionar con ciertos pigmentos rojos. Esta reacción "quema" el pigmento y lo decolora. Para colores vibrantes, usa siempre un barniz al agua y sella la pintura antes de barnizar.',
    imagen: '/imagenes/Productos/Kirbo.png' // (Usa la imagen que quieras)
  }
];


export function BlogPage() {
  return (
    <section style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
      
      <h2 style={{ textAlign: 'center', color: '#333', fontSize: '2.5rem' }}>
        NOTICIAS IMPORTANTES
      </h2>

      {/* "Mapeamos" (recorremos) el arreglo de posts
        y dibujamos una tarjeta por cada uno.
      */}
      {postsDelBlog.map((post) => (
        
        <article key={post.id} style={blogStyles.blogCard}>
          
          {/* Imagen del Post */}
          <img 
            src={post.imagen} 
            alt={post.titulo} 
            style={blogStyles.blogImage} 
          />
          
          {/* Contenido del Post */}
          <div style={blogStyles.blogContent}>
            <h3>{post.titulo}</h3>
            <p>{post.descripcionCorta}</p>
            
            {/* Este 'Link' nos llevará a la página de "detalle"
              que aún no hemos creado (ej: /blog/1)
            */}
            <Link to={`/blog/${post.id}`} style={blogStyles.blogButton}>
              VER CASO
            </Link>
          </div>

        </article>
      ))}

    </section>
  );
}