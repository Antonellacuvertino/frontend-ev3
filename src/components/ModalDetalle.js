// Importamos React y el hook useEffect desde la librería 'react'
import React, { useEffect } from "react";

// Definimos un componente funcional llamado ModalDetalle
// Recibe dos props:
//  - producto: contiene los datos del producto que se mostrará en el modal
//  - onClose: es una función que se ejecuta cuando el modal se cierra
export default function ModalDetalle({ producto, onClose }) {

  // useEffect se ejecuta cada vez que cambian las dependencias [producto, onClose]
  // Sirve para inicializar el modal de Bootstrap cuando se monta el componente
  useEffect(() => {
    // Creamos una instancia del modal de Bootstrap usando su ID en el DOM
    const modal = new window.bootstrap.Modal(document.getElementById('modalDetalle'));
    
    // Mostramos el modal inmediatamente después de crearlo
    modal.show();

    // Guardamos la referencia al elemento del modal
    const el = document.getElementById('modalDetalle');

    // Agregamos un evento para detectar cuando el modal se oculta
    // 'hidden.bs.modal' es el evento nativo de Bootstrap al cerrar el modal
    // { once: true } asegura que el evento se ejecute solo una vez
    el.addEventListener('hidden.bs.modal', onClose, { once: true });

    // Retornamos una función de limpieza (cleanup) que se ejecuta al desmontar el componente
    // Esto previene errores o comportamientos inesperados
    return () => {
      // Eliminamos el listener del evento
      el.removeEventListener('hidden.bs.modal', onClose);
      // Cerramos el modal si sigue abierto
      modal.hide();
    };
  }, [producto, onClose]); // Dependencias: si cambian, el efecto se vuelve a ejecutar

  // Si no existe el producto, no renderizamos nada (evitamos errores de acceso a datos nulos)
  if (!producto) return null;

  // JSX que representa la estructura del modal
  return (
    <div className="modal fade" id="modalDetalle" tabIndex="-1" aria-hidden="true">
      {/* Contenedor principal del modal, centrado verticalmente y de tamaño grande */}
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          {/* Cuerpo del modal sin padding adicional */}
          <div className="modal-body p-0">
            <div className="row g-0">
              {/* Columna izquierda con la imagen del producto */}
              <div className="col-md-6">
                <div style={{ overflow: 'hidden' }}>
                  {/* Imagen del producto o una imagen por defecto si no tiene */}
                  <img 
                    src={producto.imagen || "/img/placeholder.jpg"} 
                    alt={producto.nombre} 
                    className="w-100" 
                    style={{ objectFit: 'cover', height: '100%' }} 
                  />
                </div>
              </div>

              {/* Columna derecha con la información del producto */}
              <div className="col-md-6 p-4">
                {/* Nombre del producto */}
                <h4>{producto.nombre}</h4>
                {/* Categoría del producto, mostrada con estilo atenuado */}
                <p className="text-muted">{producto.categoria}</p>
                {/* Precio del producto con formato local (separadores de miles) */}
                <p><strong>${producto.precio.toLocaleString()}</strong></p>
                {/* Descripción o texto por defecto si no hay */}
                <p>{producto.descripcion || 'Rascador premium de alta calidad.'}</p>

                {/* Botones del modal */}
                <div className="d-flex gap-2">
                  {/* Botón para agregar al carrito (sin funcionalidad en este código) */}
                  <button className="btn btn-primary">Agregar al carrito</button>
                  
                  {/* Botón para cerrar el modal, usa el atributo de Bootstrap */}
                  <button className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
