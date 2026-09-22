// js/mundos.js COMPLETO Y CORREGIDO (Sin botones duplicados)
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
            txtTitulo.innerText = objetoPadre.id === "mundo_celestial" ? "PLANOS SUPERIORES" : "PUEBLOS CULTURALES Y REGIONES";
        }

        if (contenedorVolver) {
            const btnVolver = document.createElement("a"); 
            btnVolver.innerHTML = "← Volver a las realidades";
            btnVolver.className = "btn-volver-mundos"; 

            btnVolver.onclick = () => renderizarNivel(MundosEstructuraSaga, false);
            contenedorVolver.appendChild(btnVolver);
        }
    } else {
        if (txtSubtitulo) txtSubtitulo.innerText = "EXISTEN DIFERENTES REALIDADES CONVIVIENDO EN EL UNIVERSO";
        if (txtTitulo) txtTitulo.innerText = "COMPRENDE EL UNIVERSO";
    }

    // 2. RENDERIZAR TARJETAS CON REGLAS DE DESBLOQUEO
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
                    <span class="indicador-accion">Pulsa para explorar →</span>
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
            
            const libroAsociado = (item.revelado_en || "").toLowerCase();
            const esLibroProtegido = libroAsociado.includes("herederos") || libroAsociado.includes("profecía") || libroAsociado.includes("profecia");

            const textoRevelado = esLibroProtegido 
                ? "Información protegida hasta el momento adecuado" 
                : `Se revela en: ${item.revelado_en || 'Siguientes libros'}`;

            tarjeta.innerHTML = `
                <div class="roman-bg">${obtenerNumeroRomano(index)}</div>
                <div class="mundo-card-content bloqueado-blur">
                    <h3>${nombreMostrar.toUpperCase()}</h3>
                    <p class="txt-bloqueado">🔒 Contenido Bloqueado</p>
                    <span class="badge-libro">${textoRevelado}</span>
                </div>
            `;
            tarjeta.style.cursor = "not-allowed";

        } else if (item.desbloqueado === 3) {
            tarjeta.innerHTML = `
                <div class="roman-bg">?</div>
                <div class="mundo-card-content oculto-total">
                    <h3>Zona misteriosa</h3>
                    <p>Información clasificada.</p>
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

    // 1. NAVEGACIÓN SUPERIOR
    if (contenedorVolver) {
        const btnVolverAtras = document.createElement("a"); 
        btnVolverAtras.innerHTML = objetoPadre ? `← Volver a ${objetoPadre.nombre}` : "← Volver a las Realidades";
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

        const derivaciones = objeto.razas || objeto.regiones || objeto.subniveles || objeto.hijos;

        if (derivaciones && derivaciones.length > 0) {
            const btnExplorar = document.createElement("a");
            btnExplorar.innerHTML = `Explorar este plano →`;
            btnExplorar.className = "btn-volver-mundos";

            btnExplorar.onclick = () => {
                if (txtSubtitulo) txtSubtitulo.style.display = "block";
                if (txtTitulo) txtTitulo.style.display = "block";

                renderizarNivel(derivaciones, true, objeto);
            };

            contenedorVolver.appendChild(btnExplorar);
        }
    // AGREGAR AQUÍ:
        if (tieneSubRazasObjetos) {
            const btnSubRazas = document.createElement("a");
            btnSubRazas.innerHTML = `Explorar Pueblos Culturales →`;
            btnSubRazas.className = "btn-volver-mundos";

            btnSubRazas.onclick = () => {
                renderizarOtrasRazas(objeto.sub_razas, objeto, listaHermanos, objetoPadre);
            };

            contenedorVolver.appendChild(btnSubRazas);
        }
    }

    // 2. CONSTRUCCIÓN FICHA EXPANDIDA
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
        fichaCompleta.style.backgroundImage = `linear-gradient(rgba(43, 40, 49, 0.45), rgba(10, 6, 21, 0.95)), url('${objeto.imagen_fondo}')`;
        fichaCompleta.style.backgroundSize = "cover";
        fichaCompleta.style.backgroundPosition = "center";
    } else {
        fichaCompleta.style.background = "linear-gradient(145deg, #130d22 0%, #0a0615 100%)";
    }

    let subrazasHTML = "";
    if (objeto.sub_razas && objeto.sub_razas.length > 0) {
        if (tieneSubRazasObjetos) {
            subrazasHTML = `
                <div class="subrazas-container" style="text-align: center; margin-top: 30px;">
                    <h4>PUEBLOS CULTURALES REGISTRADOS</h4>
                    <p style="color: #d1b8e7; font-size: 0.9rem;">Esta categoría contiene fichas individuales completas para cada pueblo.</p>
                </div>
            `;
            
        } else {
            const tags = objeto.sub_razas.map(raza => `<span class="tag-subraza">${raza}</span>`).join("");
            subrazasHTML = `
                <div class="subrazas-container">
                    <h4>PUEBLOS CULTURALES INTEGRADAS</h4>
                    <div class="subrazas-tags">${tags}</div>
                </div>
            `;
        }
    }

    const subTextoArriba = objetoPadre ? `${objeto.tipo || 'RAZA'} • EN EL ${objetoPadre.nombre}` : (objeto.tipo || 'MUNDO');

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
                <h3>📜 HISTORIA</h3>
                <p class="texto-fluido-lore">${objeto.historia_o_lore || "El archivo histórico se actualizará pronto..."}</p>
            </div>
            
            <br><br><br>

            <div class="seccion-lore-bloque caja-magia-dorada">
                <h3>✨ RELACION CON LA MAGIA</h3>
                <p class="texto-fluido-lore">${objeto.reglas_de_magia || "Flujo energético convencional."}</p>
            </div>
            
            <br><br><br>

            ${subrazasHTML}
        </div>
    `;

    document.getElementById("mundos-container").appendChild(fichaCompleta);

    }

