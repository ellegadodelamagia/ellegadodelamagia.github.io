/* =====================================================================
   SECCIÓN: TIPOS DE MAGIA (tarjetas flip)
   Requiere que exista antes la variable tiposDeMagiaData (tu data).
   Estructura:
     1. Arranque y búsqueda del contenedor
     2. Función: clase CSS del badge de efecto
     3. Función: procesar características (texto o lista)
     4. Función: crear y dibujar las tarjetas
     5. Ejecución
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------------------
     1. ARRANQUE Y BÚSQUEDA DEL CONTENEDOR
     El id debe coincidir con el de tu HTML: contenedor_tipos_magia
     ------------------------------------------------------------------- */
  const contenedor = document.getElementById("contenedor_tipos_magia");
  if (!contenedor) return;


  /* -------------------------------------------------------------------
     2. CLASE CSS DEL BADGE SEGÚN EL EFECTO CELESTIAL
     Revisa el texto de efectoCelestial y devuelve la clase de color.
     PERSONALIZABLE: agrega o quita palabras de cada lista.
     OJO: usa "includes", así que "medio" también detecta "intermedio".
     ------------------------------------------------------------------- */
  function obtenerClaseEfecto(efecto) {
    if (!efecto) return "efecto-variable";
    const texto = efecto.toLowerCase();

    // PERSONALIZABLE: palabras que cuentan como efecto severo (rojo)
    if (texto.includes("severo") || texto.includes("alto") || texto.includes("mortal")) {
      return "efecto-severo";

    // PERSONALIZABLE: palabras que cuentan como efecto moderado (amarillo)
    } else if (texto.includes("moderado") || texto.includes("medio")) {
      return "efecto-moderado";

    // PERSONALIZABLE: palabras que cuentan como efecto ligero (verde azulado)
    } else if (texto.includes("ligero") || texto.includes("bajo") || texto.includes("nulo")) {
      return "efecto-ligero";

    // Todo lo demás (variable, ninguno, etc.) sale morado
    } else {
      return "efecto-variable";
    }
  }


  /* -------------------------------------------------------------------
     3. PROCESAR CARACTERÍSTICAS
     Acepta un texto largo o un arreglo de frases:
       caracteristicas: "Texto largo..."        -> un párrafo
       caracteristicas: ["Frase 1", "Frase 2"]  -> lista con viñetas
     ------------------------------------------------------------------- */
  function procesarCaracteristicas(caracteristicas) {
    if (Array.isArray(caracteristicas)) {
      return `<ul class="lista-caracteristicas">
                ${caracteristicas.map(item => `<li>${item}</li>`).join("")}
              </ul>`;
    } else {
      return `<p>${caracteristicas}</p>`;
    }
  }


  /* -------------------------------------------------------------------
     4. CREAR Y DIBUJAR LAS TARJETAS
     Campos que lee de cada elemento de tu data:
       nombre, origenMundo, descripcion, clasificacionCelestial,
       efectoCelestial, caracteristicas, imagenFondo,
       colorMarco, colorFondoReverso
     ------------------------------------------------------------------- */
  function renderizarTiposDeMagia(listaMagias) {
    contenedor.innerHTML = "";

    listaMagias.forEach(magia => {

      // --- 4a. Tarjeta exterior y colores personalizados ---
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta-magia-flip");

      // Estos dos colores los usa el CSS (marco, brillo y nebulosa)
      tarjeta.style.setProperty("--color-marco", magia.colorMarco);
      tarjeta.style.setProperty("--color-fondo-reverso", magia.colorFondoReverso);

      // Datos ya procesados
      const claseEfecto = obtenerClaseEfecto(magia.efectoCelestial);
      const htmlCaracteristicas = procesarCaracteristicas(magia.caracteristicas);

      // --- 4b. HTML interno (frente y dorso) ---
      // PERSONALIZABLE: aquí puedes cambiar textos fijos como
      // "Clasificación" y "Efecto Celestial", o agregar campos nuevos.
      tarjeta.innerHTML = `
        <div class="tarjeta-magia-inner">

          <!-- PARTE FRONTAL (la imagen se asigna más abajo) -->
          <div class="tarjeta-frente">
            <div class="overlay-frente"></div>
            <h3 class="titulo-magia-frente">${magia.nombre}</h3>
          </div>

          <!-- PARTE TRASERA (información) -->
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

      // --- 4c. Imagen de fondo del frente ---
      // CAMBIO: se asigna aquí (no en el HTML) para que no se rompa si
      // la ruta tiene apóstrofes o espacios. Proporción 2:3 (800 x 1200 px).
      const frente = tarjeta.querySelector(".tarjeta-frente");
      frente.style.backgroundImage = `url("${magia.imagenFondo}")`;

      // --- 4d. Giro al dar clic o tocar ---
      tarjeta.addEventListener("click", () => {
        tarjeta.classList.toggle("rotada");
      });

      // --- 4e. Giro con teclado (accesibilidad) ---
      // CAMBIO: la tarjeta se puede enfocar con Tab y girar con Enter o espacio.
      // Si no lo quieres, borra este bloque completo.
      tarjeta.setAttribute("tabindex", "0");
      tarjeta.setAttribute("role", "button");
      tarjeta.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          tarjeta.classList.toggle("rotada");
        }
      });

      // --- 4f. Agregar la tarjeta al contenedor ---
      contenedor.appendChild(tarjeta);
    });
  }


  /* -------------------------------------------------------------------
     5. EJECUCIÓN
     tiposDeMagiaData es el arreglo con tus 10 tipos de magia.
     ------------------------------------------------------------------- */
  renderizarTiposDeMagia(tiposDeMagiaData);
});