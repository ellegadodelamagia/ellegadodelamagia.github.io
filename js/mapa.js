/* =========================================================================
   🧭 EL ATLAS MÍSTICO — MOTOR CARTOGRÁFICO DE LA SAGA (js/mapa.js)
   ========================================================================= */

// -------------------------------------------------------------------------
// 1. CONFIGURACIÓN DE PARÁMETROS MÁGICOS (Constantes y Estado Global)
// -------------------------------------------------------------------------
const ZOOM_INDIVIDUAL = 14;     
const ZOOM_MAX_PADRE = 13;      
const ZOOM_MAX_GLOBAL = 13;      

let LIBRO_ACTIVO = null;
let PLACES = [];                 
let activeId = null;              
const markerMap = {};            

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

const limites = L.featureGroup().addTo(map); 

// Ocultar pantalla de carga
map.whenReady(function() {
    const pantallaCarga = document.getElementById('pantalla-carga');
    if (pantallaCarga) {
        setTimeout(() => {
            pantallaCarga.style.opacity = '0';
            pantallaCarga.style.visibility = 'hidden';
            setTimeout(() => { pantallaCarga.remove(); }, 500);
        }, 1500);
    }
});

// Helper: Normalización de texto para clases CSS y comparaciones (sin acentos/espacios)
function normalizarSlug(texto) {
    if (!texto) return 'default';
    return texto.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
}

// Helper: Manejo del efecto blur (Panah / Plano Espiritual)
function setMapaEspiritual(activo) {
    const mapEl = document.getElementById('map');
    if (!mapEl) return;
    if (activo) {
        mapEl.classList.add('mapa-espiritual');
        mapEl.style.filter = 'blur(8px)';
        mapEl.style.webkitFilter = 'blur(8px)';
    } else {
        mapEl.classList.remove('mapa-espiritual');
        mapEl.style.filter = 'none';
        mapEl.style.webkitFilter = 'none';
    }
}

// -------------------------------------------------------------------------
// 3. CONECTAR LA BASE DE DATOS (js/lugares.js)
// -------------------------------------------------------------------------
function cargarBaseDeDatos() {
    if (typeof DATOS_LUGARES !== 'undefined') {
        PLACES = DATOS_LUGARES;
        console.log("¡Éxito místico! Datos conectados. Total:", PLACES.length);
    } else {
        console.error("No se encontró DATOS_LUGARES en js/lugares.js");
        PLACES = [];
    }
    
    crearNavegacionLibros();
    renderizarElementos(PLACES);

    if (PLACES.length === 0) {
        map.setView([35, -15], 3);
    }
}

