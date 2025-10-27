import React from 'react';
import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="relative">
        <img 
          src="https://placehold.co/1200x400/3B82F6/FFFFFF?text=Tu+Kiosco+Online" 
          alt="Banner del Kiosco" 
          className="w-full h-48 md:h-64 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1200x400/cccccc/FFFFFF?text=Error+al+cargar+imagen'; }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
            Bienvenido al Kiosco Las Tinas
          </h1>
        </div>
      </div>

      <div className="p-8 md:p-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          ¡Todo lo que buscás, a un click de distancia!
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Explorá nuestra selección de golosinas, bebidas, snacks y mucho más. Podés pedir online sin moverte de tu casa.
        </p>
        
        <Link 
          to="/productos" 
          className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Ver Productos
        </Link>
      </div>

      <div className="bg-gray-50 p-8 md:p-12">
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Categorías Populares
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="font-bold text-lg text-blue-600">Golosinas</h4>
            <p className="text-sm text-gray-600 mt-2">Chocolates, caramelos, alfajores y más.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="font-bold text-lg text-blue-600">Bebidas</h4>
            <p className="text-sm text-gray-600 mt-2">Gaseosas, aguas, jugos y cervezas.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="font-bold text-lg text-blue-600">Snacks</h4>
            <p className="text-sm text-gray-600 mt-2">Papas fritas, maní, palitos salados.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
