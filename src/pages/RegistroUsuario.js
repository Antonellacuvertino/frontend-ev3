// src/pages/RegistroUsuario.js
import React, { useState } from "react";
import axios from "axios";

// URL base de la API (Usamos la misma lógica codificada por si acaso)
const API_BASE = "https://backend-ev3.onrender.com";

export default function RegistroUsuario() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    confirmarCorreo: "",
    password: "",
    confirmarPassword: "",
    telefono: "",
    region: "",
    comuna: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => { // Función ahora es asíncrona
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const API_URL = `${API_BASE}/api/auth/register`; // RUTA CORREGIDA

    try {
      const res = await axios.post(API_URL, {
        nombre: form.nombre,
        username: form.correo, // Usamos 'username' para el backend de seguridad
        password: form.password,
        telefono: form.telefono,
        region: form.region,
        comuna: form.comuna,
      });

      setSuccess("¡Registro exitoso! Ya puedes iniciar sesión.");
      // Limpiar formulario (dejarlo vacío para la próxima)
      setForm({
        nombre: "", correo: "", confirmarCorreo: "", password: "",
        confirmarPassword: "", telefono: "", region: "", comuna: "",
      });

    } catch (e) {
      console.error("Fallo el registro:", e);
      if (e.response && e.response.status === 409) {
         setError("El correo electrónico ya se encuentra registrado.");
      } else {
         setError("Error al registrar el usuario. Revisa la conexión.");
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
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Registro de usuario</h5>
            </div>

            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                {/* Nombre completo */}
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input
                    name="nombre"
                    type="text"
                    className="form-control"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Antonella Cuvertino"
                    required
                  />
                </div>

                {/* Correo */}
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input
                    name="correo"
                    type="email"
                    className="form-control"
                    value={form.correo}
                    onChange={handleChange}
                    placeholder="antonella@correo.com"
                    required
                  />
                </div>

                {/* Confirmar correo */}
                <div className="mb-3">
                  <label className="form-label">Confirmar correo</label>
                  <input
                    name="confirmarCorreo"
                    type="email"
                    className="form-control"
                    value={form.confirmarCorreo}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
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

                {/* Confirmar password */}
                <div className="mb-3">
                  <label className="form-label">Confirmar contraseña</label>
                  <input
                    name="confirmarPassword"
                    type="password"
                    className="form-control"
                    value={form.confirmarPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Teléfono opcional */}
                <div className="mb-3">
                  <label className="form-label">Teléfono (opcional)</label>
                  <input
                    name="telefono"
                    type="text"
                    className="form-control"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="+56 9 1234 5678"
                  />
                </div>

                {/* Región y comuna */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Región</label>
                    <select
                      name="region"
                      className="form-select"
                      value={form.region}
                      onChange={handleChange}
                    >
                      <option value="">-- Seleccione la región --</option>
                      <option value="RM">Región Metropolitana</option>
                      <option value="Araucania">Región de La Araucanía</option>
                      <option value="Ñuble">Región de Ñuble</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Comuna</label>
                    <select
                      name="comuna"
                      className="form-select"
                      value={form.comuna}
                      onChange={handleChange}
                    >
                      <option value="">-- Seleccione la comuna --</option>
                      <option value="Linares">Linares</option>
                      <option value="Longaví">Longaví</option>
                      <option value="Concepción">Concepción</option>
                    </select>
                  </div>
                </div>

                {/* Botón registrar */}
                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-primary px-4">
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}