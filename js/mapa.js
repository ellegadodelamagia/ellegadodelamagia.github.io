/* =========================================================================
   🧭 EL ATLAS MÍSTICO — MOTOR CARTOGRÁFICO DE LA SAGA (js/mapa.js)
   ========================================================================= */

/* =========================================================================
   🔮 BITÁCORA DE EXPANSIÓN: FUTUROS LIBROS Y REGISTROS
   =========================================================================
   Cuando comiences a escribir los siguientes volúmenes de la saga y desees
   expandir este mapa interactivo, este es tu mapa de ruta de 3 pasos:

   PASO 1: LA BASE DE DATOS (js/lugares.js)
   • Abre tu archivo de datos y añade las nuevas ubicaciones al final.
   • Asegúrate de llenar la columna "Imagen" con el nombre del archivo (ej: 'reino-tomo2.jpg').
   • IMPORTANTÍSIMO: Para activar el filtro por tomos, asegúrate de que tus registros 
     tengan una columna llamada "Libro" con el número correspondiente (ej: 1, 2, 3).
     Si un lugar sale en varios libros, puedes poner "1" (su primera aparición).

   PASO 2: LOS HILOS DE COLOR (css/estilos.css)
   • Si agregaste un nuevo tipo de magia, ve a tu 'estilos.css' y, bajo ':root',
     añade su color místico para que el mapa sepa pintar la bolita.
     Ejemplo: --c-nigromancia: #4a0e4e;

   PASO 3: EL CÓDIGO DE ESTE ARCHIVO (js/mapa.js)
   • El código ahora es 100% AUTOMÁTICO para los libros. En cuanto el sistema detecte
     un "Libro: 2" en tu js/lugares.js, creará el botón abajo mágicamente.
   ========================================================================= */

// -------------------------------------------------------------------------
// 1. CONFIGURACIÓN DE PARÁMETROS MÁGICOS (Constantes de Zoom)
// -------------------------------------------------------------------------
const ZOOM_INDIVIDUAL = 14;     
const ZOOM_MAX_PADRE = 13;      
const ZOOM_MAX_GLOBAL = 13;     

// Variable global para rastrear qué libro está seleccionado (null = Todos)
let LIBRO_ACTIVO = null;


// -------------------------------------------------------------------------
// 2. EL LIENZO DEL MUNDO (Inicialización de Leaflet)
// -------------------------------------------------------------------------
const map = L.map('map', {
    center: [35, 0],              
    zoom: 3,                      
    zoomControl: false,           
    minZoom: 3,                   
    maxZoom: 15,                  
    maxBounds: L.latLngBounds(L.latLng(-80, -200), L.latLng(82, 200)), 
    maxBoundsViscosity: 0.9       
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    minZoom: 3,
    bounds: L.latLngBounds(L.latLng(-80, -180), L.latLng(85, 180)), 
    noWrap: true                  
}).addTo(map);                    

L.control.zoom({ position: 'bottomright' }).addTo(map);

let PLACES = [];                  
let activeId = null;              
const markerMap = {};             
const limites = L.featureGroup().addTo(map); 

/// 🌟 Cuando el mapa esté completamente cargado y listo...
map.whenReady(function() {
    const pantallaCarga = document.getElementById('pantalla-carga');
    if (pantallaCarga) {
        // ⏳ Esperamos 1.5 segundos (1500ms) para dar tiempo a que se pinten las imágenes del mapa
        setTimeout(() => {
            // Le aplicamos una transición de desvanecido
            pantallaCarga.style.opacity = '0';
            pantallaCarga.style.visibility = 'hidden';
            
            // La borramos del diseño medio segundo después (500ms) para que no estorbe los clics
            setTimeout(() => {
                pantallaCarga.remove();
            }, 500);
            
        }, 1500); // <-- Puedes subir este número a 2000 si notas que tu internet tarda un poco más
    }
});


// -------------------------------------------------------------------------
// 3. CONECTAR LA BASE DE DATOS (js/lugares.js)
// -------------------------------------------------------------------------
function cargarBaseDeDatos() {
    PLACES = DATOS_LUGARES;
    console.log("¡Éxito místico! Datos conectados. Total:", PLACES.length);
    
    // Inicializamos la interfaz de libros primero
    crearNavegacionLibros();
    // Renderizamos los elementos generales
    renderizarElementos(PLACES);

    if (PLACES.length === 0) {
        map.setView([35, -15], 3);
    }
}


