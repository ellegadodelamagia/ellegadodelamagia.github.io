// =========================================================================
// 📜 ESCRITOS  ·  escritos.js
// =========================================================================
//
// GUÍA RÁPIDA: ¿DÓNDE CAMBIO QUÉ?
// -------------------------------------------------------------------------
// 1. INICIO ............................ carga los datos y activa filtros/modal
// 2. NOMBRES DE CATEGORÍA .............. "Profecía", "Atlas", "Códice"...
// 3. NIVEL DE BLOQUEO .................. cómo se decide si un escrito está bloqueado
// 4. TARJETAS (renderizarEscritos) ..... textos de las tarjetas bloqueadas / desbloqueadas
// 5. MODAL (abrirEscrito) .............. la vista de lectura
//      5A. Partes del texto ............ origen, cuerpo, notas, subgrilla de herederos
//      5B. Qué layout usa cada escrito . Canto con marco / 2 columnas / completo
//      5C. Armado del HTML y eventos ... botón regresar, profecía, enlaces del Canto
// 6. FILTROS ........................... botones de categoría
// 7. EVENTOS DEL MODAL ................. cerrar al hacer clic fuera o en la barra
//
// Los colores, tamaños y fondos NO están aquí: están en escritos.css.
// Este archivo solo decide QUÉ se muestra y con QUÉ clases.
// =========================================================================


// =========================================================================
// 1. INICIO
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const listaDatos = window.datosEscritos;

  if (typeof listaDatos !== "undefined" && Array.isArray(listaDatos)) {
    renderizarEscritos(listaDatos);
  } else {
    console.error("❌ Error: window.datosEscritos no se cargó correctamente.");
  }

  configurarFiltros();
  configurarEventosModal();
});


// =========================================================================
// 2. NOMBRES DE CATEGORÍA
// =========================================================================

function obtenerNombreCategoria(cat) {
  // PERSONALIZABLE: a la izquierda el valor de "categoria" en tus datos, a la derecha lo que se ve
  const mapa = {
    profecias: "Profecía",
    compendios: "Atlas",
    legado: "Códice",
    registros: "Libro de Herederos"
  };
  return mapa[cat] || cat;
}


// =========================================================================
// 3. NIVEL DE BLOQUEO
// =========================================================================
// Devuelve:
//   2 = perdido (borroso, no se puede abrir)
//   1 = bloqueado estándar (candado, "contenido oculto")
//   0 = desbloqueado
// PERSONALIZABLE: si cambias cómo marcas el bloqueo en tus datos, se edita aquí (un solo lugar)

function obtenerNivelBloqueo(escrito) {
  if (Number(escrito.desbloqueado) === 2 || escrito.nivelBloqueo === 2 || escrito.bloqueado === 2) {
    return 2;
  }
  return escrito.bloqueado === true ? 1 : 0;
}


// =========================================================================
// 4. TARJETAS
// =========================================================================

