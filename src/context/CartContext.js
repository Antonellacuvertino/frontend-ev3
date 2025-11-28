// ✅ Este archivo define el contexto global del carrito de compras
//    Se usa useContext para compartir el estado del carrito en toda la app
//    Además, guarda los datos en localStorage para que no se pierdan al recargar

import React, { createContext, useContext, useState, useEffect } from "react";

// Creamos el contexto
const CartContext = createContext();

// Hook para poder usar el contexto fácilmente en otros componentes
export const useCart = () => useContext(CartContext);

// Proveedor que envuelve toda la app (en App.js)
export const CartProvider = ({ children }) => {
  // Estado principal del carrito
  const [cart, setCart] = useState([]);

  // ✅ Al cargar la página, recupera el carrito guardado en localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // ✅ Cada vez que cambie el carrito, se guarda automáticamente en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔹 Agregar producto al carrito
  const addToCart = (producto) => {
    const exist = cart.find((item) => item.id === producto.id);
    if (exist) {
      // Si ya existe, aumenta la cantidad
      setCart(
        cart.map((item) =>
          item.id === producto.id
            ? { ...exist, cantidad: exist.cantidad + 1 }
            : item
        )
      );
    } else {
      // Si no existe, se agrega nuevo
      setCart([...cart, { ...producto, cantidad: 1 }]);
    }
  };

  // 🔹 Eliminar producto del carrito
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // 🔹 Vaciar carrito
  const clearCart = () => {
    setCart([]);
  };

  // 🔹 Calcular total
  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  // 🔹 Valor compartido globalmente
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};
