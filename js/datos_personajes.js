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
    "tipo": "",
    "subtipo": "",
    "origen": "México",
    "rol": "Recolectora",
    "orden": "1",
    "libros": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"],
    "alias": "Kaira",
    "descripcion": "Seria y analítica. Apasionada de los viajes.",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "TRUE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "kaira.jpg"
  },
  {
    "id": "jeziel",
    "nombre": "Elaiah Jeziel",
    "raza": "Celestial",
    "tipo": "Serafin",
    "subtipo": "",
    "origen": "",
    "rol": "Guía y protector de la recolectora",
    "orden": "2",
    "libros": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"],
    "alias": "Jeziel",
    "descripcion": "Enviado para cumplir los deseos de Kaira, con total desconocimiento de las emociones humanas.",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "TRUE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "jeziel.jpg"
  },
  {
    "id": "stefen",
    "nombre": "Stefen Hargrove",
    "raza": "Humano",
    "tipo": "Vedlys",
    "subtipo": "",
    "origen": "Nueva Zelanda",
    "rol": "Maestro",
    "orden": "3",
    "libros": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"],
    "alias": "Stefen",
    "descripcion": "Designado Maestro de magia de Kaira.",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "TRUE",
    "": "",
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
    "descripcion": "Fotografa que viaja por el mundo.",
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
    "nombre": "Daniella Montalvo",
    "raza": "Humano",
    "tipo": "Communia",
    "subtipo": "",
    "origen": "Argentina",
    "rol": "Mejor amiga de Kaira desde la Universidad",
    "orden": "4",
    "libros": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"],
    "alias": "Daniella",
    "descripcion": "Experta cocinera, friki de la tecnología, apasionada de las teorías de conspiración.",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "TRUE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "daniella.jpg"
  },
  {
    "id": "emrys",
    "nombre": "Emrys Merlin",
    "raza": "Humano",
    "tipo": "Vedlys",
    "subtipo": "",
    "origen": "Gran Bretaña",
    "rol": "Director de la Academia Braeiach",
    "orden": "5",
    "libros": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 6", "Libro 7"],
    "alias": "Emrys",
    "descripcion": "Descendiente del Gran Mago Merlin.",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "TRUE",
    "": "",
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
    "imagen": ""
  },
  {
    "id": "wilbur",
    "nombre": "Wilbur",
    "raza": "Nemori",
    "tipo": "Dridalys",
    "subtipo": "",
    "origen": "Gran Bretaña",
    "rol": "Cuidador mágico de la recolectora",
    "orden": "6",
    "libros": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"],
    "alias": "Wilbur",
    "descripcion": "Servicial, experto cocinero.",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "TRUE",
    "": "",
    "libro_revelacion": "",
    "descripcion_revelacion": "",
    "imagen": "wilbur.jpg"
  },
  {
    "id": "preben",
    "nombre": "Preben",
    "raza": "Nemori",
    "tipo": "Kotole",
    "subtipo": "",
    "origen": "Noruega",
    "rol": "Profesor Geomagia",
    "orden": "7",
    "libros": ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6", "Libro 7"],
    "alias": "Preben",
    "descripcion": "",
    "desbloqueado": "TRUE",
    "nombre_visible": "TRUE",
    "revelacion_activa": "",
    "es_principal": "TRUE",
    "": "",
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
    "orden": "10",
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
    "imagen": ""
  },
  {
    "id": "shin-liu",
    "nombre": "Sin Liu",
    "raza": "Humano",
    "tipo": "Communia",
    "subtipo": "",
    "origen": "China",
    "rol": "Compañera de trabajo de Kaira en China",
    "orden": "11",
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
    "imagen": ""
  },
  {
    "id": "altair",
    "nombre": "Altair",
    "raza": "Humano",
    "tipo": "Communia",
    "subtipo": "",
    "origen": "Brasil",
    "rol": "Compañero de trabajo de Kaira en Brasil",
    "orden": "12",
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
    "imagen": ""
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
    "imagen": ""
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
    "imagen": ""
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
    "imagen": ""
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
    "nombre": "",
    "raza": "",
    "tipo": "",
    "subtipo": "",
    "origen": "",
    "rol": "",
    "orden": "18",
    "libros": "",
    "alias": "",
    "descripcion": "",
    "desbloqueado": "",
    "nombre_visible": "",
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