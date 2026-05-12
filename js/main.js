let snacks = [];
let energia = 50;
let concentracion = 50;
let bienestar = 50;

async function cargarSnacks() {
  const response = await fetch("snacks.json");
  snacks = await response.json();
  mostrarOpciones();
  actualizarBarras();
}

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

function colorSegunValor(valor) {
  if (valor >= 70) return "green";
  if (valor >= 50 && valor <= 60) return "yellow";
  if (valor <= 40) return "red";
  return "yellow"; // todo lo demás también amarillo
}

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

document.getElementById("btnAgregar").addEventListener("click", () => {
  const select = document.getElementById("snack");
  const elegido = snacks.find(s => s.nombre === select.value);

  if (elegido) {
    energia += elegido.energia;
    concentracion += elegido.concentracion;
    bienestar += elegido.bienestar;

    energia = Math.max(0, Math.min(100, energia));
    concentracion = Math.max(0, Math.min(100, concentracion));
    bienestar = Math.max(0, Math.min(100, bienestar));

    // Crear item en lista
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = elegido.imagen;
    img.className = "imgSnack";
    li.appendChild(img);
    li.appendChild(document.createTextNode(elegido.nombre + " "));

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "eliminar";
    btnEliminar.style.marginLeft = "10px";

    // Crear recomendación en comentarios y guardarla en el li
    let pRec = null;
    if (elegido.recomendacion && elegido.recomendacion.trim() !== "") {
      const comentarios = document.getElementById("comentarios");
      pRec = document.createElement("p");
      pRec.textContent = elegido.recomendacion;
      comentarios.appendChild(pRec);
      li.recomendacionElemento = pRec; // 👈 guardamos referencia
    }

    btnEliminar.addEventListener("click", () => {
      energia -= elegido.energia;
      concentracion -= elegido.concentracion;
      bienestar -= elegido.bienestar;

      energia = Math.max(0, Math.min(100, energia));
      concentracion = Math.max(0, Math.min(100, concentracion));
      bienestar = Math.max(0, Math.min(100, bienestar));

      actualizarBarras();
      li.remove();

      // Eliminar recomendación asociada
      if (li.recomendacionElemento) {
        li.recomendacionElemento.remove();
      }
    });

    li.appendChild(btnEliminar);
    document.getElementById("listaSnacks").appendChild(li);

    actualizarBarras();
  }
});

cargarSnacks();
