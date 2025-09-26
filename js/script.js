
// Detectar si estamos en la página de inicio
if (window.location.pathname.includes("Pag.html")) {
    // Buscar el botón con id="btn-inicio"
    const btnInicio = document.getElementById("btn-inicio");

    // Agregarle un "escuchador" de clic
    btnInicio.addEventListener("click", function (e) {
        e.preventDefault(); // evita que el link recargue la página
        alert("Ya estás en la página de inicio 👀");
    });
}
// Detectar si estamos en la página de productos
if (window.location.pathname.includes("productos.html")) {

    // Buscar el botón con id="btn-X
    const btnInicio = document.getElementById("btn-productos");

    // Agregarle un "escuchador" de clic
    btnInicio.addEventListener("click", function (e) {
        e.preventDefault(); // evita que el link recargue la página
        alert("Ya estas en la pagina de productos 👀");
    });
}

//Función para mostrar u ocultar el botón según si hay usuario logueado
function actualizarBotones() {
  const btnLogout = document.getElementById("btn-logout");
  const userData = localStorage.getItem("usuarioLogueado");

  if (!btnLogout) return; // si no existe, salir

  if (userData) {
    btnLogout.style.display = "inline-block"; // mostrar
  } else {
    btnLogout.style.display = "none"; // ocultar
  }
}

// Llamar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  actualizarBotones();

  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();

      localStorage.removeItem("usuarioLogueado"); // borra sesión
      alert("Has cerrado sesión 😎");

      actualizarBotones(); // actualiza botones
      window.location.href = "login.html"; // redirige
    });
  }
});


