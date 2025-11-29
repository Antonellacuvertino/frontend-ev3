// src/pages/RegistroUsuario.js
import React, { useState } from "react";
import axios from "axios"; // Importar AXIOS
// import { useNavigate } from "react-router-dom"; // Si necesitas redirigir después del registro

// URL base de la API (Tomada de Vercel/Render)
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8081";

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
  // const navigate = useNavigate();

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

    const API_URL = `${API_BASE}/api/registro`; // Reemplaza /api/registro con tu ruta real

    try {
      // ⚠️ Solo envía los campos que tu backend espera
      const res = await axios.post(API_URL, {
        nombre: form.nombre,
        correo: form.correo,
        password: form.password,
        telefono: form.telefono,
        region: form.region,
        comuna: form.comuna,
      });

      // El registro fue exitoso
      setSuccess("¡Registro exitoso! Ya puedes iniciar sesión.");
      // Limpiar formulario
      setForm({ /* ... (mantener los campos vacíos) */ }); 
      // navigate("/login"); // Redirigir a la página de login
      
    } catch (e) {
      console.error("Fallo el registro:", e);
      // Asume que 409 es un conflicto (usuario ya existe)
      if (e.response && e.response.status === 409) {
         setError("El correo electrónico ya se encuentra registrado.");
      } else {
         setError("Error al registrar el usuario. Revisa la conexión/logs.");
      }
    }
  };

  return (
    <div className="container py-4">
      {/* ... (código del logo) ... */}
      
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
                {/* ... (todos los campos del formulario con el onChange={handleChange} y required) ... */}
                
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
                
                {/* Confirmar correo (puedes eliminar este campo si no es esencial, ya que el backend usa el primero) */}
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

                {/* Región y comuna (mantener la lógica original) */}
                <div className="row">
                  {/* ... (código original de región y comuna) ... */}
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