import React from "react";

// // Página que muestra el resumen de una compra exitosa
export default function Success() {
  const resumen = JSON.parse(localStorage.getItem("last_order") || "{}"); // // Obtiene los datos de la última orden desde localStorage

  return (
    <div className="container mt-4">
      <h2>Compra exitosa 🎉</h2>
      {resumen?.comprador ? ( // // Si existen datos de comprador, muestra el resumen
        <>
          <p>
            Gracias, {resumen.comprador.nombre}. Te enviamos un correo a{" "}
            {resumen.comprador.email}.
          </p>
          <h5 className="mt-3">Resumen</h5>
          <ul>
            {resumen.items?.map((it) => ( // // Recorre los productos comprados y los muestra en una lista
              <li key={it.id}>
                {it.nombre} x{it.cantidad} — ${ (it.precio * it.cantidad).toLocaleString() }
              </li>
            ))}
          </ul>
          <h4>Total: ${resumen.total?.toLocaleString()}</h4> {/* // Muestra el total formateado */}
          <p className="text-muted mt-2">
            {/* // Indica el tipo de entrega según el método elegido */}
            Entrega:{" "}
            {resumen.metodoEntrega === "envio"
              ? `${resumen.comprador.direccion}, ${resumen.comprador.comuna}`
              : "Retiro en tienda"}
          </p>
        </>
      ) : (
        <p>No hay datos de compra.</p> // // Si no hay datos, muestra mensaje alternativo
      )}
    </div>
  );
}
