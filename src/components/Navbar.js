// src/components/Navbar.js
// Navbar responsive con botón hamburguesa controlado con React (sin Bootstrap JS)

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  // ✅ Estado para abrir/cerrar el menú en móvil
  const [isOpen, setIsOpen] = useState(false);

  // Total de ítems en el carrito
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <header className="shadow-sm sticky-top bg-white">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">

            {/* LOGO */}
            <Link className="navbar-brand fw-bold" to="/" onClick={() => setIsOpen(false)}>
              <img
                src="/img/logo.png"
                alt="cats-shop"
                style={{ height: "50px" }}
              />
            </Link>

            {/* BOTÓN HAMBURGUESA (solo se ve en pantallas pequeñas) */}
            <button
              className="navbar-toggler"
              type="button"
              aria-controls="navMenu"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* MENÚ (colapsable) */}
            <div
              id="navMenu"
              className={
                "collapse navbar-collapse justify-content-end" +
                (isOpen ? " show" : "")
              }
            >
              <ul className="navbar-nav align-items-center">

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/tienda"
                    onClick={() => setIsOpen(false)}
                  >
                    🛍️ Tienda
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/categorias"
                    onClick={() => setIsOpen(false)}
                  >
                    🐱 Categorías
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/ofertas"
                    onClick={() => setIsOpen(false)}
                  >
                    💸 Ofertas
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/admin-login"
                    onClick={() => setIsOpen(false)}
                  >
                    🔐 Admin
                  </Link>
                </li> 
                <li className="nav-item">
                <Link
                 className="nav-link"
                   to="/login"
                  onClick={() => setIsOpen(false)}
          >
                  Iniciar sesión
  </Link>
</li>

<li className="nav-item">
  <Link
    className="nav-link"
    to="/registro"
    onClick={() => setIsOpen(false)}
  >
    Registrarse
  </Link>
</li>


                {/* Carrito con contador */}
                <li className="nav-item position-relative">
                  <Link
                    className="nav-link"
                    to="/carrito"
                    onClick={() => setIsOpen(false)}
                  >
                    🛒
                    {totalItems > 0 && (
                      <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

