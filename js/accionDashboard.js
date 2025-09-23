document.addEventListener("DOMContentLoaded", () => {

    const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
    const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));


    function actualizarKPIs() {
        const productos = getData("productos");
        const usuarios = getData("usuarios");

        document.getElementById("kpi-productos").textContent = productos.length;
        document.getElementById("kpi-usuarios").textContent = usuarios.length;

        const stockBajo = productos.filter(p => p.stock <= 2).length;
        document.getElementById("kpi-stock-bajo").textContent = stockBajo;

        const ahora = new Date();
        const lastUpdateEl = document.getElementById("last-update");
        if (lastUpdateEl) lastUpdateEl.textContent = ahora.toLocaleTimeString();
    }


    function agregarActividad(icono, texto) {
        const activityList = document.querySelector(".activity-list");
        const div = document.createElement("div");
        div.classList.add("activity-item");
        div.innerHTML = `
            <span class="activity-icon">${icono}</span>
            <div class="activity-content">
                <p class="activity-text">${texto}</p>
                <span class="activity-time">Hace un momento</span>
            </div>
        `;
        activityList.prepend(div);
        actualizarContadorActividades();
    }


    function actualizarContadorActividades() {
        const total = document.querySelectorAll(".activity-item").length;
        document.getElementById("total-activities").textContent = total + " eventos";
    }

    document.getElementById("btn-ir-usuarios").addEventListener("click", () => {
        window.location.href = "Usuarios.html";
        });

    document.getElementById("btn-ir-productos").addEventListener("click", () => {
        window.location.href = "Productos.html";
        });

    document.getElementById("btn-ir-reponer").addEventListener("click", () => {
        window.location.href = "Productos.html"; // o a donde quieras que redirija
        });

    document.getElementById("btnVolver").addEventListener("click", (e) => {
        e.preventDefault();
        window.history.back();
    });



    actualizarKPIs();
    actualizarContadorActividades();
});
