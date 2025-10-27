import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import { XCircle, PlusCircle, MinusCircle, ShoppingCart, Trash2 } from "lucide-react"; 

export default function Carrito() {
  const { 
    carrito, 
    vaciarCarrito, 
    eliminarDelCarrito, 
    incrementarCantidad, 
    decrementarCantidad, 
    totalCarrito,
    totalItems 
  } = useAppContext();

  const navigate = useNavigate();

  const irAPagar = () => {
    navigate("/pagar"); 
  };

  const total = totalCarrito();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        <ShoppingCart className="w-6 h-6 mr-2 text-blue-600" />
        Tu Carrito ({totalItems})
      </h2>
      
      <hr className="mb-4" />

      {carrito.length === 0 ? (
        <p className="text-gray-600 text-center py-4">El carrito está vacío</p>
      ) : (
        <>
          <div className="max-h-64 overflow-y-auto pr-2 -mr-2">
            {carrito.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-4">
                <img 
                  src={item.avatar} 
                  alt={item.nombre} 
                  className="w-12 h-12 object-contain rounded-md mr-3 bg-white border border-gray-100"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/50x50/cccccc/FFFFFF?text=Img'; }}
                />
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate" title={item.nombre}>
                    {item.nombre}
                  </p>
                  <p className="text-xs text-gray-500">
                    ${Number(item.precio).toFixed(2)}
                  </p>
                  <div className="flex items-center mt-1">
                    <button 
                      onClick={() => decrementarCantidad(item.id)} 
                      className="text-gray-500 hover:text-red-600 disabled:opacity-50"
                      disabled={item.cantidad <= 1}
                      title="Quitar uno"
                    >
                      <MinusCircle className="w-4 h-4" />
                    </button>
                    <span className="mx-2 text-sm font-medium w-6 text-center">{item.cantidad}</span>
                    <button 
                      onClick={() => incrementarCantidad(item.id)} 
                      className="text-gray-500 hover:text-green-600"
                      title="Agregar uno"
                    >
                      <PlusCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => eliminarDelCarrito(item.id)}
                  className="text-gray-400 hover:text-red-500 ml-2 flex-shrink-0"
                  title="Eliminar producto"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          
          <hr className="my-4" />

          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-800">Total:</span>
            <span className="text-xl font-bold text-blue-600">
              ${Number(total).toFixed(2)}
            </span>
          </div>

          <div className="space-y-2">
            <button 
              onClick={irAPagar}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              Ir a Pagar
            </button>
            <button 
              onClick={vaciarCarrito}
              className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-md font-semibold hover:bg-red-200 transition-colors flex items-center justify-center text-sm"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}

