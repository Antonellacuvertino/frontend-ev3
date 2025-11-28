import React from "react";
import { obtenerRascadores } from "../data/rascadoresData"; // // Importa función para obtener la lista de rascadores (datos)

export default function Categorias(){ // // Componente de página para listar categorías
  const productos = obtenerRascadores(); // // Trae todos los productos disponibles
  const categorias = Array.from(new Set(productos.map(p => p.categoria))); // // Extrae categorías únicas usando Set

  return ( // // Renderiza el listado de categorías con ejemplos de productos (máx. 3 imágenes por categoría)
    <div className="container mt-4">
      <h2>Categorías</h2>
      <div className="row mt-3 g-3">
        {categorias.map(cat => ( // // Recorre cada categoría única
          <div key={cat} className="col-12 col-md-4">
            <div className="card p-3">
              <h5 className="mb-2 text-capitalize">{cat}</h5>
              <div className="d-flex gap-2 flex-wrap">
                {productos.filter(p => p.categoria === cat).slice(0,3).map(p => ( // // Filtra productos por categoría y muestra solo 3
                  <div key={p.id} style={{width: '90px'}}>
                    <img src={p.imagen || "/img/placeholder.jpg"} alt={p.nombre} style={{width:'100%', height:70, objectFit:'cover', borderRadius:6}}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
