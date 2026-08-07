// js/datos_saga.js

window.SAGA_DATA = [
  {
    id: "libro-1",
    numero: 1,
    titulo: "El Despertar de la Magia",
    frase: "La magia permanece oculta, hasta que una profecía la despierta.",
    imagen: "imagenes_principal/saga/libro1_banner.jpg",
    portada: "imagenes_principal/saga/libro1_portada.jpg",
    contraportada: "imagenes_principal/saga/libro1_contraportada.jpg",
    sinopsis: "Kaira siempre supo que había algo diferente en su familia, pero nunca imaginó que la magia fuera real. Un viaje inesperado la obliga a descubrir quién es en verdad.",
    estado: "disponible", // "disponible", "medio_disponible", "no_disponible"
    nivelVisibilidad: 1, // 1: Visible, 2: Bloqueado (borroso), 3: Oculto (Spoiler)
    desbloqueoEn: null
  },
  {
    id: "libro-2",
    numero: 2,
    titulo: "El retorno de la magia",
    frase: "Lo robado exige ser devuelto.",
    imagen: "imagenes_principal/saga/libro2_banner.jpg",
    portada: "imagenes_principal/saga/libro2_portada.jpg",
    contraportada: "imagenes_principal/saga/libro2_contraportada.jpg",
    sinopsis: "La magia de Whitby ha sido robada y el equilibrio del mundo mágico está en riesgo. Kaira deberá encontrar la forma de retornarla.",
    estado: "medio_disponible",
    nivelVisibilidad: 2,
    desbloqueoEn: "Se descubre en el Libro 2"
  },
  {
    id: "libro-3",
    numero: 3,
    titulo: "Las pruebas de la magia",
    frase: "Nadie recibe sin antes demostrar que lo merece.",
    imagen: "imagenes_principal/saga/locked_cover.jpg",
    portada: "imagenes_principal/saga/locked_cover.jpg",
    contraportada: "",
    sinopsis: "Antes de continuar su camino, Kaira debe superar las pruebas que le imponen. Solo quien las supere podrá recibir lo que le falta.",
    estado: "no_disponible",
    nivelVisibilidad: 3,
    desbloqueoEn: "Se descubre en el Libro 3"
  },
  {
    id: "libro-4",
    numero: 4,
    titulo: "El mandato de la magia",
    frase: "No toda misión termina donde promete.",
    imagen: "imagenes_principal/saga/libro4_banner.jpg",
    portada: "imagenes_principal/saga/libro4_portada.jpg",
    contraportada: "imagenes_principal/saga/libro4_contraportada.jpg",
    sinopsis: "Un mandato lleva a Kaira y su grupo hasta Estados Unidos, donde deberán cumplir tareas que ponen a prueba lo aprendido. Hay seres que no deberían existir.",
    estado: "medio_disponible",
    nivelVisibilidad: 3,
    desbloqueoEn: "Se descubre en el Libro 4"
  },
  {
    id: "libro-5",
    numero: 5,
    titulo: "La revelación de la magia",
    frase: "El tiempo guarda secretos que pocos pueden leer.",
    imagen: "imagenes_principal/saga/libro5_banner.jpg",
    portada: "imagenes_principal/saga/libro5_portada.jpg",
    contraportada: "imagenes_principal/saga/libro5_contraportada.jpg",
    sinopsis: "Un descubrimiento inesperado revela que hay más personas ligadas al destino de la magia de lo que Kaira creía. Nada volverá a verse de la misma forma.",
    estado: "medio_disponible",
    nivelVisibilidad: 3,
    desbloqueoEn: "Se descubre en el Libro 5"
  },
{
  id: "libro-6",
    numero: 6,
    titulo: "El destino de la magia",
    frase: "Verdades que estan ocultas, hasta que los tres convergen.",
    imagen: "imagenes_principal/saga/libro6_banner.jpg",
    portada: "imagenes_principal/saga/libro6_portada.jpg",
    contraportada: "imagenes_principal/saga/libro6_contraportada.jpg",
    sinopsis: "Una profecía olvidada empieza a cobrar sentido cuando la tríada se completa. Lo que revela cambiará el rumbo de todos.",
    estado: "medio_disponible",
    nivelVisibilidad: 3,
    desbloqueoEn: "Se descubre en el Libro 6"
  },
  {
  id: "libro-7",
    numero: 7,
    titulo: "El duelo de la magia",
    frase: "No toda magia se controla, ni todo lo perdido regresa.",
    imagen: "imagenes_principal/saga/libro7_banner.jpg",
    portada: "imagenes_principal/saga/libro7_portada.jpg",
    contraportada: "imagenes_principal/saga/libro7_contraportada.jpg",
    sinopsis: "Un vórtice de magia desatado pone en peligro a quienes Kaira más quiere. No todas las despedidas se eligen.",
    estado: "medio_disponible",
    nivelVisibilidad: 3,
    desbloqueoEn: "Se descubre en el Libro 7"
  },
{
  id: "libro-8",
    numero: 8,
    titulo: "Los herederos de la magia",
    frase: "Los antiguos dejaron instrucciones, hoy dispersas.",
    imagen: "imagenes_principal/saga/libro8_banner.jpg",
    portada: "imagenes_principal/saga/libro8_portada.jpg",
    contraportada: "imagenes_principal/saga/libro8_contraportada.jpg",
    sinopsis: "El Libro de los Herederos está fragmentado en ocho partes repartidas por el mundo. Encontrarlas es la única forma de entender lo que viene.",
    estado: "medio_disponible",
    nivelVisibilidad: 3,
    desbloqueoEn: "Se descubre en el Libro 8"
  },
  {
  id: "libro-9",
    numero: 9,
    titulo: "Los maestros de la magia",
    frase: "Antes de la prueba final, hay que aprender lo que nadie enseña.",
    imagen: "imagenes_principal/saga/libro9_banner.jpg",
    portada: "imagenes_principal/saga/libro9_portada.jpg",
    contraportada: "imagenes_principal/saga/libro9_contraportada.jpg",
    sinopsis: "Los maestros de la magia tienen mucho que enseñar, pero poco tiempo para hacerlo. Lo que Kaira aprenda aquí definirá si está lista para lo que sigue.",
    estado: "medio_disponible",
    nivelVisibilidad: 3,
    desbloqueoEn: "Se descubre en el Libro 9"
  },
  {
  id: "libro-10",
    numero: 10,
    titulo: "El legado de la magia",
    frase: "La sombra y el despertar se enfrentan por primera y última vez.",
    imagen: "imagenes_principal/saga/libro10_banner.jpg",
    portada: "imagenes_principal/saga/libro10_portada.jpg",
    contraportada: "imagenes_principal/saga/libro10_contraportada.jpg",
    sinopsis: "Todo lo que despertó en el primer libro llega a su punto final. La sombra y la magia perdida se enfrentan por última vez.",
    estado: "medio_disponible",
    nivelVisibilidad: 3,
    desbloqueoEn: "Se descubre en el Libro 10"
  }
];