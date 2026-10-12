const tiposDeMagiaData = [
  {
    id: "energia_natural",
    nombre: "Energía Natural",
    imagenFondo: "imagenes_principal/imagenes_tipos_magia/natural.png",
    colorMarco: "#0b692f",
    colorFondoReverso: "#08ac10",
    origenMundo: "Sin color",
    clasificacionCelestial: "Pasiva",
    efectoCelestial: "Nulo",
    descripcion: "La unión de los elementos: Fuego, Agua, Tierra, Aire, Luz.",
    caracteristicas: "No se considera magia, sino la energía que la genera; a partir de ella se desarrolla toda la magia existente. En su estado natural, sin necesidad de separar sus elementos, solo puede ser utilizada por los nemori exiliados.",
  },

  {
    id: "energia_amiental",
    nombre: "Energía Ambiental",
    imagenFondo: "imagenes_principal/imagenes_tipos_magia/ambiental.png",
    colorMarco: "#4de8c8",
    colorFondoReverso: "#0d7d6c",
    origenMundo: "Sin color",
    clasificacionCelestial: "Pasiva",
    efectoCelestial: "Nulo",
    descripcion: "La energía que fluye libremente en el ambiente, lista para ser tomada.",
    caracteristicas: "No se considera magia. Es la energía interna que contienen todas las cosas (vivas y no vivas) de la naturaleza, latente en el ambiente. Cualquier nemori puede utilizarla sin problema; entre los vedlys, solo quienes son lo bastante inteligentes logran emplearla para hechizos y encantamientos (no hace falta que sean poderosos), siempre que no atenten contra la naturaleza. Usarla en exceso puede generar un desequilibrio y provocar sequías, entre otros efectos.",
  },

  {
    id: "magia_antigua",
    nombre: "Magia Antigua",
    imagenFondo: "imagenes_principal/imagenes_tipos_magia/antigua.png",
    colorMarco: "#C0C0C8",
    colorFondoReverso: "#6f7175",
    origenMundo: "Hebras Platinadas",
    clasificacionCelestial: "Activa",
    efectoCelestial: "Variable: A mayor concentración presente, mayor es el efecto sobre un celestial.",
    descripcion: "Magia surgida de la adaptación de la energía natural para los primeros seres mágicos.",
    caracteristicas: "Fue la primera en aparecer: cuando surgieron los seres mágicos, la energía natural se adaptó para que pudieran utilizarla con mayor facilidad. Es la magia propia de los nemori, y hoy coexiste con la magia contemporánea, que es la que usan los vedlys. Se cree que drena la energía vital de quien la utiliza, aunque no existen registros confirmados, ya que no se conoce a ningún humano que haya logrado usarla..",
  }, 
  {
    id: "magia_contemporanea",
    nombre: "Magia Contemporanea",
    imagenFondo: "imagenes_principal/imagenes_tipos_magia/actual.png",
    colorMarco: "#e4e28c",       // Color para el borde/brillo frontal
    colorFondoReverso: "#7a711c",// Color de fondo al dar vuelta
    origenMundo: "Serpentinas Doradas",
    clasificacionCelestial: "Activa",
    efectoCelestial: "Variable: A mayor concentración presente, mayor es el efecto sobre un celestial.",
    descripcion: "Magia surgida de la adaptación de la magia antigua a las formas humanas.",
    caracteristicas: "Cuando aparecieron los humanos, la magia antigua se replegó hacia la tierra porque los humanos no creían en ella. En algunos lugares esa magia replegada se integró al ambiente, y los humanos que tuvieron contacto con esos lugares lograron vincularse a ella, dando origen a la magia contemporánea. Es estable y canalizada principalmente con varitas.",
   },
  
  {
    id: "magia_obscura",
    nombre: "Magia Oscura",
    imagenFondo: "imagenes/imagenes_tipos_magia/elemental.png",
    colorMarco: "#030a35",       // Color para el borde/brillo frontal
    colorFondoReverso: "#080613",// Color de fondo al dar vuelta
    origenMundo: "Apaga el color original.",
    clasificacionCelestial: "Activa",
    efectoCelestial: "Variable aunque siempre grave: A mayor concentración presente, mayor es el efecto sobre un celestial.",
    descripcion: "Magia que la Sombra dejó sembrada en el mundo; apaga el color de la magia que toca.",
    caracteristicas: "Coexiste con la magia antigua y la contemporánea, corrompiéndolas cuando quien las emplea ya ha usado magia oscura antes. No es resultado de una elección: va oscureciendo progresivamente a quien la porta, hasta que ya no le es posible utilizar ninguna otra magia, convirtiéndolo (sin quererlo) en súbdito de la Sombra.",
  },

  {
     id: "magia_perdida",
    nombre: "Magia Perdida",
    imagenFondo: "imagenes/imagenes_tipos_magia/elemental.png",
    colorMarco: "#d735ff",       // Color para el borde/brillo frontal
    colorFondoReverso: "#77086e",// Color de fondo al dar vuelta
    origenMundo: "Motas de colores",
    clasificacionCelestial: "Activa",
    efectoCelestial: "Variable: A mayor concentración presente, mayor es el efecto sobre un celestial.",
    descripcion: "MMotas de magia dispersa, acumuladas en distintos lugares del mundo.",
    caracteristicas: "Es producto de los desequilibrios generados por las guerras mágicas, el exceso de uso y otras causas similares. Se presenta de formas distintas según el lugar donde se acumula.",
  },

  {
     id: "magia_residual",
    nombre: "Magia Residual",
    imagenFondo: "imagenes/imagenes_tipos_magia/elemental.png",
    colorMarco: "#c24a1f",       // Color para el borde/brillo frontal
    colorFondoReverso: "#582e17",// Color de fondo al dar vuelta
    origenMundo: "Adopta el color de el lugar en donde está impregnada.",
    clasificacionCelestial: "Pasiva (en concentraciones bajas)",
    efectoCelestial: "Variable: en concentraciones medias a altas su efecto es igual al de la magia perdida.",
    descripcion: "Destellos mágicos provenientes de personas u objetos, que quedan impregnados con el paso del tiempo.",
    caracteristicas: "Flota libre en el aire (a veces)",
  },

  {
     id: "magia_entretejida",
    nombre: "Magia Entretejida",
    imagenFondo: "imagenes/imagenes_tipos_magia/elemental.png",
    colorMarco: "#8a5a3b",       // Color para el borde/brillo frontal
    colorFondoReverso: "#3f2616",// Color de fondo al dar vuelta
    origenMundo: "Cobriza",
    clasificacionCelestial: "Pasiva ",
    efectoCelestial: "Repele ligeramente, sin ningún otro efecto.",
    descripcion: "Magia que queda impregnada en las construcciones, sobre todo las más antiguas, por haberse edificado con magia ambiental.",
    caracteristicas: "No es magia antigua (los vedlys no pueden usarla) ni tampoco contemporánea; es su propia categoría, que se va formando y transformando con el paso del tiempo dentro de la construcción que la alberga.",
  },

  {
     id: "vortice_de_magia",
    nombre: "Vortice de Magia",
    imagenFondo: "imagenes_principal/imagenes_tipos_magia/vortice.png",
    colorMarco: "#8a32dd",       // Color para el borde/brillo frontal
    colorFondoReverso: "#381468",// Color de fondo al dar vuelta
    origenMundo: "Platinada y Dorada",
    clasificacionCelestial: "Activa ",
    efectoCelestial: "Drena la energía celestial al máximo y la absorbe, sin importar la concentración presente.",
    descripcion: "Lugares de canalización de la mágia.",
    caracteristicas: "Su color platinado y dorado refleja la unión de las magias que confluyen en él que son principalmente antigua y contemporánea.Está en constante movimiento ya que la magia antigua y la contemporánea no se mezclan.",
  },

  {
     id: "poder_celestia;",
    nombre: "Poder Celestial",
    imagenFondo: "imagenes_principal/imagenes_tipos_magia/celestial.png",
    colorMarco: "#f7f3f2",       // Color para el borde/brillo frontal
    colorFondoReverso: "#a4a7a7",// Color de fondo al dar vuelta
    origenMundo: "Blanca",
    clasificacionCelestial: "No aplicable",
    efectoCelestial: "Propia de ellos.",
    descripcion: "Capacidad de los ángeles para sobrevivir en el plano humano",
    caracteristicas: "Los ángeles insisten en que esto no es magia, sino una facultad propia de su naturaleza.  Dentro de lo que les permite hacer es: trasladarse, sanar, crear espejismos del pasado, generar luz serafica, y otras habilidades que no se han revelado.",
  },
];