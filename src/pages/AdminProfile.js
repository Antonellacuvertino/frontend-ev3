// src/pages/AdminProfile.js
// ✅ Perfil simple del administrador (guarda nombre en sessionStorage)

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaBoxOpen,
  FaUsers,
  FaTags,
  FaList,
  FaUserCircle,
  FaStore,
} from "react-icons/fa";

export default function AdminProfile() {
  const [perfil, setPerfil] = useState({
    nombre: "Admin cats-shop",
    email: "admin@cats-shop.cl",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("admin-profile");
    if (stored) setPerfil(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    sessionStorage.setItem("admin-profile", JSON.stringify(perfil));
    alert("Perfil actualizado (simulado).");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLogged");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/admin-login");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f5f6fa" }}>
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{
          width: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h4 className="text-center mb-4">🐾 Cats-Shop</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/admin" className="nav-link text-white">
                <FaChartBar /> Dashboard
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/orders" className="nav-link text-white">
                <FaList /> Órdenes
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/products" className="nav-link text-white">
                <FaBoxOpen /> Productos
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/categories" className="nav-link text-white">
                <FaTags /> Categorías
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/users" className="nav-link text-white">
                <FaUsers /> Usuarios
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/reports" className="nav-link text-white">
                <FaChartBar /> Reportes
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                to="/admin/profile"
                className="nav-link text-white fw-bold bg-secondary rounded"
              >
                <FaUserCircle /> Perfil
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Link to="/tienda" className="btn btn-outline-light w-100 mb-2">
            <FaStore /> Ver tienda
          </Link>
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-grow-1 p-4">
        <h2 className="fw-bold">Perfil del administrador</h2>
        <p className="text-muted">
          Información básica del usuario administrador (almacenada en sessionStorage).
        </p>

        <div className="row justify-content-center mt-3">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <form onSubmit={handleSave}>
                  <div className="mb-3">
                    <label className="form-label">Nombre visible</label>
                    <input
                      name="nombre"
                      type="text"
                      className="form-control"
                      value={perfil.nombre}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      value={perfil.email}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Guardar cambios
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
