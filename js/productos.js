const productos = [
    { id: 1, nombre: "Kirbi Nube", descripcion: "Kirbi flotando en una nube, ideal como decoración o regalo.", precio: 15000, imagen: "imagenes/Productos/Kirbi-Nube.png" },
    { id: 2, nombre: "Sirena Nocturna", descripcion: "Sirena misteriosa con tonos oscuros, hecha a mano en porcelana fría.", precio: 17000, imagen: "imagenes/Productos/Sirena-Nocturna.png" },
    { id: 3, nombre: "Sirena Azul", descripcion: "Sirena con cabello azul brillante, perfecta para decorar tu estantería.", precio: 17000, imagen: "imagenes/Productos/Sirena-Azul.png" },
    { id: 4, nombre: "Unicornio Mágico", descripcion: "Unicornio con colores mágicos, hecho a mano y muy detallado.", precio: 20000, imagen: "imagenes/Productos/Unicornio-Magico.png" },
    { id: 5, nombre: "Gatos Elegantes", descripcion: "Gatos con trajes adorables, perfectos para regalar.", precio: 12000, imagen: "imagenes/Productos/Gatos-Elegantes.png" },
    { id: 6, nombre: "Cachorros en Caja", descripcion: "Perritos en una caja, hechos a mano y muy tiernos.", precio: 14000, imagen: "imagenes/Productos/Cachorros-en-caja.png" },
    { id: 7, nombre: "Metal Knait", descripcion: "El enemigo de Kirbi, figura detallada en porcelana fría.", precio: 18000, imagen: "imagenes/Productos/Metal-Knait.png" },
    { id: 8, nombre: "Kirbi Navideño", descripcion: "Kirbi en versión navideña, perfecto para decorar en diciembre.", precio: 16000, imagen: "imagenes/Productos/Kirbi-Navideño.png" },
    { id: 9, nombre: "Pokemones Navideños", descripcion: "Adornos navideños con tus pokemones favoritos, hechos a mano.", precio: 16000, imagen: "imagenes/Productos/Pokemones-Navideños.png" }
];

// Renderizar productos
const contenedor = document.getElementById("lista-productos");

productos.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p class="precio">$${p.precio.toLocaleString()} CLP</p>
        <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
    `;

    contenedor.appendChild(div);
});

// Función para carrito
function agregarAlCarrito(id) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = productos.find(p => p.id === id);

    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} fue agregado al carrito 🛒`);
}
