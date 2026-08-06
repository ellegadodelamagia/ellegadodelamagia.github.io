// js/datos_saga.js

window.SAGA_DATA = [
  {
    id: "libro-1",
    numero: 1,
    titulo: "El Despertar de la Magia",
    frase: "El origen de un pacto que lo cambiará todo.",
    imagen: "imagenes_principal/saga/libro1_banner.jpg",
    portada: "imagenes_principal/saga/libro1_portada.jpg",
    contraportada: "imagenes_principal/saga/libro1_contraportada.jpg",
    sinopsis: "En un mundo donde la magia yacía olvidada, un antiguo secreto sale a la luz obligando a reescribir la historia...",
    estado: "disponible", // "disponible", "medio_disponible", "no_disponible"
    nivelVisibilidad: 1, // 1: Visible, 2: Bloqueado (borroso), 3: Oculto (Spoiler)
    desbloqueoEn: null
  },
  {
    id: "libro-2",
    numero: 2,
    titulo: "Ecos del Reino Olvidado",
    frase: "Las sombras del pasado reclaman su lugar.",
    imagen: "imagenes_principal/saga/libro2_banner.jpg",
    portada: "imagenes_principal/saga/libro2_portada.jpg",
    contraportada: "imagenes_principal/saga/libro2_contraportada.jpg",
    sinopsis: "La travesía continúa hacia tierras inexploradas donde la magia sigue reglas olvidadas...",
    estado: "medio_disponible",
    nivelVisibilidad: 2,
    desbloqueoEn: "Se descubre en el Libro 2"
  },
  {
    id: "libro-3",
    numero: 3,
    titulo: "???",
    frase: "Contenido protegido contra spoilers.",
    imagen: "imagenes_principal/saga/locked_cover.jpg",
    portada: "imagenes_principal/saga/locked_cover.jpg",
    contraportada: "",
    sinopsis: "Este tomo contiene eventos cruciales para el desenlace de la saga.",
    estado: "no_disponible",
    nivelVisibilidad: 3,
    desbloqueoEn: "Se descubre en el Libro 3"
  },
  {
    id: "libro-4",
    numero: 4,
    titulo: "Ecos del Reino Olvidado",
    frase: "Las sombras del pasado reclaman su lugar.",
    imagen: "imagenes_principal/saga/libro2_banner.jpg",
    portada: "imagenes_principal/saga/libro2_portada.jpg",
    contraportada: "imagenes_principal/saga/libro2_contraportada.jpg",
    sinopsis: "La travesía continúa hacia tierras inexploradas donde la magia sigue reglas olvidadas...",
    estado: "medio_disponible",
    nivelVisibilidad: 3,
    desbloqueoEn: "Se descubre en el Libro 4"
  },
  {
    id: "libro-5",
    numero: 5,
    titulo: "Ecos del Reino Olvidado",
    frase: "Las sombras del pasado reclaman su lugar.",
    imagen: "imagenes_principal/saga/libro2_banner.jpg",
    portada: "imagenes_principal/saga/libro2_portada.jpg",
    contraportada: "imagenes_principal/saga/libro2_contraportada.jpg",
    sinopsis: "La travesía continúa hacia tierras inexploradas donde la magia sigue reglas olvidadas...",
    estado: "medio_disponible",
    nivelVisibilidad: 3,
    desbloqueoEn: "Se descubre en el Libro 4"
  }
];