// js/saga.js - Motor dinámico de la Saga

/**
 * 1. Declaración de la función principal de inicialización
 */
function inicializarSaga() {
  const slotBoton = document.getElementById("slot-boton-saga");
  
  if (slotBoton) {
    slotBoton.innerHTML = `
      <button class="btn-redondeado-saga" onclick="mostrarGridSaga()">
        Conoce la saga
      </button>
    `;
    console.log("Módulo Saga: Botón inyectado con éxito.");
  } else {
    console.warn("Módulo Saga: Buscando #slot-boton-saga...");
  }
}

// Hacemos accesibles las funciones principales globalmente
window.inicializarSaga = inicializarSaga;
window.mostrarGridSaga = mostrarGridSaga;
window.abrirDetalleLibro = abrirDetalleLibro;
window.restaurarIntroduccionHistoria = restaurarIntroduccionHistoria;

/**
 * 2. Asignación segura del evento de carga
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarSaga);
} else {
  inicializarSaga();
}

/**
 * 3. Vista 2: Inyecta el Grid de 3 columnas
  /**
 * Vista 2: Inyecta el Grid de 3 columnas y actualiza el título
 */
function mostrarGridSaga() {
  const contenedor = document.getElementById("contenedor-modulo-saga");
  const datos = window.SAGA_DATA || (typeof SAGA_DATA !== "undefined" ? SAGA_DATA : null);
  
  if (!datos) {
    console.error("Error: window.SAGA_DATA no está definido. Revisa js/datos_saga.js");
    alert("Error al cargar la base de datos de la saga.");
    return;
  }

  if (!contenedor) return;

  // Actualizar títulos de la sección a la vista del Grid
  const tituloSub = document.querySelector("#historia .titulo-seccion-sub");
  const tituloPrincipal = document.querySelector("#historia .titulo-seccion");
  
  if (tituloSub) tituloSub.textContent = "EL LEGADO DE LA MAGIA";
  if (tituloPrincipal) tituloPrincipal.textContent = "Los libros de la saga";

  let htmlGrid = `
    <div style="text-align: center; margin-bottom: 2rem;">
      <button class="btn-volver-historia" onclick="restaurarIntroduccionHistoria()">
        ← Volver a Historia
      </button>
    </div>
    <div class="grid-saga-tres">
  `;

  datos.forEach((libro) => {
    const esNivel1 = libro.nivelVisibilidad === 1;
    const esNivel2 = libro.nivelVisibilidad === 2;
    const esNivel3 = libro.nivelVisibilidad === 3;

    let textoBoton = "Conoce el libro";
    let deshabilitado = "";

    if (esNivel2) {
      textoBoton = "Contenido restringido";
      deshabilitado = "disabled";
    } else if (esNivel3) {
      textoBoton = "Bloqueado 🔒";
      deshabilitado = "disabled";
    }

    const claseTitulo = esNivel3 ? "titulo-borroso" : "";
    const claseImagen = esNivel2 ? "imagen-blur-protegida" : "";

    htmlGrid += `
      <article class="tarjeta-saga-item nivel-${libro.nivelVisibilidad}">
        <div class="tarjeta-imagen-box">
          <img src="${libro.imagen}" alt="${libro.titulo}" class="imagen-portada-grid ${claseImagen}" onerror="this.src='https://via.placeholder.com/300x400/12121e/d4af37?text=Portada'">
        </div>
        <div class="tarjeta-cuerpo-box">
          <span class="numero-libro-tag">Libro ${libro.numero}</span>
          <h3 class="titulo-libro-grid ${claseTitulo}">${libro.titulo}</h3>
          <p class="frase-libro-grid">"${libro.frase}"</p>
          <button 
            class="btn-conoce-libro ${esNivel2 ? 'btn-restringido' : ''}" 
            ${deshabilitado} 
            ${esNivel1 ? `onclick="abrirDetalleLibro('${libro.id}')"` : ""}>
            ${textoBoton}
          </button>
        </div>
      </article>
    `;
  });

  htmlGrid += `</div>`;
  contenedor.innerHTML = htmlGrid;
}
/**
 * 4. Vista 3: Detalle del libro seleccionado
 */
