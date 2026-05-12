let snacks = [];
let energia = 50;
let concentracion = 50;
let bienestar = 50;

// Cargar snacks desde JSON
async function cargarSnacks() {
  const response = await fetch("snacks.json");
  snacks = await response.json();
  mostrarOpciones();
  actualizarBarras();
}

// Mostrar opciones en el select
function mostrarOpciones() {
  const select = document.getElementById("snack");
  select.innerHTML = "";
  snacks.forEach(s => {
    const option = document.createElement("option");
    option.value = s.nombre;
    option.textContent = s.nombre;
    select.appendChild(option);
  });
}

// Actualizar barras y mostrar porcentaje afuera
function actualizarBarras() {
  const barraEnergia = document.getElementById("barraEnergia");
  const barraConcentracion = document.getElementById("barraConcentracion");
  const barraBienestar = document.getElementById("barraBienestar");

  barraEnergia.style.width = energia + "%";
  document.getElementById("valorEnergia").textContent = energia + "%";

  barraConcentracion.style.width = concentracion + "%";
  document.getElementById("valorConcentracion").textContent = concentracion + "%";

  barraBienestar.style.width = bienestar + "%";
  document.getElementById("valorBienestar").textContent = bienestar + "%";
}

// Evento para agregar snack
document.getElementById("btnAgregar").addEventListener("click", () => {
  const select = document.getElementById("snack");
  const elegido = snacks.find(s => s.nombre === select.value);

  if (elegido) {
    // Actualizar valores
    energia += elegido.energia;
    concentracion += elegido.concentracion;
    bienestar += elegido.bienestar;

    // Limitar entre 0 y 100
    energia = Math.max(0, Math.min(100, energia));
    concentracion = Math.max(0, Math.min(100, concentracion));
    bienestar = Math.max(0, Math.min(100, bienestar));

    // Mostrar snack en lista
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = elegido.imagen;
    img.className = "imgSnack";
    li.appendChild(img);
    li.appendChild(document.createTextNode(elegido.nombre));
    document.getElementById("listaSnacks").appendChild(li);

    // Actualizar barras
    actualizarBarras();

    // Mostrar recomendación si existe
    if (elegido.recomendacion) {
      const comentarios = document.getElementById("comentarios");
      const p = document.createElement("p");
      p.textContent = elegido.recomendacion;
      comentarios.appendChild(p);
    }
  }
});

function actualizarBarras() {
  const barraEnergia = document.getElementById("barraEnergia");
  const barraConcentracion = document.getElementById("barraConcentracion");
  const barraBienestar = document.getElementById("barraBienestar");

  barraEnergia.style.width = energia + "%";
  barraEnergia.style.backgroundColor = "#ff9800"; // naranja
  document.getElementById("valorEnergia").textContent = energia + "%";

  barraConcentracion.style.width = concentracion + "%";
  barraConcentracion.style.backgroundColor = "#2196f3"; // azul
  document.getElementById("valorConcentracion").textContent = concentracion + "%";

  barraBienestar.style.width = bienestar + "%";
  barraBienestar.style.backgroundColor = "#4caf50"; // verde
  document.getElementById("valorBienestar").textContent = bienestar + "%";
}


// Inicializar
cargarSnacks();
