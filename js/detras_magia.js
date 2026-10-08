// js/detras_magia.js

/* ==========================================================================
   1. INICIALIZACIÓN (Punto de entrada al cargar la página)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderizarEstructuraHTML(); // Inyecta el contenedor HTML base
  cargarTarjetasProceso();    // Dibuja las tarjetas del Proceso Creativo
  cargarLibrosSaga();         // Dibuja los libros desde window.SAGA_DATA
  inicializarContadores();    // Calcula y muestra las estadísticas
  configurarEventosModalProceso(); // Configura eventos de cierre aislados
});


/* ==========================================================================
   2. INYECCIÓN DEL HTML BASE (Estructura general de la sección)
   ========================================================================== */
function renderizarEstructuraHTML() {
  const contenedor = document.getElementById("contenedor-detras-magia");
  if (!contenedor) return;

  contenedor.innerHTML = `
    <!-- BLOQUE 1: BIOGRAFÍA -->
    <article class="bloque-biografia card-magica">
      <div class="bio-imagen">
        <img src="imagenes_principal/detras_magia/foto.jpeg" alt="Retrato de la autora" loading="lazy">
      </div>
      <div class="bio-texto">
        <h3>Sobre la Autora</h3>
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

    <!-- BLOQUE 2: PROCESO CREATIVO (Galería dinámica) -->
    <article class="bloque-proceso card-magica">
      <h3>El proceso creativo</h3>
      <p class="instrucciones-proceso">Toca cada tarjeta para asomarte a los secretos que se esconden más allá de lo que lees.</p>
      <div id="grid-proceso-creativo" class="grid-proceso-miniaturas"></div>
    </article>

   <!-- VENTANA EMERGENTE (MODAL) PARA EL PROCESO CREATIVO -->
    <div id="modal-proceso" class="modal-proceso-creativo">
      <div id="modal-proceso-contenido" class="modal-contenido"></div>
    </div>

    <!-- BLOQUE 3: LIBROS DE LA SAGA (Cargados desde window.SAGA_DATA) -->
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
          <span class="stat-numero" id="contador-visitas">...</span>
          <span class="stat-etiqueta">Viajeros que han visitado este mundo</span>
        </div>
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


/* ==========================================================================
   3. PROCESO CREATIVO (Lee datos de window.datosProcesoCreativo)
   ========================================================================== */
function cargarTarjetasProceso() {
  const contenedor = document.getElementById("grid-proceso-creativo");

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
  `;

  // Asignar evento al botón de cerrar dinámico
  const btnCerrar = document.getElementById("btn-cerrar-modal-proceso");
  if (btnCerrar) {
    btnCerrar.addEventListener("click", cerrarModalProceso);
  }

  modal.classList.add("activo");
}

function cerrarModalProceso() {
  const modal = document.getElementById("modal-proceso");
  if (modal) modal.classList.remove("activo");
}

function configurarEventosModalProceso() {
  // Evento aislado únicamente si el modal de Proceso está abierto y se hace clic en él
  document.addEventListener("click", (e) => {
    const modal = document.getElementById("modal-proceso");
    if (modal && e.target === modal) {
      cerrarModalProceso();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cerrarModalProceso();
    }
  });
}


/* ==========================================================================
   4. SECCIÓN LIBROS DE LA SAGA (Lee datos de window.SAGA_DATA)
   ========================================================================== */

const REDES_CONTACTO = {
  instagram: "https://www.instagram.com/irene.nacher/",
  facebook: "https://www.facebook.com/irene.nacher/",
  email: "irenenacher@yahoo.com.mx"
};

