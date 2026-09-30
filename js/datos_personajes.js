// =========================================================================
// 📚 BASE DE DATOS MÍSTICA: PERSONAJES DE LA SAGA
// =========================================================================

// =========================================================================
// 📑 GUÍA RÁPIDA DE INTERRUPTORES (CÓMO CONFIGURAR SPOILERS Y ESTADOS)
// =========================================================================
/*
   ¿Cómo actúan las variables en los datos de tus personajes?
   
   [ ⚙️ CONFIGURACIÓN DE VISIBILIDAD DE LA TARJETA ]
   • TOTALMENTE VISIBLE:       desbloqueado: true  |  nombre_visible: true
   • BLOQUEADO PERO CONOCIDO:  desbloqueado: false |  nombre_visible: true
   • ANTI-SPOILER COMPLETO:    desbloqueado: false |  nombre_visible: false
   
   [ 👁️ CONFIGURACIÓN DE TEXTOS SECRETOS INTERNOS ]
   • revelacion_activa: true  -> Muestra el botón rojo "Ver Revelación" en el reverso.
   • revelacion_activa: false -> Esconde por completo la revelación secreta.
   
   Ejemplo de plantilla de referencia:
   
   {
       id: "shin-liu",
       nombre: "Shin Liu",
       raza: "Humano",
       tipo: "Mortal",
       subtipo: "Guerrero Espiritual",
       origen: "Tierras del Este (Karia)",
       rol: "Custodio del Templo",
       es_principal: true,  // true = Siempre fijo arriba | false = Se oculta según el libro
       orden: 1             // Aparecerá en la posición número 1 de la rejilla
       libros: ["Libro 1", "Libro 2", "Libro 3", "Libro 5"],
       descripcion: "Un silencioso y hábil espadachín errante que custodia los secretos olvidados de su clan.",
       imagen: "imagenes_principal/retratos/shin_liu.jpg",
       
       // <-- CAMBIAR AQUÍ PARA EL SECRETO INTERNO DE LA TARJETA -->
       revelacion_activa: true, 
       libro_revelacion: "Libro 5",
       descripcion_revelacion: "Durante el Eclipse de Sangre en el Libro 5, se revela que Shin Liu es en realidad...",
       
       // <-- CAMBIAR AQUÍ PARA COMPORTAMIENTO 3D MACRO -->
       desbloqueado: true,     
       nombre_visible: true    
   }
*/
// =========================================================================

/* 
  ========================================================================
  NOTAS DE REVELACIONES DE SPOILERS (SISTEMA PROGRESIVO):
  - revelacion_activa: (true/false) Se activa manualmente cuando el libro se publica.
  - libro_revelacion: El libro que contiene el spoiler (ej. "L5").
  - descripcion_revelacion: El texto secreto que se desbloquea tras leer dicho libro.
  ========================================================================
*/

// =========================================================================
// 🎨 GUÍA DE PREPARACIÓN DE ARTE PARA RETRATOS (FUTURA OPTIMIZACIÓN)
// =========================================================================
/*
   Para mantener la web ligera, rápida en móviles y con el encuadre artístico 
   perfecto, sigue estos pasos antes de indexar un nuevo personaje:
   
   1. ✂️ DIMENSIONES Y RECORTE (Proporción 1:1.12):
      • Tamaño Recomendado: 600 × 675 píxeles.
      • Encuadre: Deja un "aire" o margen cómodo alrededor de la cabeza. 
        Asegúrate de que los ojos y el rostro queden en el tercio superior.
        (El CSS actual recortará automáticamente el torso/borde inferior).
        
   2. 🚀 OPTIMIZACIÓN DE PESO (Ideal para producción final):
      • Pasar el archivo por TinyJPG (https://tinyjpg.com/) para reducir KB.
      • Formato ideal del futuro: ".webp" (pesa hasta 70% menos que un .jpg).
      • Peso objetivo por retrato: Entre 30 KB y 60 KB (¡Tu .jpg actual pesa 223 KB!).
      
   3. 🔀 CAMBIO DE FORMATO EN CÓDIGO:
      Si migras a .webp en el futuro, solo debes cambiar la extensión de la ruta 
      en este archivo de datos. El motor de JS y el CSS seguirán intactos.
      Ejemplo: imagen: "imagenes_principal/retratos/heroe.webp"
*/
// =========================================================================

