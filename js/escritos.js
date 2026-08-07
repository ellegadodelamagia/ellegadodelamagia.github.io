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

function obtenerNombreCategoria(cat) {
  const mapa = {
    profecias: "Profecía",
    compendios: "Atlas",
    legado: "Códice",
    registros: "Libro de Herederos"
  };
  return mapa[cat] || cat;
}

function renderizarEscritos(lista) {
  const contenedorGrid = document.getElementById("escritos-grid");
  if (!contenedorGrid) return;

  contenedorGrid.innerHTML = "";

  lista.forEach(escrito => {
    const card = document.createElement("article");
    card.className = "escrito-card";

    const esBloqueado = Number(escrito.desbloqueado) === 2 || escrito.bloqueado === true;

    if (esBloqueado) {
      card.innerHTML = `
        <div>
          <span class="badge-categoria">${obtenerNombreCategoria(escrito.categoria)}</span>
          <h3 style="color: rgba(245, 228, 191, 0.6);">🔒 ${escrito.titulo}</h3>
          <p class="subtitulo">${escrito.subtitulo || ''}</p>
          <p class="descripcion" style="opacity: 0.8; font-style: italic;">Contenido oculto hasta el momento adecuado.</p>
        </div>
        <button type="button" class="btn-dorado" disabled style="opacity: 0.5; cursor: not-allowed; background: rgba(20, 15, 10, 0.8); border-color: rgba(197, 169, 86, 0.3); color: #888;">
          🔒 Contenido protegido 
        </button>
      `;
      card.style.cursor = "not-allowed";
   // 🔓 CASO 2: ESCRITO DISPONIBLE
    } else {
      card.innerHTML = `
        <div>
          <span class="badge-categoria">${obtenerNombreCategoria(escrito.categoria)}</span>
          <h3>${escrito.titulo}</h3>
          <p class="subtitulo">${escrito.subtitulo || ''}</p>
          <p class="descripcion">${escrito.descripcionCorta || ''}</p>
        </div>
        <button type="button" class="btn-dorado btn-explorar" data-id="${escrito.id}">Explorar escrito</button>
      `;

      const btnExplorar = card.querySelector(".btn-explorar");
      if (btnExplorar) {
        btnExplorar.addEventListener("click", () => abrirEscrito(escrito.id));
      }
    }

    contenedorGrid.appendChild(card);
  });
}

function abrirEscrito(id) {
  const listaDatos = window.datosEscritos;
  if (!listaDatos) return;

  const item = listaDatos.find(e => e.id === id);

  if (!item || item.desbloqueado === 2) return;

  const modal = document.getElementById("escrito-modal");
  const modalContenido = document.getElementById("modal-detalle-contenido");

  if (!modal || !modalContenido) return;

  // Limpiamos imagen de fondo previa
  modalContenido.style.backgroundImage = 'none';

  // Subgrid si es Libro de Herederos (o si trae partesHerederos)
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

  const origenTexto = item.contenidoCompleto && item.contenidoCompleto.origen 
    ? `<div class="escrito-origen" style="color: #eceba7; font-size: 0.95rem; margin-bottom: 12px; text-shadow: 0 2px 6px rgba(0,0,0,0.9);">
        <strong style="color: var(--gold);">Origen:</strong> ${item.contenidoCompleto.origen}
       </div>` 
    : '';

  const cuerpoTexto = item.contenidoCompleto && item.contenidoCompleto.texto 
    ? item.contenidoCompleto.texto 
    : '';

  const notasTexto = item.contenidoCompleto && item.contenidoCompleto.notas 
    ? `<em>${item.contenidoCompleto.notas}</em>` 
    : '';

  // EVALUACIÓN FLEXIBLE DE EXCEPCIONES: Detecta cualquier ID que contenga estas palabras clave
  const idMinusculas = (item.id || '').toLowerCase();
  const esExcepcionLayout = 
    idMinusculas.includes('canto') || 
    idMinusculas.includes('recolector') || 
    idMinusculas.includes('heredero') ||
    (item.partesHerederos && item.partesHerederos.length > 0);

  // Construcción del maquetado
  let estructuraCuerpo = '';

  if (!esExcepcionLayout && item.imagen) {
    // 📌 LAYOUT 2 COLUMNAS (Solo para escritos comunes con imagen)
    estructuraCuerpo = `
      <div class="modal-layout-dos-columnas">
        <div class="columna-imagen-modal">
          <img src="${item.imagen}" alt="${item.titulo}" class="img-escrito-lateral">
        </div>
        <div class="columna-texto-modal">
          <h2 style="font-family:'Cinzel', serif; color:var(--gold); font-size: 1.8rem; margin-bottom: 10px;">${item.titulo}</h2>
          ${origenTexto}
          <div class="escrito-cuerpo-texto">
            ${cuerpoTexto}
          </div>
          ${contenidoEspecial}
        </div>
      </div>
    `;
  } else {
    // 📌 LAYOUT COMPLETO CENTRADO (Para El Canto de la Saga, Recolector y Herederos)
    estructuraCuerpo = `
      <h2 style="font-family:'Cinzel', serif; color:var(--gold); font-size: 2rem; margin-bottom: 5px; text-align:center;">${item.titulo}</h2>
      ${origenTexto}
      <div class="escrito-cuerpo-texto">
        ${cuerpoTexto}
      </div>
      ${contenidoEspecial}
    `;
  }

  // Inyección HTML en el modal
  modalContenido.innerHTML = `
    <div class="modal-overlay-bg">
      ${estructuraCuerpo}

      ${notasTexto ? `
        <div style="margin-top:20px; text-align:center; font-size:0.9rem; color: #f5e4bf; background: rgba(0,0,0,0.5); padding: 8px 15px; border-radius: 6px; display: inline-block; width: 100%; box-sizing: border-box;">
          ${notasTexto}
        </div>
      ` : ''}
      
      <div style="text-align: center; margin-top: 2.5rem;">
        <button type="button" class="btn-dorado btn-regresar-modal" id="btn-cerrar-lectura">
          ← Regresar a Escritos
        </button>
      </div>
    </div>
  `;

  // 1. Evento de cerrar modal
  const btnRegresar = document.getElementById("btn-cerrar-lectura");
  if (btnRegresar) {
    btnRegresar.addEventListener("click", () => modal.classList.remove("visible"));
  }

  // 2. LÓGICA DE AMPLIACIÓN (Tríptico / Profecía del Recolector)
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

  // 3. NAVEGACIÓN A SAGA (Desde el Canto de los Libros)
  const enlacesSaga = modalContenido.querySelectorAll(".link-saga");
  enlacesSaga.forEach(enlace => {
    enlace.style.cursor = "pointer";
    enlace.addEventListener("click", () => {
      const libroId = enlace.getAttribute("data-libro");
      
      modal.classList.remove("visible");

      if (typeof window.mostrarGridSaga === "function") {
        window.mostrarGridSaga();
      }

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

  // Mostrar el modal
  modal.classList.add("visible");
}

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

function configurarEventosModal() {
  const modal = document.getElementById("escrito-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("visible");
    });
  }
}