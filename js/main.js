let snacks = [];
let energia = 50;
let concentracion = 50;
let bienestar = 50;

// Cargar snacks desde JSON
async function cargarSnacks() {
  const response = await fetch("snacks.json");
  snacks = await response.json();
  mostrarOpciones();
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

// Función para asignar color dinámico según valor
function colorBarra(valor) {
  if (valor >= 70) return "green";
  if (valor >= 40) return "orange";
  return "red";
}

// Actualizar barras de progreso
function actualizarImpacto() {
  const barraEnergia = document.getElementById("barraEnergia");
  const barraConcentracion = document.getElementById("barraConcentracion");
  const barraBienestar = document.getElementById("barraBienestar");

  barraEnergia.style.width = energia + "%";
  barraEnergia.style.backgroundColor = colorBarra(energia);

  barraConcentracion.style.width = concentracion + "%";
  barraConcentracion.style.backgroundColor = colorBarra(concentracion);

  barraBienestar.style.width = bienestar + "%";
  barraBienestar.style.backgroundColor = colorBarra(bienestar);
}

// Manejo del botón
document.getElementById("btnAgregar").addEventListener("click", () => {
  const snackElegido = document.getElementById("snack").value;
  const snackObj = snacks.find(s => s.nombre === snackElegido);

  // Crear elemento en la lista con imagen
  const li = document.createElement("li");
  li.innerHTML = `<img src="${snackObj.imagen}" alt="${snackObj.nombre}" class="imgSnack"> ${snackElegido}`;

  // Botón eliminar
  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.style.marginLeft = "10px";
  btnEliminar.onclick = () => {
    li.remove();
    Swal.fire({
      title: "Snack eliminado",
      text: `${snackElegido} fue quitado de tu lista.`,
      icon: "info",
      confirmButtonText: "OK"
    });
  };

  li.appendChild(btnEliminar);
  document.getElementById("listaSnacks").appendChild(li);

  // Impacto en indicadores (con límites 0–100)
  energia = Math.min(Math.max(energia + snackObj.energia, 0), 100);
  concentracion = Math.min(Math.max(concentracion + snackObj.concentracion, 0), 100);
  bienestar = Math.min(Math.max(bienestar + snackObj.bienestar, 0), 100);
  actualizarImpacto();

  // Comentarios automáticos
  const comentariosDiv = document.getElementById("comentarios");
  const comentario = document.createElement("p");
  comentario.textContent = snackObj.recomendacion
    ? `Has elegido ${snackElegido}. Recomendación: ${snackObj.recomendacion}`
    : `Has elegido ${snackElegido}. ¡Buena elección!`;
  comentariosDiv.appendChild(comentario);

  // SweetAlert
  Swal.fire({
    title: "Comida agregada",
    text: comentario.textContent,
    icon: snackObj.recomendacion ? "warning" : "success",
    confirmButtonText: "OK"
  });
});

// Inicializar
cargarSnacks();
actualizarImpacto();