// -------------------------------------------------------------------------
// 4. INTERFAZ Y FILTROS (Países, Magias, Panah)
// -------------------------------------------------------------------------
function renderizarElementos(listaDeLugares) {
    const parentContainer = document.getElementById('sidebar-parents');
    if (parentContainer) parentContainer.innerHTML = '';
    
    // 1. Filtrado inicial por Libro si hay uno activo
    const datosFiltradosPorLibro = LIBRO_ACTIVO 
        ? listaDeLugares.filter(i => parseInt(i.Libro) === parseInt(LIBRO_ACTIVO) || i.tipo_de_registro === "Padre")
        : listaDeLugares;

    // 2. Clasificación de categorías
    const padres = datosFiltradosPorLibro.filter(i => i.tipo_de_registro === "Padre" && !i.Lugar.toLowerCase().includes('panah'));
    const hijos = datosFiltradosPorLibro.filter(i => i.tipo_de_registro !== "Padre");
    const ocultos = datosFiltradosPorLibro.filter(i => i.Lugar.toLowerCase().includes('panah') || (i.tipo_de_registro !== "Padre" && (!i.latitud || !i.longitud)));

    padres.sort((a, b) => (a.Orden || 999) - (b.Orden || 999));

    /* A. BOTÓN MAESTRO: "TODOS" */
    const todoBtn = document.createElement('div');
    todoBtn.className = 'p-item active-filter';
    todoBtn.innerHTML = `<b>TODOS</b>`;
    todoBtn.onclick = () => {
        document.querySelectorAll('.p-item').forEach(el => el.classList.remove('active-filter'));
        todoBtn.classList.add('active-filter');
        document.querySelectorAll('.btn-silver').forEach(b => b.classList.remove('active'));

        setMapaEspiritual(false);
        renderizarFiltrados(hijos); 
        map.flyTo([20, 0], 3, { animate: true, duration: 1.5 }); 
    };
    if (parentContainer) parentContainer.appendChild(todoBtn);

    /* B. BOTÓN EXCLUSIVO: "DIMENSIÓN PANAH" */
    if (ocultos.length > 0) {
        const ocultosBtn = document.createElement('div');
        ocultosBtn.className = 'p-item';
        ocultosBtn.innerHTML = `<b>✨ DIMENSIÓN PANAH</b>`; 
        ocultosBtn.onclick = () => {
            document.querySelectorAll('.p-item').forEach(el => el.classList.remove('active-filter'));
            ocultosBtn.classList.add('active-filter');
            document.querySelectorAll('.btn-silver').forEach(b => b.classList.remove('active'));

            setMapaEspiritual(true);
            renderizarFiltrados(ocultos);
        };
        if (parentContainer) parentContainer.appendChild(ocultosBtn);
    }

    /* C. BOTONES DE FILTRADO POR REGIONES / PAÍSES */
    padres.forEach(item => {
        const hijosFiltrados = hijos.filter(h => h.Padre == item.ID);
        if (LIBRO_ACTIVO && hijosFiltrados.length === 0) return; 

        const pBtn = document.createElement('div');
        pBtn.className = 'p-item';
        
        let ciudadVisible = item.Ciudad || (hijosFiltrados.length > 0 ? hijosFiltrados[0].Ciudad : '');
        const nombreVisible = ciudadVisible ? `${item.Pais} - ${ciudadVisible}` : item.Pais;
        pBtn.innerHTML = `<b>${nombreVisible}</b>`;
        
        pBtn.onclick = () => {
            document.querySelectorAll('.p-item').forEach(el => el.classList.remove('active-filter'));
            pBtn.classList.add('active-filter');   
            document.querySelectorAll('.btn-silver').forEach(b => b.classList.remove('active'));

            setMapaEspiritual(false);
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

    /* D. GENERACIÓN DE BOTONES DE MAGIA */
    generarFiltrosDeMagia(parentContainer, hijos);

    setMapaEspiritual(false);
    renderizarFiltrados(hijos);
}

function generarFiltrosDeMagia(parentContainer, listaHijos) {
    let contenedorMagia = document.getElementById('filtros-magia');
    if (contenedorMagia) contenedorMagia.remove();

    if (!parentContainer) return;

    const magiasUnicas = new Set();
    listaHijos.forEach(h => {
        if (h.Tipo_de_magia) magiasUnicas.add(h.Tipo_de_magia.trim());
    });

    if (magiasUnicas.size === 0) return;

    contenedorMagia = document.createElement('div');
    contenedorMagia.id = 'filtros-magia';
    contenedorMagia.className = 'silver-filter-container';

    magiasUnicas.forEach(magiaTexto => {
        const magiaID = normalizarSlug(magiaTexto);

        const mBtn = document.createElement('button');
        mBtn.className = 'btn-silver';
        mBtn.textContent = magiaTexto; 
        mBtn.style.backgroundColor = `var(--c-${magiaID})`;
        mBtn.style.borderColor = `color-mix(in srgb, var(--c-${magiaID}) 60%, #a6b1c2)`;
        mBtn.style.color = '#ffffff';

        mBtn.onclick = () => {
            document.querySelectorAll('.btn-silver').forEach(b => b.classList.remove('active'));
            mBtn.classList.add('active');
            document.querySelectorAll('.p-item').forEach(el => el.classList.remove('active-filter'));

            filtrarPorMagiaBoton(magiaID, listaHijos);
        };

        contenedorMagia.appendChild(mBtn);
    });

    parentContainer.after(contenedorMagia);
}

function filtrarPorMagiaBoton(magiaSeleccionada, listaHijos) {
    if (!listaHijos) return;

    if (magiaSeleccionada === 'todas') {
        renderizarFiltrados(listaHijos);
    } else {
        const filtrados = listaHijos.filter(h => normalizarSlug(h.Tipo_de_magia) === magiaSeleccionada);
        renderizarFiltrados(filtrados);
    }
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
        const radio = 0.003; 
        grupo.forEach((item, i) => {
            const angulo = (2 * Math.PI / grupo.length) * i;
            item._lat = parseFloat(item.latitud) + radio * Math.sin(angulo);
            item._lng = parseFloat(item.longitud) + radio * Math.cos(angulo);
        });
    });
}

// -------------------------------------------------------------------------
// 5. PROCESAMIENTO Y DIBUJO EN EL MAPA / LATERAL
// -------------------------------------------------------------------------
function renderizarFiltrados(listaFiltrada) { 
    const listContainer = document.getElementById('sidebar-list');
    const detailEl = document.getElementById('detail');

    if (listContainer) listContainer.innerHTML = ''; 
    limites.clearLayers(); 

    if (detailEl) detailEl.classList.remove('open');
    if (typeof map !== 'undefined') map.closePopup();

    listaFiltrada.sort((a, b) => (parseInt(a.Orden) || 999) - (parseInt(b.Orden) || 999));
    aplicarOffsetEspiral(listaFiltrada);

    listaFiltrada.forEach((item) => {
        const magiaSlug = normalizarSlug(item.Tipo_de_magia);
        const desc = item.Descripcion_corta || "Los detalles de este rincón del mundo aún no han sido descritos.";
        const capTexto = item.Capitulo ? `Capítulo ${item.Capitulo}` : "Sin Capítulo";
        const tipoMagiaOriginal = item.Tipo_de_magia ? item.Tipo_de_magia.trim() : 'Ninguna';
        const rutaImagen = (item.Imagen || item.imagen) ? `imagenes/${item.Imagen || item.imagen}` : '';

        // --- Función para desplegar la información en el Grimorio ---
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
                    if (detImg) { 
                        detImg.src = rutaImagen; 
                        detImg.style.display = 'block'; 
                        detImg.style.cursor = 'zoom-in';
                        detImg.onclick = () => openLightbox(rutaImagen, item.Lugar, `var(--c-${magiaSlug})`);
                    }
                    if (detPlaceholder) detPlaceholder.style.display = 'none';
                } else {
                    if (detImg) detImg.style.display = 'none';
                    if (detPlaceholder) detPlaceholder.style.display = 'flex';
                }

                if (detBadge) {
                    detBadge.innerHTML = `${tipoMagiaOriginal}`;
                    detBadge.style.textTransform = 'none'; 
                    detBadge.style.backgroundColor = `color-mix(in srgb, var(--c-${magiaSlug}) 20%, transparent)`;
                    detBadge.style.color = magiaSlug === 'poder-celestial' ? 'var(--gold-dim)' : `var(--c-${magiaSlug})`;
                    detBadge.style.border = `1px solid color-mix(in srgb, var(--c-${magiaSlug}) 50%, transparent)`;
                }

                detailEl.classList.remove('open');
                setTimeout(() => { detailEl.classList.add('open'); }, 100);
            }
        };

        // Bindeo del botón de cerrar
        const btnCerrarInfo = document.getElementById('det-close'); 
        if (btnCerrarInfo) {
            btnCerrarInfo.onclick = () => {
                if (detailEl) detailEl.classList.remove('open');
            };
        }

        // --- Marcadores Geográficos ---
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
                             <div class="bolita-magica" style="background-color: var(--c-${magiaSlug}); width:${tamano}px; height:${tamano}px;">
                               <span class="bolita-numero">${item.Orden || ''}</span>
                             </div>
                             <div class="pin-stem" style="background: var(--c-${magiaSlug})"></div>
                           </div>`,
                    iconSize: [tamano, tamano + 7], 
                    iconAnchor: [tamano/2, tamano + 7] 
                });

                const marcador = L.marker(coords, { icon: iconoPersonalizado });
                markerMap[item.ID] = marcador;
                limites.addLayer(marcador);

                marcador.on('click', (e) => {
                    document.querySelectorAll('.bolita-magica').forEach(el => el.classList.remove('active'));
                    const el = e.target.getElement();
                    if (el) {
                        const bolita = el.querySelector('.bolita-magica');
                        if (bolita) bolita.classList.add('active');
                    }

                    map.flyTo(coords, ZOOM_INDIVIDUAL, { animate: true, duration: 1.5 });
                    abrirDetallesGrimorio();
                });
            }
        }

        // --- Construcción de elementos en Lista Lateral ---
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
            <span class="si-dot" style="background: var(--c-${magiaSlug})"></span>
        `;

        itemLista.addEventListener('click', () => {
            const esPanah = item.ID === "PANAH-01" || item.Lugar.toLowerCase().includes('panah');

            if (esPanah) {
                setMapaEspiritual(true);
                document.querySelectorAll('.bolita-magica').forEach(el => el.classList.remove('active'));
            } else {
                setMapaEspiritual(false);
                if (item.latitud && item.longitud) {
                    const lat = parseFloat(item.latitud);
                    const lng = parseFloat(item.longitud);
                    if (!isNaN(lat) && !isNaN(lng)) {
                        map.flyTo([lat, lng], ZOOM_INDIVIDUAL, { animate: true, duration: 1.2 });
                    }
                } else {
                    map.setView([25, -10], 3); 
                }
            }
            abrirDetallesGrimorio();
        });

        if (listContainer) listContainer.appendChild(itemLista);
    });

    // --- Encuadre de Cámara Final ---
    const tieneSoloPanah = listaFiltrada.length === 1 && (listaFiltrada[0].ID === "PANAH-01" || listaFiltrada[0].Lugar.toLowerCase().includes('panah'));

    if (tieneSoloPanah) {
        setMapaEspiritual(true);
    } else if (typeof map !== 'undefined' && limites.getLayers().length > 0) {
        setMapaEspiritual(false);
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
// 6. FILTRADO CRONOLÓGICO POR LIBROS
// -------------------------------------------------------------------------
function crearNavegacionLibros() {
    let contenedorLibros = document.getElementById('sidebar-books');
    
    if (!contenedorLibros) {
        contenedorLibros = document.createElement('div');
        contenedorLibros.id = 'sidebar-books';
        contenedorLibros.style.cssText = "display: flex; gap: 10px; padding: 15px; background: #1a1208; border-top: 1px solid #d4af37; justify-content: center;";
        
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.appendChild(contenedorLibros);
    }
    
    contenedorLibros.innerHTML = '';

    const librosExistentes = [...new Set(PLACES.map(i => parseInt(i.Libro)).filter(l => !isNaN(l)))];
    librosExistentes.sort((a, b) => a - b);

    if (librosExistentes.length <= 1) {
        contenedorLibros.style.display = 'none';
        return;
    } else {
        contenedorLibros.style.display = 'flex';
    }

    const btnTodosLibros = document.createElement('button');
    btnTodosLibros.innerHTML = "COMPENDIO TOTAL";
    btnTodosLibros.style.cssText = "background: transparent; border: 1px solid #d4af37; color: #d4af37; padding: 5px 10px; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: bold;";
    btnTodosLibros.onclick = () => {
        LIBRO_ACTIVO = null;
        document.querySelectorAll('.p-item').forEach(el => el.classList.remove('active-filter'));
        setMapaEspiritual(false);
        renderizarElementos(PLACES);
    };
    contenedorLibros.appendChild(btnTodosLibros);

    librosExistentes.forEach(numLibro => {
        const btnLibro = document.createElement('button');
        btnLibro.innerHTML = `LIBRO ${numLibro}`;
        btnLibro.style.cssText = "background: transparent; border: 1px solid #d4af37; color: #d4af37; padding: 5px 10px; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: bold;";
        btnLibro.onclick = () => {
            LIBRO_ACTIVO = numLibro;
            document.querySelectorAll('.p-item').forEach(el => el.classList.remove('active-filter'));
            setMapaEspiritual(false);
            renderizarElementos(PLACES);
        };
        contenedorLibros.appendChild(btnLibro);
    });
}

// -------------------------------------------------------------------------
// 7. CONTROL DE LIGHTBOX Y EVENTOS
// -------------------------------------------------------------------------
function openLightbox(src, name, color) {
    if (!src) return;
    const lbImg = document.getElementById('lb-img');
    const caption = document.getElementById('lb-caption');
    const lb = document.getElementById('lightbox');

    if (lbImg) lbImg.src = src;
    if (caption) {
        caption.textContent = name || '';
        caption.style.color = color || 'var(--gold)';
        caption.style.textShadow = '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000';
    }
    if (lb) lb.classList.add('open');
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('open');
}

document.addEventListener("DOMContentLoaded", () => {
    const lb = document.getElementById('lightbox');
    const lbClose = document.getElementById('lb-close');

    if (lb) lb.addEventListener('click', closeLightbox);
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

    const botonMenu = document.getElementById('sidebar-fab');
    const menuLateral = document.getElementById('sidebar');

    if (botonMenu && menuLateral) {
        botonMenu.onclick = (e) => {
            e.stopPropagation();
            menuLateral.classList.toggle('mob-open'); 
        };
    }

    // Inicialización del motor
    cargarBaseDeDatos();
});