// -------------------------------------------------------------------------
// 4. EL MAESTRO DE ARMAS: CONSTRUCCIÓN DE INTERFAZ (Filtros y Divisiones)
// -------------------------------------------------------------------------
function renderizarElementos(listaDeLugares) {
    const parentContainer = document.getElementById('sidebar-parents');
    const listContainer = document.getElementById('sidebar-list');
    
    if (parentContainer) parentContainer.innerHTML = '';
    if (listContainer) listContainer.innerHTML = '';
    limites.clearLayers(); 

    // FILTRO FILOSÓFICO: Si hay un libro seleccionado, filtramos
    const datosFiltradosPorLibro = LIBRO_ACTIVO 
        ? listaDeLugares.filter(i => parseInt(i.Libro) === parseInt(LIBRO_ACTIVO) || i.tipo_de_registro === "Padre")
        : listaDeLugares;

    // Separamos padres e hijos legítimos
    const padres = datosFiltradosPorLibro.filter(i => i.tipo_de_registro === "Padre" && !i.Lugar.toLowerCase().includes('panah'));
    const hijos = datosFiltradosPorLibro.filter(i => i.tipo_de_registro !== "Padre");

    // Guardamos los ocultos místicas (como Panah)
    const ocultos = datosFiltradosPorLibro.filter(i => i.Lugar.toLowerCase().includes('panah') || (i.tipo_de_registro !== "Padre" && (!i.latitud || !i.longitud)));

    padres.sort((a, b) => (a.Orden || 999) - (b.Orden || 999));

    /* A. BOTÓN MAESTRO: "TODOS" */
    const todoBtn = document.createElement('div');
    todoBtn.className = 'p-item';
    todoBtn.innerHTML = `<b>TODOS</b>`;
    todoBtn.onclick = () => {
        // 1. Apagar todos los botones dorados de países y encender este
        document.querySelectorAll('.p-item').forEach(el => el.classList.remove('active-filter'));
        todoBtn.classList.add('active-filter');

        // 2. 🌟 NUEVO: Apagar por completo todos los botones plateados de magias
        document.querySelectorAll('.btn-silver').forEach(b => b.classList.remove('active'));

        const mapEl = document.getElementById('map');
        if (mapEl) {
            mapEl.classList.remove('mapa-espiritual');
            mapEl.style.filter = 'none';
            mapEl.style.webkitFilter = 'none';
        }
        
        // ✨ CORRECCIÓN: Pasamos TODOS los hijos para que Panah no se borre de la lista lateral
        renderizarFiltrados(hijos); 
        
        if (typeof map !== 'undefined') map.flyTo([20, 0], 3, { animate: true, duration: 1.5 }); 
    };
    if (parentContainer) parentContainer.appendChild(todoBtn);

    /* 🔮 BOTÓN EXCLUSIVO: "DIMENSIÓN PANAH" */
    if (ocultos.length > 0) {
        const ocultosBtn = document.createElement('div');
        ocultosBtn.className = 'p-item';
        ocultosBtn.innerHTML = `<b>✨ DIMENSIÓN PANAH</b>`; 
        ocultosBtn.onclick = () => {
            // 1. Apagar los otros botones dorados y encender el de Panah
            document.querySelectorAll('.p-item').forEach(el => el.classList.remove('active-filter'));
            ocultosBtn.classList.add('active-filter');

            // 2. 🌟 NUEVO: Apagar todos los botones plateados de magias al entrar a Panah
            document.querySelectorAll('.btn-silver').forEach(b => b.classList.remove('active'));

            const mapEl = document.getElementById('map');
            if (mapEl) {
                mapEl.classList.add('mapa-espiritual');
                mapEl.style.filter = 'blur(8px)';
                mapEl.style.webkitFilter = 'blur(8px)';
            }
            renderizarFiltrados(ocultos);
        };
        if (parentContainer) parentContainer.appendChild(ocultosBtn);
    }

    /* B. GENERACIÓN DE BOTONES DE FILTRADO (Países/Regiones) */
padres.forEach(item => {
    const hijosFiltrados = hijos.filter(h => h.Padre == item.ID);
    
   
    if (LIBRO_ACTIVO && hijosFiltrados.length === 0) return; 

    const pBtn = document.createElement('div');
    pBtn.className = 'p-item';
    
    let ciudadVisible = item.Ciudad;
    if (!ciudadVisible && hijosFiltrados.length > 0) {
        ciudadVisible = hijosFiltrados[0].Ciudad; 
    }
    
    const nombreVisible = ciudadVisible ? `${item.Pais} - ${ciudadVisible}` : item.Pais;
    pBtn.innerHTML = `<b>${nombreVisible}</b>`;
    
    pBtn.onclick = () => {
        // 1. Apagar los otros botones dorados de países y encender este
        document.querySelectorAll('.p-item').forEach(el => el.classList.remove('active-filter'));
        pBtn.classList.add('active-filter');   

        // 2. 🌟 APAGADOR CRUZADO: Apagar por completo todos los botones plateados de magias
        document.querySelectorAll('.btn-silver').forEach(b => b.classList.remove('active'));

        const mapEl = document.getElementById('map');
        if (mapEl) {
            mapEl.classList.remove('mapa-espiritual');
            mapEl.style.filter = 'none';
            mapEl.style.webkitFilter = 'none';
        }

        map.flyTo([20, 0], 3, { animate: true, duration: 2.0 });

        setTimeout(() => {
            renderizarFiltrados(hijosFiltrados);

            const coordenadasReales = hijosFiltrados
                .filter(h => h.latitud && h.longitud)
                .map(h => [parseFloat(h.latitud), parseFloat(h.longitud)]);

            if (coordenadasReales.length > 1) {
                map.flyToBounds(coordenadasReales, { 
                    padding: [50, 50], 
                    maxZoom: ZOOM_MAX_PADRE, 
                    animate: true,
                    duration: 1.8,
                    easeLinearity: 0.25
                });
            } else if (coordenadasReales.length === 1) {
                map.flyTo(coordenadasReales[0], ZOOM_INDIVIDUAL, { animate: true, duration: 1.8 });
            }
        }, 1600);
    };
    if (parentContainer) parentContainer.appendChild(pBtn);
});

/* =========================================================================
   🔮 GENERACIÓN 100% AUTOMÁTICA DE BOTONES DE MAGIA DESDE LUGARES.JS
   ========================================================================= */
if (parentContainer && typeof hijos !== 'undefined') {
    
    // 1. Extraemos todas las magias reales que existen en lugares.js
    const magiasUnicas = new Set();
    
    hijos.forEach(h => {
        if (h.Tipo_de_magia) {
            magiasUnicas.add(h.Tipo_de_magia.trim());
        }
    });

    // 2. Creamos el contenedor exclusivo para las magias
    const contenedorMagia = document.createElement('div');
    contenedorMagia.id = 'filtros-magia';
    contenedorMagia.className = 'silver-filter-container';

    // 3. Generamos un botón plateado por cada magia del archivo
    magiasUnicas.forEach(magiaTexto => {
        // ID limpio para comparar (ej: "vortice-de-magia")
        const magiaID = magiaTexto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');

        const mBtn = document.createElement('button');
        mBtn.className = 'btn-silver';
        mBtn.textContent = magiaTexto; // Muestra el nombre bonito original

/* 🎨 ASIGNACIÓN DE COLOR MÁGICO:
           Apuntamos directamente a la variable CSS correspondiente (--c-vortice-de-magia, etc.).
           Le ponemos un fondo sutil usando una versión translúcida para que no sature la vista. */
        mBtn.style.backgroundColor = `var(--c-${magiaID})`;
        mBtn.style.borderColor = `color-mix(in srgb, var(--c-${magiaID}) 60%, #a6b1c2)`;
        mBtn.style.color = '#ffffff'; /* Texto blanco para asegurar legibilidad */

        mBtn.onclick = () => {
            // A. Apagar los demás botones plateados y activar este
            document.querySelectorAll('.btn-silver').forEach(b => b.classList.remove('active'));
            mBtn.classList.add('active');

            // B. 🌟 APAGADOR CRUZADO: Apagar todos los botones dorados de países/regiones
            document.querySelectorAll('.p-item').forEach(el => el.classList.remove('active-filter'));
            
            // C. Filtrar el mapa con la magia seleccionada
            filtrarPorMagiaBoton(magiaID);
        };

        contenedorMagia.appendChild(mBtn);
    });

    // 4. Lo colocamos abajo del contenedor de los países
    parentContainer.after(contenedorMagia);
}

// 5. La función del filtro que redibuja tu mapa usando tu sistema real
function filtrarPorMagiaBoton(magiaSeleccionada) {
    if (typeof hijos === 'undefined') return;

    if (magiaSeleccionada === 'todas') {
        // Si elige todas, vuelve a mostrar todos los lugares del archivo
        renderizarFiltrados(hijos);
    } else {
        // Si elige una magia, filtramos el array de lugares.js
        const filtradosPorMagia = hijos.filter(h => {
            if (!h.Tipo_de_magia) return false;
            
            const magiaLimpia = h.Tipo_de_magia.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
            return magiaLimpia === magiaSeleccionada;
        });

        // Tu función nativa limpia el mapa y dibuja solo los que coinciden
        renderizarFiltrados(filtradosPorMagia);
    }
}

    // ==========================================
    // ✨ EJECUCIÓN INICIAL AL CARGAR LA INTERFAZ
    // ==========================================
    const mapEl = document.getElementById('map');
    if (mapEl) {
        mapEl.classList.remove('mapa-espiritual');
        mapEl.style.filter = 'none';
        mapEl.style.webkitFilter = 'none';
    }
    
    // Mostramos la lista completa por defecto (Panah incluido)
    renderizarFiltrados(hijos);
}
        

