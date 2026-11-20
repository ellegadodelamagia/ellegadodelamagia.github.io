// ============================================================================
// js/saga.js — Módulo "Descubre la historia y la Saga"
// ----------------------------------------------------------------------------
// ÍNDICE (busca el número para saltar a cada parte)
//   1. CONFIGURACIÓN (lo que más probablemente vas a mover)
//   2. UTILIDADES (scroll, títulos y abrir secciones ocultas en celular)
//   3. VISTA 1: Introducción + botón "Conoce la saga"
//   4. VISTA 2: Grid de libros
//   5. VISTA 3: Detalle de un libro
//   6. Botón "Toca si quieres llevar el libro" → Detrás de la magia
//   7. Funciones globales y arranque
//
// NOTAS DE REVISIÓN
//   - ⭐ NUEVO (menú de tarjetas en celular): en celular, la sección
//     "Detrás de la magia" está oculta hasta que se abre desde el menú.
//     Un elemento oculto no se puede alcanzar con scroll, por eso el botón
//     "Toca si quieres llevar el libro" no hacía nada. Ahora, antes de
//     hacer scroll, se abre esa sección (función abrirSeccionSiEstaOculta,
//     parte 2) y después se baja hasta la tarjeta del libro.
//     En PC no cambia nada: la sección ya está visible y ese paso se salta.
//   - FIX CELULAR: al cambiar de vista ahora se hace scroll al inicio de la
//     sección #historia, descontando la altura de la barra fija (se mide sola,
//     aunque en celular la barra ocupe varias filas).
//   - La introducción ya NO está escrita aquí: se copia del index.html la
//     primera vez que carga la página. Así, si editas el texto en el HTML,
//     "← Volver a Historia" lo muestra igual. (Antes el JS tenía una versión
//     vieja del texto y al regresar aparecía distinta a la del HTML.)
//   - Todos los window.xxx quedaron juntos en la parte 7.
//   - Los datos vienen de js/datos_saga.js (SAGA_DATA). Campos que usa:
//     id, numero, titulo, frase, imagen (grid), portada (detalle),
//     contraportada (opcional), sinopsis, nivelVisibilidad (1, 2 o 3),
//     desbloqueoEn (solo nivel 2).
//   - detras_magia.js ya pone data-libro="{id}" en cada tarjeta de libro,
//     así que el destino "[data-libro='{id}']" de la parte 1 es el que gana.
// ============================================================================


// ============================================================================
// 1. CONFIGURACIÓN
// ============================================================================
const SAGA_CONFIG = {
  // ids y selectores del index.html
  idContenedor: "contenedor-modulo-saga",
  selectorSeccion: "#historia",
  selectorTituloSub: "#historia .titulo-seccion-sub",
  selectorTitulo: "#historia .titulo-seccion",
  selectorBarraFija: ".barra-navegacion",   // PERSONALIZABLE: barra de menú fija

  // ⭐ NUEVO: sección que contiene los libros a la venta.
  // En celular esta sección se abre automáticamente antes del scroll.
  seccionCompra: "#detras_magia",            // PERSONALIZABLE

  // ⭐ NUEVO: milisegundos de espera después de abrir la sección en celular,
  // para que el navegador la pinte antes de calcular el scroll.
  // PERSONALIZABLE: si el scroll queda corto en un celular lento, sube a 400.
  esperaAbrirSeccion: 250,

  // Aire extra (px) entre la barra fija y lo que quedas viendo al hacer scroll
  margenScroll: 12,                          // PERSONALIZABLE

  // Textos de las vistas
  subtituloLibros: "EL LEGADO DE LA MAGIA",       // PERSONALIZABLE
  tituloLibros: "Los libros de la saga",          // PERSONALIZABLE
  textoBotonSaga: "Conoce la saga",               // PERSONALIZABLE
  textoBotonComprar: "Toca si quieres llevar el libro 📖",  // PERSONALIZABLE

  // Imágenes de respaldo si una portada no carga
  // NOTA: via.placeholder.com a veces falla; si ves cuadros vacíos, pon aquí
  // una imagen tuya (por ejemplo images/portada-pendiente.jpg).
  respaldoGrid: "https://via.placeholder.com/300x400/12121e/d4af37?text=Portada",           // PERSONALIZABLE
  respaldoPortada: "https://via.placeholder.com/200x300/12121e/d4af37?text=Portada",        // PERSONALIZABLE
  respaldoContraportada: "https://via.placeholder.com/200x300/12121e/d4af37?text=Contraportada", // PERSONALIZABLE

  // Destino de "Toca si quieres llevar el libro" en Detrás de la magia.
  // Se prueba en orden y gana el primero que exista. {id} se reemplaza por
  // el id del libro (por ejemplo "libro-1").
  // PERSONALIZABLE: ajusta estos selectores si cambia detras_magia.js
  destinosCompra: [
    "#{id}",                     // una tarjeta con el id del libro
    "[data-libro='{id}']",       // o con data-libro (la que usa detras_magia.js)
    "#grid-libros-saga",         // el bloque completo de libros
    ".bloque-libros",
    "#detras_magia"              // último recurso: inicio de la sección
  ]
};

