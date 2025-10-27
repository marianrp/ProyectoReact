import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function RutaProtegida({ children }) {
  const { isAuthenticated } = useAppContext();
  
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/iniciar-sesion" state={{ from: location }} replace />;
  }

  return children;
}

export default RutaProtegida;

