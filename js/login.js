document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Leer usuarios desde el JSON
      const response = await fetch("usuarios.json");
      if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");

      const usuarios = await response.json();

      // Buscar usuario
      const user = usuarios.find(u => u.email === email && u.password === password);

      if (user) {
        // Guardar usuario logueado en localStorage
        const userData = { email: user.email };
        localStorage.setItem("usuarioLogueado", JSON.stringify(userData));

        alert("Inicio de sesión exitoso ✅");
        window.location.href = "Pag.html"; // redirige al inicio
      } else {
        alert("Correo o contraseña incorrectos ❌");
      }
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      alert("Hubo un problema con el login 🚨");
    }
  });
});