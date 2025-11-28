// src/pages/LoginUsuario.js
// ✅ Vista de inicio de sesión de usuario (solo diseño, luego se conecta a la API)

import React, { useState } from "react";

export default function LoginUsuario() {
  const [form, setForm] = useState({
    correo: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login usuario (simulado):", form);
    alert("Login simulado. Luego se integrará con el backend / JWT.");
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
