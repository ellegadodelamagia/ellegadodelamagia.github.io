// ============================================================================
// js/detras_magia.js — Sección "Detrás de la magia"
// ----------------------------------------------------------------------------
// ÍNDICE (busca el número para saltar a cada parte)
//   0. CONFIGURACIÓN (redes y fecha de lanzamiento)
//   1. Arranque (qué se ejecuta al cargar la página)
//   2. HTML base de la sección (biografía, proceso, libros, stats, formulario)
//   3. Proceso creativo (tarjetas y modal)
//   4. Libros de la saga
//   5. Utilidades (ir al formulario, contadores)
//   6. Funciones globales
//
// NOTAS DE REVISIÓN
//   - CAMBIO IMPORTANTE: cada tarjeta de libro ahora lleva
//     data-libro="${libro.id}". Con eso, el botón "Toca si quieres llevar el
//     libro" de saga.js encuentra la tarjeta exacta del libro y te lleva
//     directo a ella (saga.js ya busca "[data-libro='{id}']").
//   - Las redes y la fecha de lanzamiento quedaron juntas en la parte 0, para que no tengas que buscarlos entre el código.
//   - Si saga.js está cargado, "Enviar Correo" usa su scroll (que ya cuenta
//     la barra fija en escritorio); si no, usa el scroll normal.
//   - La lógica no cambió; solo se ordenó y se comentó.
// ============================================================================


// ============================================================================
// 0. CONFIGURACIÓN
// ============================================================================

// Redes y correo de los botones de los libros disponibles
const REDES_CONTACTO = {
  instagram: "https://www.instagram.com/irene.nacher/",   // PERSONALIZABLE
  facebook: "https://www.facebook.com/irene.nacher/",     // PERSONALIZABLE
  email: "irenenacher@yahoo.com.mx"                       // PERSONALIZABLE
};

// Contador de días del viaje de Kaira
// PERSONALIZABLE: fecha de lanzamiento (año, mes, día).
// OJO: los meses empiezan en 0 (enero = 0, noviembre = 10)
const FECHA_INICIO_VIAJE = new Date(2026, 10, 14);

// NOTA: el contador de visitas se quitó porque CounterAPI v1 (el servicio que
// usaba) dejó de funcionar el 7 de agosto de 2026.


// ============================================================================
// 1. ARRANQUE
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderizarEstructuraHTML();        // Inyecta el HTML base
  cargarTarjetasProceso();           // Dibuja las tarjetas del Proceso Creativo
  cargarLibrosSaga();                // Dibuja los libros desde window.SAGA_DATA
  inicializarContadores();           // Calcula y muestra las estadísticas
  configurarEventosModalProceso();   // Cierre del modal (clic afuera y Escape)
});


