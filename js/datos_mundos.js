// js/datos_mundos.js

const MUNDOS_DATA = [
  {
    id: "mundo_humano",
    nombre: "Mundo Humano",
    nombre_visible: "Mundo Humano",
    tipo: "Dimensión",
    descripcion_breve: "El plano terrenal donde la magia opera bajo el velo de la discreción y el secreto.",
    historia_o_lore: "El Mundo Humano ha permanecido aislado de las corrientes macro de la magia pura durante milenios. Protegido por antiguas barreras, es el hogar de sociedades mortales que, en su mayoría, ignoran los hilos místicos que sostienen su realidad.",
    reglas_de_magia: "La magia aquí está fuertemente limitada por el velo. Requiere catalizadores físicos, reliquias o linajes específicos para manifestarse de forma sutil.",
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
    nombre_visible: "Mundo Celestial",
    tipo: "Dimensión",
    descripcion_breve: "El reino de las esferas superiores, el orden sagrado y la justicia etérea.",
    historia_o_lore: "Gobernado por entidades de luz pura y estructuras inquebrantables, el plano celestial vigila el equilibrio del multiverso.",
    reglas_de_magia: "Magia basada en la frecuencia lumínica y decretos divinos. Inmune a la corrupción orgánica.",
    imagen_fondo: "imagenes_principal/mundos/celestial_bg.jpg",
    desbloqueado: 2, // Nivel 2: Bloqueado pero identificable
    revelado_en: "Libro 2",
    regiones: [
      { id: "serafines", nombre: "Serafines", nombre_visible: "Serafines", tipo: "Orden Celestial", desbloqueado: 1, imagen_fondo: "imagenes_principal/mundos/serafines.jpg", historia_o_lore: "Los guerreros de la primera esfera...", reglas_de_magia: "Llama eterna." },
      { id: "angeles_guardianes", nombre: "Ángeles Guardianes", nombre_visible: "Ángeles Guardianes", tipo: "Orden Celestial", desbloqueado: 1, imagen_fondo: "imagenes_principal/mundos/guardianes.jpg", historia_o_lore: "Protectores asignados al plano mortal...", reglas_de_magia: "Escudos de transmutación espectral." },
      { id: "querubines", nombre: "Querubines Estudiosos", nombre_visible: "Querubines Estudiosos", tipo: "Orden Celestial", desbloqueado: 1, imagen_fondo: "imagenes_principal/mundos/querubines.jpg", historia_o_lore: "Archivistas del conocimiento cósmico...", reglas_de_magia: "Magia psiónica e histórica." },
      { id: "arcangeles", nombre: "Arcángeles", nombre_visible: "Arcángeles", tipo: "Orden Celestial", desbloqueado: 1, imagen_fondo: "imagenes_principal/mundos/arcangeles.jpg", historia_o_lore: "Los comandantes absolutos...", reglas_de_magia: "Magia de orden macro." }
    ]
  },
  {
    id: "el_nemori",
    nombre: "El Nemori",
    nombre_visible: "El Nemori",
    tipo: "Mundo Ancestral",
    descripcion_breve: "La cuna de la magia de la naturaleza, espíritus elementales y razas antiguas.",
    historia_o_lore: "Un ecosistema salvaje, eterno y mágico que respira por sí mismo. Aquí, la tierra, los árboles y el agua poseen conciencia propia y se comunican con sus habitantes.",
    reglas_de_magia: "Flujo de esencia libre y salvaje. No se necesitan catalizadores; la magia se moldea directamente con la voluntad y el respeto a la naturaleza.",
    imagen_fondo: "imagenes_principal/mundos/nemori_bg.jpg",
    desbloqueado: 1,

    // Aqui empiezan las razas y regiones nemori

    regiones: [
      {
        id: "drydalys",
        nombre: "Drydalys",
        nombre_visible: "Drydalys",
        tipo: "Raza Ancestral",
        descripcion_breve: "Espíritus y guardianes profundamente conectados con la esencia viva del bosque.",
        historia_o_lore: "Los Drydalys son los protectores de la flora profunda del Nemori. No poseen un gobierno centralizado, sino que se organizan en comunidades ligadas a árboles madre.",
        reglas_de_magia: "Fitomancia avanzada, camuflaje orgánico y transmutación vegetal.",
        imagen_fondo: "imagenes_principal/mundos/drydalys.jpg",
        desbloqueado: 1,
        sub_razas: ["Aluxes", "Kete", "Uchuy", "Qizm", "Malenkiy", "Xiao", "Tanuki"] // Integradas sin saturar la UI
      },
      {
        id: "elfos",
        nombre: "Elfos",
        nombre_visible: "Elfos",
        tipo: "Raza Ancestral",
        descripcion_breve: "Poseedores de la alta cultura, heráldica y sabiduría longeva del Nemori.",
        historia_o_lore: "Los Elfos del Nemori gobiernan las grandes ciudadelas de piedra blanca y raíces entrelazadas, preservando las artes elementales.",
        reglas_de_magia: "Encantamientos rúnicos y arquería mística imbuida en esencia.",
        imagen_fondo: "imagenes_principal/mundos/elfos.jpg",
        desbloqueado: 1
      },
      {
        id: "kotole",
        nombre: "Kotole",
        nombre_visible: "Kotole",
        tipo: "Facciones Clánicas",
        descripcion_breve: "Grandes clanes guerreros y chamánicos adaptados a entornos extremos.",
        historia_o_lore: "Los clanes Kotole representan la diversidad cultural y adaptativa del Nemori. Se dividen según las geografías que han domado a lo largo de las eras.",
        reglas_de_magia: "Magia espiritual, tótems elementales y proyecciones astrales.",
        imagen_fondo: "imagenes_principal/mundos/kotole.jpg",
        desbloqueado: 1,
        sub_razas: ["Nórdicos", "Asiáticos", "Norteamericanos", "Africanos"] // Escalable para añadir más clanes
      },
      {
        id: "nereidas",
        nombre: "Nereidas",
        nombre_visible: "Nereidas",
        tipo: "Raza Acuática",
        descripcion_breve: "Gobernantes de los flujos marítimos, ríos y lagos sagrados del Nemori.",
        historia_o_lore: "Criaturas de una gracia letal que habitan tanto en palacios submarinos como en costas brumosas.",
        reglas_de_magia: "Hidromancia absoluta, control de densidades acuáticas y cantos de ilusión.",
        imagen_fondo: "imagenes_principal/mundos/nereidas.jpg",
        desbloqueado: 1,
        sub_razas: ["Ondinas", "Sub-raza 2", "Sub-raza 3", "Sub-raza 4"]
      },
      {
        id: "otras_razas_nemori",
        nombre: "Otras Razas del Nemori",
        nombre_visible: "Otras Razas",
        tipo: "Razas Secundarias",
        descripcion_breve: "Criaturas y clanes independientes que habitan los rincones salvajes.",
        historia_o_lore: "Facciones que no entran en las grandes alianzas pero cuya fuerza e historia alteran el rumbo del Nemori.",
        reglas_de_magia: "Magia física elemental y resistencia a maleficios.",
        imagen_fondo: "imagenes_principal/mundos/otras_razas.jpg",
        desbloqueado: 1,
        sub_razas: ["Trolls (Trdlls)", "Volkov"]
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
    revelado_en: "Libro 5",
    regiones: []
  }
];  // Aquí se cierra tu array MUNDOS_DATA

// ESTA LÍNEA DEBE IR EN DATOS_MUNDOS.JS:
export default MUNDOS_DATA;