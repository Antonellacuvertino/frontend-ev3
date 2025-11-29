
import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// URL base de la API (Usamos la misma lógica codificada por si acaso)
const API_BASE = "https://backend-ev3.onrender.com";

export default function LoginUsuario() {
  const [form, setForm] = useState({
    correo: "",
    password: "",
  });
  const [error, setError] = useState("");
  // const { login } = useAuth(); // Descomentar si implementas la lógica de AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => { // Función ahora es asíncrona
    e.preventDefault();
    setError("");

    const API_URL = `${API_BASE}/api/auth/login`; // RUTA CORREGIDA

    try {
      const res = await axios.post(API_URL, {
        username: form.correo, // ¡ATENCIÓN! Spring Security por defecto usa 'username'
        password: form.password,
      });

      // Lógica exitosa: guardar token y redirigir
      console.log("Login exitoso:", res.data);
      alert("Inicio de sesión exitoso. Redirigiendo...");

    } catch (e) {
      console.error("Fallo el login:", e);
      if (e.response && (e.response.status === 401 || e.response.status === 403)) {
         setError("Credenciales incorrectas.");
      } else {
         setError("Error de conexión con el servidor.");
      }
    }
  };

  return (
    <div className="container py-4">
      {/* Logo + nombre empresa */}
      <div className="text-center mb-4">
        <img
          src="/img/logo.png"
          alt="cats-shop"
          style={{ height: "70px" }}
        />
        <h2 className="mt-2">cats-shop</h2>
      </div>

      {/* Card central como el mockup del login */}
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Inicio de sesión</h5>
            </div>

            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar error */}
              <form onSubmit={handleSubmit}>
                {/* Correo */}
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input
                    name="correo"
                    type="email"
                    className="form-control"
                    value={form.correo}
                    onChange={handleChange}
                    placeholder="tucorreo@ejemplo.com"
                    required
                  />
                </div>

                {/* Contraseña */}
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-primary px-4">
                    Iniciar sesión
                  </button>
                </div>

                <p className="text-muted small text-center mt-3">
                  ¿Aún no tienes cuenta? Regístrate en la sección de registro.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}