function cargarLibrosSaga() {
  const contenedor = document.getElementById("grid-libros-saga");

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
        textoBadge = "Disponible";
        claseBadge = "disponible";
        break;

      case "medio_disponible":
        textoBadge = "En Creación";
        claseBadge = "en-creacion";
        textoMensaje = "Imaginando y escribiendo...";
        break;

      case "no_disponible":
      default:
        textoBadge = "Próximamente";
        claseBadge = "no-disponible";
        textoMensaje = "En planificación...";
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

    return `
      <div class="card-libro ${claseBadge}">
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


/* ==========================================================================
   5. UTILIDADES SECUNDARIAS (Estadísticas reales y desplazamiento)
   ========================================================================== */

function desplazarAFormulario(tituloLibro = '') {
  const form = document.getElementById("seccion-contacto-form");
  const selectAsunto = document.getElementById("asunto-contacto");
  const campoMensaje = document.getElementById("mensaje");

  if (selectAsunto) {
    selectAsunto.value = "adquirir";
  }

  if (tituloLibro && campoMensaje && !campoMensaje.value) {
    campoMensaje.value = `¡Hola Irene! Me gustaría adquirir un ejemplar de "${tituloLibro}". `;
  }

  if (form) {
    form.scrollIntoView({ behavior: "smooth" });
  }
}

// Inicialización de contadores de días y visitas REALES GLOBALES
async function inicializarContadores() {
  //A) Contador de días del viaje de Kaira
  const elDias = document.getElementById("contador-dias");
  const elEtiquetaDias = document.getElementById("etiqueta-dias");
  if (elDias && elEtiquetaDias) {
    // PERSONALIZABLE: fecha de inicio (año, mes, día). OJO: los meses empiezan en 0 (enero = 0, noviembre = 10)
    const fechaInicio = new Date(2026, 10, 14);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // compara días completos, sin horas
    const dias = Math.round((hoy - fechaInicio) / (1000 * 60 * 60 * 24));

    if (dias < 0) {
      // Antes del lanzamiento: cuenta regresiva
      const faltan = -dias;
      elDias.innerText = faltan.toLocaleString();
      // PERSONALIZABLE: textos de la cuenta regresiva
      elEtiquetaDias.innerText = faltan === 1
        ? "Día para que Kaira comience su viaje"
        : "Días para que Kaira comience su viaje";
    } else if (dias === 0) {
      // El día del lanzamiento
      // PERSONALIZABLE: textos del día del lanzamiento
      elDias.innerText = "¡Hoy!";
      elEtiquetaDias.innerText = "Kaira comienza su viaje";
    } else {
      // Después del lanzamiento: días transcurridos
      elDias.innerText = dias.toLocaleString();
      // PERSONALIZABLE: textos de días transcurridos
      elEtiquetaDias.innerText = dias === 1
        ? "Día que ha pasado desde que Kaira comenzó su viaje"
        : "Días que han pasado desde que Kaira comenzó su viaje";
    }
  }
    // B) Contador de visitas
  const elVisitas = document.getElementById("contador-visitas");
  if (elVisitas) {
    // PERSONALIZABLE: visitas REALES contadas antes de este contador (si no hay, déjalo en 0)
    const BASE_INICIAL = 0;

    // PERSONALIZABLE: identificador de tu proyecto y nombre del contador
    // (cuando termines de probar, cambia "visitas" por "visitas-lanzamiento" para empezar desde cero)
    const NAMESPACE = "el-legado-de-la-magia-saga";
    const NOMBRE_CONTADOR = "visitas";

    try {
      // Si este navegador ya visitó antes, solo LEE el número; si es nuevo, SUMA una visita
      const yaVisito = localStorage.getItem("ya_visito_el_mundo");
      const accion = yaVisito ? "" : "/up";

      const respuesta = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${NOMBRE_CONTADOR}${accion}`);
      if (!respuesta.ok) {
        throw new Error(`Estado HTTP: ${respuesta.status}`);
      }

      const datos = await respuesta.json();
      const total = (datos.count || 0) + BASE_INICIAL;

      localStorage.setItem("ya_visito_el_mundo", "si");
      localStorage.setItem("ultima_cifra_global", total.toString());
      elVisitas.innerText = total.toLocaleString();

    } catch (error) {
      // Si falla la red o AdBlock bloquea el servicio: última cifra guardada, o un guion
      const ultimaCifra = localStorage.getItem("ultima_cifra_global");
      elVisitas.innerText = ultimaCifra ? parseInt(ultimaCifra, 10).toLocaleString() : "—";
    }
  }
}


/* ==========================================================================
   6. EXPOSICIÓN GLOBAL
   ========================================================================== */
window.cargarTarjetasProceso = cargarTarjetasProceso;
window.abrirModalProceso = abrirModalProceso;
window.cerrarModalProceso = cerrarModalProceso;
window.cargarLibrosSaga = cargarLibrosSaga;
window.desplazarAFormulario = desplazarAFormulario;