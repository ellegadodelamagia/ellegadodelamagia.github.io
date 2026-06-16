/* ============================================================
   MOTOR DE RECETAS — El Legado de la Magia
   ============================================================
   Este archivo controla:
   1. Renderizado del grid de tarjetas
   2. Expansión de tarjeta al hacer click
   3. Volteo para ver la receta (normal o con pestañas para tablas)
   4. Filtros por Libro y por Tipo
   ============================================================ */


/* ── ESTADO GLOBAL ─────────────────────────────────────────
   Solo una tarjeta puede estar abierta a la vez.
   ────────────────────────────────────────────────────────── */
let tarjetaAbierta = null;


/* ── FILTROS ACTIVOS ───────────────────────────────────────
   "todos" = sin filtro.
   ────────────────────────────────────────────────────────── */
let filtroLibro = 'todos';
let filtroTipo  = 'todos';


/* ============================================================
   FUNCIÓN PRINCIPAL: renderizarGrid()
   ============================================================ */
function renderizarGrid() {
    const contenedor = document.getElementById('grid-recetas');
    contenedor.innerHTML = '';
    tarjetaAbierta = null;

    // ── Filtrado ───────────────────────────────────────────
    const recetasFiltradas = RECETAS.filter(r => {
        const okLibro = filtroLibro === 'todos' || r.Libro === parseInt(filtroLibro);
        const okTipo  = filtroTipo  === 'todos' || r.Tipo  === filtroTipo;
        return okLibro && okTipo;
    });

    // ── Mensaje si no hay resultados ───────────────────────
    if (recetasFiltradas.length === 0) {
        contenedor.innerHTML = `<p class="sin-resultados">No hay recetas con ese filtro aún.</p>`;
        return;
    }

    // ── Pintar cada tarjeta ────────────────────────────────
    recetasFiltradas.forEach(receta => {
        const item = document.createElement('div');
        item.className  = 'tarjeta-item';
        item.dataset.id = receta.ID;

        /* ── IMAGEN ─────────────────────────────────────────
           Placeholder ✦ mientras no haya imagen real.
           Cuando tengas la imagen ponla en imagen_receta/
           ─────────────────────────────────────────────────── */
        const imagenHTML = receta.Imagen
            ? `<img src="imagen_receta/${receta.Imagen}" alt="${receta.Nombre}" class="tarjeta-imagen">`
            : `<div class="tarjeta-imagen placeholder-imagen"><span>✦</span></div>`;

        /* ── DORSO: normal o tabla de bocadillos ────────────
           EsTabla: true → pestañas con MiniRecetas
           EsTabla: false → ingredientes + preparación normal
           ─────────────────────────────────────────────────── */
        const dorsoHTML = receta.EsTabla
            ? generarDorsoTabla(receta)
            : generarDorsoNormal(receta);

        /* ── BADGE DE DIFICULTAD ────────────────────────────
           PERSONALIZABLE: puedes quitar el badge si no lo quieres,
           borrando la línea ${badgeDificultad} del HTML de abajo.
           ─────────────────────────────────────────────────── */
        const badgeDificultad = receta.Dificultad
            ? `<span class="badge-dificultad dif-${receta.Dificultad.toLowerCase()}">${receta.Dificultad}</span>`
            : '';

        item.innerHTML = `
            <!-- ── FRENTE (vista compacta en el grid) ── -->
            <div class="tarjeta-frente" onclick="expandirTarjeta('${receta.ID}')">
                ${imagenHTML}
                <div class="tarjeta-info-basica">
                    <h3 class="tarjeta-nombre">${receta.Nombre}</h3>
                    <p class="tarjeta-autor">Por: ${receta.Autor}</p>
                    ${badgeDificultad}
                </div>
            </div>

            <!-- ── PANEL EXPANDIDO ── -->
            <div class="tarjeta-expandida" id="expandida-${receta.ID}">

                <!-- Columna izquierda: imagen -->
                <div class="expandida-imagen-wrap">
                    ${imagenHTML}
                </div>

                <!-- Columna derecha: información del libro -->
                <div class="expandida-detalle">
                    <h2 class="expandida-nombre">${receta.Nombre}</h2>

                    <div class="expandida-meta">
                        <div class="meta-linea">
                            <span class="meta-etiqueta">Libro</span>
                            <span class="meta-valor">${receta.Libro}</span>
                        </div>
                        <div class="meta-linea">
                            <span class="meta-etiqueta">Capítulo</span>
                            <span class="meta-valor">${receta.Capitulo}</span>
                        </div>
                        <div class="meta-linea">
                            <span class="meta-etiqueta">Lugar</span>
                            <span class="meta-valor">${receta.Lugar}</span>
                        </div>
                        <div class="meta-linea">
                            <span class="meta-etiqueta">Elaborada por</span>
                            <span class="meta-valor">${receta.Autor}</span>
                        </div>
                        ${receta.Porciones ? `
                        <div class="meta-linea">
                            <span class="meta-etiqueta">Porciones</span>
                            <span class="meta-valor">${receta.Porciones}</span>
                        </div>` : ''}
                        ${receta.Dificultad ? `
                        <div class="meta-linea">
                            <span class="meta-etiqueta">Dificultad</span>
                            <span class="meta-valor">${receta.Dificultad}</span>
                        </div>` : ''}
                    </div>

                    <!-- Información del libro: solo aparece si existe -->
                    ${receta.InformacionLibro ? `
                    <div class="expandida-nota">
                        <p class="nota-label">En el libro</p>
                        <p>${receta.InformacionLibro}</p>
                    </div>` : ''}

                    <!-- Botón para ver la receta -->
                    <!-- PERSONALIZABLE: cambia el texto del botón -->
                    <button class="btn-voltear" onclick="voltearTarjeta('${receta.ID}')">
                        Ver receta ✦
                    </button>
                </div>

                <!-- Dorso: receta normal o tabla con pestañas -->
                <div class="tarjeta-dorso" id="dorso-${receta.ID}">
                    ${dorsoHTML}
                </div>

                <!-- Botón cerrar -->
                <button class="btn-cerrar" onclick="cerrarTarjeta()">✕</button>
            </div>
        `;

        contenedor.appendChild(item);
    });
}


