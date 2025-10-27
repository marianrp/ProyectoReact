import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import Carrito from "./Carrito.jsx";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [terminosBusqueda, setTerminosBusqueda] = useState("");
  const [categoria, setCategoria] = useState("all");

  const { agregarAlCarrito } = useAppContext();

  const API_URL = "https://fakestoreapi.com/products";
  
  const categorias = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ];

  useEffect(() => {
    setCargando(true);
    const url = categoria === "all" 
      ? API_URL 
      : `${API_URL}/category/${categoria}`;
      
    fetch(url)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error en la red al cargar productos.");
        }
        return respuesta.json();
      })
      .then((datos) => {
        const productosAdaptados = datos.map(p => ({
            ...p,
            nombre: p.title,
            precio: p.price,
            descripcion: p.description,
            avatar: p.image,
            categoria: p.category
        }));
        setProductos(productosAdaptados);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error fetching productos:", error);
        setError("Hubo un problema al cargar los productos. Intenta de nuevo más tarde.");
        setCargando(false);
      });
  }, [categoria]);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(terminosBusqueda.toLowerCase())
  );

  const renderContenido = () => {
    if (cargando) {
      return (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-600 animate-pulse">Cargando productos...</p>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="text-center py-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">¡Ups! Hubo un error.</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      );
    }

    if (productosFiltrados.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-gray-500">No se encontraron productos para tu búsqueda.</p>
            </div>
        );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {productosFiltrados.map((producto) => (
          <li key={producto.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col list-none transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
            <Link to={`/productos/${producto.id}`} state={{ producto }} className="block relative h-56">
              <img 
                src={producto.avatar} 
                alt={producto.nombre} 
                className="w-full h-full object-contain p-4 bg-white"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/cccccc/FFFFFF?text=Sin+Imagen'; }}
              />
            </Link>
            <div className="p-4 flex flex-col flex-grow">
              <span className="text-xs text-gray-500 capitalize mb-1">{producto.categoria}</span>
              <h2 className="text-md font-semibold text-gray-800 h-12 overflow-hidden mb-2" title={producto.nombre}>
                {producto.nombre.substring(0, 50)}{producto.nombre.length > 50 ? '...' : ''}
              </h2>
              <p className="text-2xl font-bold text-blue-600 mb-4 flex-grow">
                ${Number(producto.precio).toFixed(2)}
              </p>
              <div className="mt-auto flex space-x-2">
                <Link 
                  to={`/productos/${producto.id}`} 
                  state={{ producto }}
                  className="flex-1 text-center bg-gray-200 text-gray-800 py-2 px-3 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                >
                  Detalles
                </Link>
                <button 
                  onClick={() => agregarAlCarrito(producto, 1)}
                  className="flex-1 text-center bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Agregar
                </button>
              </div>
            </div>
          </li>
        ))}
      </div>
    );
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <main className="flex-grow md:w-3/4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Nuestros Productos</h1>

        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={terminosBusqueda}
            onChange={(e) => setTerminosBusqueda(e.target.value)}
            className="flex-grow w-full sm:w-auto border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categorias.map(cat => (
              <option key={cat} value={cat} className="capitalize">
                {cat === "all" ? "Todas las categorías" : cat}
              </option>
            ))}
          </select>
        </div>

        <ul>
            {renderContenido()}
        </ul>
      </main>

      <aside className="md:w-1/4">
        <Carrito />
      </aside>
    </div>
  );
}

