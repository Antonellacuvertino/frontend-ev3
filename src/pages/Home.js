import React from "react";
import { Link } from "react-router-dom"; // // Importa componente Link para navegar entre páginas sin recargar

// // Componente principal de la página de inicio
export default function Home(){
  return (
    <main> {/* // Estructura principal de la página */}
      <section className="hero"> {/* // Sección destacada o "hero" */}
        <div className="container"> {/* // Contenedor centrado con márgenes */}
          <h1>Rascadores para tu michit@</h1> {/* // Título principal */}
          <p>
            Diseños elegantes, materiales duraderos y comodidad superior.
            Encuentra el rascador perfecto para tu peludo.
          </p> {/* // Descripción o texto introductorio */}

          {/* // Imagen de portada con estilos */}
          <img 
            src="/img/gato-portada.jpg" 
            alt="gato" 
            style={{width: 420, borderRadius: 12}} 
            className="my-4" 
          />

          {/* // Botones de navegación principales */}
          <div className="center-cta">
            <Link to="/tienda" className="btn btn-warning btn-lg">🛒 Explorar la tienda</Link> {/* // Enlace a la tienda */}
            <Link to="/ofertas" className="btn btn-outline-secondary btn-lg">Ver ofertas</Link> {/* // Enlace a las ofertas */}
          </div>
        </div>
      </section>
    </main>
  );
}
