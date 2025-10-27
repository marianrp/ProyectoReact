import React from "react";
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import Inicio from './pages/Inicio';
import Nosotros from './pages/Nosotros';
import Productos from './pages/Productos';
import ProductoDetalle from './pages/ProductoDetalle';
import IniciarSesion from "./pages/IniciarSesion";
import RutaProtegida from "./pages/RutaProtegida";
import Pagar from "./pages/Pagar";

function App() {

  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow container mx-auto p-4 md:p-8">
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/nosotros' element={<Nosotros />} />
            <Route path='/productos' element={<Productos />} />
            
            <Route path='/productos/:id' element={<ProductoDetalle />} />
            <Route path='/productos/:categoria/:id' element={<ProductoDetalle />} />

            <Route path="/iniciar-sesion" element={<IniciarSesion />} />

            <Route 
              path="/pagar" 
              element={ 
                <RutaProtegida>
                  <Pagar />
                </RutaProtegida>
              }
            />

          </Routes>
        </main>
        
        <Footer />
      </div>
    </AppProvider>
  )
}

export default App