function renderizarEscritos(lista) {
  const contenedorGrid = document.getElementById("escritos-grid");
  if (!contenedorGrid) return;

  contenedorGrid.innerHTML = "";

  lista.forEach(escrito => {
    const card = document.createElement("article");
    card.className = "escrito-card";

    const nivelBloqueo = obtenerNivelBloqueo(escrito);

    if (nivelBloqueo === 2) {
      // ---------------------------------------------------------------
      // BLOQUEO NIVEL 2
      // - No se puede abrir (sin botón de explorar ni clic)
      // - Categoría y subtítulo borrosos
      // - Muestra la descripción corta real
      // ---------------------------------------------------------------
      card.classList.add("bloqueo-nivel-2");
      card.style.cursor = "not-allowed";

      card.innerHTML = `
        <div>
          <span class="badge-categoria blur-texto" style="display: inline-block;">${obtenerNombreCategoria(escrito.categoria)}</span>
          <h3 style="color: rgba(245, 228, 191, 0.6); margin-top: 8px;"> ${escrito.titulo}</h3>
          <p class="subtitulo blur-texto">${escrito.subtitulo || 'Subtítulo protegido'}</p>
          <p class="descripcion" style="opacity: 0.85; font-style: italic; margin-top: 10px;">${escrito.descripcionCorta || ''}</p>
        </div>
        <button type="button" class="btn-dorado" disabled style="opacity: 0.6; cursor: not-allowed; background: rgba(20, 15, 10, 0.85); border-color: rgba(197, 169, 86, 0.3); color: #aaa; width: 100%; margin-top: 15px; font-size: 0.85rem; padding: 8px 5px;">
          Documento perdido en espera de ser localizado por Kaira
        </button>
      `;
      // PERSONALIZABLE: el texto del botón de arriba ("Documento perdido en espera...")

    } else if (nivelBloqueo === 1) {
      // ---------------------------------------------------------------
      // BLOQUEO NIVEL 1: bloqueado estándar (candado)
      // ---------------------------------------------------------------
      card.style.cursor = "not-allowed";
      card.innerHTML = `
        <div>
          <span class="badge-categoria">${obtenerNombreCategoria(escrito.categoria)}</span>
          <h3 style="color: rgba(245, 228, 191, 0.6);">🔒 ${escrito.titulo}</h3>
          <p class="subtitulo">${escrito.subtitulo || ''}</p>
          <p class="descripcion" style="opacity: 0.8; font-style: italic;">Contenido oculto hasta el momento adecuado.</p>
        </div>
        <button type="button" class="btn-dorado" disabled style="opacity: 0.5; cursor: not-allowed; background: rgba(20, 15, 10, 0.8); border-color: rgba(197, 169, 86, 0.3); color: #888; width: 100%; margin-top: 15px;">
          Contenido protegido
        </button>
      `;
      // PERSONALIZABLE: "Contenido oculto hasta el momento adecuado." y "Contenido protegido"

    } else {
      // ---------------------------------------------------------------
      // DESBLOQUEADO
      // ---------------------------------------------------------------
      card.innerHTML = `
        <div>
          <span class="badge-categoria">${obtenerNombreCategoria(escrito.categoria)}</span>
          <h3>${escrito.titulo}</h3>
          <p class="subtitulo">${escrito.subtitulo || ''}</p>
          <p class="descripcion">${escrito.descripcionCorta || ''}</p>
        </div>
        <button type="button" class="btn-dorado btn-explorar" data-id="${escrito.id}">Explorar escrito</button>
      `;
      // PERSONALIZABLE: el texto del botón "Explorar escrito"

      const btnExplorar = card.querySelector(".btn-explorar");
      if (btnExplorar) {
        btnExplorar.addEventListener("click", () => abrirEscrito(escrito.id));
      }
    }

    contenedorGrid.appendChild(card);
  });
}


// =========================================================================
// 5. MODAL DE LECTURA
// =========================================================================

