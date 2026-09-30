document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor_tipos_magia");

  if (!contenedor) return;

  // Determina la clase CSS para el badge según la intensidad del efecto
  function obtenerClaseEfecto(efecto) {
    if (!efecto) return "efecto-variable";
    const texto = efecto.toLowerCase();
    
    if (texto.includes("severo") || texto.includes("alto") || texto.includes("mortal")) {
      return "efecto-severo";
    } else if (texto.includes("moderado") || texto.includes("medio")) {
      return "efecto-moderado";
    } else if (texto.includes("ligero") || texto.includes("bajo") || texto.includes("nulo")) {
      return "efecto-ligero";
    } else {
      return "efecto-variable";
    }
  }

  // Procesa caracteristicas ya sea un String largo o un Arreglo
  function procesarCaracteristicas(caracteristicas) {
    if (Array.isArray(caracteristicas)) {
      return `<ul class="lista-caracteristicas">
                ${caracteristicas.map(item => `<li>${item}</li>`).join("")}
              </ul>`;
    } else {
      return `<p>${caracteristicas}</p>`;
    }
  }

  function renderizarTiposDeMagia(listaMagias) {
    contenedor.innerHTML = "";

    listaMagias.forEach(magia => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta-magia-flip");

      tarjeta.style.setProperty("--color-marco", magia.colorMarco);
      tarjeta.style.setProperty("--color-fondo-reverso", magia.colorFondoReverso);

      const claseEfecto = obtenerClaseEfecto(magia.efectoCelestial);
      const htmlCaracteristicas = procesarCaracteristicas(magia.caracteristicas);

      tarjeta.innerHTML = `
        <div class="tarjeta-magia-inner">
          <!-- PARTE FRONTAL -->
          <div class="tarjeta-frente" style="background-image: url('${magia.imagenFondo}');">
            <div class="overlay-frente"></div>
            <h3 class="titulo-magia-frente">${magia.nombre}</h3>
          </div>

          <!-- PARTE TRASERA (INFORMACIÓN) -->
          <div class="tarjeta-dorso">
            <h3 class="titulo-magia-dorso">${magia.nombre}</h3>
            <span class="origen-tag">${magia.origenMundo}</span>
            
            <p class="descripcion-magia">${magia.descripcion}</p>

            <!-- PANEL CELESTIAL -->
            <div class="datos-celestiales">
              <div class="dato-celestial">
                <span class="label-celestial">Clasificación</span>
                <span class="valor-celestial">${magia.clasificacionCelestial}</span>
              </div>
              <div class="dato-celestial">
                <span class="label-celestial">Efecto Celestial</span>
                <span class="valor-celestial badge-efecto ${claseEfecto}">${magia.efectoCelestial}</span>
              </div>
            </div>

            <!-- DETALLE Y CARACTERÍSTICAS -->
            <div class="texto-caracteristicas">
              ${htmlCaracteristicas}
            </div>
          </div>
        </div>
      `;

      // Evento de giro al dar clic o tocar
      tarjeta.addEventListener("click", () => {
        tarjeta.classList.toggle("rotada");
      });

      contenedor.appendChild(tarjeta);
    });
  }

  renderizarTiposDeMagia(tiposDeMagiaData);
});