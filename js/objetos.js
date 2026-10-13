document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-objetos");
    
    if (!contenedor) return;

    datosObjetos.forEach(objeto => {
        const tarjetaNode = document.createElement("div");
        tarjetaNode.classList.add("tarjeta-objeto-wrapper");

        // Estructura interna de la tarjeta (Frente con imagen y nombre / Reverso con detalles limpios)
        tarjetaNode.innerHTML = `
            <div class="tarjeta-objeto-interna">
                <!-- FRENTE -->
                <div class="tarjeta-frente">
                    <div class="contenedor-img">
                        <img src="${objeto.imagen}" alt="${objeto.nombre}">
                    </div>
                    <div class="nombre-frontal">${objeto.nombre}</div>
                </div>
                <!-- REVERSO -->
                <div class="tarjeta-reverso">
                    <div class="detalles-objeto">
                        <h3>${objeto.nombre}</h3>
                        <p><strong>Origen:</strong> ${objeto.origen}</p>
                        <p><strong>Propietario Actual:</strong> ${objeto.propietario_actual}</p>
                        <p class="desc"><strong>Características:</strong><br>${objeto.caracteristicas}</p>
                    </div>
                </div>
            </div>
        `;

        // Evento de clic para el giro en 3D
        tarjetaNode.addEventListener("click", () => {
            tarjetaNode.querySelector(".tarjeta-objeto-interna").classList.toggle("volteada");
        });

        contenedor.appendChild(tarjetaNode);
    });
});