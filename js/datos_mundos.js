// js/datos_mundos.js

const MUNDOS_DATA = [
  {
    id: "mundo_humano",
    nombre: "Mundo Humano",
    nombre_visible: "Humano",
    tipo: "Mundo físico",
    descripcion_breve: "El plano terrenal donde la magia opera bajo el velo de la discreción y el secreto.",
    historia_o_lore: "El Mundo Humano es el hogar de sociedades mortales: algunos desconocen que la magia forma parte de su mundo; otros la utilizan con naturalidad y para distintos fines.",
    reglas_de_magia: "No todos los tipos de magia están al alcance de todos, y sus manifestaciones son casi siempre sutiles.",
    imagen_fondo: "imagenes_principal/mundos/humano_bg.jpg",
    desbloqueado: 1, // Nivel 1: Completamente visible
    revelado_en: "Libro 1",
    regiones: [
      {
        id: "communia",
        nombre: "Communia",
        nombre_visible: "Communia",
        tipo: "Región Humana",
        descripcion_breve: "El eje central de la sociedad mortal y el comercio del plano físico.",
        historia_o_lore: "Communia es el corazón latente de la civilización humana en la saga. Una vasta extensión urbana y rural donde las intrigas políticas se mezclan con remanentes de magia antigua.",
        reglas_de_magia: "Flujo mágico pasivo. Los hechizos requieren alta concentración y rituales estructurados.",
        imagen_fondo: "imagenes_principal/mundos/communia.jpg",
        desbloqueado: 1
      },
      {
        id: "vedlys",
        nombre: "Vedlys",
        nombre_visible: "Vedlys",
        tipo: "Región Humana",
        descripcion_breve: "Una región mística oculta entre los pliegues del espacio humano.",
        historia_o_lore: "Vedlys actúa como un puente cuántico/mágico dentro del Mundo Humano. Es una zona de acceso restringido donde las leyes físicas comienzan a desdibujarse.",
        reglas_de_magia: "Distorsión espacial leve. Los catalizadores aumentan su rendimiento un 50%.",
        imagen_fondo: "imagenes_principal/mundos/vedlys.jpg",
        desbloqueado: 1
      }
    ]
  },
  {
    id: "mundo_celestial",
    nombre: "Mundo Celestial",
    nombre_visible: "Celestial",
    tipo: "Dimensión",
    descripcion_breve: "El reino de las esferas superiores, el orden sagrado y la justicia etérea.",
    historia_o_lore: "Gobernado por entidades de luz pura y estructuras inquebrantables, el plano celestial vigila el equilibrio del multiverso.",
    reglas_de_magia: "Magia basada en la frecuencia lumínica y decretos divinos. Inmune a la corrupción orgánica.",
    desbloqueado: 2, // Nivel 2: Bloqueado pero identificable
    revelado_en: "Libro 2",
    imagen_fondo: "imagenes_principal/mundos/celestial_bg.jpg",
    regiones: [
      { 
        id: "serafines", 
        nombre: "Serafines", 
        nombre_visible: "Serafines", 
        tipo: "Orden Celestial", 
        descripcion_breve: "Guerreros sagrados de la primera esfera.",
        historia_o_lore: "Los guerreros de la primera esfera en la jerarquía del Reino Celestial.", 
        reglas_de_magia: "Manipulación de la llama eterna sagrada.",
        imagen_fondo: "imagenes_principal/mundos/serafines.jpg", 
        desbloqueado: 1 
      },
      { 
        id: "angeles_guardianes", 
        nombre: "Ángeles Guardianes", 
        nombre_visible: "Ángeles Guardianes", 
        tipo: "Orden Celestial", 
        descripcion_breve: "Protectores asignados al plano terrenal.",
        historia_o_lore: "Protectores asignados al plano mortal para preservar vidas clave en el destino.", 
        reglas_de_magia: "Escudos de transmutación espectral e invisibilidad sutil.",
        imagen_fondo: "imagenes_principal/mundos/guardianes.jpg", 
        desbloqueado: 1 
      },
      { 
        id: "querubines", 
        nombre: "Querubines Estudiosos", 
        nombre_visible: "Querubines Estudiosos", 
        tipo: "Orden Celestial", 
        descripcion_breve: "Archivistas del conocimiento cósmico.",
        historia_o_lore: "Guardias del conocimiento ancestral y observadores del tejido espacio-temporal.", 
        reglas_de_magia: "Magia psiónica, lectura de líneas temporales e historia.",
        imagen_fondo: "imagenes_principal/mundos/querubines.jpg", 
        desbloqueado: 1 
      },
      { 
        id: "arcangeles", 
        nombre: "Arcángeles", 
        nombre_visible: "Arcángeles", 
        tipo: "Orden Celestial", 
        descripcion_breve: "Los comandantes absolutos del ejército celestial.",
        historia_o_lore: "Líderes estratégicos y ejecutores directos de la voluntad de las esferas superiores.", 
        reglas_de_magia: "Magia de orden macro y alteración del entorno a gran escala.",
        imagen_fondo: "imagenes_principal/mundos/arcangeles.jpg", 
        desbloqueado: 1 
      }
    ]
  },
  {
    id: "el_nemori",
    nombre: "El Nemori",
    nombre_visible: "Nemori",
    tipo: "Mundo Ancestral",
    descripcion_breve: "El conjunto de todos los seres mágicos pensantes del mundo. La cuna de la magia de la naturaleza, espíritus elementales y razas antiguas.",
    historia_o_lore: "Dentro de los nemori se incluyen las cuatro razas originales. Tras la primera guerra mágica y los desequilibrios que esta generó, aparecieron razas posteriores.",
    reglas_de_magia: "Cada raza nemori extrae su poder únicamente de una parte de la energía natural, nunca de toda (aire, agua, tierra o fuego). Su magia fluye libremente: no necesita catalizadores, sino que se moldea con la voluntad y el respeto a la naturaleza.",
    imagen_fondo: "imagenes_principal/mundos/nemori_bg.jpg",
    desbloqueado: 1,
    regiones: [
      {
        id: "dridalys",
        nombre: "Dridalys",
        nombre_visible: "Dridalys",
        tipo: "Raza Ancestral",
        descripcion_breve: "Guardianes del equilibrio entre razas y elementos, y los mejores cocineros del mundo.",
        historia_o_lore: "Fueron progresivamente esclavizados por las demás razas antes de que el Hacedor enviara el castigo que transformó el mundo. Durante siglos vivieron en casas humanas antes de retirarse al mundo subterráneo; con el tiempo se unieron a familias vedlys, que sí pueden verlos, y hoy son parte integral de sus comunidades.",
        reglas_de_magia: "No se corrompieron durante las guerras mágicas. Usan la energía natural del fuego y pueden realizar pequeños encantamientos. Su capacidad de trasladarse largas distancias y aparecer en lugares con protecciones mágicas no tiene límite de distancia, pero sí de peso en lo que llevan consigo.",
        imagen_fondo: "imagenes_principal/mundos/dridalys.jpg",
        desbloqueado: 1,
        sub_razas: [
          "Aluxes (México)", 
          "Kete (África)", 
          "Uchuy (Sudamérica)", 
          "Qizm (Arabia)", 
          "Malenkiy (Siberia)", 
          "Xiao (China)", 
          "Tanuki (Asia)", 
          "Brownies (Europa)"
        ]
      },
      {
        id: "elfos",
        nombre: "Elfos",
        nombre_visible: "Elfos",
        tipo: "Raza Ancestral",
        descripcion_breve: "Custodios del mundo animal, los más hábiles entre todas las razas nemori para manejar la magia antigua.",
        historia_o_lore: "Con el tiempo se volvieron soberbios y descuidaron su función. Un grupo fiel a sus raíces elegió el exilio antes que abandonar su propósito, conservando la magia pura que el resto de la raza fue perdiendo.",
        reglas_de_magia: "Su magia proviene de la energía natural del aire. Los elfos corrompidos por la soberbia perdieron la capacidad de hablar con los animales; los puros, en cambio, conservan ese vínculo e incluso pueden transformarse.",
        imagen_fondo: "imagenes_principal/mundos/elfos.jpg",
        desbloqueado: 1
      },
      {
        id: "kotole",
        nombre: "Kotole",
        nombre_visible: "Kotole",
        tipo: "Raza Ancestral",
        descripcion_breve: "Grandes clanes dedicados al cuidado y trabajo del subsuelo.",
        historia_o_lore: "Encargados de extraer los minerales necesarios para la vida, su profundo conocimiento de la tierra los convirtió en maestros artesanos. Un grupo exiliado mantiene esta tradición en el mundo subterráneo. Fabrican armas y objetos para contener la magia muy codiciados.",
        reglas_de_magia: "Su magia proviene de la energía natural de la tierra. Aunque su especialidad es fabricar objetos mágicos, también son capaces de manipular la magia de forma directa.",
        imagen_fondo: "imagenes_principal/mundos/kotole.jpg",
        desbloqueado: 1,
        sub_razas: ["Nórdicos", "Asiáticos", "Americanos", "Africanos"]
      },
      {
        id: "nereidas",
        nombre: "Nereidas",
        nombre_visible: "Nereidas",
        tipo: "Raza Ancestral",
        descripcion_breve: "Gobernantes de la vegetación y guardianas de las cuevas de cristal.",
        historia_o_lore: "Su función original era ayudar a las plantas a florecer y expandirse. Como los elfos, un grupo se exilió para conservar su magia intacta; las ondinas, subgrupo de las nereidas, se establecieron en cuevas de cristal.",
        reglas_de_magia: "Usan la energía natural del agua. Las nereidas corrompidas solo pueden extraer magia de las plantas arrancándolas; las puras pueden obtener la esencia de las plantas sin dañarlas.",
        imagen_fondo: "imagenes_principal/mundos/nereidas.jpg",
        desbloqueado: 1,
        sub_razas: ["Ondinas", "Nereidas de Arrecife", "Nereidas Fluviales", "Nereidas de Ciénaga"]
      },
      {
        id: "otras_razas_nemori",
        nombre: "Otras Razas del Nemori",
        nombre_visible: "Otras Razas",
        tipo: "Razas Secundarias",
        descripcion_breve: "Criaturas y clanes independientes que habitan los rincones salvajes.",
        historia_o_lore: "Razas que fueron apareciendo progresivamente tras los eventos desestabilizadores de la primera guerra mágica.",
        reglas_de_magia: "Poseen magias físicas o elementales híbridas con características únicas según su estirpe.",
        imagen_fondo: "imagenes_principal/mundos/otras_razas.jpg",
        desbloqueado: 1,
        regiones: [
          {
            id: "trolls",
            nombre: "Trdlls",
            nombre_visible: "Trdlls",
            tipo: "Raza Secundaria",
            descripcion_breve: "Seres de piedra maleable que habitan las formaciones rocosas kársticas del mundo entero.",
            historia_o_lore: "Han existido desde tiempos remotos y absorbieron la energía natural del aire y la tierra. Pueden trasladarse rápidamente a través de complejas redes de túneles subterráneos.",
            reglas_de_magia: "Resistencia física extrema, mimetismo con la piedra y canalización pasiva de energía telúrica.",
            imagen_fondo: "imagenes_principal/mundos/trolls.jpg",
            desbloqueado: 1
          },
          {
            id: "volkov",
            nombre: "Volkov",
            nombre_visible: "Volkov",
            tipo: "Raza Secundaria",
            descripcion_breve: "Guardianes de naturaleza instintiva surgidos tras la primera guerra mágica.",
            historia_o_lore: "Surgieron con una inclinación protectora innata. Los vedlys los han incorporado como guardianes entrenados, una práctica que causa cierta incomodidad en el resto de la comunidad nemori.",
            reglas_de_magia: "Percepción sensorial amplificada, vínculo táctico y aumento de fuerza en combate nocturno.",
            imagen_fondo: "imagenes_principal/mundos/volkov.jpg",
            desbloqueado: 1
          }
        ]
      }
    ]
  },
  {
    id: "mundo_secreto",
    nombre: "Dimensión del Vacío",
    nombre_visible: "???",
    tipo: "Desconocido",
    descripcion_breve: "???",
    historia_o_lore: "???",
    reglas_de_magia: "???",
    imagen_fondo: "imagenes_principal/mundos/locked_bg.jpg",
    desbloqueado: 3, // Nivel 3: Spoiler total
    revelado_en: "Libro 3",
    regiones: []
  }
];

export default MUNDOS_DATA;