/* ============================================================
   generarDorsoNormal(receta)
   Genera el HTML del dorso para recetas normales.
   ============================================================ */
function generarDorsoNormal(receta) {
    const porciones = receta.Porciones
        ? `<div class="dorso-meta">
               <span class="dorso-meta-item">Porciones: ${receta.Porciones}</span>
               ${receta.Dificultad ? `<span class="dorso-meta-item">Dificultad: ${receta.Dificultad}</span>` : ''}
           </div>`
        : '';

    const notasCocina = receta.NotasCocina
        ? `<div class="dorso-notas">
               <h3>Notas de cocina</h3>
               <p>${receta.NotasCocina}</p>
           </div>`
        : '';

    return `
    <button class="btn-regresar" onclick="voltearTarjeta('${receta.ID}')">
        ← Regresar
    </button>
    ${porciones}
    <div class="dorso-contenido">
        <div class="dorso-ingredientes">
            <h3>Ingredientes</h3>
            <ul class="lista-ingredientes">
                ${receta.Ingredientes.split(';').map(i => `<li>${i.trim()}</li>`).join('')}
            </ul>
        </div>
        <div class="dorso-preparacion">
            <h3>Preparación</h3>
            <p class="preparacion">${receta.Preparacion}</p>
        </div>
    </div>
    ${notasCocina}
`;
}


/* ============================================================
   generarDorsoTabla(receta)
   Genera el HTML del dorso para tablas de bocadillos.
   Incluye pestañas para navegar entre mini recetas.
   ============================================================ */
function generarDorsoTabla(receta) {
    if (!receta.MiniRecetas || receta.MiniRecetas.length === 0) return '';

    // Pestañas
    const pestanas = receta.MiniRecetas.map((mini, i) => `
        <button class="pestana ${i === 0 ? 'pestana-activa' : ''}"
                onclick="cambiarPestana('${receta.ID}', ${i})">
            ${mini.Nombre}
        </button>
    `).join('');

    // Paneles de cada mini receta
    const paneles = receta.MiniRecetas.map((mini, i) => `
        <div class="panel-mini ${i === 0 ? 'panel-activo' : ''}" data-panel="${receta.ID}-${i}">
            <h3>Ingredientes</h3>
            <ul class="lista-ingredientes">
                ${mini.Ingredientes.split(';').map(ing => `<li>${ing.trim()}</li>`).join('')}
            </ul>
            <h3>Preparación</h3>
            <p class="preparacion">${mini.Preparacion}</p>
        </div>
    `).join('');

    return `
        <button class="btn-regresar" onclick="voltearTarjeta('${receta.ID}')">
            ← Regresar
        </button>
        <div class="pestanas-wrap">
            ${pestanas}
        </div>
        <div class="paneles-wrap">
            ${paneles}
        </div>
    `;
}


