import React from "react";
import { useCart } from "../context/CartContext"; // ✅ importamos el contexto

export default function ProductCard({ producto, onVerDetalle }) {
  const { addToCart } = useCart(); // ✅ usamos la función global addToCart

  return (
    <div className="product-card col-12 col-sm-6 col-md-4">
      <div className="card h-100">
        <div className="position-relative img-wrap">
          {producto.oferta && (
            <span className="badge bg-danger badge-oferta">OFERTA</span>
          )}
          <img
            src={producto.imagen || "/img/placeholder.jpg"}
            alt={producto.nombre}
            className="product-image"
            onClick={() => onVerDetalle(producto)}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-1">{producto.nombre}</h5>
          <p className="text-muted mb-2" style={{ fontSize: ".95rem" }}>
            {producto.categoria}
          </p>
          <div className="mt-auto d-flex justify-content-between align-items-center">
            <strong>${producto.precio.toLocaleString()}</strong>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => addToCart(producto)} // ✅ agrega producto al carrito
            >
              🛒 Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

