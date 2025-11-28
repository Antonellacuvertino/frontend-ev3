
import React from "react";

export default function Footer(){
  return (
    <footer className="footer bg-white">
      <div className="container text-center">
        <p className="mb-1">© {new Date().getFullYear()} cats-shop. Todos los derechos reservados.</p>
        <small className="text-muted">instagram: @michidos__</small>
      </div>
    </footer>
  );
}
