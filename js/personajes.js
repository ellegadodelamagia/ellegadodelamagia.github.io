// =========================================================================
// 🧠 MOTOR DE RENDERIZADO DE PERSONAJES (VERSION CARDFLIP 3D CON FILTROS)
// =========================================================================

// Variable global para controlar qué libro está viendo el lector
let libroActual = 'principales';

document.addEventListener('DOMContentLoaded', () => {
    renderizarPersonajes();
});

function renderizarPersonajes() {
    const contenedor = document.getElementById('contenedor-personajes-grid');
    if (!contenedor) return;

    // 1. 🔍 FILTRAR: Nueva lógica inteligente de segmentación (Corregida para debut de principales)
    const personajesFiltrados = SAGA_PERSONAJES.filter(p => {
        // REGLA 1: Si el botón activo es "Principales", SOLO pasan los que son es_principal: true
        if (libroActual === 'principales') {
            return p.es_principal === true || p.es_principal === "true" || p.es_principal === "TRUE";
        }
        
        // REGLA 2 MODIFICADA: Si se selecciona un libro (ej. "Libro 1"), el personaje (sea principal o secundario)
        // OBLIGATORIAMENTE debe pertenecer al arreglo de libros de ese tomo para poder aparecer.
        return p.libros && Array.isArray(p.libros) && p.libros.includes(libroActual);
    
        
        // ...Y ADEMÁS se suman los secundarios que pertenezcan a ese libro específico
        return p.libros && Array.isArray(p.libros) && p.libros.includes(libroActual);
    });

    // 2. 🔄 ORDENAR: Organiza los personajes filtrados de menor a mayor según su columna "orden"
    const personajesOrdenados = [...personajesFiltrados].sort((a, b) => a.orden - b.orden);

    let htmlContenido = "";

    personajesOrdenados.forEach(p => {
        let claseEstado = "";
        let nombreVisible = p.nombre;
        
        let fotoHTML = `<img src="imagenes_principal/retratos/${p.imagen}" alt="Retrato de ${p.nombre}" class="personaje-foto">`;
        
        // Contenido por defecto de la cara trasera (Para los Desbloqueados)
        // ==========================================
        // NOTAS DE MAQUETACIÓN:
        // <h3> es para el subtítulo (ej. el Rol del personaje).
        // <p> es para contar la historia en párrafos.
        // <span> es la herramienta de precisión para decorar fragmentos
        //        de texto específicos (como el origen) sin saltos de línea.
        // ==========================================

        // Estructura adaptada: Raza y Tipo en Línea 1, Rol independiente en Línea 2
        let caraTraseraHTML = `
            <h3 class="personaje-nombre">${p.nombre}</h3>
            <p class="personaje-meta"><strong>${p.raza}</strong> • ${p.tipo}</p>
            <p class="personaje-meta personaje-rol">Rol: <span>${p.rol}</span></p>
            <p class="personaje-desc">${p.descripcion}</p>
            <p class="personaje-origen">Nacionalidad: <span>${p.origen}</span></p>
        `;

        // EVALUACIÓN DE TRES NIVELES
        if (p.desbloqueado === true || p.desbloqueado === "true" || p.desbloqueado === "TRUE") {
            claseEstado = "totalmente-visible";

            // AQUÍ AGREGAMOS LA LÓGICA DE REVELACIÓN PROGRESIVA
            if (p.revelacion_activa && p.descripcion_revelacion) {
                caraTraseraHTML += `
                    <div class="contenedor-revelacion">
                        <button class="btn-revelacion" onclick="event.stopPropagation(); toggleRevelacion('${p.id}')">
                            👁️ Revelación — contiene spoilers de ${p.libro_revelacion}
                        </button>
                        <p id="revelacion-${p.id}" class="texto-revelacion d-none">
                            <span>${p.descripcion_revelacion}</span>
                        </p>
                    </div>
                `;
            }
        } 
        else if ((p.desbloqueado === false || p.desbloqueado === "false" || p.desbloqueado === "FALSE") && (p.nombre_visible === true || p.nombre_visible === "true" || p.nombre_visible === "TRUE")) {
            claseEstado = "bloqueado-identificable";
            const libroIntroduccion = (p.libros && p.libros.length > 0) ? p.libros[0] : "Próximos Volúmenes";
            
            caraTraseraHTML = `
                <p class="texto-bloqueado">🔒 Personaje Bloqueado</p>
                <p class="texto-bloqueado-sub">Información protegida hasta el lanzamiento de: <strong>${libroIntroduccion}</strong></p>
            `;
        } 
        else {
            claseEstado = "totalmente-oculto";
            nombreVisible = "???";
            caraTraseraHTML = ""; 
            fotoHTML = `<div class="personaje-foto foto-silueta" style="display: flex; align-items: center; justify-content: center; background: #1a1a1a; height: 100%;"><span>?</span></div>`;
        }

        htmlContenido += `
            <div class="personaje-card-wrap">
                <div class="personaje-card ${claseEstado}" onclick="voltearTarjeta(this)">
                    <div class="personaje-cara personaje-cara-frente">
                        <div class="contenedor-foto-perfil">
                            ${fotoHTML}
                        </div>
                        <div class="personaje-frente-info">
                            <h3 class="personaje-nombre">${nombreVisible}</h3>
                        </div>
                    </div>
                    <div class="personaje-cara personaje-cara-atras">
                        ${caraTraseraHTML}
                    </div>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = htmlContenido;
}

// 🖱️ FUNCIÓN ACTIVADA AL HACER CLIC EN UN BOTÓN DE LIBRO
function filtrarPorLibro(nombreLibro, botonPresionado) {
    // 1. Actualizamos la variable de control global
    libroActual = nombreLibro;
    
    // 2. Renderizamos las tarjetas (el filtro aplicará la lógica de candado automáticamente)
    renderizarPersonajes();
    
    // 3. Estética: Cambiar la clase activa al botón presionado
    const botones = document.querySelectorAll('.btn-filtro');
    botones.forEach(btn => btn.classList.remove('activo'));

    if (botonPresionado) {
        botonPresionado.classList.add('activo');
    } else {
        const botonActivo = window.event ? window.event.target : null;
        if (botonActivo) {
            botonActivo.classList.add('activo');
        }
    }
}

// 📜 FUNCIÓN PARA CERRAR EL PERGAMINO MANUALMENTE
function cerrarPergamino() {
    const avisoElem = document.getElementById('aviso-pergamino');
    if (avisoElem) {
        avisoElem.classList.add('d-none');
    }
}

// 🔄 FUNCIÓN MÁGICA DE ROTACIÓN
function voltearTarjeta(elemento) {
    if (elemento.classList.contains('totalmente-oculto')) return;
    elemento.classList.toggle('volteada');
}

// 👁️ FUNCIÓN PARA SECCIÓN DE REVELACIONES ACCESIBLE DESDE EL BOTÓN
function toggleRevelacion(id) {
    const elementoTexto = document.getElementById(`revelacion-${id}`);
    if (elementoTexto) {
        elementoTexto.classList.toggle('d-none');
    }
}