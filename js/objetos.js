/* =====================================================================
   OBJETOS — ARMADO DE TARJETAS
   Archivo completo. Reemplaza todo el JS anterior de las tarjetas de objetos.

   Qué hace: toma la lista datosObjetos (tu archivo de datos) y crea una
   tarjeta por cada objeto dentro de <div id="contenedor-objetos">.
   Las clases llevan el prefijo "obj-" para coincidir con objetos.css.

   ÍNDICE
   1. Esperar a que cargue la página
   2. Crear una tarjeta por objeto
   3. Contenido de la tarjeta (frente y reverso)
   4. Giro al hacer clic
   ===================================================================== */

/* 1. ESPERAR A QUE CARGUE LA PÁGINA */
document.addEventListener("DOMContentLoaded", () => {

    // PERSONALIZABLE: id del contenedor en tu HTML (debe existir ahí: <div id="contenedor-objetos"></div>)
    const contenedor = document.getElementById("contenedor-objetos");
    if (!contenedor) return;

    /* 2. CREAR UNA TARJETA POR OBJETO */
    datosObjetos.forEach(objeto => {
        const tarjetaNode = document.createElement("div");
        tarjetaNode.classList.add("obj-wrapper");

        /* 3. CONTENIDO DE LA TARJETA */
        // PERSONALIZABLE: aquí cambias qué campos se muestran y en qué orden
        tarjetaNode.innerHTML = `
            <div class="obj-interna">

                <!-- FRENTE: imagen y nombre -->
                <div class="obj-frente">
                    <div class="obj-img">
                        <!-- onerror: si la imagen aún no existe, se oculta el ícono roto y queda el cuadro limpio -->
                        <img src="${objeto.imagen}" alt="${objeto.nombre}" onerror="this.style.visibility='hidden'">
                    </div>
                    <div class="obj-nombre">${objeto.nombre}</div>
                </div>

                <!-- REVERSO: detalles -->
                <div class="obj-reverso">
                    <div class="obj-detalles">
                        <h3>${objeto.nombre}</h3>
                        <p><strong>Origen:</strong> ${objeto.origen}</p>
                        <p><strong>Propietario actual:</strong> ${objeto.propietario_actual}</p>
                        <p class="obj-desc"><strong>Características:</strong><br>${objeto.caracteristicas}</p>
                    </div>
                </div>

            </div>
        `;

        /* 4. GIRO AL HACER CLIC */
        tarjetaNode.addEventListener("click", () => {
            tarjetaNode.querySelector(".obj-interna").classList.toggle("obj-volteada");
        });

        contenedor.appendChild(tarjetaNode);
    });
});