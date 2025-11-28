// src/data/rascadoresData.js

// Declaramos un arreglo inicial con varios objetos que representan los rascadores
let rascadores = [
  { id:1, nombre:"Rascador Torre Deluxe", precio:49990, categoria:"torre", stock:5, oferta:true, imagen:"/img/torre1.jpg", descripcion:"Torre grande con plataforma y sisal." },
  { id:2, nombre:"Rascador de Pared Slim", precio:19990, categoria:"pared", stock:10, oferta:false, imagen:"/img/pared1.jpg", descripcion:"Ideal para espacios reducidos." },
  { id:3, nombre:"Rascador Alfombra Cozy", precio:12990, categoria:"alfombra", stock:8, oferta:false, imagen:"/img/rascador-3.jpg", descripcion:"Alfombra rascadora antideslizante." },
  { id:4, nombre:"Rascador Minimal Tree", precio:79990, categoria:"arbol", stock:3, oferta:true, imagen:"/img/rascador-4.jpg", descripcion:"Árbol moderno con hamaca y plataforma." }
];

// Función que devuelve el arreglo actual de rascadores
export const obtenerRascadores = () => rascadores;

// Función que agrega un nuevo rascador al arreglo
// Se genera un id único usando Date.now()
export const agregarRascador = (p) => { 
  p.id = Date.now(); 
  rascadores.push(p); 
};

// Función que actualiza un rascador existente
// Busca el rascador por id y reemplaza sus propiedades con las del "patch"
export const actualizarRascador = (id, patch) => { 
  rascadores = rascadores.map(x => x.id===id ? {...x, ...patch} : x); 
};

// Función que elimina un rascador según su id
export const eliminarRascador = (id) => { 
  rascadores = rascadores.filter(x => x.id !== id); 
};

// Exportamos el arreglo por defecto
export default rascadores;
