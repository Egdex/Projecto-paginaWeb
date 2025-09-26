document.addEventListener("DOMContentLoaded", () => {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");
    const btnComprar = document.getElementById("btn-comprar");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function mostrarCarrito() {
        listaCarrito.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, index) => {
            const item = document.createElement("div");
            item.classList.add("carrito-item");

            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="info">
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio} CLP</p>
                </div>
                <button class="btn-eliminar">Eliminar</button>
            `;

            item.querySelector(".btn-eliminar").addEventListener("click", () => {
                carrito.splice(index, 1);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                mostrarCarrito();
            });

            listaCarrito.appendChild(item);
            total += producto.precio;
        });

        totalElemento.textContent = `Total a pagar: $${total} CLP`;
    }

    btnComprar.addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("😅 No hay nada en tu carrito… ¡agrega algo primero!");
        } else {
            alert("🎉 ¡Gracias por tu compra ficticia! Tus figuras llegarán cuando los chanchitos vuelen 🐷✈️");
        }
    });

    mostrarCarrito();
});
