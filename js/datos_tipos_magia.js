const tiposDeMagiaData = [
  {
    id: "energia_natural",
    nombre: "Energía Natural",
    imagenFondo: "imagenes/imagenes_tipos_magia/natural.png",
    colorMarco: "#0b692f",       // Color para el borde/brillo frontal
    colorFondoReverso: "#08ac10",// Color de fondo al dar vuelta
    origenMundo: "Sin color",
    descripcion: "Proviene de los elementos, origen de toda la magia.",
    caracteristicas: ["Fuego", "Agua", "Tierra", "Aire", "Luz"]
  },
  {
    id: "magia_antigua",
    nombre: "Magia Antigua",
    imagenFondo: "imagenes/imagenes_tipos_magia/divina.png",
    colorMarco: "#C0C0C8",
    colorFondoReverso: "#6f7175",
    origenMundo: "Hebras Platinadas",
    descripcion: "Cuando aparecieron los seres mágicos, la energía natural se adaptó para que pudieran utilizarla con mayor facilidad y se convirtió en magia antigua.",
    caracteristicas: ["Utilizada por los nemori"]
  }, 
  {
    id: "magia_contemporanea",
    nombre: "Magia Contemporanea",
    imagenFondo: "imagenes/imagenes_tipos_magia/elemental.png",
    colorMarco: "#e4e28c",       // Color para el borde/brillo frontal
    colorFondoReverso: "#7a711c",// Color de fondo al dar vuelta
    origenMundo: "Serpentinas Doradas",
    descripcion: "Con el tiempo la magia se adaptó a las formas humanas y dio origen a la magia contemporánea, es la que utilizan actualmente todos los vedlys.",
    caracteristicas: ["Encantamientos, hechizos y conjuros especiales"]
  },
  
  {
    id: "magia_obscura",
    nombre: "Magia Oscura",
    imagenFondo: "imagenes/imagenes_tipos_magia/elemental.png",
    colorMarco: "#030a35",       // Color para el borde/brillo frontal
    colorFondoReverso: "#080613",// Color de fondo al dar vuelta
    origenMundo: "Apaga el color original.",
    descripcion: "Magia corrompida por la sombra.",
    caracteristicas: ["Sus usuarios se corrompen automáticamente por ser seguidores de la sombra."]
  },

  {
     id: "magia_perdida",
    nombre: "Magia Perdida",
    imagenFondo: "imagenes/imagenes_tipos_magia/elemental.png",
    colorMarco: "#d735ff",       // Color para el borde/brillo frontal
    colorFondoReverso: "#77086e",// Color de fondo al dar vuelta
    origenMundo: "Motas de colores",
    descripcion: "Magia dispersa acumulada en diferentes lugares del mundo, producto de los desequilibrios generados por las guerras mágicas, el exceso de uso y otras cosas.",
    caracteristicas: ["Diferentes presentaciones. Flota libre en el aire (a veces)"]
  },

  {
     id: "magia_residual",
    nombre: "Magia Residual",
    imagenFondo: "imagenes/imagenes_tipos_magia/elemental.png",
    colorMarco: "#c24a1f",       // Color para el borde/brillo frontal
    colorFondoReverso: "#582e17",// Color de fondo al dar vuelta
    origenMundo: "Adopta el color de el lugar en donde está impregnada.",
    descripcion: "Destellos mágicos provenientes de personas u objetos, que quedan impregnados con el paso del tiempo.",
    caracteristicas: [""]
  },

  {
     id: "magia_entretejida",
    nombre: "Magia Entretejida",
    imagenFondo: "imagenes/imagenes_tipos_magia/elemental.png",
    colorMarco: "#b262d1",       // Color para el borde/brillo frontal
    colorFondoReverso: "#8f4a8f",// Color de fondo al dar vuelta
    origenMundo: "Platinada coloreada",
    descripcion: "Magia que queda en las construcciones, sobre todo las más antiguas, por haberse edificado con mucha magia ambiental.",
    caracteristicas: ["Casi siempre magia antigua"]
  },

  {
     id: "vortice_de_magia",
    nombre: "Vortice de Magia",
    imagenFondo: "imagenes/imagenes_tipos_magia/elemental.png",
    colorMarco: "#8a32dd",       // Color para el borde/brillo frontal
    colorFondoReverso: "#381468",// Color de fondo al dar vuelta
    origenMundo: "Platinada y Dorada",
    descripcion: "Lugares de canalización de la mágia.",
    caracteristicas: ["Antigua y contemporánea"]
  },

  {
     id: "poder_celestia;",
    nombre: "Poder Celestial",
    imagenFondo: "imagenes/imagenes_tipos_magia/elemental.png",
    colorMarco: "#f7f3f2",       // Color para el borde/brillo frontal
    colorFondoReverso: "#8edada",// Color de fondo al dar vuelta
    origenMundo: "Blanca",
    descripcion: "Capacidad de los ángeles para trasladarse, producir luz y otras cosas. Ellos afirman que no es magia.",
    caracteristicas: ["Espejismos"]
  },
];