import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ModalDetalle from "../components/ModalDetalle";

const API_BASE = "https://backend-ev3.onrender.com";

export default function Tienda() {
  const [productos, setProductos] = useState([]);
  const [filtroCat, setFiltroCat] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar productos desde el backend al montar el componente
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);

        // **LÍNEA CLAVE AJUSTADA:** Usamos la URL codificada + /api/productos
        const API_URL = `${API_BASE}/api/productos`;

        console.log("Intentando conectar a:", API_URL); // Útil para depuración

        const res = await axios.get(API_URL);

        setProductos(res.data);
        setLoading(false);
      } catch (e) {
        console.error("Error al cargar productos:", e);
        // Si la conexión falla (CORS, 404, etc.), este error se muestra.
        setError("No se pudieron cargar los productos desde el servidor. Revisa la consola para más detalles.");
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // categorías dinámicas desde los productos
  // Se usa un fallback 'otros' para productos sin categoría
  const categorias = ["todos", ...Array.from(new Set(productos.map(p => p.categoria || "otros")))];

  // Filtro por categoría + texto
  const filtrar = productos.filter(p => {
    const matchCat = filtroCat === "todos" ? true : p.categoria === filtroCat;
    // Asegura que p.nombre no sea null antes de llamar toLowerCase()
    const matchText = (p.nombre || "").toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchText;
  });

  function handleVerDetalle(p) {
    setProductoDetalle(p);
  }

  if (loading) {
    return <div className="container mt-4">Cargando productos...</div>;
  }

  // Si hay error, y no hay productos que mostrar
  if (error) {
    return <div className="container mt-4 text-danger">{error}</div>;
  }

  // Si no hay error, pero la lista de productos está vacía
  if (productos.length === 0 && !loading) {
     return <div className="container mt-4 text-warning">No se encontraron productos.</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Tienda</h2>
        <div>
          <select
            className="form-select"
            value={filtroCat}
            onChange={e => setFiltroCat(e.target.value)}
          >
            {categorias.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mt-3 g-3">
        <div className="col-12 col-md-4">
          <input
            className="form-control"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div className="row products-grid mt-4 g-3">
        {filtrar.map(p => (
          <ProductCard
            key={p.id}
            producto={p}
            onVerDetalle={handleVerDetalle}
          />
        ))}
      </div>

      {productoDetalle && (
        <ModalDetalle
          producto={productoDetalle}
          onClose={() => setProductoDetalle(null)}
        />
      )}
    </div>
  );
}