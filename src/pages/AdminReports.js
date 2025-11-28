// src/pages/AdminReports.js
// ✅ Reportes simples basados en órdenes

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

export default function AdminReports() {
  const [ordenes, setOrdenes] = useState([]);
  const [kpis, setKpis] = useState({
    totalOrdenes: 0,
    totalVentas: 0,
    clientesUnicos: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("cats-orders");
    const data = stored ? JSON.parse(stored) : [];
    setOrdenes(data);

    const totalOrdenes = data.length;
    const totalVentas = data.reduce((acc, o) => acc + (o.total || 0), 0);
    const emails = new Set(data.map((o) => o.comprador?.email));
    const clientesUnicos = emails.size;

    setKpis({ totalOrdenes, totalVentas, clientesUnicos });
  }, []);

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
              <Link
                to="/admin/reports"
                className="nav-link text-white fw-bold bg-secondary rounded"
              >
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
        <h2 className="fw-bold">Reportes</h2>
        <p className="text-muted">
          Indicadores básicos basados en las órdenes registradas.
        </p>

        {/* KPIs */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6>Total de órdenes</h6>
                <p className="fs-3 fw-bold">{kpis.totalOrdenes}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6>Total de ventas</h6>
                <p className="fs-3 fw-bold">
                  ${kpis.totalVentas.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6>Clientes únicos</h6>
                <p className="fs-3 fw-bold">{kpis.clientesUnicos}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Listado rápido de últimas órdenes */}
        {ordenes.length > 0 && (
          <>
            <h5 className="mt-4">Últimas órdenes</h5>
            <ul className="list-group mt-2">
              {ordenes.slice(-5).reverse().map((o) => (
                <li key={o.id} className="list-group-item d-flex justify-content-between">
                  <span>
                    {o.comprador?.nombre} – {o.comprador?.email}
                  </span>
                  <strong>${o.total.toLocaleString()}</strong>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
