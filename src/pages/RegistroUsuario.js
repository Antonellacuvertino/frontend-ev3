
import React, { useState } from "react";

export default function RegistroUsuario() {
  // Estado del formulario (inputs controlados)
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

  // Maneja cambios en cualquier input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Envío del formulario (por ahora simulado)
  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 Aquí podrías poner validaciones básicas (correos iguales, etc.)
    // Por ahora lo dejamos suave para la defensa.

    // 1) Leer usuarios existentes desde localStorage
    const stored = localStorage.getItem("cats-users");
    const usuarios = stored ? JSON.parse(stored) : [];

    // 2) Crear objeto usuario nuevo (sin password real, solo demo)
    const nuevoUsuario = {
      id: Date.now(),        // ID simple
      nombre: form.nombre,
      correo: form.correo,
      telefono: form.telefono,
      region: form.region,
      comuna: form.comuna,
      // Nota para la defensa: las contraseñas NO se deberían guardar planas.
    };

    // 3) Guardar en localStorage
    const actualizados = [...usuarios, nuevoUsuario];
    localStorage.setItem("cats-users", JSON.stringify(actualizados));

    alert("Usuario registrado (simulado). Ahora aparece en el panel de administración.");

    // 4) Limpiar formulario
    setForm({
      nombre: "",
      correo: "",
      confirmarCorreo: "",
      password: "",
      confirmarPassword: "",
      telefono: "",
      region: "",
      comuna: "",
    });
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

      {/* Card central de registro */}
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Registro de usuario</h5>
            </div>

            <div className="card-body">
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
