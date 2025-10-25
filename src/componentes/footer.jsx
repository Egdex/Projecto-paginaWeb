
import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <h3>Contáctanos</h3>
        <p>Si tienes algún problema con tu compra, el envío o necesitas ayuda, escríbenos en nuestras redes o por correo.</p>
        <ul className="footer-links">
          <li><a href="https://www.instagram.com/tu_instagram" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="mailto:tu_correo@ejemplo.com">Correo electrónico</a></li>
        </ul>
        <p className="footer-copy">&copy; 2025 TuTienda. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;