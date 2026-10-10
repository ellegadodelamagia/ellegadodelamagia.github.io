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

    // 1. 🔍 FILTRAR: Lógica inteligente de segmentación por libro y debut
    const personajesFiltrados = SAGA_PERSONAJES.filter(p => {
        // REGLA 1: Si el botón activo es "Principales", SOLO pasan los que son es_principal: true
        if (libroActual === 'principales') {
            return p.es_principal === true || p.es_principal === "true" || p.es_principal === "TRUE";
        }
        
        // REGLA 2: Si se selecciona un libro específico (ej. "Libro 1"),
        // debe pertenecer obligatoriamente al arreglo de libros de ese tomo.
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
        let caraTraseraHTML = `
            <h3 class="personaje-nombre">${p.nombre}</h3>
            <p class="personaje-meta"><strong>${p.raza}</strong> • ${p.tipo}</p>
            <p class="personaje-meta personaje-rol">Rol: <span>${p.rol}</span></p>
            <p class="personaje-desc">${p.descripcion}</p>
            <p class="personaje-origen">Nacionalidad: <span>${p.origen}</span></p>
        `;

        // EVALUACIÓN DE TRES NIVELES DE ESTADO
        if (p.desbloqueado === true || p.desbloqueado === "true" || p.desbloqueado === "TRUE") {
            claseEstado = "totalmente-visible";

            // LÓGICA DE REVELACIÓN PROGRESIVA (SPOILERS)
            if (p.revelacion_activa && p.descripcion_revelacion) {
                caraTraseraHTML += `
                    <div class="contenedor-revelacion">
                        <button class="btn-revelacion" onclick="event.stopPropagation(); toggleRevelacion('${p.id}')">
                            👁️ Revelación — contiene spoilers de ${p.libro_revelacion}
                        </button>
                        <p id="revelacion-${p.id}" class="texto-revelacion d-none" style="display: none;">
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
    libroActual = nombreLibro;
    
    const librosBloqueados = ['Libro 2', 'Libro 3', 'Libro 4', 'Libro 5', 'Libro 6', 'Libro 7', 'Libro 8', 'Libro 9', 'Libro 10'];
    const avisoElem = document.getElementById('aviso-pergamino');
    const textoElem = document.getElementById('texto-pergamino');
    const gridElem = document.getElementById('contenedor-personajes-grid');

    // 1. Renderizamos la información
    renderizarPersonajes();

    // 2. Control de visibilidad del pergamino vs parrilla
    if (librosBloqueados.includes(nombreLibro)) {
        if (avisoElem && textoElem) {
            textoElem.innerHTML = `<strong>¡No seas curioso!</strong> Espera a que salga el libro antes de ver quiénes acompañan a Kaira en la continuación de su viaje.`;
            
            // Removemos la clase oculta y aplicamos display block
            avisoElem.classList.remove('d-none');
            avisoElem.style.display = 'block';
        }
        if (gridElem) {
            gridElem.style.display = 'none';
        }
    } else {
        if (avisoElem) {
            avisoElem.classList.add('d-none');
            avisoElem.style.display = 'none';
        }
        if (gridElem) {
            gridElem.style.display = 'grid';
        }
    }

    // Cambiar estado activo del botón
    const botones = document.querySelectorAll('.btn-filtro');
    botones.forEach(btn => btn.classList.remove('activo'));

    if (botonPresionado) {
        botonPresionado.classList.add('activo');
    } else if (window.event && window.event.target) {
        window.event.target.classList.add('activo');
    }
}

// 📜 FUNCIÓN PARA CERRAR EL PERGAMINO Y REGRESAR A PRINCIPALES
function cerrarPergamino() {
    // 1. Cambiamos la variable global al libro seguro
    libroActual = 'principales';
    
    const avisoElem = document.getElementById('aviso-pergamino');
    const gridElem = document.getElementById('contenedor-personajes-grid');
    
    // 2. Ocultamos el pergamino
    if (avisoElem) {
        avisoElem.classList.add('d-none');
        avisoElem.style.setProperty('display', 'none', 'important');
    }
    
    // 3. Volvemos a mostrar la parrilla
    if (gridElem) {
        gridElem.style.setProperty('display', 'grid', 'important');
    }
    
    // 4. Renderizamos los personajes principales que sí están permitidos
    renderizarPersonajes();
    
    // 5. Restablecemos la pestaña dorada activa en el botón "Principales"
    const botones = document.querySelectorAll('.btn-filtro');
    botones.forEach(btn => {
        btn.classList.remove('activo');
        // Buscamos el botón de 'Principales' o el primero de la lista para ponerlo dorado
        if (btn.innerText.trim().toLowerCase() === 'principales') {
            btn.classList.add('activo');
        }
    });
}

// 🔄 FUNCIÓN DE ROTACIÓN CARDFLIP
function voltearTarjeta(elemento) {
    if (elemento.classList.contains('totalmente-oculto')) return;
    elemento.classList.toggle('volteada');
}

// 👁️ FUNCIÓN PARA SECCIÓN DE REVELACIONES ACCESIBLE
function toggleRevelacion(id) {
    const elementoTexto = document.getElementById(`revelacion-${id}`);
    if (elementoTexto) {
        const estaOculto = elementoTexto.style.display === 'none' || elementoTexto.classList.contains('d-none');
        elementoTexto.style.display = estaOculto ? 'block' : 'none';
        elementoTexto.classList.toggle('d-none');
    }
}