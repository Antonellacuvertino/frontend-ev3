// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Páginas públicas
import Home from "./pages/Home";
import Tienda from "./pages/Tienda";
import Categorias from "./pages/Categorias";
import Ofertas from "./pages/Ofertas";
import Carrito from "./pages/Carrito"; 
import Checkout from "./pages/Checkout"; 
import RegistroUsuario from "./pages/RegistroUsuario";
import LoginUsuario from "./pages/LoginUsuario";


// Admin
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminUsuarios from "./pages/AdminUsuarios";
import AdminProductos from "./pages/AdminProductos";
import AdminOrders from "./pages/AdminOrders";
import AdminCategorias from "./pages/AdminCategorias";
import AdminReports from "./pages/AdminReports";
import AdminProfile from "./pages/AdminProfile";

// UI
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Contexto carrito (si lo usas)
import { CartProvider } from "./context/CartContext";

// Ruta privada simple usando localStorage
function PrivateRoute({ children }) {
  const isLogged = localStorage.getItem("adminLogged") === "true";
  return isLogged ? children : <Navigate to="/admin-login" />;
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />

        <Routes>
          
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} /> 
          <Route path="/registro" element={<RegistroUsuario />} />
         <Route path="/login" element={<LoginUsuario />} />
         
          {/* Protegida */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
            
          />
         <Route
          path="/admin/users"
          element={
         <PrivateRoute>
         <AdminUsuarios />
          </PrivateRoute>
         }
/>
          <Route
          path="/admin/products"
          element={
          <PrivateRoute>
         <AdminProductos />
           </PrivateRoute>
         }
/>
        <Route
       path="/admin/orders"
       element={
       <PrivateRoute>
         <AdminOrders />
         </PrivateRoute>
       }
/>
       <Route
        path="/admin/categories"
       element={
       <PrivateRoute>
       <AdminCategorias />
       </PrivateRoute>
     }
/>

      <Route
      path="/admin/users"
      element={
    <PrivateRoute>
      <AdminUsuarios />
    </PrivateRoute>
  }
/>
     <Route
      path="/admin/reports"
      element={
       <PrivateRoute>
         <AdminReports />
      </PrivateRoute>
  }
/>

<Route
  path="/admin/profile"
  element={
    <PrivateRoute>
      <AdminProfile />
    </PrivateRoute>
  }
/>


          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </Router>
    </CartProvider>
  );
}
