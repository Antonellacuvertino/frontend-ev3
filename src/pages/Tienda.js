
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ModalDetalle from "../components/ModalDetalle";

// URL base de la API (Solo la base URL del dominio)
// Si está en .env.local: https://backend-ev3.onrender.com
// Si no, usa el localhost:8081
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8081";

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

        // **LÍNEA CLAVE AJUSTADA:** Agregamos "/api/productos"
        const API_URL = `${API_BASE}/api/productos`;

        console.log("Intentando conectar a:", API_URL); // Útil para depuración

        const res = await axios.get(API_URL);

        setProductos(res.data);
        setLoading(false);
      } catch (e) {
        console.error("Error al cargar productos:", e);
        setError("No se pudieron cargar los productos desde el servidor. Revisa la consola para más detalles.");
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // categorías dinámicas desde los productos
  const categorias = ["todos", ...Array.from(new Set(productos.map(p => p.categoria || "otros")))];

  // Filtro por categoría + texto
  const filtrar = productos.filter(p => {
    const matchCat = filtroCat === "todos" ? true : p.categoria === filtroCat;
    const matchText = (p.nombre || "").toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchText;
  });

  function handleVerDetalle(p) {
    setProductoDetalle(p);
  }

  if (loading) {
    return <div className="container mt-4">Cargando productos...</div>;
  }

  if (error) {
    return <div className="container mt-4 text-danger">{error}</div>;
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