// ============================================================================
// 2. HTML BASE DE LA SECCIÓN
// ============================================================================
function renderizarEstructuraHTML() {
  const contenedor = document.getElementById("contenedor-detras-magia");
  if (!contenedor) return;

  contenedor.innerHTML = `
    <!-- BLOQUE 1: BIOGRAFÍA -->
    <article class="bloque-biografia card-magica">
      <!-- El título va afuera de la foto y del texto para que ocupe todo el ancho, igual que en las otras tarjetas -->
      <h3>Sobre la Autora</h3>
      <div class="bio-imagen">
        <img src="imagenes_principal/detras_magia/foto.jpeg" alt="Retrato de la autora" loading="lazy">
      </div>
      <div class="bio-texto">
        <p>¡Hola! Soy Irene, la autora de lo que estás viendo en esta página, que es el resultado de toda la saga de <em>El legado de la magia</em>.</p>
        <p>Cada historia ha salido de algún recuerdo de mi vida:</p>
        <p>Leyendo libros en la gran biblioteca del abuelo, con sillones cómodos donde mis hermanos y yo nos tirábamos a leer alguno de los cientos de libros que vivían en grandes libreros, cada uno de nosotros con su tema favorito. El mío, por supuesto, la fantasía que contuviera magia. Esa biblioteca también era mágica, tenía un pequeño jardín atrás con una gran araucaria que siempre mantenía la tierra húmeda. Quizá por eso, cuando decidimos hacer una fogata, no quemamos la casa entera.</p>
        <p>Viajando a lugares reales pero imaginarios de la mano de Julio Verne: explorando el polo norte con el capitán Hatteras; bajando al centro de la tierra con Otto Lidenbrock y su sobrino Axel; y descubriendo el rayo verde con Sam y Sib Melville.</p>
        <p>Descubriendo, en decenas de campamentos a los que nos íbamos con familia y amigos, lugares que abrían la imaginación, como el lugar que dimos en llamar México chiquito en chiquito, un laberinto natural en forma de cañón donde te perdías por momentos, igual que pasa en la ciudad de México.</p>
        <p>Cocinando y experimentando nuevos sabores de postres que nunca fueron rechazados, claro, unos tuvieron más éxito que otros, y ahora sigo probando con las frutas de mi jardín, donde los pájaros siempre tienen su parte: mitad para ellos, mitad para mí.</p>
        <p>He ido cosiendo la saga con notas de voz, libretas de todos tamaños y hojas de colores.</p>
        <p>Deseo que la lectura te lleve a lugares insospechados dentro de la realidad y que disfrutes de todos los libros tanto como yo me emociono escribiéndolos.</p>
      </div>
    </article>

    <!-- BLOQUE 2: PROCESO CREATIVO (galería dinámica) -->
    <article class="bloque-proceso card-magica">
      <h3>El proceso creativo</h3>
      <p class="instrucciones-proceso">Toca cada tarjeta para asomarte a los secretos que se esconden más allá de lo que lees.</p>
      <div id="grid-proceso-creativo" class="grid-proceso-miniaturas"></div>
    </article>

    <!-- VENTANA EMERGENTE (MODAL) DEL PROCESO CREATIVO -->
    <div id="modal-proceso" class="modal-proceso-creativo">
      <div id="modal-proceso-contenido" class="modal-contenido"></div>
    </div>

    <!-- BLOQUE 3: LIBROS DE LA SAGA (se llenan desde window.SAGA_DATA) -->
    <article class="bloque-libros card-magica">
      <h3>Lleva los libros contigo</h3>
      <p class="instrucciones-compra">Escríbeme por mis redes y te cuento cómo conseguir tu ejemplar.</p>
      <div id="grid-libros-saga" class="grid-libros"></div>
    </article>

    <!-- BLOQUE 4: ESTADÍSTICAS -->
    <article class="bloque-estadisticas card-magica">
      <h3>Estadísticas del Viaje</h3>
      <div class="grid-stats">
        <div class="stat-item">
          <span class="stat-numero" id="contador-dias">--</span>
          <span class="stat-etiqueta" id="etiqueta-dias">Días que han pasado desde que Kaira comenzó su viaje</span>
        </div>
      </div>
    </article>

    <!-- BLOQUE 5: FORMULARIO DE CONTACTO -->
    <article id="seccion-contacto-form" class="bloque-contacto card-magica">
      <h3>Escríbeme un Mensaje</h3>

      <form action="https://formspree.io/f/xnpjpgoz" method="POST" id="form-contacto-magico" class="form-magico">

        <div class="grupo-campo">
          <label for="nombre">Tu Nombre:</label>
          <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required>
        </div>

        <div class="grupo-campo">
          <label for="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" placeholder="tu_correo@ejemplo.com" required>
        </div>

        <div class="grupo-campo">
          <label for="asunto-contacto">Motivo / Tema:</label>
          <select id="asunto-contacto" name="asunto" required>
            <option value="adquirir">📖 Adquirir ejemplar de la saga</option>
            <option value="dudas">🔮 Pregunta o comentario sobre el universo</option>
            <option value="colaboracion">📜 Colaboración o prensa</option>
            <option value="otro">✨ Otro motivo</option>
          </select>
        </div>

        <div class="grupo-campo">
          <label for="mensaje">Mensaje:</label>
          <textarea id="mensaje" name="mensaje" rows="4" placeholder="Escribe tu mensaje..." required></textarea>
        </div>

        <button type="submit" class="btn-enviar">Enviar Mensaje</button>
      </form>
    </article>
  `;
}


// ============================================================================
// 3. PROCESO CREATIVO (lee datos de window.datosProcesoCreativo)
// ============================================================================
function cargarTarjetasProceso() {
  const contenedor = document.getElementById("grid-proceso-creativo");

  // Si los datos todavía no cargaron, vuelve a intentar en 0.1 segundos
  if (typeof window.datosProcesoCreativo === "undefined" || !Array.isArray(window.datosProcesoCreativo)) {
    setTimeout(cargarTarjetasProceso, 100);
    return;
  }

  if (!contenedor) return;

  contenedor.innerHTML = window.datosProcesoCreativo.map(item => `
    <div class="tarjeta-proceso-mini" data-id="${item.id}">
      <div class="thumb-container">
        <img src="${item.imagen}" alt="${item.titulo}" loading="lazy">
        <div class="thumb-overlay"><span>🔍 Explorar</span></div>
      </div>
      <h4>${item.titulo}</h4>
    </div>
  `).join('');

  // Al hacer clic en una tarjeta se abre su modal
  const tarjetas = contenedor.querySelectorAll(".tarjeta-proceso-mini");
  tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener("click", () => {
      const id = tarjeta.getAttribute("data-id");
      abrirModalProceso(id);
    });
  });
}

