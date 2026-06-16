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

    // FILTRO FILOSÓFICO: Si hay un libro seleccionado, ignoramos el resto de la base de datos
    const datosFiltradosPorLibro = LIBRO_ACTIVO 
        ? listaDeLugares.filter(i => parseInt(i.Libro) === parseInt(LIBRO_ACTIVO) || i.tipo_de_registro === "Padre")
        : listaDeLugares;

    const padres = datosFiltradosPorLibro.filter(i => i.tipo_de_registro === "Padre" && !i.Lugar.toLowerCase().includes('panah'));
    const hijos = datosFiltradosPorLibro.filter(i => i.tipo_de_registro !== "Padre");

    const ocultos = datosFiltradosPorLibro.filter(i => i.Lugar.toLowerCase().includes('panah') || (i.tipo_de_registro !== "Padre" && (!i.latitud || !i.longitud)));

    padres.sort((a, b) => (a.Orden || 999) - (b.Orden || 999));

    /* A. BOTÓN MAESTRO: "TODOS" */
    const todoBtn = document.createElement('div');
    todoBtn.className = 'p-item';
    todoBtn.innerHTML = `<b>TODOS</b>`;
    todoBtn.onclick = () => {
        const mapEl = document.getElementById('map');
        if (mapEl) mapEl.style.filter = 'none';
        
        const conCoordenadas = hijos.filter(h => h.latitud && h.longitud);
        renderizarFiltrados(conCoordenadas); 
        if (typeof map !== 'undefined') map.flyTo([20, 0], 3, { animate: true, duration: 1.5 }); 
    };
    if (parentContainer) parentContainer.appendChild(todoBtn);

    /* 🔮 BOTÓN EXCLUSIVO: "DIMENSIÓN PANAH" */
    if (ocultos.length > 0) {
        const ocultosBtn = document.createElement('div');
        ocultosBtn.className = 'p-item';
        ocultosBtn.innerHTML = `<b>✨ DIMENSIÓN PANAH</b>`; 
        ocultosBtn.onclick = () => {
            const mapEl = document.getElementById('map');
            if (mapEl) mapEl.style.filter = 'sepia(80%) blur(2px) brightness(0.6)';
            renderizarFiltrados(ocultos);
        };
        if (parentContainer) parentContainer.appendChild(ocultosBtn);
    }

    /* B. GENERACIÓN DE BOTONES DE FILTRADO (Países/Regiones) */
    padres.forEach(item => {
        const hijosFiltrados = hijos.filter(h => h.Padre == item.ID);
        
        // Si el país no tiene hijos en este libro activo, ocultamos su botón de arriba
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
             // 1. Quitar el brillo a todos los demás botones de filtro
            document.querySelectorAll('.p-item').forEach(el => el.classList.remove('active-filter'));
    
             // 2. Añadir el brillo al botón que acabas de picar
            pBtn.classList.add('active-filter');   

           const mapEl = document.getElementById('map');
    if (mapEl) mapEl.style.filter = 'none';

            // Primero aleja
    map.flyTo([20, 0], 3, { animate: true, duration: 2.0 });

            // Luego vuela al destino
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

    // Carga inicial
    const mapEl = document.getElementById('map');
    if (mapEl) mapEl.style.filter = 'none';
    
    const iniciales = hijos.filter(h => h.latitud && h.longitud);
    renderizarFiltrados(iniciales);
} 

function aplicarOffsetEspiral(lista) {
    const grupos = {};
    lista.forEach(item => {
        if (!item.latitud || !item.longitud) return;
        const key = `${item.latitud},${item.longitud}`;
        if (!grupos[key]) grupos[key] = [];
        grupos[key].push(item);
    });

    Object.values(grupos).forEach(grupo => {
        if (grupo.length <= 1) return;
        const radio = 0.003; // ajusta si quieres más o menos separación
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

    listaFiltrada.sort((a, b) => (parseInt(a.Orden) || 0) - (parseInt(b.Orden) || 0));

    aplicarOffsetEspiral(listaFiltrada);

    listaFiltrada.forEach((item) => {
        const magia = item.Tipo_de_magia ? item.Tipo_de_magia.toLowerCase().trim() : 'default';
        const desc = item.Descripcion_corta || "Los detalles de este rincón del mundo aún no han sido descritos.";
        const capTexto = item.Capitulo ? `Capítulo ${item.Capitulo}` : "Sin Capítulo";
        const tipoMagia = item.Tipo_de_magia ? item.Tipo_de_magia.toUpperCase() : 'NINGUNA';
        const ciudadTexto = item.Ciudad || item.ciudad || 'Desconocida';
        const rutaImagen = (item.Imagen || item.imagen) ? `imagenes/${item.Imagen || item.imagen}` : '';

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

                if (detBadge) {
                    detBadge.innerHTML = `Magia: ${tipoMagia}`;
                    detBadge.style.backgroundColor = 
                    `color-mix(in srgb, var(--c-${magia}) 20%, transparent)`;
                    detBadge.style.color = 
                    magia === 'celestial' ? 'var(--gold-dim)' : `var(--c-${magia})`;
                    detBadge.style.border = 
                    `1px solid color-mix(in srgb, var(--c-${magia}) 50%, transparent)`;
                }
                detailEl.classList.remove('open');
                    setTimeout(() => {
                detailEl.classList.add('open');
                    }, 1200);
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
        iconAnchor: [tamano/2, tamano + 7] // Esto centra la bolita en la coordenada
    });
           
           
    const marcador = L.marker(coords, { icon: iconoPersonalizado });
                if (typeof markerMap !== 'undefined') markerMap[item.ID] = marcador;
                limites.addLayer(marcador);

                marcador.on('click', (e) => {
                    // 1. Quitar la clase 'active' de todas las bolitas para limpiar el mapa
                    document.querySelectorAll('.bolita-magica').forEach(el => el.classList.remove('active'));
                    
                    // 2. Añadir la clase 'active' a la bolita que acabas de tocar
                    e.target.getElement().querySelector('.bolita-magica').classList.add('active');

                    // 3. Mover el mapa suavemente
                    if (typeof map !== 'undefined') {
                        map.flyTo(coords, ZOOM_INDIVIDUAL, { 
                            animate: true, 
                            duration: 1.5 
                        });
                    }

                    // 4. Abrir los detalles
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

        itemLista.addEventListener('click', () => {
            if (item.latitud && item.longitud && typeof map !== 'undefined') {
                const lat = parseFloat(item.latitud);
                const lng = parseFloat(item.longitud);
                if (!isNaN(lat) && !isNaN(lng)) map.flyTo([lat, lng], ZOOM_INDIVIDUAL, 
                    { animate: true, duration: 1.2 }); 
            } else if (typeof map !== 'undefined') {
                map.setView([25, -10], 3); 
            }
            abrirDetallesGrimorio();
        });

        if (listContainer) listContainer.appendChild(itemLista);
    });

    if (typeof map !== 'undefined' && limites.getLayers().length > 0) {
    map.flyToBounds(limites.getBounds(), { 
        padding: [40, 40], 
        maxZoom: ZOOM_MAX_GLOBAL,
        animate: true,
        duration: 1.8,
        easeLinearity: 0.25
    });
    }
}


// -------------------------------------------------------------------------
// 6. CLAUSURA DEL PANEL (Botón de Cierre)
// -------------------------------------------------------------------------
if (document.getElementById('det-close')) {
    document.getElementById('det-close').addEventListener('click', () => {
        const detailEl = document.getElementById('detail');
        if (detailEl) detailEl.classList.remove('open'); 
    });
}


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

    // Botón Global de Libros
    const btnTodosLibros = document.createElement('button');
    btnTodosLibros.innerHTML = "COMPENDIO TOTAL";
    btnTodosLibros.style.cssText = "background: transparent; border: 1px solid #d4af37; color: #d4af37; padding: 5px 10px; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: bold;";
    btnTodosLibros.onclick = () => {
        LIBRO_ACTIVO = null;
        renderizarElementos(PLACES);
    };
    contenedorLibros.appendChild(btnTodosLibros);

    // Un botón por cada libro detectado en el Excel
    librosExistentes.forEach(numLibro => {
        const btnLibro = document.createElement('button');
        btnLibro.innerHTML = `LIBRO ${numLibro}`;
        btnLibro.style.cssText = "background: transparent; border: 1px solid #d4af37; color: #d4af37; padding: 5px 10px; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: bold;";
        btnLibro.onclick = () => {
            LIBRO_ACTIVO = numLibro;
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