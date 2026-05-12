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

// Función auxiliar para elegir color según porcentaje
function colorSegunValor(valor) {
  if (valor >= 70) return "green";       // ✅ verde
  if (valor >= 50 && valor <= 69) return "yellow"; // ⚠️ amarillo
  if (valor <= 49) return "red";         // ❌ rojo
  return "yellow";                       // intermedio
}

// Actualizar barras y mostrar porcentaje afuera
function actualizarBarras() {
  const barraEnergia = document.getElementById("barraEnergia");
  const barraConcentracion = document.getElementById("barraConcentracion");
  const barraBienestar = document.getElementById("barraBienestar");

  barraEnergia.style.width = energia + "%";
  barraEnergia.style.backgroundColor = colorSegunValor(energia);
  document.getElementById("valorEnergia").textContent = energia + "%";

  barraConcentracion.style.width = concentracion + "%";
  barraConcentracion.style.backgroundColor = colorSegunValor(concentracion);
  document.getElementById("valorConcentracion").textContent = concentracion + "%";

  barraBienestar.style.width = bienestar + "%";
  barraBienestar.style.backgroundColor = colorSegunValor(bienestar);
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

    // Mostrar snack en lista con botón eliminar
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = elegido.imagen;
    img.className = "imgSnack";
    li.appendChild(img);
    li.appendChild(document.createTextNode(elegido.nombre + " "));

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "eliminar"; // estilo rojo
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.addEventListener("click", () => {
      // Revertir valores al eliminar
      energia -= elegido.energia;
      concentracion -= elegido.concentracion;
      bienestar -= elegido.bienestar;

      energia = Math.max(0, Math.min(100, energia));
      concentracion = Math.max(0, Math.min(100, concentracion));
      bienestar = Math.max(0, Math.min(100, bienestar));

      actualizarBarras();
      li.remove();
    });

    li.appendChild(btnEliminar);
    document.getElementById("listaSnacks").appendChild(li);

    // Actualizar barras
    actualizarBarras();

    // Mostrar recomendación si existe
    if (elegido.recomendacion && elegido.recomendacion.trim() !== "") {
      const comentarios = document.getElementById("comentarios");
      const pRec = document.createElement("p");
      pRec.textContent = elegido.recomendacion;
      comentarios.appendChild(pRec);
    }
  }
});

// Inicializar
cargarSnacks();

