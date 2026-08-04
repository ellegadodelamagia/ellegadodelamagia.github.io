// js/mundos.js COMPLETO Y CORREGIDO
import MundosEstructuraSaga from './datos_mundos.js';

document.addEventListener("DOMContentLoaded", () => {
    const gridDinamico = document.getElementById("mundos-grid-dinamico");
    
    if (!gridDinamico) {
        console.error("Error: No se encontró el contenedor '#mundos-grid-dinamico'.");
        return;
    }

    // Cargar la vista inicial de los 3 Grandes Mundos
    renderizarNivel(MundosEstructuraSaga, false);
});

function obtenerNumeroRomano(num) {
    const romanos = ["I", "II", "III", "IV", "V", "VI", "VII"];
    return romanos[num] || num;
}

function renderizarNivel(listaDatos, esSubNivel = false, objetoPadre = null) {
    const gridDinamico = document.getElementById("mundos-grid-dinamico");
    const txtSubtitulo = document.getElementById("dinamico-subtitulo");
    const txtTitulo = document.getElementById("dinamico-titulo");
    const contenedorVolver = document.getElementById("contenedor-boton-volver");

    const seccionMundo = gridDinamico ? gridDinamico.parentElement : null;

    // --- CONTROL DE FONDO ATMOSFÉRICO ---
    if (seccionMundo) {
        if (esSubNivel && objetoPadre && objetoPadre.imagen_fondo) {
            seccionMundo.style.backgroundColor = "transparent";
            seccionMundo.style.backgroundImage = `linear-gradient(rgba(12, 7, 24, 0.82), rgba(12, 7, 24, 0.90)), url('${objetoPadre.imagen_fondo}')`;
            seccionMundo.style.backgroundSize = "cover";
            seccionMundo.style.backgroundPosition = "center";
            seccionMundo.style.backgroundAttachment = "fixed";
            seccionMundo.style.transition = "background 0.5s ease";
        } else {
            seccionMundo.style.backgroundImage = "none";
            seccionMundo.style.backgroundColor = ""; 
        }
    }

    if (txtSubtitulo) txtSubtitulo.style.display = "block";
    if (txtTitulo) txtTitulo.style.display = "block";
    gridDinamico.style.display = "grid";
    
    const fichaExistente = document.getElementById("ficha-lore-pantalla-completa");
    if (fichaExistente) fichaExistente.remove();

    gridDinamico.innerHTML = "";
    if (contenedorVolver) contenedorVolver.innerHTML = "";

    // 1. CONFIGURAR CABECERAS Y BOTÓN VOLVER
    if (esSubNivel && objetoPadre) {
        if (txtSubtitulo) txtSubtitulo.innerText = objetoPadre.nombre ? objetoPadre.nombre.toUpperCase() : "REGIONES";
        if (txtTitulo) {
            txtTitulo.innerText = objetoPadre.id === "mundo_celestial" ? "PLANOS SUPERIORES" : "RAZAS Y REGIONES";
        }

        if (contenedorVolver) {
            const btnVolver = document.createElement("a"); 
            btnVolver.innerHTML = "← Volver a los Mundos";
            btnVolver.className = "btn-volver-mundos"; 

            btnVolver.onclick = () => renderizarNivel(MundosEstructuraSaga, false);
            contenedorVolver.appendChild(btnVolver);
        }
    } else {
        // Cambia estos textos por los que pusiste en tu HTML:
        if (txtSubtitulo) txtSubtitulo.innerText = "EXISTEN DIFERENTES MUNDOS CONVIVIENDO";
        if (txtTitulo) txtTitulo.innerText = "COMPRENDE EL UNIVERSO";
    }

    // 2. RENDERIZAR TARJETAS
    listaDatos.forEach((item, index) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = `mundo-card estado-nivel-${item.desbloqueado}`;
        if (esSubNivel) tarjeta.classList.add("sub-card");

        if (item.imagen_fondo && item.desbloqueado !== 3) {
            tarjeta.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.75)), url('${item.imagen_fondo}')`;
            tarjeta.style.backgroundSize = "cover";
            tarjeta.style.backgroundPosition = "center";
        }

        if (item.desbloqueado === 1) {
            const nombreMostrar = item.nombre_visible || item.nombre || "";
            tarjeta.innerHTML = `
                <div class="roman-bg">${obtenerNumeroRomano(index)}</div>
                <div class="mundo-card-content">
                    <h3>${nombreMostrar.toUpperCase()}</h3>
                    <p>${item.descripcion_breve || ""}</p>
                    ${(!esSubNivel && ((item.regiones && item.regiones.length > 0) || (item.razas && item.razas.length > 0))) ? '<span class="indicador-accion"><em>(Pulsa para explorar)</em></span>' : ''}
                </div>
            `;

            tarjeta.onclick = () => {
                if (!esSubNivel) {
                    mostrarFichaLoreCompleta(item, listaDatos, null);
                } else {
                    mostrarFichaLoreCompleta(item, listaDatos, objetoPadre);
                }
            };

        } else if (item.desbloqueado === 2) {
            const nombreMostrar = item.nombre_visible || item.nombre || "";
            tarjeta.innerHTML = `
                <div class="roman-bg">${obtenerNumeroRomano(index)}</div>
                <div class="mundo-card-content bloqueado-blur">
                    <h3>${nombreMostrar.toUpperCase()}</h3>
                    <p class="txt-bloqueado">🔒 Contenido Bloqueado</p>
                    <span class="badge-libro">Se revela en: ${item.revelado_en}</span>
                </div>
            `;
            tarjeta.style.cursor = "not-allowed";

        } else if (item.desbloqueado === 3) {
            tarjeta.innerHTML = `
                <div class="roman-bg">?</div>
                <div class="mundo-card-content oculto-total">
                    <h3>???</h3>
                    <p>Espacio reservado para un reino secreto en la trama.</p>
                </div>
            `;
            tarjeta.style.cursor = "not-allowed";
        }

        gridDinamico.appendChild(tarjeta);
    });
}

function mostrarFichaLoreCompleta(objeto, listaHermanos, objetoPadre) {
    const gridDinamico = document.getElementById("mundos-grid-dinamico");
    const txtSubtitulo = document.getElementById("dinamico-subtitulo");
    const txtTitulo = document.getElementById("dinamico-titulo");
    const contenedorVolver = document.getElementById("contenedor-boton-volver");
    
    const seccionMundo = gridDinamico ? gridDinamico.parentElement : null;
    const urlImagenFondo = objeto.imagen_fondo || (objetoPadre ? objetoPadre.imagen_fondo : null);

    if (seccionMundo && urlImagenFondo) {
        seccionMundo.style.backgroundColor = "transparent"; 
        seccionMundo.style.backgroundImage = `linear-gradient(rgba(12, 7, 24, 0.50), rgba(12, 7, 24, 0.95)), url('${urlImagenFondo}')`;
        seccionMundo.style.backgroundSize = "cover";
        seccionMundo.style.backgroundPosition = "center";
        seccionMundo.style.backgroundAttachment = "fixed";
        seccionMundo.style.transition = "background 0.4s ease";
    }

    gridDinamico.style.display = "none";
    if (contenedorVolver) contenedorVolver.innerHTML = "";

    if (txtSubtitulo) txtSubtitulo.style.display = "none";
    if (txtTitulo) txtTitulo.style.display = "none";

    const tieneSubRazasObjetos = objeto.sub_razas && objeto.sub_razas.length > 0 && typeof objeto.sub_razas[0] === 'object';

    // 1. CONFIGURACIÓN DE NAVEGACIÓN (BOTONES SUPERIORES)
    if (contenedorVolver) {
        // A. BOTÓN VOLVER
        const btnVolverAtras = document.createElement("a"); 
        btnVolverAtras.innerHTML = objetoPadre ? `← Volver a ${objetoPadre.nombre}` : "← Volver a los Mundos";
        btnVolverAtras.className = "btn-volver-mundos"; 
        
        btnVolverAtras.onclick = () => {
            if (txtSubtitulo) txtSubtitulo.style.display = "block";
            if (txtTitulo) txtTitulo.style.display = "block"; 
            
            if (seccionMundo) {
                seccionMundo.style.backgroundImage = "none";
                seccionMundo.style.backgroundColor = ""; 
            }
            
            if (objetoPadre) {
                renderizarNivel(listaHermanos, true, objetoPadre);
            } else {
                renderizarNivel(MundosEstructuraSaga, false);
            }
        };
        contenedorVolver.appendChild(btnVolverAtras);

        // B. BOTÓN EXPLORAR REGIONES O RAZAS GENERALES
        const derivaciones = objeto.razas || objeto.regiones || objeto.subniveles || objeto.hijos;

        if (derivaciones && derivaciones.length > 0) {
            const btnExplorar = document.createElement("a");
            btnExplorar.innerHTML = `Explorar Razas →`;
            btnExplorar.className = "btn-volver-mundos";
            btnExplorar.style.marginLeft = "15px";

            btnExplorar.onclick = () => {
                if (txtSubtitulo) txtSubtitulo.style.display = "block";
                if (txtTitulo) txtTitulo.style.display = "block";

                renderizarNivel(derivaciones, true, objeto);
            };

            contenedorVolver.appendChild(btnExplorar);
        }

        // C. BOTÓN DE EXPLORAR SUB-RAZAS CON OBJETOS EN SUPERIOR
        if (tieneSubRazasObjetos) {
            const btnSubRazas = document.createElement("a");
            btnSubRazas.innerHTML = `Explorar Sub-razas / Clanes →`;
            btnSubRazas.className = "btn-volver-mundos";
            btnSubRazas.style.marginLeft = "15px";

            btnSubRazas.onclick = () => {
                renderizarOtrasRazas(objeto.sub_razas, objeto, listaHermanos, objetoPadre);
            };

            contenedorVolver.appendChild(btnSubRazas);
        }
    }

    // 2. CONSTRUCCIÓN DE LA FICHA EXPANDIDA
    const fichaExistente = document.getElementById("ficha-lore-pantalla-completa");
    if (fichaExistente) fichaExistente.remove();

    const fichaCompleta = document.createElement("div");
    fichaCompleta.id = "ficha-lore-pantalla-completa";
    fichaCompleta.className = "tarjeta-lore-expandida marco-dorado-ancestral";

    fichaCompleta.style.display = "block";
    fichaCompleta.style.width = "92%";
    fichaCompleta.style.maxWidth = "700px";         
    fichaCompleta.style.margin = "20px auto";
    fichaCompleta.style.boxSizing = "border-box";
    fichaCompleta.style.borderWidth = "4px";
    fichaCompleta.style.borderStyle = "solid";
    fichaCompleta.style.borderImage = "linear-gradient(135deg, #c5a059 0%, #f5eab7 50%, #b38f43 100%) 1";
    
    if (objeto.imagen_fondo) {
        // AQUÍ ES DONDE SE CONTROLA LA TRANSPARENCIA DEL FONDO:
        fichaCompleta.style.backgroundImage = `linear-gradient(rgba(43, 40, 49, 0.45), rgba(10, 6, 21, 0.95)), url('${objeto.imagen_fondo}')`;
        fichaCompleta.style.backgroundSize = "cover";
        fichaCompleta.style.backgroundPosition = "center";
    } else {
        fichaCompleta.style.background = "linear-gradient(145deg, #130d22 0%, #0a0615 100%)";
    }

    // LÓGICA DE ETIQUETAS Y BOTONES DE SUB-RAZAS
    let subrazasHTML = "";
    if (objeto.sub_razas && objeto.sub_razas.length > 0) {
        if (tieneSubRazasObjetos) {
            // Si son objetos (Trolls, Volkov), mostramos un botón de acción en lugar de solo texto plano
            subrazasHTML = `
                <div class="subrazas-container" style="text-align: center; margin-top: 30px;">
                    <h4>CLANES Y VARIANTES REGISTRADAS</h4>
                    <p style="color: #d1b8e7; font-size: 0.9rem; margin-bottom: 15px;">Esta categoría contiene fichas individuales completas para cada clan.</p>
                    <button id="btn-abrir-subrazas-grid" class="btn-volver-mundos" style="cursor: pointer; padding: 10px 20px; font-size: 0.95rem;">
                         Ver Tarjetas de Sub-razas (Trolls, Volkov...) →
                    </button>
                </div>
            `;
        } else {
            // Si es texto simple (Dridalys, Kotole, etc.)
            const tags = objeto.sub_razas.map(raza => `<span class="tag-subraza">${raza}</span>`).join("");
            subrazasHTML = `
                <div class="subrazas-container">
                    <h4>CLANES Y VARIANTES INTEGRADAS</h4>
                    <div class="subrazas-tags">${tags}</div>
                </div>
            `;
        }
    }

    const subTextoArriba = objetoPadre ? `${objeto.tipo || 'RAZA'} • REINO DE ${objetoPadre.nombre}` : (objeto.tipo || 'MUNDO');

    fichaCompleta.innerHTML = `
        <div class="encabezado-tarjeta-expandida" style="text-align: center; margin-bottom: 25px;">
            <p style="color: #bfa1db; font-size: 0.85rem; letter-spacing: 2px; margin: 0 0 5px 0; text-transform: uppercase;">${subTextoArriba}</p>
            <h2 style="color: #f5eab7; font-size: 2.2rem; font-family: 'Cinzel', serif; margin: 0 0 15px 0; letter-spacing: 2px;">${(objeto.nombre || objeto.nombre_visible || '').toUpperCase()}</h2>
            <div class="divisor-mistico" style="margin: 0 auto 20px auto;"><div class="rombo"></div></div>
            <p class="extracto-breve" style="font-style: italic; color: #d1b8e7; font-size: 1.1rem; text-align: center; line-height: 1.6; margin: 0 auto; max-width: 100%;">“ ${objeto.descripcion_breve || ''} ”</p>
        </div>
        
        <br>

        <div class="cuerpo-tarjeta-expandida">
            <div class="seccion-lore-bloque">
                <h3>📜 HISTORIA </h3>
                <p class="texto-fluido-lore">${objeto.historia_o_lore || "El archivo histórico se actualizará pronto..."}</p>
            </div>
            
            <br><br><br>

            <div class="seccion-lore-bloque caja-magia-dorada">
                <h3>✨ REGLAS DE LA MAGIA</h3>
                <p class="texto-fluido-lore">${objeto.reglas_de_magia || "Flujo energético convencional."}</p>
            </div>
            
            <br><br><br>

            ${subrazasHTML}
        </div>
    `;

    document.getElementById("mundos-container").appendChild(fichaCompleta);

    // Asignar evento al botón interno si existe
    if (tieneSubRazasObjetos) {
        const btnSubGrid = document.getElementById("btn-abrir-subrazas-grid");
        if (btnSubGrid) {
            btnSubGrid.onclick = () => {
                renderizarOtrasRazas(objeto.sub_razas, objeto, listaHermanos, objetoPadre);
            };
        }
    }
}

// --- FUNCIÓN QUE RENDERIZA EL GRID DE TARJETAS PARA TROLLS Y VOLKOV ---
function renderizarOtrasRazas(listaOtras, objetoActual, listaHermanos, objetoPadre) {
    const gridDinamico = document.getElementById("mundos-grid-dinamico");
    const txtSubtitulo = document.getElementById("dinamico-subtitulo");
    const txtTitulo = document.getElementById("dinamico-titulo");
    const contenedorVolver = document.getElementById("contenedor-boton-volver");

    const fichaExistente = document.getElementById("ficha-lore-pantalla-completa");
    if (fichaExistente) fichaExistente.remove();

    if (txtSubtitulo) {
        txtSubtitulo.innerText = `${(objetoActual.nombre || 'NEMORI').toUpperCase()}`;
        txtSubtitulo.style.display = "block";
    }
    if (txtTitulo) {
        txtTitulo.innerText = "SUB-RAZAS Y CLANES";
        txtTitulo.style.display = "block";
    }

    gridDinamico.style.display = "grid";
    gridDinamico.innerHTML = "";

    // BOTÓN DE RETORNO A LA FICHA DE OTRAS RAZAS
    if (contenedorVolver) {
        contenedorVolver.innerHTML = "";
        const btnVolverFicha = document.createElement("a");
        btnVolverFicha.innerHTML = `← Volver a ${objetoActual.nombre || 'Ficha'}`;
        btnVolverFicha.className = "btn-volver-mundos";

        btnVolverFicha.onclick = () => {
            mostrarFichaLoreCompleta(objetoActual, listaHermanos, objetoPadre);
        };
        contenedorVolver.appendChild(btnVolverFicha);
    }

    // GENERAR CADA TARJETA (TROLLS, VOLKOV, ETC.)
    listaOtras.forEach((item, index) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "mundo-card sub-card estado-nivel-1";

        const esObjeto = typeof item === "object";
        const nombreRaza = esObjeto ? (item.nombre || item.nombre_visible) : item;
        const descripcionRaza = esObjeto ? (item.descripcion_breve || item.descripcion) : "Clan independiente del grupo.";
        const imagenFondo = esObjeto && item.imagen_fondo ? item.imagen_fondo : objetoActual.imagen_fondo;

        if (imagenFondo) {
            tarjeta.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.88)), url('${imagenFondo}')`;
            tarjeta.style.backgroundSize = "cover";
            tarjeta.style.backgroundPosition = "center";
        }

        tarjeta.innerHTML = `
            <div class="roman-bg">${obtenerNumeroRomano(index)}</div>
            <div class="mundo-card-content">
                <h3>${nombreRaza.toUpperCase()}</h3>
                <p>${descripcionRaza}</p>
            </div>
        `;

        gridDinamico.appendChild(tarjeta);
    });
}