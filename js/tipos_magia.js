document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor_tipos_magia");

  if (!contenedor) return;

  function renderizarTiposDeMagia(listaMagias) {
    contenedor.innerHTML = "";

    listaMagias.forEach(magia => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta-magia-flip");

      // Pasamos los colores mediante variables CSS personalizadas
      tarjeta.style.setProperty("--color-marco", magia.colorMarco);
      tarjeta.style.setProperty("--color-fondo-reverso", magia.colorFondoReverso);

      tarjeta.innerHTML = `
        <div class="tarjeta-magia-inner">
          <!-- PARTE FRONTAL -->
          <div class="tarjeta-frente" style="background-image: url('${magia.imagenFondo}');">
            <div class="overlay-frente"></div>
            <h3 class="titulo-magia-frente">${magia.nombre}</h3>
          </div>

          <!-- PARTE TRASERA (INFORMACIÓN) -->
          <div class="tarjeta-dorso">
            <h3>${magia.nombre}</h3>
            <span class="origen-tag">${magia.origenMundo}</span>
            <p>${magia.descripcion}</p>
            <ul class="lista-caracteristicas">
              ${magia.caracteristicas.map(item => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </div>
      `;

      // Evento para girar al tocar / dar clic
      tarjeta.addEventListener("click", () => {
        tarjeta.classList.toggle("rotada");
      });

      contenedor.appendChild(tarjeta);
    });
  }

  renderizarTiposDeMagia(tiposDeMagiaData);
});