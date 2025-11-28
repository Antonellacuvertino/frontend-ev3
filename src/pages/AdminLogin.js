
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  // Estado para los campos del formulario
  const [credentials, setCredentials] = useState({
    usuario: "",
    contrasena: "",
  });

  // Estado para mensajes de error
  const [error, setError] = useState("");

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Función para manejar el inicio de sesión
  const handleSubmit = (e) => {
    e.preventDefault();

    // Datos de acceso simulados (puedes cambiarlos)
    const adminUser = "admin@cats-shop.com";
    const adminPass = "12345";

    // Validación simple
    if (
      credentials.usuario === adminUser &&
      credentials.contrasena === adminPass
    ) {
      localStorage.setItem("adminLogged", "true"); // guarda sesión
      navigate("/admin"); // redirige al panel
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "380px" }}>
        <h3 className="text-center fw-bold mb-3">🔐 Acceso Administrador</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="email"
              className="form-control"
              name="usuario"
              value={credentials.usuario}
              onChange={handleChange}
              placeholder="admin@cats-shop.com"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="contrasena"
              value={credentials.contrasena}
              onChange={handleChange}
              placeholder="12345"
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100">
            Ingresar
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="/" className="text-secondary small">
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
