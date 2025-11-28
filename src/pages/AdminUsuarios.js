// src/pages/AdminUsuarios.js
// ✅ Panel de administración de usuarios
// Lee los usuarios desde localStorage ("cats-users") y los muestra en una tabla.

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

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  // Cargar usuarios de localStorage al montar el componente
  useEffect(() => {
    const stored = localStorage.getItem("cats-users");
    const data = stored ? JSON.parse(stored) : [];
    setUsuarios(data);
  }, []);

  const handleLogout = () => {
    // Aquí solo limpiamos sesión de admin simulada
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/admin-login");
  };

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", backgroundColor: "#f5f6fa" }}
    >
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

            {/* Sección usuarios resaltada */}
            <li className="nav-item mb-2">
              <Link
                to="/admin/users"
                className="nav-link text-white fw-bold bg-secondary rounded"
              >
                <FaUsers /> Usuarios
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link to="/admin/reports" className="nav-link text-white">
                <FaChartBar /> Reportes
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/profile" className="nav-link text-white">
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

      {/* Contenido principal */}
      <div className="flex-grow-1 p-4">
        <h2 className="fw-bold">Gestión de usuarios</h2>
        <p className="text-muted">
          Aquí el administrador puede visualizar los usuarios registrados en la
          tienda (datos simulados desde localStorage).
        </p>

        {/* Si no hay usuarios */}
        {usuarios.length === 0 ? (
          <div className="alert alert-info mt-3">
            Aún no hay usuarios registrados. Pide a un usuario que se registre
            desde la página de <strong>Registro</strong>.
          </div>
        ) : (
          <div className="table-responsive mt-3">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Región</th>
                  <th>Comuna</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u, index) => (
                  <tr key={u.id}>
                    <td>{index + 1}</td>
                    <td>{u.nombre}</td>
                    <td>{u.correo}</td>
                    <td>{u.telefono || "-"}</td>
                    <td>{u.region || "-"}</td>
                    <td>{u.comuna || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
