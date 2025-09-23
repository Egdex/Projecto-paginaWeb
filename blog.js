document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("postForm");
  const postsContainer = document.getElementById("postsContainer");

  // cargar posts guardados
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  // renderizar posts en la pantalla
  function renderPosts() {
    postsContainer.innerHTML = "";
    posts.forEach((post, index) => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post-card");
      postDiv.innerHTML = `
        <h3>${post.titulo}</h3>
        <p>${post.contenido}</p>
        <small>${post.fecha}</small>
        <br>
        <button onclick="eliminarPost(${index})">Eliminar</button>
      `;
      postsContainer.appendChild(postDiv);
    });
  }

  // guardar un post nuevo
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const contenido = document.getElementById("contenido").value;

    const nuevoPost = {
      titulo,
      contenido,
      fecha: new Date().toLocaleString()
    };

    posts.push(nuevoPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    form.reset();
    renderPosts();
  });

  // eliminar un post
  window.eliminarPost = (index) => {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  };

  renderPosts();
});
