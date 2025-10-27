import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function Navbar() {
  const { isAuthenticated, usuario, carrito, cerrarSesion } = useAppContext();
  const navigate = useNavigate();

  const totalQuantity = carrito.reduce((total, item) => total + (item.quantity || 0), 0);

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Kiosco Las Tinas
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Inicio</Link>
          <Link to="/productos" className="text-gray-600 hover:text-blue-600">Productos</Link>
          <Link to="/nosotros" className="text-gray-600 hover:text-blue-600">Nosotros</Link>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                 <UserIcon />
                <span className="text-gray-700 hidden sm:inline">Hola, {usuario.nombre}</span>
              </div>
              <button
                onClick={handleCerrarSesion}
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/iniciar-sesion" className="text-gray-600 hover:text-blue-600">
              Iniciar Sesión
            </Link>
          )}

          <Link to="/pagar" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 relative">
            <CartIcon />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
            <span className="hidden lg:inline">Carrito</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