// Guardamos aquí lo que está escrito originalmente en el HTML
const sagaOriginal = {
  introHTML: null,
  subtitulo: null,
  titulo: null
};


// ============================================================================
// 2. UTILIDADES
// ============================================================================

/** Lee los datos de la saga (datos_saga.js) o devuelve null si no están */
function obtenerDatosSaga() {
  return window.SAGA_DATA || (typeof SAGA_DATA !== "undefined" ? SAGA_DATA : null);
}

/**
 * ⭐ NUEVO: si la sección está oculta (pasa en celular, donde cada sección
 * se abre desde el menú de tarjetas), la abre cambiando la dirección a
 * "#detras_magia" (el CSS de menu_movil.css la muestra con :target).
 * Devuelve true si tuvo que abrirla, false si ya estaba visible (PC).
 */
function abrirSeccionSiEstaOculta(selector) {
  const seccion = document.querySelector(selector);
  if (!seccion) return false;
  if (getComputedStyle(seccion).display !== "none") return false;

  window.location.hash = selector.replace("#", "");
  return true;
}

/**
 * Hace scroll suave hasta un elemento, dejando libre el espacio de la barra
 * fija de arriba. Espera un instante a que el navegador termine de pintar el
 * contenido nuevo; sin eso, en celular el scroll se calcula con la altura vieja.
 */
function scrollAElemento(elemento) {
  if (!elemento) return;

  requestAnimationFrame(() => {
    // Solo descontamos la barra si de verdad se queda fija o pegada arriba.
    // En celular, si la barra se mueve con la página, no hay nada que descontar.
    const barra = document.querySelector(SAGA_CONFIG.selectorBarraFija);
    const posicionBarra = barra ? getComputedStyle(barra).position : "";
    const barraEsFija = posicionBarra === "fixed" || posicionBarra === "sticky";
    const altoBarra = barraEsFija ? barra.offsetHeight : 0;
    const posicion =
      elemento.getBoundingClientRect().top + window.pageYOffset
      - altoBarra - SAGA_CONFIG.margenScroll;

    window.scrollTo({ top: posicion, behavior: "smooth" });
  });
}

/** Lleva la pantalla al inicio de la sección Historia */
function scrollAInicioHistoria() {
  scrollAElemento(document.querySelector(SAGA_CONFIG.selectorSeccion));
}

/** Cambia los dos títulos de la sección (subtítulo chico y título grande) */
function cambiarTitulos(subtitulo, titulo) {
  const elSub = document.querySelector(SAGA_CONFIG.selectorTituloSub);
  const elTitulo = document.querySelector(SAGA_CONFIG.selectorTitulo);
  if (elSub) elSub.textContent = subtitulo;
  if (elTitulo) elTitulo.textContent = titulo;
}

