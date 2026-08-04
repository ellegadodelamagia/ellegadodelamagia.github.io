// js/datos_mundos.js

const MUNDOS_DATA = [
  {
    id: "mundo_humano",
    nombre: "Mundo Humano",
    nombre_visible: "Humano",
    tipo: "Mundo físico",
    descripcion_breve: "El plano terrenal donde la magia opera bajo el velo de la discreción y el secreto.",
    historia_o_lore: "El Mundo Humano es el hogar de sociedades mortales: algunos desconocen que la magia forma parte de su mundo; otros la utilizan con naturalidad y para distintos fines.",
    reglas_de_magia: "No todos los tipos de magia están al alcance de todos, y sus manifestaciones son casi siempre sutiles.. ",
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
    imagen_fondo: "imagenes_principal/mundos/celestial_bg.jpg",
    desbloqueado: 2, // Nivel 2: Bloqueado pero identificable
    revelado_en: "Libro 2",
    regiones: [
      { id: "serafines", 
        nombre: "Serafines", 
        nombre_visible: "Serafines", 
        tipo: "Orden Celestial", 
        desbloqueado: 1, 
        imagen_fondo: "imagenes_principal/mundos/serafines.jpg", 
        historia_o_lore: "Los guerreros de la primera esfera...", 
        reglas_de_magia: "Llama eterna." },

      { id: "angeles_guardianes", 
        nombre: "Ángeles Guardianes", 
        nombre_visible: "Ángeles Guardianes", 
        tipo: "Orden Celestial", desbloqueado: 1, 
        imagen_fondo: "imagenes_principal/mundos/guardianes.jpg", 
        historia_o_lore: "Protectores asignados al plano mortal...", 
        reglas_de_magia: "Escudos de transmutación espectral." },

      { id: "querubines", 
        nombre: "Querubines Estudiosos", 
        nombre_visible: "Querubines Estudiosos", 
        tipo: "Orden Celestial", 
        desbloqueado: 1, 
        imagen_fondo: "imagenes_principal/mundos/querubines.jpg", 
        historia_o_lore: "Archivistas del conocimiento cósmico...", 
        reglas_de_magia: "Magia psiónica e histórica." },

      { id: "arcangeles", 
        nombre: "Arcángeles", 
        nombre_visible: "Arcángeles", 
        tipo: "Orden Celestial", 
        desbloqueado: 1, 
        imagen_fondo: "imagenes_principal/mundos/arcangeles.jpg", 
        historia_o_lore: "Los comandantes absolutos...", 
        reglas_de_magia: "Magia de orden macro." }
    ]
  },
  {
    id: "el_nemori",
    nombre: "El Nemori",
    nombre_visible: "Nemori",
    tipo: "Mundo Ancestral",
    descripcion_breve: "El conjunto de todos los seres mágicos pensantes del mundo. La cuna de la magia de la naturaleza, espíritus elementales y razas antiguas.",
    historia_o_lore: "Dentro de los nemori se incluyen las cuatro razas originales. Tras la primera guerra mágica y los desequilibrios que esta generó, aparecieron razas posteriores.",
    reglas_de_magia: "Cada raza nemori extrae su poder únicamente de una parte de la energía natural, nunca de toda, aire, agua, tierra o fuego, según la raza, lo cual es lo que distingue mágicamente a unas de otras. Su magia fluye de forma libre: no necesita catalizadores, sino que se moldea directamente con la voluntad y el respeto a la naturaleza.",
    imagen_fondo: "imagenes_principal/mundos/nemori_bg.jpg",
    desbloqueado: 1,
    regiones: [
      {
        id: "dridalys",
        nombre: "Dridalys",
        nombre_visible: "Dridalys",
        tipo: "Raza Ancestral",
        descripcion_breve: "Guardianes del equilibrio entre razas y elementos, y los mejores cocineros del mundo, con equivalentes culturales en casi todos los continentes.",
        historia_o_lore: "Fueron progresivamente esclavizados por las demás razas antes de que el Hacedor enviara el castigo que transformó el mundo. Durante siglos vivieron en casas humanas antes de retirarse al mundo subterráneo; con el tiempo se unieron a familias vedlys, que sí pueden verlos, y hoy son parte integral de sus comunidades..",
        reglas_de_magia: "No se corrompieron durante las guerras mágicas. Usan la energía natural del fuego y pueden realizar pequeños encantamientos. Su capacidad de trasladarse largas distancias y aparecer en lugares con protecciones mágicas no tiene límite de distancia, pero sí de peso en lo que llevan consigo. Cada tradición cultural varía ligeramente en poder, aunque la magia es básicamente la misma.",
        imagen_fondo: "imagenes_principal/mundos/dridalys.jpg",
        desbloqueado: 1,
        sub_razas: ["Aluxes-México, ", "Kete-Africa, ", "Uchuy-Sudamérica, ", "Qizm-Arabia, ", "Malenkiy-Siberia, ", "Xiao-China, ", "Tanuki-Asia", "Brownies-Europa (ahora Drydalis)"]
      },
      {
        id: "elfos",
        nombre: "Elfos",
        nombre_visible: "Elfos",
        tipo: "Raza ancestral",
        descripcion_breve: "Custodios del mundo animal, los más hábiles entre todas las razas nemori para manejar la magia antigua.",
        historia_o_lore: "Con el tiempo se volvieron soberbios y descuidaron su función. Un grupo fiel a sus raíces eligió el exilio antes que abandonar su propósito, y conservó la magia pura que el resto de la raza fue perdiendo.",
        reglas_de_magia: "Su magia proviene de la energía natural del aire. Los elfos corrompidos por la soberbia perdieron la capacidad de hablar con los animales; los puros, en cambio, conservan ese vínculo e incluso pueden transformarse.",
        imagen_fondo: "imagenes_principal/mundos/elfos.jpg",
        desbloqueado: 1
      },
      {
        id: "kotole",
        nombre: "Kotole",
        nombre_visible: "Kotole",
        tipo: "Raza ancestral",
        descripcion_breve: "Grandes clanes dedicados al cuidado y tabajo del subsuelo y todo lo que se encuentra en el. ",
        historia_o_lore: "Encargados de extraer los minerales necesarios para la vida, su profundo conocimiento de la tierra y la energía que contiene los convirtió en maestros artesanos. Un grupo exiliado mantiene esta tradición en el mundo subterráneo. Fabrican armas y objetos para contener la magia que son especiales y muy codiciados. Los mejores artesanos de objetos mágicos entre los nemori.",
        reglas_de_magia: "Su magia proviene de la energía natural de la tierra. Aunque su especialidad es fabricar objetos mágicos, también son capaces de manipular la magia de forma directa.",
        imagen_fondo: "imagenes_principal/mundos/kotole.jpg",
        desbloqueado: 1,
        sub_razas: ["Nórdicos ", "Asiáticos ", "Americanos ", "Africanos "]
      },
      {
        id: "nereidas",
        nombre: "Nereidas",
        nombre_visible: "Nereidas",
        tipo: "Raza ancestral",
        descripcion_breve: "Gobernantes de toda la vegetación, aérea y acuática, y guardianas de las cuevas de cristal donde habitan las ondinas.",
        historia_o_lore: "Su función original era ayudar a las plantas a florecer y expandirse. Como los elfos, un grupo se exilió para conservar su magia intacta; las ondinas, subgrupo de las nereidas, se establecieron en cuevas de cristal..",
        reglas_de_magia: "Usan la energía natural del agua. Las nereidas corrompidas solo pueden extraer magia de las plantas arrancándolas, por lo que evitan usar su poder; las puras pueden obtener la esencia de las plantas sin dañarlas.",
        imagen_fondo: "imagenes_principal/mundos/nereidas.jpg",
        desbloqueado: 1,
        sub_razas: ["Ondinas, ", "Sub-raza 2, ", "Sub-raza 3, ", "Sub-raza 4, "]
      },
      {
        id: "otras_razas_nemori",
        nombre: "Otras Razas del Nemori",
        nombre_visible: "Otras Razas",
        tipo: "Razas Secundarias",
        descripcion_breve: "Criaturas y clanes independientes que habitan los rincones salvajes.",
        historia_o_lore: "Razas que fueron apareciendo después de las guerras mágicas.",
        reglas_de_magia: "Magia física elemental tienen diferentes características.",
        imagen_fondo: "imagenes_principal/mundos/otras_razas.jpg",
        desbloqueado: 1,
        // CAMBIA 'sub_razas' POR 'razas' O 'regiones':
        razas: [
          {
            id: "trolls",
            nombre: "Trdlls",
            descripcion_breve: "Seres de piedra maleable que habitan las formaciones rocosas kársticas del mundo entero. Han existido siempre y absorbieron la energía natural del aire y la tierra. Pueden trasladarse por toda la tierra a través de túneles.",
            imagen_fondo: "imagenes_principal/mundos/trolls.jpg",
            desbloqueado: 1
          },
          {
            id: "volkov",
            nombre: "Volkov",
            descripcion_breve: "Surgieron después de la primera guerra mágica con una naturaleza guardiana innata. Los vedlys los han incorporado a su mundo como guardianes entrenados, una práctica que incomoda al resto de los nemori.",
            imagen_fondo: "imagenes_principal/mundos/volkov.jpg",
            desbloqueado: 1
          }
        ]
      }
    ] // Cierre de regiones de El Nemori
  }, // Cierre del objeto El Nemori
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

// Exportación corregida con el nombre exacto de la constante
export default MUNDOS_DATA;