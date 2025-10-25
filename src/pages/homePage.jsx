// src/pages/homePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Esta es la ÚNICA función HomePage
export function HomePage() {
  return (
    <> {/* Fragmento <>...</> para agrupar elementos */}
      <section>
        <h2>Bienvenidos a nuestra PyME 🐣</h2>
        <p>Ofrecemos productos hechos a mano en porcelana fría, únicos y personalizados.</p>
        <p>Realizamos envíos por pagar a todo Chile. 💌</p>
      </section>

      <section>
        <h2>Productos Destacados</h2>

        <div className="producto">
          <img src="/imagenes/Productos/Cat.png" alt="Figura de Animalito" />
          <h3><Link to="/producto/KN01">Figura de gato</Link></h3>
          <p>Hecha a mano en porcelana fría, ideal para decoración o regalo.</p>
          <p className="precio">$15.000 CLP</p>
          <button className="btn-comprar">Comprar</button>
        </div>

        <div className="producto">
          <img src="/imagenes/Productos/Kirbo.png" alt="Kirbo" />
          <h3><Link to="/producto/KN02">Kirbo</Link></h3>
          <p>Kirbo pero modo kraici</p>
          <p className="precio">$12.000 CLP</p>
          <button className="btn-comprar">Comprar</button>
        </div>

        {/* ... Aquí puedes pegar el resto de tus productos destacados ... */}

      </section>

      <section className="video-container">
        <h2>Video de presentación</h2>
        <video controls autoPlay muted loop>
          <source src="/video/video-presentacion.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
      </section>
    </>
  );
}