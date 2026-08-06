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

    // Convertimos a número para asegurar que compare bien si es 2 o "2"
    const esBloqueado = Number(escrito.desbloqueado) === 2 || escrito.bloqueado === true;

    // 🔒 CASO 1: ESCRITO BLOQUEADO
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
      const HTMLImagen = escrito.imagen 
        ? `<div class="escrito-img-container"><img src="${escrito.imagen}" alt="${escrito.titulo}" class="escrito-card-img" onerror="this.parentElement.style.display='none'"></div>`
        : '';

      card.innerHTML = `
        ${HTMLImagen}
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

  // Seguridad extra: Si está bloqueado, no abrir el modal
  if (!item || item.desbloqueado === 2) return;

  const modal = document.getElementById("escrito-modal");
  const modalContenido = document.getElementById("modal-detalle-contenido");

  if (!modal || !modalContenido) return;

  // Asignar imagen de fondo completa al modal si existe
  if (item.imagen) {
    modalContenido.style.backgroundImage = `url('${item.imagen}')`;
  } else {
    modalContenido.style.backgroundImage = 'none';
  }

  // Verificar si es el Libro de los Herederos para renderizar las 8 sub-tarjetas
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

  // ✅ CÓDIGO ACTUALIZADO (Colores de alto contraste con fondo suave)
const origenTexto = item.contenidoCompleto && item.contenidoCompleto.origen 
  ? `<div class="escrito-origen" style="text-align:center; color: #eceba7; font-size: 0.95rem; margin-bottom: 12px; text-shadow: 0 2px 6px rgba(0,0,0,0.9);">
      <strong style="color: var(--gold);">Origen:</strong> ${item.contenidoCompleto.origen}
     </div>` 
    : '';

  const cuerpoTexto = item.contenidoCompleto && item.contenidoCompleto.texto 
    ? item.contenidoCompleto.texto 
    : '';

  const notasTexto = item.contenidoCompleto && item.contenidoCompleto.notas 
    ? `<em>${item.contenidoCompleto.notas}</em>` 
    : '';

  // Estructura limpia sin recuadros feos
  modalContenido.innerHTML = `
    <div class="modal-overlay-bg">
      <h2 style="font-family:'Cinzel', serif; color:var(--gold); font-size: 2rem; margin-bottom: 5px; text-align:center;">${item.titulo}</h2>
      
      ${origenTexto}

      <!-- Texto místico sin marco ni cuadro -->
      <div class="escrito-cuerpo-texto">
        ${cuerpoTexto}
      </div>

      <!-- Sub-tarjetas si corresponden (Libro de los Herederos) -->
      ${contenidoEspecial}

      <div style="margin-top:20px; text-align:center; font-size:0.9rem; color: #f5e4bf; background: rgba(0,0,0,0.5); padding: 8px 15px; border-radius: 6px; display: inline-block;">
  ${notasTexto}
</div>
      
      <div style="text-align: center; margin-top: 2.5rem;">
        <button type="button" class="btn-dorado btn-regresar-modal" id="btn-cerrar-lectura">
          ← Regresar a Escritos
        </button>
      </div>
    </div>
  `;

  // Evento de cierre
  const btnRegresar = document.getElementById("btn-cerrar-lectura");
  if (btnRegresar) {
    btnRegresar.addEventListener("click", () => modal.classList.remove("visible"));
  }

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