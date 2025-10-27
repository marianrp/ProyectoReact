import React, { createContext, useContext, useState, useEffect } from "react";

export const AppContext = createContext(null);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de AppProvider");
  }
  return context;
}

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: "", email: "" });

  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem('carritoKiosco');
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch (error) {
      console.error("Error al cargar carrito de localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('carritoKiosco', JSON.stringify(carrito));
  }, [carrito]);

  
  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const productoExiste = carritoActual.find((item) => item.id === producto.id);
      
      if (productoExiste) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...carritoActual, { ...producto, quantity: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito((carritoActual) => {
      const productoEnCarrito = carritoActual.find((item) => item.id === productoId);

      if (productoEnCarrito?.quantity > 1) {
        return carritoActual.map((item) =>
          item.id === productoId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return carritoActual.filter((item) => item.id !== productoId);
      }
    });
  };
  
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cerrarSesion = () => {
    setIsAuthenticated(false);
    setUsuario({ nombre: "", email: "" });
    vaciarCarrito(); 
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    usuario,
    setUsuario,
    cerrarSesion,
    
    carrito,
    agregarAlCarrito,
    vaciarCarrito,
    eliminarDelCarrito
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