function aplicarOffsetEspiral(lista) {
    const grupos = {};
    lista.forEach(item => {
        // Si es Panah o no tiene coordenadas, nos saltamos el cálculo del offset en espiral
        if (!item.latitud || !item.longitud) return;
        
        const key = `${item.latitud},${item.longitud}`;
        if (!grupos[key]) grupos[key] = [];
        grupos[key].push(item);
    });

    Object.values(grupos).forEach(grupo => {
        if (grupo.length <= 1) return;
        const radio = 0.003; 
        grupo.forEach((item, i) => {
            const angulo = (2 * Math.PI / grupo.length) * i;
            item._lat = parseFloat(item.latitud) + radio * Math.sin(angulo);
            item._lng = parseFloat(item.longitud) + radio * Math.cos(angulo);
        });
    });
}

// -------------------------------------------------------------------------
// 5. EL ESCRIBANO: PROCESAMIENTO Y DIBUJO DE FILTRADOS
// -------------------------------------------------------------------------
function renderizarFiltrados(listaFiltrada) { 
    const listContainer = document.getElementById('sidebar-list');
    if (listContainer) listContainer.innerHTML = ''; 
    limites.clearLayers(); 

    const detailEl = document.getElementById('detail');
    if (detailEl) detailEl.classList.remove('open');

    if (typeof map !== 'undefined') map.closePopup();

    // Aseguramos que la ordenación no rompa el ciclo si un elemento no tiene orden o es Panah
    listaFiltrada.sort((a, b) => {
        const ordenA = parseInt(a.Orden) || 999; // Si no tiene orden, va al final
        const ordenB = parseInt(b.Orden) || 999;
        return ordenA - ordenB;
    });

    aplicarOffsetEspiral(listaFiltrada);

    listaFiltrada.forEach((item) => {
        // ✨ AQUÍ SE HACE LA MAGIA: Convierte a minúsculas, limpia espacios y BORRA ACENTOS para el CSS
        const magia = item.Tipo_de_magia 
            ? item.Tipo_de_magia.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-') 
    : 'default';

        const desc = item.Descripcion_corta || "Los detalles de este rincón del mundo aún no han sido descritos.";
        const capTexto = item.Capitulo ? `Capítulo ${item.Capitulo}` : "Sin Capítulo";
        
        // ✍️ NOTA: Esta línea la dejamos IGUAL para que en el Grimorio sí aparezca con acento y en mayúsculas ("VÓRTICE")
        const tipoMagia = item.Tipo_de_magia ? item.Tipo_de_magia.trim() : 'Ninguna';
                
        const ciudadTexto = item.Ciudad || item.ciudad || 'Desconocida';
        const rutaImagen = (item.Imagen || item.imagen) ? `imagenes/${item.Imagen || item.imagen}` : '';listaFiltrada.forEach((item) => {
        });

        const abrirDetallesGrimorio = () => {
            const detName = document.getElementById('det-name');
            const detLoc = document.getElementById('det-loc');
            const detCap = document.getElementById('det-cap');
            const detDesc = document.getElementById('det-desc');
            const detImg = document.getElementById('det-img');
            const detPlaceholder = document.getElementById('det-img-placeholder');
            const detBadge = document.getElementById('det-badge');

            if (detailEl) {
                if (detName) detName.innerHTML = `${item.Orden ? item.Orden + '. ' : ''}${item.Lugar}`;
                if (detLoc) detLoc.innerHTML = `${item.Pais || 'Plano Astral'}`;
                if (detCap) detCap.innerHTML = capTexto;
                if (detDesc) detDesc.innerHTML = desc;

                if (rutaImagen) {
                    if (detImg) { detImg.src = rutaImagen; detImg.style.display = 'block'; }
                    if (detPlaceholder) detPlaceholder.style.display = 'none';
                } else {
                    if (detImg) detImg.style.display = 'none';
                    if (detPlaceholder) detPlaceholder.style.display = 'flex';
                }
            }

                if (detBadge) {
    detBadge.innerHTML = `${tipoMagia}`;
                                     
    // ✨ EL CONJURO DIRECTO: Forzamos al elemento a respetar las minúsculas de tu Excel
    detBadge.style.textTransform = 'none'; 

    detBadge.style.backgroundColor = 
    `color-mix(in srgb, var(--c-${magia}) 20%, transparent)`;
    detBadge.style.color = 
    magia === 'poder-celestial' ? 'var(--gold-dim)' : `var(--c-${magia})`;
    detBadge.style.border = 
    `1px solid color-mix(in srgb, var(--c-${magia}) 50%, transparent)`;
}

// ⏳ Reiniciamos la animación del panel
detailEl.classList.remove('open');
setTimeout(() => {
    detailEl.classList.add('open');
}, 1200);

// 🛡️ ENCLAVE DE SEGURIDAD PARA EL TACHE
// Buscamos tu tache por su ID "det-close" y le devolvemos la vida
const btnCerrarInfo = document.getElementById('det-close'); 

if (btnCerrarInfo) {
    btnCerrarInfo.onclick = () => {
        detailEl.classList.remove('open'); // Quita la clase 'open' para cerrar el Grimorio de verdad
    };
}
        
            if (detImg) { 
                    detImg.src = rutaImagen; 
                    detImg.style.display = 'block'; 
                    detImg.style.cursor = 'zoom-in';
                    detImg.onclick = () => openLightbox(rutaImagen, item.Lugar, `var(--c-${magia})`);
            }
        };

        if (item.latitud && item.longitud) {
            const lat = item._lat || parseFloat(item.latitud);
            const lng = item._lng || parseFloat(item.longitud);

           if (!isNaN(lat) && !isNaN(lng)) {
                const coords = [lat, lng];
                const esDuplicado = item._lat !== undefined;
                const tamano = esDuplicado ? 24 : 36;

                // 👇 CONJURO DE LIMPIEZA: Agrega esta línea justo arriba de const iconoPersonalizado
        const magia = item.Tipo_de_magia 
            ? item.Tipo_de_magia.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-') 
            : 'default';

        const iconoPersonalizado = L.divIcon({
            className: 'marcador-magico-contenedor', 
            html: `<div class="pin-wrap" id="pw-${item.ID}">
         <div class="bolita-magica" style="background-color: 
         var(--c-${magia}); width:${tamano}px; height:${tamano}px;">
           <span class="bolita-numero">${item.Orden || ''}</span>
         </div>
         <div class="pin-stem" style="background: var(--c-${magia})"></div>
       </div>`,
            iconSize: [tamano, tamano + 7], 
            iconAnchor: [tamano/2, tamano + 7] 
        });
            
            
                const marcador = L.marker(coords, { icon: iconoPersonalizado });
                if (typeof markerMap !== 'undefined') markerMap[item.ID] = marcador;
                limites.addLayer(marcador);

                marcador.on('click', (e) => {
                    document.querySelectorAll('.bolita-magica').forEach(el => el.classList.remove('active'));
                    e.target.getElement().querySelector('.bolita-magica').classList.add('active');

                    if (typeof map !== 'undefined') {
                        map.flyTo(coords, ZOOM_INDIVIDUAL, { 
                            animate: true, 
                            duration: 1.5 
                        });
                    }
                    abrirDetallesGrimorio();
                });
            }
        }

        const itemLista = document.createElement('div');
        itemLista.className = 'si-item'; 
        const esPadre = item.tipo_de_registro === "Padre";
        const subTexto = esPadre ? "Ciudad" : capTexto.toUpperCase();

        itemLista.innerHTML = `
            <div class="si-num"><b>${item.Orden || '-'}</b></div> 
            <div class="si-content">
                <div class="si-name">${item.Lugar}</div>
                <div class="si-loc">${item.Pais || 'Plano Oculto'}</div>
                <div class="si-cap">${subTexto}</div>
            </div>
            <span class="si-dot" style="background: var(--c-${magia})"></span>
        `;

 // ==========================================
        // 🔮 INTERCEPCIÓN EXACTA PARA EL REINO DE PANAH
        // ==========================================
        itemLista.addEventListener('click', () => {
            const mapEl = document.getElementById('map');
            
            // Evaluamos con su ID real en la base de datos
            const esPanah = item.ID === "PANAH-01";

            if (esPanah) {
                // 1. Caso Panah: Clavamos el blur de inmediato sin mover el mapa físico
                if (mapEl) {
                    mapEl.classList.add('mapa-espiritual');
                    mapEl.style.filter = 'blur(8px)';
                    mapEl.style.webkitFilter = 'blur(8px)';
                }
                document.querySelectorAll('.bolita-magica').forEach(el => el.classList.remove('active'));
            } else {
                // 2. Caso normal: Quitamos el blur y volamos al destino material
                if (mapEl) {
                    mapEl.classList.remove('mapa-espiritual');
                    mapEl.style.filter = 'none';
                    mapEl.style.webkitFilter = 'none';
                }
                
                if (item.latitud && item.longitud && typeof map !== 'undefined') {
                    const lat = parseFloat(item.latitud);
                    const lng = parseFloat(item.longitud);
                    if (!isNaN(lat) && !isNaN(lng)) {
                        map.flyTo([lat, lng], ZOOM_INDIVIDUAL, { animate: true, duration: 1.2 });
                    }
                } else if (typeof map !== 'undefined') {
                    map.setView([25, -10], 3); 
                }
            }
            
            abrirDetallesGrimorio();
        });
        
        if (listContainer) listContainer.appendChild(itemLista);
    }); // 👈 AQUÍ: Cerramos el listaFiltrada.forEach((item) => {

    // ==========================================
    // 🌍 ENCUADRE FINAL DEL MAPA (Modificado para PANAH-01)
    // ==========================================
    const tieneSoloPanah = listaFiltrada.length === 1 && listaFiltrada[0].ID === "PANAH-01";
    const mapEl = document.getElementById('map');

    if (tieneSoloPanah) {
        if (mapEl) {
            mapEl.classList.add('mapa-espiritual');
            mapEl.style.filter = 'blur(8px)';
            mapEl.style.webkitFilter = 'blur(8px)';
        }
    } else if (typeof map !== 'undefined' && limites.getLayers().length > 0) {
        if (mapEl) {
            mapEl.classList.remove('mapa-espiritual');
            mapEl.style.filter = 'none';
            mapEl.style.webkitFilter = 'none';
        }

        map.flyToBounds(limites.getBounds(), { 
            padding: [40, 40], 
            maxZoom: ZOOM_MAX_GLOBAL,
            animate: true,
            duration: 1.8,
            easeLinearity: 0.25
        });
    }
} // Cierre definitivo de la función


