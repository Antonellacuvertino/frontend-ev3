
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

export default function AdminOrders() {
  const [ordenes, setOrdenes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("cats-orders");
    const data = stored ? JSON.parse(stored) : [];
    setOrdenes(data);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminLogged");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/admin-login");
  };

  const formatFecha = (iso) =>
    new Date(iso).toLocaleString("es-CL", {
      dateStyle: "short",
      timeStyle: "short",
    });

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
              <Link
                to="/admin/orders"
                className="nav-link text-white fw-bold bg-secondary rounded"
              >
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

      {/* Contenido */}
      <div className="flex-grow-1 p-4">
        <h2 className="fw-bold">Órdenes</h2>
        <p className="text-muted">
          Listado de compras realizadas por los clientes (simuladas desde el Checkout).
        </p>

        {ordenes.length === 0 ? (
          <div className="alert alert-info mt-3">
            Aún no hay órdenes registradas. Realiza una compra desde la tienda.
          </div>
        ) : (
          <div className="table-responsive mt-3">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Correo</th>
                  <th>Total</th>
                  <th>Método pago</th>
                  <th>Estado</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                {ordenes.map((o, index) => (
                  <tr key={o.id}>
                    <td>{index + 1}</td>
                    <td>{formatFecha(o.fecha)}</td>
                    <td>{o.comprador?.nombre}</td>
                    <td>{o.comprador?.email}</td>
                    <td>${o.total?.toLocaleString()}</td>
                    <td>{o.metodoPago}</td>
                    <td>
                      <span className="badge bg-success">{o.estado}</span>
                    </td>
                    <td>
                      {o.items?.map((it) => it.nombre).join(", ") || "-"}
                    </td>
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
