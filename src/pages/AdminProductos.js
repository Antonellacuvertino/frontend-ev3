// src/pages/AdminProductos.js
// Panel de administración de productos
// - Lista rascadores desde rascadoresData.js
// - Permite CREAR nuevos productos
// - Permite marcar/desmarcar oferta
// - Permite eliminar productos

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

import {
  obtenerRascadores,
  agregarRascador,
  actualizarRascador,
  eliminarRascador,
} from "../data/rascadoresData";

export default function AdminProductos() {
  // Lista de productos
  const [productos, setProductos] = useState([]);

  // Formulario para crear nuevo producto
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    stock: "",
    oferta: false,
    imagen: "",
    descripcion: "",
  });

  const navigate = useNavigate();

  // Cargar productos al entrar al panel
  useEffect(() => {
    setProductos(obtenerRascadores());
  }, []);

  // Cerrar sesión de admin (simulada)
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/admin-login");
  };

  // Manejar cambios en inputs del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Enviar formulario: crear nuevo rascador
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.precio.trim()) {
      alert("Nombre y precio son obligatorios");
      return;
    }

    const nuevo = {
      nombre: form.nombre,
      precio: Number(form.precio),
      categoria: form.categoria || "",
      stock: form.stock ? Number(form.stock) : 0,
      oferta: form.oferta,
      imagen: form.imagen || "/img/rascador-3.jpg",
      descripcion: form.descripcion || "Nuevo rascador agregado desde el panel.",
    };

    // Usamos la función del "pseudo-backend"
    agregarRascador(nuevo);

    // Recargamos la lista
    setProductos(obtenerRascadores());

    // Reseteamos formulario
    setForm({
      nombre: "",
      precio: "",
      categoria: "",
      stock: "",
      oferta: false,
      imagen: "",
      descripcion: "",
    });

    alert("Producto creado (simulado) ✅");
  };

  // Marcar / desmarcar oferta
  const handleToggleOferta = (prod) => {
    actualizarRascador(prod.id, { oferta: !prod.oferta });
    setProductos(obtenerRascadores());
  };

  // Eliminar producto
  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    eliminarRascador(id);
    setProductos(obtenerRascadores());
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
              <Link to="/admin" className="nav-link text-white">
                <FaChartBar /> Dashboard
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/orders" className="nav-link text-white">
                <FaList /> Órdenes
              </Link>
            </li>

            {/* Productos activo */}
            <li className="nav-item mb-2">
              <Link
                to="/admin/products"
                className="nav-link text-white fw-bold bg-secondary rounded"
              >
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

      {/* ========== CONTENIDO PRINCIPAL ========== */}
      <div className="flex-grow-1 p-4">
        <h2 className="fw-bold">Gestión de productos</h2>
        <p className="text-muted">
          Aquí el administrador puede crear, marcar en oferta y eliminar
          rascadores cargados en la tienda.
        </p>

        {/* ====== FORMULARIO NUEVO PRODUCTO ====== */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Agregar nuevo rascador</h5>

            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-4">
                <label className="form-label">Nombre</label>
                <input
                  name="nombre"
                  className="form-control"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Rascador cueva XL"
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Precio</label>
                <input
                  name="precio"
                  type="number"
                  className="form-control"
                  value={form.precio}
                  onChange={handleChange}
                  placeholder="49990"
                  min="0"
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Stock</label>
                <input
                  name="stock"
                  type="number"
                  className="form-control"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="5"
                  min="0"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Categoría</label>
                <select
                  name="categoria"
                  className="form-select"
                  value={form.categoria}
                  onChange={handleChange}
                >
                  <option value="">Selecciona...</option>
                  <option value="torre">Torre</option>
                  <option value="pared">Pared</option>
                  <option value="alfombra">Alfombra</option>
                  <option value="arbol">Árbol</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">URL de imagen</label>
                <input
                  name="imagen"
                  className="form-control"
                  value={form.imagen}
                  onChange={handleChange}
                  placeholder="/img/rascador-3.jpg"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Descripción</label>
                <input
                  name="descripcion"
                  className="form-control"
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción breve del rascador"
                />
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    id="oferta"
                    name="oferta"
                    type="checkbox"
                    className="form-check-input"
                    checked={form.oferta}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="oferta">
                    Marcar como producto en oferta
                  </label>
                </div>
              </div>

              <div className="col-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-success">
                  Agregar producto
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ====== TABLA PRODUCTOS ====== */}
        {productos.length === 0 ? (
          <div className="alert alert-info mt-3">
            No hay productos cargados en el sistema.
          </div>
        ) : (
          <div className="table-responsive mt-3">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Oferta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td>{p.nombre}</td>
                    <td>{p.categoria || "-"}</td>
                    <td>${p.precio?.toLocaleString()}</td>
                    <td>{p.stock ?? "-"}</td>
                    <td>
                      {p.oferta ? (
                        <span className="badge bg-success">Sí</span>
                      ) : (
                        <span className="badge bg-secondary">No</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => handleToggleOferta(p)}
                      >
                        {p.oferta ? "Quitar oferta" : "Marcar oferta"}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Eliminar
                      </button>
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
