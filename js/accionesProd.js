
function obtenerProductos() {
  return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}


const form = document.getElementById("formProducto");
const modal = document.getElementById("modalProducto");
const cerrarModalBtn = document.getElementById("cerrarModalProducto");
const tablaProductos = document.querySelector("#tablaProductos tbody");
const btnAgregarProducto = document.getElementById("btnAgregarProducto");

let editIndex = null; 

function validarProducto(prod) {
  if (!prod.id || prod.id.trim().length < 3) {
    alert("El código debe tener al menos 3 caracteres");
    return false;
  }
  if (!prod.nombre || prod.nombre.length > 100) {
    alert("El nombre es obligatorio y máximo 100 caracteres");
    return false;
  }
  if (prod.descripcion && prod.descripcion.length > 500) {
    alert("La descripción no puede superar 500 caracteres");
    return false;
  }
  if (isNaN(prod.precio) || prod.precio < 0) {
    alert("El precio debe ser un número mayor o igual a 0");
    return false;
  }
  if (!Number.isInteger(prod.stock) || prod.stock < 0) {
    alert("El stock debe ser un número entero mayor o igual a 0");
    return false;
  }
  return true;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  

  const producto = {
    id: document.getElementById("idProducto").value.trim(),
    nombre: document.getElementById("nombreProducto").value.trim(),
    descripcion: document.getElementById("descripcionProducto").value.trim(),
    precio: parseInt(document.getElementById("precioProducto").value),
    stock: parseInt(document.getElementById("stockProducto").value)
  };

  if (!validarProducto(producto)) return;

  let productos = obtenerProductos();

  if (editIndex !== null) {
    productos[editIndex] = producto;
    editIndex = null;
  } else {
    productos.push(producto); 
  }

  guardarProductos(productos);
  renderProductos();
  modal.classList.add("hidden");
  form.reset();
});


function renderProductos() {
  const productos = obtenerProductos();

  tablaProductos.innerHTML = "";

  productos.forEach((prod, index) => {
    const fila = document.createElement("tr");
    const stockClass = prod.stock < 5 ? 'style="color:red; font-weight:bold;"' : "";

    fila.innerHTML = `
      <td>${prod.id}</td>
      <td>${prod.nombre}</td>
      <td>${prod.descripcion}</td>
      <td>${prod.precio}</td>
      <td ${stockClass}>${prod.stock}</td>
      <td>
        <button onclick="editarProducto(${index})">✏️</button>
        <button onclick="eliminarProducto(${index})">🗑️</button>
      </td>
    `;
    tablaProductos.appendChild(fila);
  });
}


window.editarProducto = (index) => {
  const productos = obtenerProductos();
  const prod = productos[index];

  document.getElementById("idProducto").value = prod.id;
  document.getElementById("nombreProducto").value = prod.nombre;
  document.getElementById("descripcionProducto").value = prod.descripcion;
  document.getElementById("precioProducto").value = prod.precio;
  document.getElementById("stockProducto").value = prod.stock;

  editIndex = index;
  modal.classList.remove("hidden");
};


window.eliminarProducto = (index) => {
  if (!confirm("¿Eliminar este producto?")) return;
  let productos = obtenerProductos();
  productos.splice(index, 1);
  guardarProductos(productos);
  renderProductos();
};


btnAgregarProducto.addEventListener("click", () => {
  modal.classList.remove("hidden");
  form.reset();
  editIndex = null;
});


cerrarModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  form.reset();
  editIndex = null;
});

document.getElementById("btnVolver").addEventListener("click", (e) => {
  e.preventDefault(); 
  window.history.back();
});


document.addEventListener("DOMContentLoaded", renderProductos);