/** Copia lo que dice el index.html (una sola vez, antes de cambiar nada) */
function guardarOriginal() {
  if (sagaOriginal.introHTML !== null) return;

  const contenedor = document.getElementById(SAGA_CONFIG.idContenedor);
  const elSub = document.querySelector(SAGA_CONFIG.selectorTituloSub);
  const elTitulo = document.querySelector(SAGA_CONFIG.selectorTitulo);

  if (contenedor) sagaOriginal.introHTML = contenedor.innerHTML;
  if (elSub) sagaOriginal.subtitulo = elSub.textContent;
  if (elTitulo) sagaOriginal.titulo = elTitulo.textContent;
}


// ============================================================================
// 3. VISTA 1: INTRODUCCIÓN + BOTÓN "CONOCE LA SAGA"
// ============================================================================

/** Pone el botón "Conoce la saga" dentro de #slot-boton-saga */
function inicializarSaga() {
  guardarOriginal();   // importante: antes de inyectar el botón

  const slotBoton = document.getElementById("slot-boton-saga");
  if (!slotBoton) {
    console.warn("Módulo Saga: no se encontró #slot-boton-saga en el HTML.");
    return;
  }

  slotBoton.innerHTML = `
    <button class="btn-redondeado-saga" onclick="mostrarGridSaga()">
      ${SAGA_CONFIG.textoBotonSaga}
    </button>
  `;
}

/** Regresa a la introducción (texto y títulos tal como están en el HTML) */
function restaurarIntroduccionHistoria() {
  const contenedor = document.getElementById(SAGA_CONFIG.idContenedor);
  if (!contenedor || sagaOriginal.introHTML === null) return;

  cambiarTitulos(sagaOriginal.subtitulo, sagaOriginal.titulo);
  contenedor.innerHTML = sagaOriginal.introHTML;

  inicializarSaga();        // vuelve a poner el botón
  scrollAInicioHistoria();
}


