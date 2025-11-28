// src/pages/Admin.js
// ✅ Dashboard principal del administrador (métricas generales)

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

export default function Admin() {
  const navigate = useNavigate();
  const [resumen, setResumen] = useState({
    ordenes: 0,
    productos: 0,
    usuarios: 0,
  });

  useEffect(() => {
    const ordStored = localStorage.getItem("cats-orders");
    const ordenes = ordStored ? JSON.parse(ordStored) : [];

    const usrStored = localStorage.getItem("cats-users");
    const usuarios = usrStored ? JSON.parse(usrStored) : [];

    const productos = obtenerRascadores();

    setResumen({
      ordenes: ordenes.length,
      productos: productos.length,
      usuarios: usuarios.length,
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminLogged");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/admin-login");
  };

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", backgroundColor: "#f5f6fa" }}
    >
      {/* ========== SIDEBAR ========== */}
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
              <Link
                to="/admin"
                className="nav-link text-white fw-bold bg-secondary rounded"
              >
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

      {/* ========== CONTENIDO ========== */}
      <div className="flex-grow-1 p-4">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-muted">
          Resumen general de las actividades de la tienda (datos simulados).
        </p>

        {/* Tarjetas superiores */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card text-white bg-primary">
              <div className="card-body">
                <h5 className="card-title">Órdenes</h5>
                <p className="card-text fs-4">{resumen.ordenes}</p>
                <p className="small">Total de compras registradas.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card text-white bg-success">
              <div className="card-body">
                <h5 className="card-title">Productos</h5>
                <p className="card-text fs-4">{resumen.productos}</p>
                <p className="small">Rascadores publicados en la tienda.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card text-white bg-warning">
              <div className="card-body">
                <h5 className="card-title">Usuarios</h5>
                <p className="card-text fs-4">{resumen.usuarios}</p>
                <p className="small">Clientes registrados.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjetas inferiores con accesos rápidos */}
        <div className="row mt-4">
          {[
            {
              icon: <FaList />,
              title: "Órdenes",
              desc: "Gestión y seguimiento de compras.",
              link: "/admin/orders",
            },
            {
              icon: <FaBoxOpen />,
              title: "Productos",
              desc: "Inventario y detalle de rascadores.",
              link: "/admin/products",
            },
            {
              icon: <FaTags />,
              title: "Categorías",
              desc: "Organizar productos por tipo.",
              link: "/admin/categories",
            },
            {
              icon: <FaUsers />,
              title: "Usuarios",
              desc: "Cuentas y roles.",
              link: "/admin/users",
            },
            {
              icon: <FaChartBar />,
              title: "Reportes",
              desc: "Indicadores y métricas de ventas.",
              link: "/admin/reports",
            },
            {
              icon: <FaUserCircle />,
              title: "Perfil",
              desc: "Datos personales del administrador.",
              link: "/admin/profile",
            },
            {
              icon: <FaStore />,
              title: "Tienda",
              desc: "Vista pública de la tienda.",
              link: "/tienda",
            },
          ].map((item, idx) => (
            <div className="col-md-3 mb-3" key={idx}>
              <Link to={item.link} className="text-decoration-none text-dark">
                <div className="card text-center h-100 shadow-sm">
                  <div className="card-body">
                    <div className="fs-3 mb-2">{item.icon}</div>
                    <h6 className="fw-bold">{item.title}</h6>
                    <p className="small text-muted">{item.desc}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
