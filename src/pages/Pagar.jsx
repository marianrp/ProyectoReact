import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';
import { CreditCard, User, Mail, LogOut, ShoppingBag } from 'lucide-react';

export default function Pagar() {
  const { usuario, cerrarSesion, carrito, vaciarCarrito, calcularTotal } = useAppContext();
  const navigate = useNavigate();
  
  const [mostrarModal, setMostrarModal] = useState(false);

  const total = calcularTotal();

  const comprar = () => {
    setMostrarModal(true);
  };

  const finalizarCompraYRedirigir = () => {
    vaciarCarrito();
    setMostrarModal(false);
    navigate('/productos');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl mt-10 mb-10">
      
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">¡Compra exitosa!</h2>
            <p className="text-gray-700 mb-6">Gracias por tu compra, {usuario.nombre}. Tu pedido está en camino.</p>
            <button
              onClick={finalizarCompraYRedirigir}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Volver a Productos
            </button>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Finalizar Compra</h1>

      <div className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Tu Información</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <User className="w-5 h-5 text-gray-500 mr-3" />
            <span className="text-gray-800">{usuario.nombre}</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-gray-500 mr-3" />
            <span className="text-gray-800">{usuario.email}</span>
          </div>
        </div>
        <button
          onClick={cerrarSesion}
          className="mt-4 inline-flex items-center text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar sesión
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Resumen de tu Pedido</h2>
        <div className="space-y-4">
          {carrito.length > 0 ? (
            carrito.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded-md mr-4 bg-white p-1 border" />
                  <div>
                    <h3 className="font-semibold text-gray-800 truncate w-60">{item.title}</h3>
                    <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-800">${(item.price * item.cantidad).toFixed(2)}</span>
              </div>
            ))
          ) : (
            <div className="text-center py-10 px-4 border-2 border-dashed rounded-lg">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hay productos en tu carrito.</p>
              <button
                onClick={() => navigate('/productos')}
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Ir a Productos
              </button>
            </div>
          )}
        </div>
      </div>

      {carrito.length > 0 && (
        <div className="mt-8 pt-6 border-t">
          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl font-bold text-gray-800">Total a pagar:</span>
            <span className="text-3xl font-bold text-indigo-600">${total}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-end sm:space-x-4 space-y-2 sm:space-y-0">
            <button
              onClick={() => navigate('/productos')}
              className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Seguir Comprando
            </button>
            <button
              onClick={comprar}
              className="flex items-center justify-center bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Confirmar y Pagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