// -------------------------------------------------------------------------
// 📜 NUEVA SECCIÓN 7: FILTRADO CRONOLÓGICO POR LIBROS (AUTOMÁTICO)
// -------------------------------------------------------------------------
function crearNavegacionLibros() {
    // Buscamos o creamos un contenedor abajo en la barra lateral para los libros
    let contenedorLibros = document.getElementById('sidebar-books');
    
    if (!contenedorLibros) {
        contenedorLibros = document.createElement('div');
        contenedorLibros.id = 'sidebar-books';
        // Estilo rápido en línea para fijarlo abajo; muévelo a tu CSS si lo deseas
        contenedorLibros.style.cssText = "display: flex; gap: 10px; padding: 15px; background: #1a1208; border-top: 1px solid #d4af37; justify-content: center;";
        
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.appendChild(contenedorLibros);
    }
    
    contenedorLibros.innerHTML = '';

    // Extraemos de forma única qué libros existen en el Excel (ignorando vacíos)
    const librosExistentes = [...new Set(PLACES.map(i => parseInt(i.Libro)).filter(l => !isNaN(l)))];
    librosExistentes.sort((a, b) => a - b);

    if (librosExistentes.length <= 1) {
        // Si solo hay datos de un solo libro, no mostramos la barra todavía
        contenedorLibros.style.display = 'none';
        return;
    } else {
        contenedorLibros.style.display = 'flex';
    }

    // ==========================================
    // 🌍 BOTÓN GLOBAL DE LIBROS (COMPENDIO TOTAL)
    // ==========================================
    const btnTodosLibros = document.createElement('button');
    btnTodosLibros.innerHTML = "COMPENDIO TOTAL";
    btnTodosLibros.style.cssText = "background: transparent; border: 1px solid #d4af37; color: #d4af37; padding: 5px 10px; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: bold;";
    btnTodosLibros.onclick = () => {
        LIBRO_ACTIVO = null;

        // Quitamos el brillo a los filtros de países de arriba
        document.querySelectorAll('.p-item').forEach(el => el.classList.remove('active-filter'));

        // Forzamos al mapa a recuperar su nitidez material por si veníamos de Panah
        const mapEl = document.getElementById('map');
        if (mapEl) {
            mapEl.classList.remove('mapa-espiritual');
            mapEl.style.filter = 'none';
            mapEl.style.webkitFilter = 'none';
        }

        renderizarElementos(PLACES);
    };
    contenedorLibros.appendChild(btnTodosLibros);

    // ==========================================
    // 📖 BOTONES POR CADA LIBRO DETECTADO
    // ==========================================
    librosExistentes.forEach(numLibro => {
        const btnLibro = document.createElement('button');
        btnLibro.innerHTML = `LIBRO ${numLibro}`;
        btnLibro.style.cssText = "background: transparent; border: 1px solid #d4af37; color: #d4af37; padding: 5px 10px; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: bold;";
        btnLibro.onclick = () => {
            LIBRO_ACTIVO = numLibro;

            // Quitamos el brillo a los filtros de países de arriba
            document.querySelectorAll('.p-item').forEach(el => el.classList.remove('active-filter'));

            // Forzamos al mapa a recuperar su nitidez material por si veníamos de Panah
            const mapEl = document.getElementById('map');
            if (mapEl) {
                mapEl.classList.remove('mapa-espiritual');
                mapEl.style.filter = 'none';
                mapEl.style.webkitFilter = 'none';
            }

            renderizarElementos(PLACES);
        };
        contenedorLibros.appendChild(btnLibro);
    
    });
}

// -------------------------------------------------------------------------
// 📜 NUEVA SECCIÓN 8: IMAGEN EN GRANDE
// -------------------------------------------------------------------------

function openLightbox(src, name, color) {
    if (!src) return;
    document.getElementById('lb-img').src = src;
    const caption = document.getElementById('lb-caption');
    caption.textContent = name || '';
    caption.style.color = color || 'var(--gold)';
    caption.style.textShadow = '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000';
    document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
}

document.getElementById('lightbox').addEventListener('click', closeLightbox);
document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Inicialización del flujo mundial
cargarBaseDeDatos();

/* =========================================================================
   📱 SCRIPT DE CONTROL PARA EL MENÚ FLOTANTE EN MÓVILES (3 RAYAS)
   ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const botonMenu = document.getElementById('sidebar-fab');
    const menuLateral = document.getElementById('sidebar');

    if (botonMenu && menuLateral) {
        botonMenu.onclick = (e) => {
            e.stopPropagation(); // Evita que el clic afecte al mapa que está detrás
            // Abre o cierra el menú agregando/quitando la clase que ya tienes en tu CSS
            menuLateral.classList.toggle('mob-open'); 
        };
    }
});