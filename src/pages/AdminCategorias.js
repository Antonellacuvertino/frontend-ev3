// src/pages/AdminCategorias.js
// ✅ Resume los productos por categoría

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
import { obtenerRascadores } from "../data/rascadoresData";

export default function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const prods = obtenerRascadores();
    const map = {};

    prods.forEach((p) => {
      const cat = p.categoria || "Sin categoría";
      if (!map[cat]) {
        map[cat] = { nombre: cat, cantidad: 0, enOferta: 0 };
      }
      map[cat].cantidad += 1;
      if (p.enOferta) map[cat].enOferta += 1;
    });

    setCategorias(Object.values(map));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminLogged");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/admin-login");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f5f6fa" }}>
      {/* Sidebar (igual patrón) */}
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
              <Link
                to="/admin/categories"
                className="nav-link text-white fw-bold bg-secondary rounded"
              >
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

      {/* Contenido */}
      <div className="flex-grow-1 p-4">
        <h2 className="fw-bold">Categorías</h2>
        <p className="text-muted">
          Resumen de productos agrupados por categoría (datos desde rascadoresData).
        </p>

        <div className="table-responsive mt-3">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Categoría</th>
                <th>Productos</th>
                <th>En oferta</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((c, index) => (
                <tr key={c.nombre}>
                  <td>{index + 1}</td>
                  <td>{c.nombre}</td>
                  <td>{c.cantidad}</td>
                  <td>{c.enOferta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