// ============================================================================
// 4. VISTA 2: GRID DE LIBROS
// ============================================================================
function mostrarGridSaga() {
  const contenedor = document.getElementById(SAGA_CONFIG.idContenedor);
  const datos = obtenerDatosSaga();

  if (!datos) {
    console.error("Error: SAGA_DATA no está definido. Revisa js/datos_saga.js");
    alert("Error al cargar la base de datos de la saga.");
    return;
  }
  if (!contenedor) return;

  cambiarTitulos(SAGA_CONFIG.subtituloLibros, SAGA_CONFIG.tituloLibros);

  let htmlGrid = `
    <div style="text-align: center; margin-bottom: 2rem;">
      <button class="btn-volver-historia" onclick="restaurarIntroduccionHistoria()">
        ← Volver a Historia
      </button>
    </div>
    <div class="grid-saga-tres">
  `;

  // CAMBIO: los libros de nivel 3 no se generan (no aparecen en la página)
  // PERSONALIZABLE: si algún día quieres volver a mostrar el nivel 3, quita este filter
  datos
    .filter((libro) => libro.nivelVisibilidad !== 3)
    .forEach((libro) => {
      const esNivel1 = libro.nivelVisibilidad === 1;
      const esNivel2 = libro.nivelVisibilidad === 2;

      // Texto y estado del botón según el nivel
      let textoBoton = "Conoce el libro";   // PERSONALIZABLE (nivel 1: completo)
      let deshabilitado = "";
      if (esNivel2) { textoBoton = "Creando el libro"; deshabilitado = "disabled"; }  // PERSONALIZABLE (nivel 2: borroso)

      const claseImagen = esNivel2 ? "imagen-blur-protegida" : "";

      htmlGrid += `
        <article class="tarjeta-saga-item nivel-${libro.nivelVisibilidad}">
          <div class="tarjeta-imagen-box">
            <img src="${libro.imagen}" alt="${libro.titulo}"
                 class="imagen-portada-grid ${claseImagen}"
                 onerror="this.src='${SAGA_CONFIG.respaldoGrid}'">
          </div>
          <div class="tarjeta-cuerpo-box">
            <span class="numero-libro-tag">Libro ${libro.numero}</span>
            <h3 class="titulo-libro-grid">${libro.titulo}</h3>
            <p class="frase-libro-grid">"${libro.frase}"</p>
            <button
              class="btn-conoce-libro ${esNivel2 ? "btn-restringido" : ""}"
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

  scrollAInicioHistoria();   // FIX CELULAR: deja a la vista el título y el Libro 1
}


// ============================================================================
// 5. VISTA 3: DETALLE DE UN LIBRO
// ============================================================================
function abrirDetalleLibro(libroId) {
  const datos = obtenerDatosSaga() || [];
  const libro = datos.find((item) => item.id === libroId);
  if (!libro || libro.nivelVisibilidad === 3) return;

  const contenedor = document.getElementById(SAGA_CONFIG.idContenedor);
  if (!contenedor) return;

  cambiarTitulos(`LIBRO ${libro.numero}`, libro.titulo);

  // NOTA: hoy el botón de nivel 2 está deshabilitado, así que esta parte
  // (candado) no se alcanza. Se deja por si luego quieres abrir esos libros.
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
          <img src="${libro.portada}" alt="Portada de ${libro.titulo}"
               class="${claseBlurImagen}"
               onerror="this.src='${SAGA_CONFIG.respaldoPortada}'">
          <span class="label-portada">Portada</span>
        </div>
        ${
          libro.contraportada
            ? `<div class="marco-imagen">
                 <img src="${libro.contraportada}" alt="Contraportada de ${libro.titulo}"
                      class="${claseBlurImagen}"
                      onerror="this.src='${SAGA_CONFIG.respaldoContraportada}'">
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

      <!-- Botón hacia Detrás de la magia -->
      <div class="bloque-accion-compra">
        <button class="btn-redondeado-saga btn-accion-adquirir"
                onclick="irADetrasDeLaMagia('${libro.id}')">
          ${SAGA_CONFIG.textoBotonComprar}
        </button>
      </div>
    </div>
  `;

  scrollAInicioHistoria();
}


// ============================================================================
// 6. BOTÓN "TOCA SI QUIERES LLEVAR EL LIBRO" → DETRÁS DE LA MAGIA
// ----------------------------------------------------------------------------
// Busca el primer destino que exista según SAGA_CONFIG.destinosCompra.
// Alinea el INICIO del destino debajo de la barra fija.
// ⭐ NUEVO: en celular, primero abre la sección Detrás de la magia (que está
// oculta) y espera un momento antes de hacer scroll.
// ============================================================================
function irADetrasDeLaMagia(libroId) {
  for (const plantilla of SAGA_CONFIG.destinosCompra) {
    const selector = plantilla.replace("{id}", libroId);

    let destino = null;
    try {
      destino = document.querySelector(selector);
    } catch (error) {
      continue;   // selector inválido, probamos el siguiente
    }

    if (destino) {
      // ⭐ NUEVO: abrir la sección si está oculta (celular)
      const seAbrio = abrirSeccionSiEstaOculta(SAGA_CONFIG.seccionCompra);

      if (seAbrio) {
        // Esperamos a que el navegador pinte la sección ya abierta
        setTimeout(() => scrollAElemento(destino), SAGA_CONFIG.esperaAbrirSeccion);
      } else {
        scrollAElemento(destino);   // PC: la sección ya estaba visible
      }
      return;
    }
  }

  console.warn("Módulo Saga: no se encontró ningún destino en Detrás de la magia.");
}


// ============================================================================
// 7. FUNCIONES GLOBALES Y ARRANQUE
// ============================================================================

// Necesarias porque el HTML generado usa onclick="..."
window.inicializarSaga = inicializarSaga;
window.mostrarGridSaga = mostrarGridSaga;
window.abrirDetalleLibro = abrirDetalleLibro;
window.restaurarIntroduccionHistoria = restaurarIntroduccionHistoria;
window.irADetrasDeLaMagia = irADetrasDeLaMagia;

// ⭐ NUEVO: detras_magia.js usa window.scrollAElemento (botón "Enviar Correo").
// Antes no estaba exportada y siempre caía al scroll normal; ahora sí.
window.scrollAElemento = scrollAElemento;

// Arranque seguro: espera a que el HTML esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarSaga);
} else {
  inicializarSaga();
}