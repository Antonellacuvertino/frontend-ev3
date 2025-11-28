import React, { useState } from "react"; // // Importa React y el hook useState para manejar estados locales
import { useAuth } from "../context/AuthContext"; // // Importa el contexto de autenticación
import { useNavigate } from "react-router-dom"; // // Hook para redireccionar entre rutas
import "bootstrap/dist/css/bootstrap.min.css"; // // Importa los estilos de Bootstrap

// // Componente de inicio de sesión para el administrador
export default function Login() {
  const [form, setForm] = useState({ user: "", pass: "" }); // // Estado del formulario (usuario y contraseña)
  const [error, setError] = useState(""); // // Estado para manejar mensajes de error
  const { login } = useAuth(); // // Extrae la función login desde el contexto de autenticación
  const navigate = useNavigate(); // // Permite redirigir al panel si el login es exitoso

  // // Actualiza los campos del formulario a medida que el usuario escribe
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // // Maneja el envío del formulario de login
  const handleSubmit = (e) => {
    e.preventDefault(); // // Previene recargar la página
    const success = login(form.user, form.pass); // // Llama a la función login con los datos del formulario
    if (success) navigate("/admin"); // // Si las credenciales son correctas, redirige al panel admin
    else setError("Credenciales incorrectas (usa admin / 1234)"); // // Si son incorrectas, muestra mensaje de error
  };

  // // Renderiza la interfaz del formulario de acceso
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login Administrador 🐾</h3>
        {error && <div className="alert alert-danger">{error}</div>} {/* // Muestra el mensaje de error si existe */}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Usuario</label>
            <input
              type="text"
              name="user"
              className="form-control"
              onChange={handleChange} // // Actualiza el estado al escribir
              required
            />
          </div>
          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              name="pass"
              className="form-control"
              onChange={handleChange} // // Actualiza el estado al escribir
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100"> {/* // Botón para enviar el formulario */}
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