function abrirModalProceso(id) {
  if (!window.datosProcesoCreativo) return;

  const item = window.datosProcesoCreativo.find(i => String(i.id) === String(id));
  const modal = document.getElementById("modal-proceso");
  const contenido = document.getElementById("modal-proceso-contenido");

  if (!item || !modal || !contenido) return;

  contenido.innerHTML = `
    <button type="button" class="btn-cerrar-modal" id="btn-cerrar-modal-proceso">✕</button>
    <div class="detalle-proceso-modal">
      <img src="${item.imagen}" alt="${item.titulo}" class="img-modal-proceso">
      <p class="titulo-seccion-sub">${item.subtitulo || ''}</p>
      <h3>${item.titulo}</h3>
      <div class="divisor-mistico"><div class="rombo"></div></div>
      <p class="texto-modal-proceso">${item.descripcion}</p>
    </div>

    <!-- Botón de salida pensado para celular: siempre queda visible abajo -->
    <div class="cierre-modal-proceso">
      <button type="button" class="btn-regresar-proceso" id="btn-regresar-proceso">
        ← Regresa al proceso creativo
      </button>
    </div>
  `;
  // PERSONALIZABLE: el texto del botón de arriba ("← Regresa al proceso creativo")

  // Los botones se crean cada vez, así que sus eventos se asignan aquí
  const btnCerrar = document.getElementById("btn-cerrar-modal-proceso");
  if (btnCerrar) {
    btnCerrar.addEventListener("click", cerrarModalProceso);
  }

  const btnRegresar = document.getElementById("btn-regresar-proceso");
  if (btnRegresar) {
    btnRegresar.addEventListener("click", cerrarModalProceso);
  }

  modal.classList.add("activo");
}

function cerrarModalProceso() {
  const modal = document.getElementById("modal-proceso");
  if (modal) modal.classList.remove("activo");
}

function configurarEventosModalProceso() {
  // Clic en el fondo oscuro (fuera de la caja) cierra el modal
  document.addEventListener("click", (e) => {
    const modal = document.getElementById("modal-proceso");
    if (modal && e.target === modal) {
      cerrarModalProceso();
    }
  });

  // La tecla Escape también lo cierra
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cerrarModalProceso();
    }
  });
}


// ============================================================================
// 4. LIBROS DE LA SAGA (lee datos de window.SAGA_DATA, el mismo de saga.js)
// ----------------------------------------------------------------------------
// Campo "estado" de cada libro en datos_saga.js:
//   "disponible"       → portada, título, botones de contacto
//   "medio_disponible" → etiqueta "En Creación", portada con blur
//   "no_disponible"    → etiqueta "Próximamente"
// ============================================================================
function cargarLibrosSaga() {
  const contenedor = document.getElementById("grid-libros-saga");

  // Si los datos todavía no cargaron, vuelve a intentar en 0.1 segundos
  if (typeof window.SAGA_DATA === "undefined" || !Array.isArray(window.SAGA_DATA)) {
    setTimeout(cargarLibrosSaga, 100);
    return;
  }

  if (!contenedor) return;

  contenedor.innerHTML = window.SAGA_DATA.map(libro => {
    let textoBadge = "";
    let claseBadge = "";
    let textoMensaje = "";

    switch (libro.estado) {
      case "disponible":
        textoBadge = "Disponible";                         // PERSONALIZABLE
        claseBadge = "disponible";
        break;

      case "medio_disponible":
        textoBadge = "En Creación";                        // PERSONALIZABLE
        claseBadge = "en-creacion";
        textoMensaje = "Imaginando y escribiendo...";      // PERSONALIZABLE
        break;

      case "no_disponible":
      default:
        textoBadge = "Próximamente";                       // PERSONALIZABLE
        claseBadge = "no-disponible";
        textoMensaje = "En planificación...";              // PERSONALIZABLE
        break;
    }

    const esDisponible = libro.estado === "disponible";
    const tituloAMostrar = esDisponible ? libro.titulo : `Volumen ${libro.numero}`;
    const imagenAMostrar = esDisponible ? libro.portada : libro.imagen;

    const htmlAcciones = esDisponible ? `
      <div class="acciones-compra">
        <a href="${REDES_CONTACTO.instagram}" target="_blank" rel="noopener" class="btn-compra btn-ig">Instagram</a>
        <a href="${REDES_CONTACTO.facebook}" target="_blank" rel="noopener" class="btn-compra btn-fb">Facebook</a>
        <button type="button" onclick="desplazarAFormulario('${libro.titulo}')" class="btn-compra btn-correo">Enviar Correo</button>
      </div>
    ` : `
      <div class="mensaje-en-creacion">
        <p>✨ ${textoMensaje}</p>
      </div>
    `;

    // data-libro="${libro.id}" es lo que permite que el botón de saga.js
    // ("Toca si quieres llevar el libro") encuentre esta tarjeta.
    return `
      <div class="card-libro ${claseBadge}" data-libro="${libro.id}">
        <span class="badge-estado ${claseBadge}">${textoBadge}</span>
        <div class="portada-container">
          <img src="${imagenAMostrar}" alt="${tituloAMostrar}" loading="lazy">
          ${!esDisponible ? '<div class="overlay-bloqueado">🔒</div>' : ''}
        </div>
        <h4>${tituloAMostrar}</h4>
        ${esDisponible ? `<p class="volumen">Volumen ${libro.numero}</p>` : ''}
        <p class="sinopsis-corta">${libro.frase || ''}</p>
        ${htmlAcciones}
      </div>
    `;
  }).join('');
}


