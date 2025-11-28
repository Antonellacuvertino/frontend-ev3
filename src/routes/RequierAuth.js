// Envuelve páginas que requieren estar logeado
import React from "react";
import { Navigate, useLocation } from "react-router-dom"; // // Importa componentes de navegación
import { useAuth } from "../context/AuthContext"; // // Hook que obtiene el estado de autenticación global

// // Componente que protege rutas que necesitan autenticación
export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth(); // // Verifica si el usuario está autenticado
  const location = useLocation(); // // Guarda la ubicación actual (para volver después del login)

  if (!isAuthenticated) {
    // // Si no está autenticado, redirige al login y almacena la ruta original
    return <Navigate to="/admin-login" replace state={{ from: location }} />;
  }

  // // Si está autenticado, renderiza el contenido protegido (children)
  return children;
}
