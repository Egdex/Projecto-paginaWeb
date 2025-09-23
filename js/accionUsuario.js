// --- Utilidades ---
function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


const comunasPorRegion = {
  "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
  "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
  "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
  "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
  "Valparaiso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María"],
  "Metropolitana": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
  "O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
  "Maule": ["Talca", "Curicó"],
  "Ñuble": ["Chillán", "San Carlos"],
  "Biobio": ["Concepción", "Los Ángeles"],
  "Araucanía": ["Temuco", "Villarrica"],
  "Los Ríos": ["Valdivia", "La Unión"],
  "Los Lagos": ["Puerto Montt", "Osorno"],
  "Aysén": ["Coyhaique", "Aysén"],
  "Magallanes": ["Punta Arenas", "Puerto Natales"]
};


const tablaUsuarios = document.querySelector("#tablaUsuarios tbody");
const modal = document.getElementById("modalUsuario");
const form = document.getElementById("formUsuario");
const cerrarModalBtn = document.getElementById("cerrarModalUsuario");
const btnAgregar = document.getElementById("btnAgregarUsuario");
const regionSelect = document.getElementById("comunaPorRegion");
const comunaSelect = document.getElementById("comunaUsuario");
const rolSelect = document.getElementById("rolUsuario");

let editIndex = null;

// --- Select dependiente Región → Comuna ---
regionSelect.addEventListener("change", () => {
  const region = regionSelect.value;
  comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
  if (region && comunasPorRegion[region]) {
    comunasPorRegion[region].forEach(comuna => {
      const option = document.createElement("option");
      option.value = comuna;
      option.textContent = comuna;
      comunaSelect.appendChild(option);
    });
  }
});

// --- Validaciones ---
function validarRUN(run) {
  return /^[0-9]{7,8}[0-9Kk]$/.test(run);
}

function validarCorreo(email) {
  return /^.+@(duocuc\.cl|profesor\.duocuc\.cl|gmail\.com)$/.test(email);
}

function validarUsuario(u) {
  if (!u.run || !validarRUN(u.run)) {
    alert("RUN inválido. Debe tener 7-9 caracteres y formato chileno (sin puntos ni guion).");
    return false;
  }
  if (!u.nombre || u.nombre.length > 50) {
    alert("Nombre obligatorio, máximo 50 caracteres.");
    return false;
  }
  if (!u.apellidos || u.apellidos.length > 100) {
    alert("Apellidos obligatorios, máximo 100 caracteres.");
    return false;
  }
  if (!u.correo || u.correo.length > 100 || !validarCorreo(u.correo)) {
    alert("Correo inválido. Debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com y máximo 100 caracteres.");
    return false;
  }
  if (!u.rol) {
    alert("Debe seleccionar un rol.");
    return false;
  }
  if (!u.region) {
    alert("Debe seleccionar una región.");
    return false;
  }
  if (!u.comuna) {
    alert("Debe seleccionar una comuna.");
    return false;
  }
  if (!u.direccion || u.direccion.length > 300) {
    alert("Dirección obligatoria, máximo 300 caracteres.");
    return false;
  }
  return true;
}


function renderUsuarios() {
  const usuarios = obtenerUsuarios();
  tablaUsuarios.innerHTML = "";
  usuarios.forEach((u, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${u.run}</td>
      <td>${u.nombre}</td>
      <td>${u.apellidos}</td>
      <td>${u.correo}</td>
      <td>${u.rol}</td>
      <td>${u.region}</td>
      <td>${u.comuna}</td>
      <td>${u.direccion}</td>
      <td>
        <button onclick="editarUsuario(${index})">✏️</button>
        <button onclick="eliminarUsuario(${index})">🗑️</button>
      </td>
    `;
    tablaUsuarios.appendChild(fila);
  });
}


form.addEventListener("submit", e => {
  e.preventDefault();
  const usuario = {
    run: document.getElementById("runUsuario").value.trim(),
    nombre: document.getElementById("nombreUsuario").value.trim(),
    apellidos: document.getElementById("apellidosUsuario").value.trim(),
    correo: document.getElementById("correoUsuario").value.trim(),
    rol: rolSelect.value,
    region: regionSelect.value,
    comuna: comunaSelect.value,
    direccion: document.getElementById("direccionUsuario").value.trim()
  };

  if (!validarUsuario(usuario)) return;

  const usuarios = obtenerUsuarios();
  if (editIndex !== null) {
    usuarios[editIndex] = usuario;
    editIndex = null;
  } else {
    usuarios.push(usuario);
  }

  guardarUsuarios(usuarios);
  renderUsuarios();
  modal.classList.add("hidden");
  form.reset();
});

window.editarUsuario = index => {
  const usuarios = obtenerUsuarios();
  const u = usuarios[index];
  document.getElementById("runUsuario").value = u.run;
  document.getElementById("nombreUsuario").value = u.nombre;
  document.getElementById("apellidosUsuario").value = u.apellidos;
  document.getElementById("correoUsuario").value = u.correo;
  rolSelect.value = u.rol;
  regionSelect.value = u.region;


  regionSelect.dispatchEvent(new Event("change"));
  comunaSelect.value = u.comuna;

  document.getElementById("direccionUsuario").value = u.direccion;

  editIndex = index;
  modal.classList.remove("hidden");
};

window.eliminarUsuario = index => {
  if (!confirm("¿Eliminar este usuario?")) return;
  const usuarios = obtenerUsuarios();
  usuarios.splice(index, 1);
  guardarUsuarios(usuarios);
  renderUsuarios();
};


btnAgregar.addEventListener("click", () => {
  form.reset();
  editIndex = null;
  modal.classList.remove("hidden");
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



document.addEventListener("DOMContentLoaded", renderUsuarios);
