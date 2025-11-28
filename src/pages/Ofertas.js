import React from "react";
import ProductCard from "../components/ProductCard"; // // Importa el componente que muestra cada producto individual
import { obtenerRascadores } from "../data/rascadoresData"; // // Importa la función que retorna los productos (rascadores)

// // Página que muestra únicamente los productos en oferta
export default function Ofertas(){
  const productos = obtenerRascadores().filter(p => p.oferta); // // Filtra los productos para obtener solo los que tienen 'oferta' en true

  // // Renderiza el listado de productos en oferta usando ProductCard
  return (
    <div className="container mt-4">
      <h2>Ofertas</h2> {/* // Título principal */}
      <div className="row mt-3 g-3"> {/* // Grid de tarjetas de productos con espaciado */}
        {productos.map(p => ( // // Recorre los productos filtrados y genera una tarjeta por cada uno
          <ProductCard 
            key={p.id} // // Clave única requerida por React
            producto={p} // // Pasa el producto actual como prop
            onVerDetalle={() => {}} // // Prop vacía (sin acción de detalle en esta vista)
          />
        ))}
      </div>
    </div>
  );
}
