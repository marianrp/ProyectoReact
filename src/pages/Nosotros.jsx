import React from 'react';
import { Link } from 'react-router-dom';

function Nosotros() {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto my-8">
      <div className="relative">
        <img 
          src="https://placehold.co/1000x300/4F46E5/FFFFFF?text=Sobre+Nosotros" 
          alt="Banner Sobre Nosotros" 
          className="w-full h-48 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1000x300/cccccc/FFFFFF?text=Error+al+cargar+imagen'; }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center px-4">
            Conocé el Kiosco Las Tinas
          </h1>
        </div>
      </div>

      <div className="p-8 md:p-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Nuestra Historia
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Comenzamos con el Kiosco Las Tinas en 2021 y nos ubicamos en 184 y 44. Estamos comprometidos con ofrecerte la mejor variedad y atención.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Nuestra Misión
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Nuestra misión es simple: facilitarte el día a día. Queremos ser ese lugar donde sabés que vas a encontrar eso que te tienta, la bebida fría que necesitás o el ingrediente que te faltaba, siempre con una sonrisa y la mejor onda.
        </p>

        <div className="text-center mt-10">
          <Link 
            to="/productos" 
            className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Ir a Comprar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;
