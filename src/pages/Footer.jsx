import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 mt-12">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>
          &copy; {currentYear} Kiosco Las Tinas. Todos los derechos reservados.
        </p>
        <p className="text-sm mt-1">
          Desarrollado por Mariano Sánchez.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