const SAGA_PERSONAJES = [
  {
    "id": "kaira",
    "nombre": "Kaira Ferrer",
    "raza": "Humano",
    "tipo": "Vedlys (anómala)", // PERSONALIZABLE
    "origen": "México",
    "rol": "Protagonista y narradora", // PERSONALIZABLE
    "orden": "1",
    "libros": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"],
    "alias": "Kaira",
    "descripcion": "Es la única humana capaz de usar la magia antigua. Ordena el caos en listas mentales, traduce lo extraordinario a comparaciones domésticas y se hace en silencio las preguntas que nadie le va a contestar, siempre con ironía suave y humor seco. Pragmática por naturaleza, con un fondo romántico que solo asoma cuando el momento lo pide, vive los lugares que recorre y la historia que guardan como algo propio. Determinada incluso cuando eso la lleva a cruzar sus propios límites, no encaja en ningún lugar del sistema de magia: no puede usar la magia contemporánea, y la antigua se adapta a ella en lugar de someterse. Eso la vuelve tan especial como inestable.", // PERSONALIZABLE
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "TRUE",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "kaira.jpg"
  },
  {
    "id": "jeziel",
    "nombre": "Jeziel",
    "raza": "Celestial", // PERSONALIZABLE
    "tipo": "Serafín", // PERSONALIZABLE
    "origen": "Plano Celestial", // PERSONALIZABLE
    "rol": "Acompañante y protector", // PERSONALIZABLE
    "orden": "2", // PERSONALIZABLE
    "libros": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"],
    "alias": "Elahiah Jeziel", // PERSONALIZABLE
    "descripcion": "Serio y solemne, habla poco pero con exactitud, casi en monosílabos, sin modismos y con un tono seco. Lo humano lo desconcierta: no comprende del todo sus costumbres, y su moral es más rígida y menos ambigua que la de quienes lo rodean. Sus movimientos son mínimos y exactos, y su presencia se siente antes de notarse. No ve la magia, pero la percibe. Describe lo que ve y lo que hace, pero nunca lo que siente; advierte las contradicciones sin resolverlas, y no detecta las grietas que él mismo tiene. No necesita comer, dormir ni ninguna otra necesidad física, pero aprende a disfrutar los alimentos.", // PERSONALIZABLE
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "TRUE", // PERSONALIZABLE
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "jeziel.jpg"
  },
  {
    "id": "stefen",
    "nombre": "Stefen", // PERSONALIZABLE
    "raza": "Humano",
    "tipo": "Vedlys",
    "origen": "Nueva Zelanda", // PERSONALIZABLE
    "rol": "Maestro de magia de Kaira", // PERSONALIZABLE
    "orden": "3", // PERSONALIZABLE
    "libros": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"], // PERSONALIZABLE
    "alias": "Stefen",
    "descripcion": "Altamente competente y un maestro desesperante: explica con precisión técnica y términos especializados, con tono profesoral y un dejo de condescendencia, y usa el sarcasmo como forma de relacionarse. Seguro de sí mismo, mantiene la calma cuando la situación se tensa y toma el mando cuando el peligro aparece. Su sonrisa, poco frecuente, contrasta con lo afilado de sus comentarios. Puede ver la magia antigua, pero no usarla.", // PERSONALIZABLE
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "TRUE",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "stefen.jpg"
  },
  {
    "id": "zaha",
    "nombre": "Zaha",
    "raza": "Humano",
    "tipo": "Communia",
    "subtipo": "",
    "origen": "Sudáfrica",
    "rol": "Mejor amiga de Kaira de toda la vida",
    "orden": "8",
    "libros": ["Libro 1", "Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"],
    "alias": "Zaha",
    "descripcion": "Siempre fué la defensora de Kaira en el colegio y en la vida, actualmente es una fotografa que viaja por el mundo. Sus ojos de gato le ganaron muchos apodos que a ella no le molestan. Es directa y un poco sarcástica. Se declara completamente antimagia. ",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "FALSE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "zaha.jpg"
  },
  {
    "id": "daniella",
    "nombre": "Daniella", // PERSONALIZABLE
    "raza": "Humano",
    "tipo": "Communia",
    "origen": "Argentina",
    "rol": "Mejor amiga de Kaira", // PERSONALIZABLE
    "orden": "5", // PERSONALIZABLE
    "libros": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"], // PERSONALIZABLE
    "alias": "Daniella", // PERSONALIZABLE
    "descripcion": "Entusiasta y expresiva, celebra con exclamaciones, suelta referencias de cine y cultura popular a cada oportunidad y dice lo que siente sin dramatismos. Su afecto explícito, pero práctico reconforta sin ponerse meloso. Su formación en informática le da una cabeza lógica y una curiosidad que no se apaga, y sabe traducir lo complejo a algo simple, tiene una memoria casi ediética y es fanática de la magia. Leal, pero no ciega, es capaz de cuestionar a quienes quiere. Tranquila por dentro, de gestos abiertos, asiente mientras escucha, inclina la cabeza y se acerca cuando alguien necesita apoyo.", // PERSONALIZABLE
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "TRUE", // PERSONALIZABLE
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "daniella.jpg"
  },
  {
    "id": "emrys",
    "nombre": "Emrys Merlín", // PERSONALIZABLE
    "raza": "Humano",
    "tipo": "Vedlys",
    "origen": "Gran Bretaña", // PERSONALIZABLE
    "rol": "Director de la Academia Braeiach", // PERSONALIZABLE
    "orden": "4", // PERSONALIZABLE
    "libros": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"], // PERSONALIZABLE
    "alias": "Emrys", // PERSONALIZABLE
    "descripcion": "Director de la Academia Braeiach, presidente de la Hermandad de Merlín y uno de los nodos políticos del mundo mágico. Poderoso vedlys, estratégico y reservado, conoce verdades que otros no y decide con cuidado cuáles compartir. Habla en parlamentos largos y acumulativos, hechos de enumeraciones que fluyen sin tropiezo; no duda, no se interrumpe y no pierde el hilo. Pasa de lo solemne a lo íntimo y de lo íntimo a lo práctico sin transición, y remata con frases cortas que caen como sentencia. Antes que sus palabras habla su cuerpo y acostumbra cambiar de tema sin aviso.", // PERSONALIZABLE
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "TRUE", // PERSONALIZABLE
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "emrys.jpg"
  },
  {
    "id": "enrique",
    "nombre": "Enrique Dzul",
    "raza": "Humano",
    "tipo": "Vedlys",
    "subtipo": "",
    "origen": "México",
    "rol": "Presidente del Consejo Vedlys Mexicano",
    "orden": "9",
    "libros": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"],
    "alias": "Enrique",
    "descripcion": "",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "FALSE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "enrique.jpg"
  },
  {
    "id": "wilbur",
    "nombre": "Wilbur",
    "raza": "Nemori", // PERSONALIZABLE
    "tipo": "Kotole", // PERSONALIZABLE
    "origen": "Celta", // PERSONALIZABLE
    "rol": "Enlace con el mundo mágico y compañero de viaje", // PERSONALIZABLE
    "orden": "6", // PERSONALIZABLE
    "libros": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"], // PERSONALIZABLE
    "alias": "Wilbur",
    "descripcion": "Es un ser de apenas setenta centímetros y un excelente cocinero, con los batidos mágicos como especialidad. Servicial de verdad y cordial con todos, se siente orgulloso de su oficio. Siempre está haciendo algo útil, preparando, ordenando o sirviendo, y se mueve entre los demás con fluidez, sin interrumpir, anticipándose a lo que van a necesitar. Cortés pero cercano, comenta lo práctico y deja caer un humor suave; su expresión amable y su apariencia acogedora hacen que dondequiera que esté se sienta un poco más a gusto.", // PERSONALIZABLE
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "TRUE", // PERSONALIZABLE
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "wilbur.jpg"
  },
  {
    "id": "preben",
    "nombre": "Preben",
    "raza": "Nemori",
    "tipo": "Kotole",
    "origen": "Nórdico",
    "rol": "Profesor invitado de Geomagia", // PERSONALIZABLE
    "orden": "7",
    "libros": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"],
    "alias": "Preben",
    "descripcion": "Más alto que un dridalys pero claramente no humano. Formal y callado al presentarse, cambia por completo cuando enseña: se entusiasma tanto con rocas y minerales que se olvida del mundo y deja a sus alumnos con dolor de cabeza. Directo al grano y con una autoridad que no admite discusión, es quien toma el control cuando algo sale mal, y se preocupa de verdad por la salud de Kaira, a quien solo llama «Recolectora». Habla en frases cortas, sin muletillas, omitiendo artículos, pronombres y hasta verbos auxiliares; nunca dice «yo». Cuando enumera hechos históricos o técnicos, su ritmo se vuelve casi ritual, y mezcla pasado, presente y condicional sin corregirse. Su humor existe, pero no se anuncia: confirma, constata y sigue adelante.", // PERSONALIZABLE
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "TRUE",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "preben.jpg"
  },
  {
    "id": "ailsa",
    "nombre": "Ailsa ",
    "raza": "Humano",
    "tipo": "Vedlys",
    "subtipo": "",
    "origen": "Gran Bretaña",
    "rol": "Profesora culturas mágicas",
    "orden": "12",
    "libros": ["Libro 1", "Libro 2"],
    "alias": "Ailsa",
    "descripcion": "",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "FALSE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "ailsa.jpg"
  },
  {
    "id": "shin-liu",
    "nombre": "Sin Liu",
    "raza": "Humano",
    "tipo": "Communia",
    "subtipo": "",
    "origen": "China",
    "rol": "Compañera de trabajo de Kaira en China",
    "orden": "10",
    "libros": ["Libro 1", "Libro 5"],
    "alias": "Shin Liu",
    "descripcion": "",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "FALSE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "shinliu.jpg"
  },
  {
    "id": "altair",
    "nombre": "Altair",
    "raza": "Humano",
    "tipo": "Communia",
    "subtipo": "",
    "origen": "Brasil",
    "rol": "Compañero de trabajo de Kaira en Brasil",
    "orden": "11",
    "libros": ["Libro 1", "Libro 7"],
    "alias": "Altair",
    "descripcion": "",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "FALSE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "altair.jpg"
  },
  {
    "id": "dasha",
    "nombre": "Dasha",
    "raza": "Humano",
    "tipo": "Vedlys",
    "subtipo": "",
    "origen": "Gran Bretaña",
    "rol": "Profesora  de Alquimia",
    "orden": "13",
    "libros": ["Libro 1"],
    "alias": "Dasha",
    "descripcion": "",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "FALSE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "dasha.jpg"
  },
  {
    "id": "videl",
    "nombre": "Videl",
    "raza": "Humano",
    "tipo": "Vedlys",
    "subtipo": "",
    "origen": "Brasil",
    "rol": "Profesor matemágicas",
    "orden": "14",
    "libros": ["Libro 1"],
    "alias": "Videl",
    "descripcion": "",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "FALSE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "videl.jpg"
  },
  {
    "id": "mustafa",
    "nombre": "Mustafá",
    "raza": "Humano",
    "tipo": "Vedlys",
    "subtipo": "",
    "origen": "",
    "rol": "Profesor encantamientos",
    "orden": "15",
    "libros": ["Libro 1"],
    "alias": "Mustafá",
    "descripcion": "",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "FALSE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "mustafa.jpg"
  },
  {
    "id": "zagner",
    "nombre": "Zagner",
    "raza": "Nemori",
    "tipo": "Elfo",
    "subtipo": "",
    "origen": "Alemania",
    "rol": "Médico de la Academia Braeiach",
    "orden": "16",
    "libros": ["Libro 1"],
    "alias": "Doctor",
    "descripcion": "",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "FALSE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "zagner.jpg"
  },
  {
    "id": "volkov",
    "nombre": "Volkov",
    "raza": "Nemori",
    "tipo": "Volkov",
    "subtipo": "",
    "origen": "Hungría",
    "rol": "Guardian de la Biblioteca de Ginebra",
    "orden": "17",
      "libros": ["Libro 1"],
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "FALSE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "alias": "Volkov",
    "descripcion": "",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "FALSE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "volkov.jpg"
  },
  {
    "id": "madrina",
    "nombre": "Madrina",
    "raza": "Desconocido",
    "tipo": "",
    "subtipo": "",
    "origen": "Desconocido",
    "rol": "Ser imaginario (o no) que escucha a Kaira y le da consejos",
    "orden": "18",
        "libros": ["Libro 1"],
    "descripcion": "",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "FALSE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": ""
  },
  {
    "id": "vasyl",
    "nombre": "Vasyl Ostaf",
    "raza": "Humano",
    "tipo": "Communia",
    "subtipo": "Celestial",
    "origen": "Rusia",
    "rol": "Enlace del gobierno americano con los vedlys",
    "orden": "36",
    "libros": ["Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"],
    "alias": "Vasyl",
    "descripcion": " ",
    "desbloqueado": false,
    "nombre_visible": "TRUE",
    "revelacion_activa": "TRUE",
    "es_principal": "TRUE",
    "libro_revelacion": "Libro 3",
    "descripcion_revelacion": "Físicamente idéntico a Jeziel",
    "imagen": "vasyl.jpg"
  }
];