function renderizarOtrasRazas(listaOtras, objetoActual, listaHermanos, objetoPadre) {
    const gridDinamico = document.getElementById("mundos-grid-dinamico");
    const txtSubtitulo = document.getElementById("dinamico-subtitulo");
    const txtTitulo = document.getElementById("dinamico-titulo");
    const contenedorVolver = document.getElementById("contenedor-boton-volver");

    const fichaExistente = document.getElementById("ficha-lore-pantalla-completa");
    if (fichaExistente) fichaExistente.remove();

    if (txtSubtitulo) {
        txtSubtitulo.innerText = `${(objetoActual.nombre || 'DRIDALYS').toUpperCase()}`;
        txtSubtitulo.style.display = "block";
    }
    if (txtTitulo) {
        txtTitulo.innerText = "PUEBLOS CULTURALES";
        txtTitulo.style.display = "block";
    }

    gridDinamico.style.display = "grid";
    gridDinamico.innerHTML = "";

    // BOTÓN DE RETORNO A LA FICHA
    if (contenedorVolver) {
        contenedorVolver.innerHTML = "";
        const btnVolverFicha = document.createElement("a");
        btnVolverFicha.innerHTML = `← Volver a ${objetoActual.nombre || 'Ficha'}`;
        btnVolverFicha.className = "btn-volver-mundos";
        btnVolverFicha.style.cursor = "pointer";

        btnVolverFicha.onclick = () => {
            mostrarFichaLoreCompleta(objetoActual, listaHermanos, objetoPadre);
        };
        contenedorVolver.appendChild(btnVolverFicha);
    }

    // GENERAR TARJETAS CON EVALUACIÓN DE DESBLOQUEO
    listaOtras.forEach((item, index) => {
        const esObjeto = typeof item === "object";
        const estadoDesbloqueo = esObjeto ? (item.desbloqueado !== undefined ? item.desbloqueado : 1) : 1;

        const tarjeta = document.createElement("div");
        tarjeta.className = `mundo-card sub-card estado-nivel-${estadoDesbloqueo}`;

        const nombreRaza = esObjeto ? (item.nombre || item.nombre_visible || item) : item;
        const regionRaza = esObjeto && item.region ? item.region : "";
        const descripcionRaza = esObjeto ? (item.descripcion_breve || item.descripcion) : null;
        const imagenFondo = esObjeto && item.imagen_fondo ? item.imagen_fondo : objetoActual.imagen_fondo;

        if (imagenFondo && estadoDesbloqueo !== 3) {
            tarjeta.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.88)), url('${imagenFondo}')`;
            tarjeta.style.backgroundSize = "cover";
            tarjeta.style.backgroundPosition = "center";
        }

        if (estadoDesbloqueo === 1) {
            tarjeta.innerHTML = `
                <div class="roman-bg">${obtenerNumeroRomano(index)}</div>
                <div class="mundo-card-content" style="text-align: center; padding: 25px 15px;">
                    <h3 style="margin-bottom: 8px; font-size: 1.3rem; color: #f5eab7;">${nombreRaza.toUpperCase()}</h3>
                    ${regionRaza ? `<span class="badge-region" style="display: inline-block; margin-bottom: 8px; padding: 4px 12px; background: rgba(197, 160, 89, 0.2); border: 1px solid #c5a059; border-radius: 50px; font-size: 0.78rem; color: #e5c158; text-transform: uppercase; letter-spacing: 1px;">📍 ${regionRaza}</span>` : ''}
                    ${descripcionRaza ? `<p style="font-size: 0.88rem; color: #d1b8e7; margin-top: 5px;">${descripcionRaza}</p>` : ''}
                    ${(esObjeto && item.historia_o_lore) ? '<span class="indicador-accion"><em>(Pulsa para ver lore)</em></span>' : ''}
                </div>
            `;

            if (esObjeto && item.historia_o_lore) {
                tarjeta.style.cursor = "pointer";
                tarjeta.onclick = () => {
                    mostrarFichaLoreCompleta(item, listaOtras, objetoActual);
                };
            }

        } else if (estadoDesbloqueo === 2) {
            const libroAsociado = (item.revelado_en || "").toLowerCase();
            const esLibroProtegido = libroAsociado.includes("herederos") || libroAsociado.includes("profecía") || libroAsociado.includes("profecia");
            const textoRevelado = esLibroProtegido 
                ? "Información protegida hasta el momento adecuado" 
                : `Se revela en: ${item.revelado_en || 'Siguientes libros'}`;

            tarjeta.innerHTML = `
                <div class="roman-bg">${obtenerNumeroRomano(index)}</div>
                <div class="mundo-card-content bloqueado-blur" style="text-align: center; padding: 25px 15px;">
                    <h3 style="margin-bottom: 8px; font-size: 1.3rem; color: #f5eab7;">${nombreRaza.toUpperCase()}</h3>
                    <p class="txt-bloqueado">🔒 Contenido Bloqueado</p>
                    <span class="badge-libro">${textoRevelado}</span>
                </div>
            `;
            tarjeta.style.cursor = "not-allowed";

        } else if (estadoDesbloqueo === 3) {
            tarjeta.innerHTML = `
                <div class="roman-bg">?</div>
                <div class="mundo-card-content oculto-total" style="text-align: center; padding: 25px 15px;">
                    <h3>Desconocido</h3>
                    <p>Información clasificada.</p>
                </div>
            `;
            tarjeta.style.cursor = "not-allowed";
        }

        gridDinamico.appendChild(tarjeta);
    });
}