function abrirDetalleLibro(libroId) {
  const datos = window.SAGA_DATA || (typeof SAGA_DATA !== "undefined" ? SAGA_DATA : []);
  const libro = datos.find((item) => item.id === libroId);
  if (!libro || libro.nivelVisibilidad === 3) return;

  const contenedor = document.getElementById("contenedor-modulo-saga");
  if (!contenedor) return;

  const esNivel2 = libro.nivelVisibilidad === 2;
  const claseBlurImagen = esNivel2 ? "imagen-blur-protegida" : "";

  contenedor.innerHTML = `
    <div style="text-align: center; margin-bottom: 2rem;">
      <button class="btn-volver-historia" onclick="mostrarGridSaga()">
        ← Volver a los libros
      </button>
    </div>

    <div class="tarjeta-volteada-detalle">
      <div class="encabezado-detalle">
        <span class="numero-libro-tag">Libro ${libro.numero}</span>
        <h2 class="titulo-libro-detalle">${libro.titulo}</h2>
      </div>

      <div class="galeria-portadas-detalle">
        <div class="marco-imagen">
          <img src="${libro.portada}" alt="Portada de ${libro.titulo}" class="${claseBlurImagen}" onerror="this.src='https://via.placeholder.com/200x300/12121e/d4af37?text=Portada'">
          <span class="label-portada">Portada</span>
        </div>
        ${
          libro.contraportada
            ? `<div class="marco-imagen">
                 <img src="${libro.contraportada}" alt="Contraportada de ${libro.titulo}" class="${claseBlurImagen}" onerror="this.src='https://via.placeholder.com/200x300/12121e/d4af37?text=Contraportada'">
                 <span class="label-portada">Contraportada</span>
               </div>`
            : ""
        }
      </div>

      <div class="cuerpo-sinopsis-detalle">
        ${
          esNivel2
            ? `<div class="mensaje-desbloqueo-box">
                 <p>🔒 <strong>Contenido Restringido</strong></p>
                 <p>${libro.desbloqueoEn || "Se descubrirá en tomos posteriores."}</p>
               </div>`
            : `<p class="texto-sinopsis">${libro.sinopsis}</p>`
        }
      </div>
    </div>
  `;
}

/**
 * 5. Restaura la vista introductoria
 * Restaura la vista introductoria y devuelve el título a "Cómo inició todo..."
 */
function restaurarIntroduccionHistoria() {
  const contenedor = document.getElementById("contenedor-modulo-saga");
  if (!contenedor) return;

  // Restaurar el título original
  const tituloSub = document.querySelector("#historia .titulo-seccion-sub");
  const tituloPrincipal = document.querySelector("#historia .titulo-seccion");
  
  if (tituloSub) tituloSub.textContent = "EL LEGADO DE LA MAGIA";
  if (tituloPrincipal) tituloPrincipal.textContent = "Cómo inició todo...";

  contenedor.innerHTML = `
    <p class="sinopsis-texto">
      Kaira Ferrer creció cerca de la Ciudad de México, su mayor deseo fue siempre conocer el mundo. 
      No como turista, sino de verdad. Pero no se atrevía a hacerlo sola.<br>
      Ese deseo fue escuchado.<br>
      Jeziel es un serafín con una misión aparentemente simple: mostrarle el mundo. 
      En su aventura, Kaira descubre que detrás de los lugares reales existen 
      otros que no deberían existir. La aventura apenas comienza.<br>
      Y la magia entra a su vida de una forma que jamás imaginó.<br>
    </p>
  
    <p class="sinopsis-texto">
      <br>Kaira descubre que:<br>
      Algunos lugares transforman tu forma de ver la vida.<br> 
      Otros cambian quién eres. <br>
      Pero hay lugares en los que encuentras responsabilidades para las que no estás preparado. 
    </p>

    <div id="slot-boton-saga" style="text-align: center; margin-top: 2.5rem;"></div>
  `;

  inicializarSaga();
}