// src/pages/LoginUsuario.js

import React, { useState } from "react";
import axios from "axios"; // Importar AXIOS
// import { useNavigate } from "react-router-dom"; // Si necesitas redirigir después del login
// import { useAuth } from "../context/AuthContext"; // Si usas contexto para guardar la sesión

// URL base de la API (Tomada de Vercel/Render)
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8081";

export default function LoginUsuario() {
  const [form, setForm] = useState({
    correo: "",
    password: "",
  });
  const [error, setError] = useState(""); // Nuevo estado para errores
  // const { login } = useAuth(); // Descomentar si implementas la lógica de AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => { // Función ahora es asíncrona
    e.preventDefault();
    setError(""); // Limpiar errores

    const API_URL = `${API_BASE}/api/login`; // Reemplaza /api/login con tu ruta real si es diferente

    try {
      // ⚠️ IMPORTANTE: El backend espera "correo" y "password" en el body.
      const res = await axios.post(API_URL, {
        correo: form.correo,
        password: form.password,
      });

      // Si el backend devuelve un token o datos de usuario, lo manejas aquí
      // login(res.data.token, res.data.user); // Lógica de AuthContext si la implementas

      alert("Inicio de sesión exitoso. Redirigiendo...");
      // navigate("/"); // Redirigir a Home o al panel de usuario

    } catch (e) {
      console.error("Fallo el login:", e);
      // Asume que 401/403 significa credenciales incorrectas, cualquier otro error es un fallo de conexión
      if (e.response && (e.response.status === 401 || e.response.status === 403)) {
         setError("Credenciales incorrectas. Intenta de nuevo.");
      } else {
         setError("Error de conexión con el servidor. Revisa logs.");
      }
    }
  };

  return (
    <div className="container py-4">
      {/* ... (código del logo) ... */}

      <div className="text-center mb-4">
        <img
          src="/img/logo.png"
          alt="cats-shop"
          style={{ height: "70px" }}
        />
        <h2 className="mt-2">cats-shop</h2>
      </div>

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