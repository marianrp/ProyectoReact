import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';
import { LogIn, User, Mail, AlertCircle } from 'lucide-react';

export default function IniciarSesion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated, setUsuario } = useAppContext();

  const [formulario, setFormulario] = useState({ nombre: '', email: '' });
  const [error, setError] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (formulario.nombre.trim() && formulario.email.trim()) {
      setIsAuthenticated(true);
      setUsuario(formulario);
      
      const from = location.state?.from?.pathname || '/productos';
      navigate(from, { replace: true });
      
    } else {
      setError('Por favor, completa todos los campos.');
    }
  };

  return (
    <div className="flex justify-center items-center py-12 px-4 bg-gray-50 min-h-full">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          ¡Bienvenido!
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Inicia sesión para finalizar tu compra.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6 flex items-center" role="alert">
            <AlertCircle className="w-5 h-5 mr-3 text-red-600" />
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={manejarEnvio} className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="w-5 h-5 text-gray-400" />
              </span>
              <input
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formulario.nombre}
                onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="w-5 h-5 text-gray-400" />
              </span>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formulario.email}
                onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Iniciar Sesión
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => navigate('/productos')}
            className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
          >
            Cancelar y volver a productos
          </button>
        </div>
      </div>
    </div>
  );
}