function abrirEscrito(id) {
  const listaDatos = window.datosEscritos;
  if (!listaDatos) return;

  const item = listaDatos.find(e => e.id === id);

  // Cancela la apertura si no existe o si es nivel 2
  if (!item || obtenerNivelBloqueo(item) === 2) {
    console.warn(`⛔ Acceso denegado: El escrito con ID "${id}" no se puede abrir.`);
    return;
  }

  const modal = document.getElementById("escrito-modal");
  const modalContenido = document.getElementById("modal-detalle-contenido");

  if (!modal || !modalContenido) return;

  // Limpieza de un fondo anterior (por si quedó de otro escrito)
  modalContenido.style.backgroundImage = 'none';


  // -----------------------------------------------------------------------
  // 5A. PARTES DEL TEXTO
  // (los colores y tamaños de estas partes están en escritos.css, sección 3)
  // -----------------------------------------------------------------------

  // Subgrilla del Libro de Herederos
  let contenidoEspecial = '';
  if (item.partesHerederos && Array.isArray(item.partesHerederos)) {
    const tarjetasHerederos = item.partesHerederos.map(part => `
      <div class="heredero-card">
        <h4>${part.titulo}</h4>
        <p>${part.desc}</p>
      </div>
    `).join('');

    contenidoEspecial = `
      <div class="subgrid-herederos">
        ${tarjetasHerederos}
      </div>
    `;
  }

  // "Origen: ..."
  const origenTexto = item.contenidoCompleto && item.contenidoCompleto.origen
    ? `<div class="escrito-origen">
        <strong>Origen:</strong> ${item.contenidoCompleto.origen}
       </div>`
    : '';

  // Cuerpo principal (puede traer HTML: los versos del Canto, por ejemplo)
  const cuerpoTexto = item.contenidoCompleto && item.contenidoCompleto.texto
    ? item.contenidoCompleto.texto
    : '';

  // Notas finales
  const notasTexto = item.contenidoCompleto && item.contenidoCompleto.notas
    ? `<div class="escrito-notas-limpias">
        ${item.contenidoCompleto.notas}
       </div>`
    : '';


  // -----------------------------------------------------------------------
  // 5B. ¿QUÉ LAYOUT USA ESTE ESCRITO?
  // -----------------------------------------------------------------------

  const idMinusculas = (item.id || '').toLowerCase();

  // Escritos que NO usan el layout de 2 columnas
  // PERSONALIZABLE: agrega aquí otra palabra si un escrito nuevo debe verse a pantalla completa
  const esExcepcionLayout =
    idMinusculas.includes('canto') ||
    idMinusculas.includes('recolector') ||
    idMinusculas.includes('heredero') ||
    (item.partesHerederos && item.partesHerederos.length > 0);

  // ===== MODO CANTO (MARCO) =====
  // PERSONALIZABLE: si el id del Canto no contiene "canto", cambia la palabra
  const esCanto = idMinusculas.includes('canto');

  // PERSONALIZABLE: la imagen del marco sale de item.imagen. Si está en otro campo
  // (ej. item.marco), cámbialo aquí. Si el Canto no tiene imagen, se ve como un escrito normal.
  const imagenMarco = item.imagen;
  const usaMarco = esCanto && !!imagenMarco;

  // Esta clase activa todos los estilos del Canto (escritos.css, sección 7B)
  modalContenido.classList.toggle('modo-canto', usaMarco);

  let estructuraCuerpo = '';

  if (usaMarco) {
    // LAYOUT CANTO CON MARCO: imagen clara de fondo y todo el texto encima, dentro del recuadro
    estructuraCuerpo = `
      <div class="canto-marco">
        <img class="canto-marco-img" src="${imagenMarco}" alt="${item.titulo}">
        <div class="canto-marco-texto">
          <h2 class="escrito-titulo">${item.titulo}</h2>
          ${origenTexto}
          ${cuerpoTexto ? `<div>${cuerpoTexto}</div>` : ''}
          ${notasTexto}
        </div>
      </div>
    `;

  } else if (!esExcepcionLayout && item.imagen) {
    // LAYOUT 2 COLUMNAS (escritos comunes con imagen)
    estructuraCuerpo = `
      <div class="modal-layout-dos-columnas">
        <div class="columna-imagen-modal">
          <img src="${item.imagen}" alt="${item.titulo}" class="img-escrito-lateral">
        </div>
        <div class="columna-texto-modal">
          <h2 class="escrito-titulo escrito-titulo--lateral">${item.titulo}</h2>
          ${origenTexto}
          <div class="escrito-cuerpo-texto">
            ${cuerpoTexto}
          </div>
          ${contenidoEspecial}
        </div>
      </div>
    `;

  } else {
    // LAYOUT COMPLETO Y TRANSPARENTE (Recolector, Herederos, y Canto sin imagen)
    const bloqueTextoLibre = cuerpoTexto ? `<div>${cuerpoTexto}</div>` : '';

    estructuraCuerpo = `
      <h2 class="escrito-titulo">${item.titulo}</h2>
      ${origenTexto}
      ${bloqueTextoLibre}
      ${contenidoEspecial}
    `;
  }


  // -----------------------------------------------------------------------
  // 5C. ARMADO DEL HTML Y EVENTOS
  // -----------------------------------------------------------------------

  // Con marco no se usa .modal-overlay-bg; el contenedor es .contenido-canto
  const claseContenedor = usaMarco ? 'contenido-canto' : 'modal-overlay-bg';

  // Con marco las notas ya van dentro de la imagen, así que aquí no se repiten
  const notasFuera = usaMarco ? '' : notasTexto;

  modalContenido.innerHTML = `
    <div class="${claseContenedor}">
      ${estructuraCuerpo}
      ${notasFuera}

      <div class="zona-boton-regresar">
        <button type="button" class="btn-dorado btn-regresar-modal" id="btn-cerrar-lectura">
          ← Regresar a Escritos
        </button>
      </div>
    </div>
  `;
  // PERSONALIZABLE: el texto "← Regresar a Escritos"

  // Cerrar modal con el botón
  const btnRegresar = document.getElementById("btn-cerrar-lectura");
  if (btnRegresar) {
    btnRegresar.addEventListener("click", () => modal.classList.remove("visible"));
  }

  // --- Profecía del Recolector: ampliar una versión ---
  const triptico = modalContenido.querySelector("#vista-triptico");
  const vistaAmpliada = modalContenido.querySelector("#vista-ampliada-profecia");
  const btnVolver = modalContenido.querySelector("#btn-volver-triptico");

  if (triptico && vistaAmpliada) {
    const tarjetas = triptico.querySelectorAll(".tarjeta-version-profecia");

    tarjetas.forEach(tarjeta => {
      tarjeta.addEventListener("click", () => {
        const titulo = tarjeta.getAttribute("data-titulo");
        const rutaImg = tarjeta.getAttribute("data-img");
        const desc = tarjeta.getAttribute("data-desc");

        const imgFoco = modalContenido.querySelector("#img-profecia-foco");
        const tituloFoco = modalContenido.querySelector("#titulo-profecia-foco");
        const descFoco = modalContenido.querySelector("#desc-profecia-foco");

        if (imgFoco) imgFoco.src = rutaImg;
        if (tituloFoco) tituloFoco.textContent = titulo;
        if (descFoco) descFoco.textContent = desc;

        triptico.style.display = "none";
        vistaAmpliada.style.display = "block";
      });
    });

    if (btnVolver) {
      btnVolver.addEventListener("click", () => {
        vistaAmpliada.style.display = "none";
        triptico.style.display = "flex";
      });
    }
  }

  // --- Canto: cada verso lleva al libro correspondiente en la saga ---
  const enlacesSaga = modalContenido.querySelectorAll(".link-saga");
  enlacesSaga.forEach(enlace => {
    enlace.style.cursor = "pointer";
    enlace.addEventListener("click", () => {
      const libroId = enlace.getAttribute("data-libro");

      modal.classList.remove("visible");

      if (typeof window.mostrarGridSaga === "function") {
        window.mostrarGridSaga();
      }

      // PERSONALIZABLE: ids de la sección a la que se hace scroll
      const seccionDestino = document.getElementById("historia") || document.getElementById("contenedor-modulo-saga");
      if (seccionDestino) {
        seccionDestino.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      setTimeout(() => {
        if (typeof window.abrirDetalleLibro === "function") {
          window.abrirDetalleLibro(libroId);
        }
      }, 350);
    });
  });

  modal.classList.add("visible");
}


// =========================================================================
// 6. FILTROS
// =========================================================================

function configurarFiltros() {
  const contenedorFiltros = document.querySelector("#escritos .filtros-escritos");
  if (!contenedorFiltros) return;

  contenedorFiltros.addEventListener("click", (e) => {
    const boton = e.target.closest(".btn-filtro");
    if (!boton) return;

    const listaDatos = window.datosEscritos;
    if (!listaDatos) return;

    const categoria = boton.getAttribute("data-categoria");

    const botones = contenedorFiltros.querySelectorAll(".btn-filtro");
    botones.forEach(b => b.classList.remove("activo"));
    boton.classList.add("activo");

    if (categoria === "todos") {
      renderizarEscritos(listaDatos);
    } else {
      const filtrados = listaDatos.filter(item => item.categoria === categoria);
      renderizarEscritos(filtrados);
    }
  });
}


// =========================================================================
// 7. EVENTOS DEL MODAL
// =========================================================================

function configurarEventosModal() {
  const modal = document.getElementById("escrito-modal");

  // Cerrar al hacer clic en la capa oscura (fuera de la ventana)
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("visible");
    });
  }

  // Cerrar al hacer clic en la barra de navegación
  document.querySelectorAll(".barra-navegacion a").forEach(enlace => {
    enlace.addEventListener("click", () => {
      if (modal) modal.classList.remove("visible");
    });
  });
}