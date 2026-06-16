// =========================================================================
// 🔮 MOTOR PRINCIPAL - EL LEGADO DE LA MAGIA (REVISADO)
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("Cerebro activado: Buscando botones en el mapa de la web...");

    // =========================================================================
    // 1. MENÚ DESPLEGABLE "DESCUBRIR LA SAGA" (LOS BOTONES DE LA PORTADA)
    // =========================================================================
    const btnMaestro = document.getElementById('btn-maestro-descubrir');
    const menuOpciones = document.getElementById('menu-saga-opciones');

    if (btnMaestro && menuOpciones) {
        // Abrir y cerrar el menú al presionar el botón principal
        btnMaestro.addEventListener('click', (e) => {
            e.stopPropagation();
            menuOpciones.classList.toggle('activo');
            console.log("Menú de la saga alternado (Abierto/Cerrado)");
        });

        // Configurar el deslizamiento suave para cada botón del menú
        const enlacesSaga = document.querySelectorAll('.enlace-saga');
        enlacesSaga.forEach(enlace => {
            enlace.addEventListener('click', (e) => {
                e.preventDefault();
                const destinoID = enlace.getAttribute('href');
                console.log("Intentando viajar hacia: " + destinoID);
                
                const seccionDestino = document.querySelector(destinoID);
                if (seccionDestino) {
                    seccionDestino.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    menuOpciones.classList.remove('activo'); // Cierra el menú tras viajar
                } else {
                    console.error("Error: No encontré ninguna sección en el HTML con el ID: " + destinoID);
                }
            });
        });
    } else {
        console.error("Error crítico: No se encontró el botón maestro o el contenedor del menú en el HTML.");
    }

    // Cerrar el menú si el usuario hace clic en cualquier otra parte muerta de la pantalla
    document.addEventListener('click', () => {
        if (menuOpciones) menuOpciones.classList.remove('activo');
    });

    // =========================================================================
    // 2. BOTÓN INTERACTIVO PARA REVELAR LA PROFECÍA
    // =========================================================================
    const btnProfecia = document.getElementById('btn-revelar-profecia');
    const cajaProfecia = document.getElementById('profecia-clandestina');

    if (btnProfecia && cajaProfecia) {
        btnProfecia.addEventListener('click', () => {
            cajaProfecia.classList.toggle('mostrar');
            console.log("Estado de la profecía alterado.");
            
            if (cajaProfecia.classList.contains('mostrar')) {
                btnProfecia.textContent = "Ocultar la Profecía";
                cajaProfecia.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                btnProfecia.textContent = "Revelar la Profecía";
            }
        });
    } else {
        console.warn("Aviso: Botón de profecía o caja clandestina no detectados en este HTML.");
    }

    // =========================================================================
    // 3. NAVEGACIÓN DE LOS MUNDOS (VEDLYS Y CELESTIAL)
    // =========================================================================
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
});