// ============================================================================
// 5. UTILIDADES (ir al formulario y contadores)
// ============================================================================

/** "Enviar Correo": lleva al formulario y lo deja listo para pedir el libro */
function desplazarAFormulario(tituloLibro = '') {
  const form = document.getElementById("seccion-contacto-form");
  const selectAsunto = document.getElementById("asunto-contacto");
  const campoMensaje = document.getElementById("mensaje");

  if (selectAsunto) {
    selectAsunto.value = "adquirir";
  }

  // Si el mensaje está vacío, lo pre-llena con el libro elegido
  if (tituloLibro && campoMensaje && !campoMensaje.value) {
    campoMensaje.value = `¡Hola Irene! Me gustaría adquirir un ejemplar de "${tituloLibro}". `;   // PERSONALIZABLE
  }

  if (form) {
    // Si saga.js está cargado, usamos su scroll (cuenta la barra fija);
    // si no, el scroll normal del navegador.
    if (typeof window.scrollAElemento === "function") {
      window.scrollAElemento(form);
    } else {
      form.scrollIntoView({ behavior: "smooth" });
    }
  }
}

/** Calcula los días del viaje (cuenta regresiva antes del lanzamiento, días transcurridos después) */
async function inicializarContadores() {

  // --- Contador de días del viaje de Kaira ---
  const elDias = document.getElementById("contador-dias");
  const elEtiquetaDias = document.getElementById("etiqueta-dias");
  if (elDias && elEtiquetaDias) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);   // compara días completos, sin horas
    const dias = Math.round((hoy - FECHA_INICIO_VIAJE) / (1000 * 60 * 60 * 24));

    if (dias < 0) {
      // Antes del lanzamiento: cuenta regresiva
      const faltan = -dias;
      elDias.innerText = faltan.toLocaleString();
      // PERSONALIZABLE: textos de la cuenta regresiva
      elEtiquetaDias.innerText = faltan === 1
        ? "Día para que comience la aventura de Kaira"
        : "Días para que comience la aventura de Kaira";
    } else if (dias === 0) {
      // El día del lanzamiento
      // PERSONALIZABLE: textos del día del lanzamiento
      elDias.innerText = "¡Hoy!";
      elEtiquetaDias.innerText = "La aventura de Kaira comienza hoy";
    } else {
      // Después del lanzamiento: días transcurridos
      elDias.innerText = dias.toLocaleString();
      // PERSONALIZABLE: textos de días transcurridos
      elEtiquetaDias.innerText = dias === 1
        ? "Día que ha pasado desde que Kaira inició su aventura"
        : "Días que han pasado desde que Kaira inició su aventura";
    }
  }
}


// ============================================================================
// 6. FUNCIONES GLOBALES
// (necesarias porque el HTML generado usa onclick="..." y otros archivos
// llaman a estas funciones)
// ============================================================================
window.cargarTarjetasProceso = cargarTarjetasProceso;
window.abrirModalProceso = abrirModalProceso;
window.cerrarModalProceso = cerrarModalProceso;
window.cargarLibrosSaga = cargarLibrosSaga;
window.desplazarAFormulario = desplazarAFormulario;