/* ============================================================
   cambiarPestana(recetaId, indice)
   Activa la pestaña y panel correspondiente en una tabla.
   ============================================================ */
function cambiarPestana(recetaId, indice) {
    const dorso = document.getElementById(`dorso-${recetaId}`);

    // Desactivar todas las pestañas y paneles
    dorso.querySelectorAll('.pestana').forEach(p => p.classList.remove('pestana-activa'));
    dorso.querySelectorAll('.panel-mini').forEach(p => p.classList.remove('panel-activo'));

    // Activar la seleccionada
    dorso.querySelectorAll('.pestana')[indice].classList.add('pestana-activa');
    dorso.querySelector(`[data-panel="${recetaId}-${indice}"]`).classList.add('panel-activo');
}


/* ============================================================
   expandirTarjeta(id)
   ============================================================ */
function expandirTarjeta(id) {
    if (tarjetaAbierta === id) {
        cerrarTarjeta();
        return;
    }

    if (tarjetaAbierta) cerrarTarjeta(false);

    tarjetaAbierta = id;

    const item      = document.querySelector(`.tarjeta-item[data-id="${id}"]`);
    const expandida = document.getElementById(`expandida-${id}`);
    const dorso     = document.getElementById(`dorso-${id}`);

    item.classList.add('abierta');
    expandida.classList.add('visible');

    // Aseguramos que empiece mostrando el frente (info), no el dorso
    const imagenWrap = expandida.querySelector('.expandida-imagen-wrap');
    const detalle    = expandida.querySelector('.expandida-detalle');
    imagenWrap.style.display = '';
    detalle.style.display    = '';
    dorso.style.display      = 'none';

    // Scroll suave hacia la tarjeta
    // PERSONALIZABLE: quita este bloque si no quieres scroll automático
    setTimeout(() => {
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}


/* ============================================================
   cerrarTarjeta()
   ============================================================ */
function cerrarTarjeta() {
    if (!tarjetaAbierta) return;

    const item      = document.querySelector(`.tarjeta-item[data-id="${tarjetaAbierta}"]`);
    const expandida = document.getElementById(`expandida-${tarjetaAbierta}`);

    item.classList.remove('abierta');
    expandida.classList.remove('visible');

    tarjetaAbierta = null;
}


/* ============================================================
   voltearTarjeta(id)
   Alterna entre info del libro y dorso con la receta.
   Usa estilos inline para evitar conflictos con el grid.
   ============================================================ */
function voltearTarjeta(id) {
    const expandida  = document.getElementById(`expandida-${id}`);
    const dorso      = document.getElementById(`dorso-${id}`);
    const imagenWrap = expandida.querySelector('.expandida-imagen-wrap');
    const detalle    = expandida.querySelector('.expandida-detalle');

    const estaEnDorso = dorso.style.display === 'block';

    if (!estaEnDorso) {
        // Mostrar dorso
        imagenWrap.style.display = 'none';
        detalle.style.display    = 'none';
        dorso.style.display      = 'block';
        dorso.style.gridColumn   = '1 / -1';
        dorso.style.width        = '100%';
        dorso.style.boxSizing    = 'border-box';
    } else {
        // Regresar al frente
        imagenWrap.style.display = '';
        detalle.style.display    = '';
        dorso.style.display      = 'none';
    }
}


/* ============================================================
   FILTROS
   ============================================================ */
function filtrarLibro(valor) {
    filtroLibro = valor;
    actualizarBotones('filtros-libro', valor);
    renderizarGrid();
}

function filtrarTipo(valor) {
    filtroTipo = valor;
    actualizarBotones('filtros-tipo', valor);
    renderizarGrid();
}

function actualizarBotones(grupoId, valorActivo) {
    const grupo = document.getElementById(grupoId);
    if (!grupo) return;
    grupo.querySelectorAll('button').forEach(btn => {
        btn.classList.toggle('activo', btn.dataset.valor === valorActivo);
    });
}


/* ── ARRANQUE ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    actualizarBotones('filtros-libro', 'todos');
    actualizarBotones('filtros-tipo',  'todos');
    renderizarGrid();
});