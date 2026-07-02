// =========================================================================
// 🔮 MOTOR PRINCIPAL - EL LEGADO DE LA MAGIA
// =========================================================================

// =========================================================================
// 🌐 VARIABLES Y FUNCIONES GLOBALES (Fuera de los bloques de carga)
// =========================================================================

// Variable global para recordar a dónde quiere ir el usuario
let paginaDestinoGlobal = "";

// 🔮 FUNCIÓN GLOBAL: Intercepta el clic desde el HTML de forma directa
function abrirPortal(tipo) {
    const modal = document.getElementById('modal-portal');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDescripcion = document.getElementById('modal-descripcion');
    const btnProceder = document.getElementById('btn-modal-proceder');

    if (!modal || !modalTitulo || !modalDescripcion || !btnProceder) {
        console.error("Error: Elementos del modal no encontrados en el HTML.");
        return true; // Si falla el modal, deja que el navegador redirija de forma normal
    }

    if (tipo === 'mapa') {
        modalTitulo.textContent = "EL MAPA DEL VIAJE";
        modalDescripcion.textContent = "Estás a punto de desplegar el mapa interactivo del viaje de Kaira. Aquí podrás explorar los rincones mágicos que descubrió junto a Jeziel en su viaje.";
        btnProceder.textContent = "Desplegar Mapa";
        paginaDestinoGlobal = "mapa.html";
    } else if (tipo === 'recetas') {
        modalTitulo.textContent = "EL RECETARIO DE DANIELLA";
        modalDescripcion.textContent = "Adéntrate en los secretos culinarios de Daniella. Descubrirás sus recetas mas interesantes y algunas que Wilbur le enseñó.";
        btnProceder.textContent = "Abrir Recetario";
        paginaDestinoGlobal = "recetas.html";
    }

    // Mostramos el modal aplicando la clase CSS
    modal.classList.add('mostrar');
    
    // Retornamos 'false' para congelar el enlace <a> en el HTML y que no recargue
    return false; 
}


// =========================================================================
// 🧠 CICLO DE CARGA PRINCIPAL (DOMContentLoaded)
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log("Cerebro activado: motor_principal.js cargado correctamente.");

    // Variable compartida para el cierre del menú de la portada
    const menuOpciones = document.getElementById('menu-saga-opciones');

    // --- 1. MENÚ DESPLEGABLE "DESCUBRIR LA SAGA" (BOTONES PORTADA) ---
    const btnMaestro = document.getElementById('btn-maestro-descubrir');

    if (btnMaestro && menuOpciones) {
        btnMaestro.addEventListener('click', (e) => {
            e.stopPropagation();
            menuOpciones.classList.toggle('activo');
        });

        const enlacesSaga = document.querySelectorAll('.enlace-saga');
        enlacesSaga.forEach(enlace => {
            enlace.addEventListener('click', (e) => {
                e.preventDefault();
                const destinoID = enlace.getAttribute('href');
                const seccionDestino = document.querySelector(destinoID);
                if (seccionDestino) {
                    seccionDestino.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    menuOpciones.classList.remove('activo');
                }
            });
        });
    }

    // Cerrar menú al hacer clic en zonas vacías
    document.addEventListener('click', () => {
        if (menuOpciones) menuOpciones.classList.remove('activo');
    });

    // --- 2. ACCIONES INTERNAS DEL MODAL (ACEPTAR O CANCELAR) ---
    const modal = document.getElementById('modal-portal');
    const btnProceder = document.getElementById('btn-modal-proceder');
    const btnCancelar = document.getElementById('btn-modal-cancelar');

    if (btnProceder) {
        btnProceder.addEventListener('click', () => {
            if (modal) modal.classList.remove('mostrar');
            if (paginaDestinoGlobal) {
                window.location.href = paginaDestinoGlobal; 
            }
        });
    }

    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            if (modal) modal.classList.remove('mostrar');
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        });
    }

    // --- 3. INSERTAR IMAGEN DETRÁS DE LA HISTORIA ---
    const seccionHistoria = document.getElementById('historia');
    const enlacesHistoria = document.querySelectorAll('a[href="#historia"]');

    function revelarMapaFondo() {
        if (seccionHistoria) {
            seccionHistoria.classList.add('mapa-activo');
        }
    }

    enlacesHistoria.forEach(enlace => {
        enlace.addEventListener('click', () => {
            setTimeout(revelarMapaFondo, 300); 
        });
    });

    const observadorMistico = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revelarMapaFondo();
            }
        });
    }, {
        threshold: 0.2 
    });

    if (seccionHistoria) {
        observadorMistico.observe(seccionHistoria);
    }

    // --- 4. BOTÓN INTERACTIVO PARA LA PROFECÍA ---
    const btnProfecia = document.getElementById('btn-revelar-profecia');
    const cajaProfecia = document.getElementById('profecia-clandestina');

    if (btnProfecia && cajaProfecia) {
        btnProfecia.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            cajaProfecia.classList.toggle('mostrar');
            document.body.classList.toggle('pantalla-profecia');
            
            const destinoScroll = document.getElementById('historia');
            if (destinoScroll) {
                if (cajaProfecia.classList.contains('mostrar')) {
                    btnProfecia.textContent = "Ocultar la Profecía";
                    // Al abrir, bajamos suavemente para acompañar el despliegue
                    window.scrollTo({ top: destinoScroll.offsetTop, behavior: 'smooth' });
                } else {
                    btnProfecia.textContent = "Revelar la Profecía";
                    // Al cerrar, DEJAMOS que el CSS haga su magia encogiendo la caja,
                    // sin forzar scrolls raros que rompan la animación.
                }
            }
        });
    } // <-- Recuerda cerrar la llave de la función principal si venía desde arriba
    else {
        console.warn("Aviso: Botón de profecía o caja clandestina no detectados.");
    }

    // --- 5. NAVEGACIÓN DE LOS MUNDOS (VEDLYS Y CELESTIAL) ---
    const btnVedlys = document.getElementById('btn-vedlys');
    const btnCelestial = document.getElementById('btn-celestial');

    if (btnVedlys) {
        btnVedlys.addEventListener('click', () => {
            console.log("Viajando al Reino de Vedlys...");
            const subVedlys = document.getElementById('sub-vedlys');
            if (subVedlys) subVedlys.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (btnCelestial) {
        btnCelestial.addEventListener('click', () => {
            console.log("Viajando al Plano Celestial...");
            const subCelestial = document.getElementById('sub-celestial');
            if (subCelestial) subCelestial.scrollIntoView({ behavior: 'smooth' });
        });
    }

}); // 🏁 FIN DEL DOMCONTENTLOADED