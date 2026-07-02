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

    // Buscamos el contenedor padre subiendo un paso desde el grid
    const seccionMundo = gridDinamico ? gridDinamico.parentElement : null;

    // --- CONTROL DE FONDO ATMOSFÉRICO AL ENTRAR A UN MUNDO ---
    if (seccionMundo) {
        if (esSubNivel && objetoPadre && objetoPadre.imagen_fondo) {
            // SI ESTAMOS EN LAS RAZAS DE UN MUNDO: Encendemos su imagen de fondo
            seccionMundo.style.backgroundColor = "transparent";
            seccionMundo.style.backgroundImage = `linear-gradient(rgba(12, 7, 24, 0.82), rgba(12, 7, 24, 0.90)), url('${objetoPadre.imagen_fondo}')`;
            seccionMundo.style.backgroundSize = "cover";
            seccionMundo.style.backgroundPosition = "center";
            seccionMundo.style.backgroundAttachment = "fixed";
            seccionMundo.style.transition = "background 0.5s ease";
        } else {
            // SI ESTAMOS EN EL MENÚ PRINCIPAL: Limpiamos el fondo para regresar al original
            seccionMundo.style.backgroundImage = "none";
            seccionMundo.style.backgroundColor = ""; 
        }
    }

    // Asegurar que los títulos y el grid estén visibles y la ficha vieja se borre
    if (txtSubtitulo) txtSubtitulo.style.display = "block";
    if (txtTitulo) txtTitulo.style.display = "block";
    gridDinamico.style.display = "grid"; // O "block" según tu último ajuste de CSS
    
    const fichaExistente = document.getElementById("ficha-lore-pantalla-completa");
    if (fichaExistente) fichaExistente.remove();

    // Limpiar contenedores
    gridDinamico.innerHTML = "";
    if (contenedorVolver) contenedorVolver.innerHTML = "";

    // 1. CONFIGURAR CABECERAS Y BOTÓN VOLVER
    // ... Todo el resto de la función renderizarNivel se queda exactamente igual ...

    // 1. CONFIGURAR CABECERAS Y BOTÓN VOLVER
    if (esSubNivel && objetoPadre) {
        if (txtSubtitulo) txtSubtitulo.innerText = objetoPadre.nombre.toUpperCase();
        if (txtTitulo) {
            txtTitulo.innerText = objetoPadre.id === "mundo_celestial" ? "PLANOS SUPERIORES" : "REGIONES Y RAZAS";
        }

        if (contenedorVolver) {
            const btnVolver = document.createElement("a"); 
            btnVolver.innerHTML = "← Volver a los Tres Mundos";
            btnVolver.className = "btn-volver-mundos"; 

            btnVolver.onclick = () => renderizarNivel(MundosEstructuraSaga, false);
            contenedorVolver.appendChild(btnVolver);
        }
    } else {
        if (txtSubtitulo) txtSubtitulo.innerText = "EXPLORA EL UNIVERSO";
        if (txtTitulo) txtTitulo.innerText = "LOS TRES MUNDOS";
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
            tarjeta.innerHTML = `
                <div class="roman-bg">${obtenerNumeroRomano(index)}</div>
                <div class="mundo-card-content">
                    <h3>${item.nombre_visible.toUpperCase()}</h3>
                    <p>${item.descripcion_breve}</p>
                    ${(!esSubNivel && item.regiones && item.regiones.length > 0) ? '<span class="indicador-accion"><em>(Pulsa para explorar)</em></span>' : ''}
                </div>
            `;

            tarjeta.onclick = () => {
                if (!esSubNivel && item.regiones && item.regiones.length > 0) {
                    renderizarNivel(item.regiones, true, item);
                } else {
                    mostrarFichaLoreCompleta(item, listaDatos, objetoPadre);
                }
            };

        } else if (item.desbloqueado === 2) {
            tarjeta.innerHTML = `
                <div class="roman-bg">${obtenerNumeroRomano(index)}</div>
                <div class="mundo-card-content bloqueado-blur">
                    <h3>${item.nombre_visible.toUpperCase()}</h3>
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
    
    // --- DETECTOR MÁGICO DE CONTENEDOR ---
    // Subimos un nivel en el HTML desde el grid para encontrar la sección real, sin importar su ID
    const seccionMundo = gridDinamico ? gridDinamico.parentElement : null;

    // Evaluamos inteligentemente cuál imagen usar (Prioridad: de la raza, si no, del Mundo Padre)
    const urlImagenFondo = objeto.imagen_fondo || (objetoPadre ? objetoPadre.imagen_fondo : null);

    // --- EFECTO ENVOLVENTE FORZADO ---
    if (seccionMundo && urlImagenFondo) {
        seccionMundo.style.backgroundColor = "transparent"; 
        seccionMundo.style.backgroundImage = `linear-gradient(rgba(12, 7, 24, 0.88), rgba(12, 7, 24, 0.95)), url('${urlImagenFondo}')`;
        seccionMundo.style.backgroundSize = "cover";
        seccionMundo.style.backgroundPosition = "center";
        seccionMundo.style.backgroundAttachment = "fixed";
        seccionMundo.style.transition = "background 0.4s ease";
    }
    // 1. Ocultar el grid de tarjetas anteriores
    gridDinamico.style.display = "none";
    if (contenedorVolver) contenedorVolver.innerHTML = "";

    // 2. Ocultamos los títulos externos viejos
    if (txtSubtitulo) txtSubtitulo.style.display = "none";
    if (txtTitulo) txtTitulo.style.display = "none";

    // 3. Configurar el botón de volver para regresar a las razas
    if (contenedorVolver) {
        const btnVolverAtras = document.createElement("a"); 
        btnVolverAtras.innerHTML = objetoPadre ? `← Volver a ${objetoPadre.nombre}` : "← Volver";
        btnVolverAtras.className = "btn-volver-mundos"; 
        
        btnVolverAtras.onclick = () => {
            if (txtSubtitulo) txtSubtitulo.style.display = "block";
            if (txtTitulo) txtTitulo.style.display = "block"; 
            
            if (seccionMundo) {
                seccionMundo.style.backgroundImage = "none";
                seccionMundo.style.backgroundColor = ""; 
            }
            
            renderizarNivel(listaHermanos, true, objetoPadre);
        };
        contenedorVolver.appendChild(btnVolverAtras);
    }

    // 4. Eliminar ficha anterior si existiera para evitar duplicados
    const fichaExistente = document.getElementById("ficha-lore-pantalla-completa");
    if (fichaExistente) fichaExistente.remove();

    // 5. Crear el gran recuadro único (La tarjeta expandida)
    const fichaCompleta = document.createElement("div");
    fichaCompleta.id = "ficha-lore-pantalla-completa";
    fichaCompleta.className = "tarjeta-lore-expandida marco-dorado-ancestral";

    // --- ESTILOS EN LÍNEA FORZADOS (700px de ancho y marco integrado) ---
    fichaCompleta.style.display = "block";
    fichaCompleta.style.width = "92%";
    fichaCompleta.style.maxWidth = "700px";         
    fichaCompleta.style.margin = "20px auto";
    fichaCompleta.style.boxSizing = "border-box";
    fichaCompleta.style.borderWidth = "4px";
    fichaCompleta.style.borderStyle = "solid";
    fichaCompleta.style.borderImage = "linear-gradient(135deg, #c5a059 0%, #f5eab7 50%, #b38f43 100%) 1";
    
    if (objeto.imagen_fondo) {
        fichaCompleta.style.backgroundImage = `linear-gradient(rgba(10, 6, 21, 0.88), rgba(10, 6, 21, 0.95)), url('${objeto.imagen_fondo}')`;
        fichaCompleta.style.backgroundSize = "cover";
        fichaCompleta.style.backgroundPosition = "center";
    } else {
        fichaCompleta.style.background = "linear-gradient(145deg, #130d22 0%, #0a0615 100%)";
    }

    // Preparar los anexos/sub-razas
    let subrazasHTML = "";
    if (objeto.sub_razas && objeto.sub_razas.length > 0) {
        const tags = objeto.sub_razas.map(raza => `<span class="tag-subraza">${raza}</span>`).join("");
        subrazasHTML = `
            <div class="subrazas-container">
                <h4>VARIANTES Y FAMILIAS INTEGRADAS</h4>
                <div class="subrazas-tags">${tags}</div>
            </div>
        `;
    }

    // Definimos el texto de la región/tipo que irá arriba adentro
    const subTextoArriba = objetoPadre ? `${objeto.tipo} • REINO DE ${objetoPadre.nombre}` : objeto.tipo;

    // Inyectar la estructura unificada (Títulos, Divisor y Lore ADENTRO del marco)
    fichaCompleta.innerHTML = `
        <div class="encabezado-tarjeta-expandida" style="text-align: center; margin-bottom: 25px;">
            <p style="color: #bfa1db; font-size: 0.85rem; letter-spacing: 2px; margin: 0 0 5px 0; text-transform: uppercase;">${subTextoArriba}</p>
            <h2 style="color: #f5eab7; font-size: 2.2rem; font-family: 'Cinzel', serif; margin: 0 0 15px 0; letter-spacing: 2px;">${objeto.nombre.toUpperCase()}</h2>
            <div class="divisor-mistico" style="margin: 0 auto 20px auto;"><div class="rombo"></div></div>
            <p class="extracto-breve" style="font-style: italic; color: #d1b8e7; font-size: 1.1rem; text-align: center; line-height: 1.6; margin: 0 auto; max-width: 100%;">“ ${objeto.descripcion_breve} ”</p>
        </div>
        
        <br>

        <div class="cuerpo-tarjeta-expandida">
            <div class="seccion-lore-bloque">
                <h3>📜 HISTORIA Y LORE</h3>
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

    // Acoplar la tarjeta directo al contenedor general
    document.getElementById("mundos-container").appendChild(fichaCompleta);
}