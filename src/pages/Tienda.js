import React, { useState } from "react"; // Manejo de estado local
import ProductCard from "../components/ProductCard"; // Tarjeta de producto reutilizable
import { obtenerRascadores } from "../data/rascadoresData"; // Fuente de datos (mock)
import ModalDetalle from "../components/ModalDetalle"; // Modal para ver detalle del producto

export default function Tienda(){
  const productos = obtenerRascadores(); // Lista completa de productos
  const [filtroCat, setFiltroCat] = useState("todos"); // Filtro por categoría
  const [busqueda, setBusqueda] = useState(""); // Texto de búsqueda por nombre
  const [productoDetalle, setProductoDetalle] = useState(null); // Producto seleccionado para el modal

  const categorias = ["todos", ...Array.from(new Set(productos.map(p=>p.categoria)))]; // Obtiene categorías únicas + "todos"

  // Aplica filtros: por categoría y por texto en el nombre
  const filtrar = productos.filter(p=>{
    const matchCat = filtroCat === "todos" ? true : p.categoria === filtroCat; // Coincidencia por categoría
    const matchText = p.nombre.toLowerCase().includes(busqueda.toLowerCase()); // Coincidencia por texto
    return matchCat && matchText; // Debe cumplir ambos
  });

  // Abre el modal con el producto seleccionado
  function handleVerDetalle(p){
    setProductoDetalle(p);
  }

  // UI de la tienda (filtros, buscador, grid de productos y modal de detalle)
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Tienda</h2>
        <div>
          <select className="form-select" value={filtroCat} onChange={e=>setFiltroCat(e.target.value)}>
            {categorias.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="row mt-3 g-3">
        <div className="col-12 col-md-4">
          <input className="form-control" placeholder="Buscar producto..." value={busqueda} onChange={e=>setBusqueda(e.target.value)} />
        </div>
      </div>

      <div className="row products-grid mt-4 g-3">
        {filtrar.map(p => (
          <ProductCard key={p.id} producto={p} onVerDetalle={handleVerDetalle} />
        ))}
      </div>

      {productoDetalle && <ModalDetalle producto={productoDetalle} onClose={() => setProductoDetalle(null)} />}
    </div>
  );
}
