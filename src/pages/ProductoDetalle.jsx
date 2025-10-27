import { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ChevronLeft, ShoppingCart, AlertCircle } from 'lucide-react'; 

export default function ProductoDetalle() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useAppContext();

  const [producto, setProducto] = useState(location.state?.producto || null);
  const [cargando, setCargando] = useState(!producto); 
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!producto) {
      setCargando(true);
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then(respuesta => {
          if (!respuesta.ok) {
            throw new Error("No se pudo encontrar el producto.");
          }
          return respuesta.json();
        })
        .then(datos => {
          const productoAdaptado = {
            ...datos,
            nombre: datos.title,
            precio: datos.price,
            descripcion: datos.description,
            avatar: datos.image,
            categoria: datos.category
          };
          setProducto(productoAdaptado);
          setCargando(false);
        })
        .catch(error => {
          console.error("Error fetching producto:", error);
          setError("No se pudo cargar el producto. Es posible que ya no exista.");
          setCargando(false);
        });
    }
  }, [id, producto]);

  if (cargando) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-gray-600 animate-pulse">Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto my-8 text-center bg-red-100 border border-red-400 text-red-700 px-6 py-8 rounded-lg shadow-md" role="alert">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
        <strong className="font-bold text-2xl mb-2 block">¡Error!</strong>
        <span className="block text-lg mb-6">{error}</span>
        <Link
          to="/productos"
          className="inline-flex items-center bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Volver a Productos
        </Link>
      </div>
    );
  }
  
  if (!producto) {
    return (
        <div className="text-center py-20">
            <p className="text-xl text-gray-500">Producto no encontrado.</p>
            <Link
              to="/productos"
              className="inline-flex items-center mt-4 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Volver a Productos
            </Link>
        </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-5xl mx-auto my-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        
        <div className="p-8 bg-gray-50 flex justify-center items-center relative">
          <button
            onClick={() => navigate('/productos')}
            className="absolute top-4 left-4 inline-flex items-center bg-white text-gray-700 font-medium py-2 px-4 rounded-full shadow hover:bg-gray-100 transition-colors text-sm z-10"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Volver
          </button>
          <img
            src={producto.avatar}
            alt={producto.nombre}
            className="max-w-full h-auto max-h-96 object-contain"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/cccccc/FFFFFF?text=Sin+Imagen'; }}
          />
        </div>

        <div className="p-8 md:p-12 flex flex-col">
          <span className="text-sm text-gray-500 capitalize mb-2">{producto.categoria}</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {producto.nombre}
          </h1>
          
          <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
            {producto.descripcion}
          </p>

          <div className="mt-auto">
            <p className="text-4xl font-bold text-blue-600 mb-6">
              ${Number(producto.precio).toFixed(2)}
            </p>
            
            <button
              onClick={() => agregarAlCarrito(producto, 1)}
              className="w-full inline-flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300"
            >
              <ShoppingCart className="w-6 h-6 mr-2" />
              Agregar al Carrito
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

