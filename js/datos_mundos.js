// js/datos_mundos.js

const MUNDOS_DATA = [
  {
    id: "mundo_humano",
    nombre: "Plano Humano",
    nombre_visible: "Humano",
    tipo: "Mundo físico",
    descripcion_breve: "El plano terrenal donde la magia opera bajo el velo de la discreción y el secreto.",
    historia_o_lore: "El plano Humano es el hogar de sociedades mortales: algunos desconocen que la magia forma parte de su mundo; otros la utilizan con naturalidad y para distintos fines.",
    reglas_de_magia: "No todos los tipos de magia están al alcance de todos, y sus manifestaciones son casi siempre sutiles.",
    imagen_fondo: "imagenes_principal/mundos/humano_bg.jpg",
    desbloqueado: 1, // Nivel 1: Completamente visible
    revelado_en: "Libro 1",
    regiones: [
      {
        id: "communia",
        nombre: "Communia",
        nombre_visible: "Communia",
        tipo: "Mundo físico",
        descripcion_breve: "Los communia constituyen la población general: personas que, en su gran mayoría, no tienen acceso a ningún tipo de energía, magia o sensibilidad especial.",
        historia_o_lore: "Viven su vida cotidiana sin percibir la magia que los rodea. Algunos communia poseen conocimiento parcial de la magia, pero esto es excepcional y suele darse por un vínculo cercano con algún vedlys. Cuando un communia descubre la magia, la reacción del mundo vedlys depende de las circunstancias: pueden ser vigilados o integrados en la comunidad mágica.",
        reglas_de_magia: "La mayoría no detecta la magia en absoluto. Esta falta de percepción facilita mantener el secreto.",
        imagen_fondo: "imagenes_principal/mundos/communia.jpg",
        desbloqueado: 1
      },
      {
        id: "vedlys",
        nombre: "Vedlys",
        nombre_visible: "Vedlys",
        tipo: "Mundo físico",
        descripcion_breve: "Son personas capaces de manipular la energía natural y la magia contemporánea",
         historia_o_lore: "Existe una práctica social y cultural no escrita: los vedlys no revelan su naturaleza ni la existencia de la magia a los communia. Se organizan en comunidades locales y globales, reguladas principalmente por gobiernos mágicos nacionales o regionales. Algunos vedlys viven completamente integrados entre communia, ejerciendo profesiones comunes, mientras que otros se aíslan en comunidades mágicas.",
        reglas_de_magia: "Utilizan la magia contemporánea, la mayoría la percibe pero no la ve completamente. Son muy pocos los que pueden percibir los demás tipos de magia y aún no se conoce alguien que las pueda utilizar todos. La magia contemporánea es la que se enseña en las escuelas de magia y la que se utiliza en la vida cotidiana.",
        imagen_fondo: "imagenes_principal/mundos/vedlys.jpg",
        desbloqueado: 1
      },
      {
      id: "achlys",
        nombre: "Achlys",
        nombre_visible: "Achlys",
        tipo: "Mundo físico",
        descripcion_breve: "Humanos seguidores de La Sombra, corrompidos por su magia; coloquialmente conocidos como \"los oscuros\".",
        historia_o_lore: "Acceden a la magia de la Sombra a través de libros oscuros dejados por achlys más antiguos, encantamientos, maleficios o el convencimiento de otros. Se organizan en una jerarquía similar a la de los vedlys: los maestros, que son quienes más saben, nunca se convierten en golems, evitan manejar la magia directamente (prefieren que otros la usen) y son quienes más en contacto están con La Sombra sin saberlo; y los achlys comunes.",
        reglas_de_magia: "Qué tan lejos llega la corrupción depende de cuánto se haya usado la magia oscura: un contacto breve les hace egoístas y caprichosos sin llegar a convertirlos en Achlys, pero una vez que cae por completo en las garras de La Sombra, es muy difícil salir de ahí.",
        imagen_fondo: "imagenes_principal/mundos/achlys.jpg",
        desbloqueado: 1
      },
      {
        id: "golems",
        nombre: "Golems",
        nombre_visible: "Golems",
        tipo: "Mundo físico",
        descripcion_breve: "Humanos sin alma ni voluntad propia, completamente al servicio de La Sombra.",
        historia_o_lore: "Un vedlys se convierte en golem al matar a su angel, perdiendo el alma en el proceso. Los achlys más poderosos convencen a sus seguidores de hacerlo prometiéndoles más poder, sin revelarles las consecuencias reales.",
        reglas_de_magia: "Pueden hablar y razonar, pero carecen de voluntad propia. Al no tener alma, un golem no puede durar mucho tiempo con vida.",
        imagen_fondo: "imagenes_principal/mundos/golems.jpg",
        desbloqueado: 1
      }

    ]
  },
  {
    id: "mundo_celestial",
    nombre: "Plano Celestial",
    nombre_visible: "Celestial",
    tipo: "Dimensión etérea",
    descripcion_breve: "El reino de las esferas superiores, el orden sagrado y la justicia etérea.",
    historia_o_lore: "Los seres celestiales se organizan en categorías con funciones y poderes distintos.",
    reglas_de_magia: "No ven la magia pero sí perciben su presencia.",
    desbloqueado: 1, // Nivel 2: Bloqueado pero identificable
    revelado_en: "Libro 2",
    imagen_fondo: "imagenes_principal/mundos/celestial_bg.jpg",
    regiones: [
      { 
        id: "serafines", 
        nombre: "Serafines", 
        nombre_visible: "Serafines", 
        tipo: "Orden Celestial", 
        descripcion_breve: "Enviados al mundo humano por el Hacedor de Todo.",
        historia_o_lore: "Entre otras cosas, son enviados para ayudar a humanos en peligro, eliminar posibles amenazas, y conceder deseos a quienes el Hacedor de Todo considera dignos. No suelen relacionarse directamente con las personas. Cuando necesitan estar en el mundo físico, toman prestado el cuerpo de un recipiente: un ser humano con características especiales que de antemano ha dado su consentimiento.", 
        reglas_de_magia: " No soportan la magia activa: si están en contacto prolongado o intenso con ella, se convierten en polvo cósmico. Los ángeles no ven la magia pero sí perciben su presencia, porque la proximidad a la magia activa los debilita.",
        imagen_fondo: "imagenes_principal/mundos/serafines.jpg", 
        desbloqueado: 1 
      },
       {
      id: "la_sombra",
        nombre: "La Sombra",
        nombre_visible: "La Sombra (Itzal)",
        tipo: "Ser Celestial Corrompido",
        descripcion_breve: "De origen celestial corrompido por intentar apropiarse de la energía del mundo.",
        historia_o_lore: "Tras corromper su naturaleza, fue derrotado y encerrado en una fortaleza en las entrañas de la Tierra. Desde entonces, humanos vigilantes debían acudir al lugar secreto en cuanto La Sombra diera señales de movimiento, para que un elegido tomara la espada, alertara a Miguel y defendiera a los humanos. La fortaleza no es estática: se desplaza constantemente para que sus seguidores no puedan localizarla con facilidad.",
        reglas_de_magia: "Es la fuente de la magia oscura. Aunque está encerrado, no se puede evitar su influencia: corrompe el ambiente a su alrededor a través de magia entretejida y residual oscura, y de escritos que él mismo dejó. Un círculo de protección mantiene a los seres alejados de esa influencia, pero vedlys y communia atraídos por lo desconocido a veces lo burlan y caen gradualmente en sus garras. Cuanto más poder acumula, más amplia se vuelve su esfera de corrupción.",
        imagen_fondo: "imagenes_principal/mundos/la_sombra.jpg",
        desbloqueado: 1
     }, 
      { 
        id: "angeles_guardianes", 
        nombre: "Ángeles Guardianes", 
        nombre_visible: "Ángeles Guardianes", 
        tipo: "Orden Celestial", 
        descripcion_breve: "Protectores asignados al plano terrenal.",
        historia_o_lore: "Son creados y enviados cada vez que nace una persona, por lo que toda su existencia transcurre en la Tierra. Sus poderes son limitados y no tienen permitido alejarse de su humano.", 
        reglas_de_magia: "La magia no los afecta. Tienen una conexión completa con el ser que cuidan: cuando este se encuentra en peligro pueden influir parcialmente en sus decisiones, dentro de los límites del libre albedrío. No tienen permitido aparecer ante los humanos.",
        imagen_fondo: "imagenes_principal/mundos/guardianes.jpg", 
        desbloqueado: 1 
      },
      { 
        id: "querubines", 
        nombre: "Querubines Estudiosos", 
        nombre_visible: "Querubines Estudiosos", 
        tipo: "Orden Celestial", 
        descripcion_breve: "Archivistas del conocimiento cósmico.",
        historia_o_lore: "Observan,analizan y registran todos acontecimientos del mundo humano. Guardias del conocimiento ancestral y observadores del tejido espacio-temporal.", 
        reglas_de_magia: "No están en contacto con la magia por lo que se desconoce si los afecta.",
        imagen_fondo: "imagenes_principal/mundos/querubines.jpg", 
        desbloqueado: 1 
      },
      { 
        id: "arcangeles", 
        nombre: "Arcángeles", 
        nombre_visible: "Arcángeles", 
        tipo: "Orden Celestial", 
        descripcion_breve: "Los comandantes absolutos del ejército celestial.",
        historia_o_lore: "Los arcángeles dirigen a los guerreros celestiales y tienen autoridad sobre las demás categorías; el más relevante es Miguel.", 
        reglas_de_magia: "La magia los afecta menos que a los serafines, aunque si les causa dolor.",
        imagen_fondo: "imagenes_principal/mundos/arcangeles.jpg", 
        desbloqueado: 1 
      }
    
    ]
  },
  {
    id: "el_nemori",
    nombre: "Plano Nemori",
    nombre_visible: "Nemori",
    tipo: "Fenrasa Ancestral",
    descripcion_breve: "El conjunto de todos los seres mágicos pensantes del mundo. La cuna de la magia de la naturaleza, espíritus elementales y razas antiguas.",
    historia_o_lore: "Dentro de los nemori se incluyen las cuatro razas originales. Tras la primera guerra mágica y los desequilibrios que esta generó, aparecieron razas posteriores.",
    reglas_de_magia: "Cada raza nemori extrae su poder únicamente de una parte de la energía natural, nunca de toda (aire, agua, tierra o fuego). Su magia fluye libremente: no necesita catalizadores, sino que se moldea con la voluntad y el respeto a la naturaleza.",
    imagen_fondo: "imagenes_principal/mundos/nemori_bg.jpg",
    desbloqueado: 1,
    regiones: [
      // Dentro del objeto Dridalys en js/datos_mundos.js:
{
  id: "dridalys",
  nombre: "Dridalys",
  nombre_visible: "Dridalys",
  tipo: "Raza Ancestral",
  descripcion_breve: "Guardianes del equilibrio entre razas y elementos.",
  historia_o_lore: "Fueron progresivamente esclavizados por las demás razas antes de que el Hacedor enviara el castigo que transformó el mundo...",
  reglas_de_magia: "No se corrompieron durante las guerras mágicas. Usan la energía natural del fuego y son cocineros excelentes.",
  imagen_fondo: "imagenes_principal/mundos/dridalys.jpg",
  desbloqueado: 1,
  sub_razas: [
    {
      nombre: "Brownies",
      region: "Europa (ahora Drydalis)",
      imagen_fondo: "imagenes_principal/mundos/subrazas/brownies.jpg",
      descripcion_breve: "Protectores del hogar y artesanos de la cocina mística.",
      desbloqueado: 1,
    },
    {
      nombre: "Aluxes",
      region: "México",
      imagen_fondo: "imagenes_principal/mundos/aluxes.jpg",
      descripcion_breve: "Cuidadores de la selva y antiguos santuarios del plano mesoamericano. Su apariencia varía según quien los vea.",
      desbloqueado: 1,
    },
    {
      nombre: "Kete",
      region: "África",
      imagen_fondo: "imagenes_principal/mundos/subrazas/kete.jpg",
      descripcion_breve: "Espíritus guardianes de las sabanas y las raíces milenarias.",
      desbloqueado: 3,
    },
    {
      nombre: "Uchuy",
      region: "Sudamérica",
      imagen_fondo: "imagenes_principal/mundos/subrazas/uchuy.jpg",
      descripcion_breve: "Moradores de las alturas andinas y protectores de los ríos.",
      desbloqueado: 3,
    },
    {
      nombre: "Qizm",
      region: "Arabia",
      imagen_fondo: "imagenes_principal/mundos/subrazas/qizm.jpg",
      descripcion_breve: "Nómadas de los oasis y guardianes de secretos bajo las arenas.",
      desbloqueado: 3,
    },
    {
      nombre: "Malenkiy",
      region: "Siberia",
      imagen_fondo: "imagenes_principal/mundos/subrazas/malenkiy.jpg",
      descripcion_breve: "Resistentes al frío eterno, guardianes de los bosques taiga.",
      desbloqueado: 3,
    },
    {
      nombre: "Xiao",
      region: "China",
      imagen_fondo: "imagenes_principal/mundos/subrazas/xiao.jpg",
      descripcion_breve: "Armoniosos custodios de las montañas sagradas y valles de bambú.",
      desbloqueado: 3,
    },
    {
      nombre: "Tanuki",
      region: "Asia Oriental",
      imagen_fondo: "imagenes_principal/mundos/subrazas/tanuki.jpg",
      descripcion_breve: "Astutos guardianes de la naturaleza urbana y rural del archipiélago.",
      desbloqueado: 3,
    }
    
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
  descripcion_breve: "Dedicados al cuidado y trabajo del subsuelo.",
  historia_o_lore: "Encargados de extraer los minerales necesarios para la vida, su profundo conocimiento de la tierra los convirtió en maestros artesanos. Un grupo exiliado mantiene esta tradición en el mundo subterráneo. Fabrican armas y objetos para contener la magia muy codiciados.",
  reglas_de_magia: "Su magia proviene de la energía natural de la tierra. Aunque su especialidad es fabricar objetos mágicos, también son capaces de manipular la magia de forma directa.",
  imagen_fondo: "imagenes_principal/mundos/kotole.jpg",
  desbloqueado: 1,
  sub_razas: [
    {
      nombre: "Nórdicos",
      region: "Norte Helado",
      imagen_fondo: "imagenes_principal/mundos/subrazas/kotole_nordicos.jpg",
      descripcion_breve: "Maestros forjadores y creadores de runas de contención en las cumbres más frías.",
      desbloqueado: 1,
    },
    {
      nombre: "Asiáticos",
      region: "Vetas de Jade",
      imagen_fondo: "imagenes_principal/mundos/subrazas/kotole_asiaticos.jpg",
      descripcion_breve: "Artesanos del equilibrio y la energía fluida a través del moldeado de piedra jade.",
      desbloqueado: 3,
    },
    {
      nombre: "Americanos",
      region: "Cavernas Sagradas",
      imagen_fondo: "imagenes_principal/mundos/subrazas/kotole_americanos.jpg",
      descripcion_breve: "Guardianes de la tierra ancestral con un lazo espiritual directo con las piedras vivas.",
      desbloqueado: 3,
    },
    {
      nombre: "Africanos",
      region: "Cumbres Volcánicas",
      imagen_fondo: "imagenes_principal/mundos/subrazas/kotole_africanos.jpg",
      descripcion_breve: "Sabios del fuego primigenio, la fundición con magma y el tratado de metales dorados.",
      desbloqueado: 3,
    }
  ]
},
      {
  id: "nereidas",
  nombre: "Nereidas",
  nombre_visible: "Nereidas",
  tipo: "Raza Ancestral",
  descripcion_breve: "Guardianas de las aguas, profundidades marinas y corrientes místicas.",
  historia_o_lore: "Su historia escrita va aquí...",
  reglas_de_magia: "Las reglas de su magia van aquí...",
  imagen_fondo: "imagenes_principal/mundos/nereidas.jpg",
  desbloqueado: 1,
  sub_razas: [
    {
      nombre: "Ondinas",
      region: "Lagos",
      imagen_fondo: "imagenes_principal/mundos/subrazas/nereidas_pueblo1.jpg",
      descripcion_breve: "Custodian palacios de cristal en los lagos y ríos de agua dulce.",
      desbloqueado: 1,
    },
    {
      nombre: "Albinas",
      region: "Región / Zona",
      imagen_fondo: "imagenes_principal/mundos/subrazas/nereidas_pueblo2.jpg",
      descripcion_breve: "Cuidan los mares y arrecifes de coral",
   desbloqueado: 3, // 🔒 Bloqueado / Spoiler
    }
  ]
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
            id: "volkov",
            nombre: "Volkov",
            nombre_visible: "Volkov",
            tipo: "Raza Secundaria",
            descripcion_breve: "Guardianes de naturaleza instintiva surgidos tras la primera guerra mágica.",
            historia_o_lore: "Surgieron con una inclinación protectora innata. Los vedlys los han incorporado como guardianes entrenados, una práctica que causa cierta incomodidad en el resto de la comunidad nemori.",
            reglas_de_magia: "Percepción sensorial amplificada, vínculo táctico y aumento de fuerza en combate nocturno.",
            imagen_fondo: "imagenes_principal/mundos/volkov.jpg",
            desbloqueado: 1
          },
          {
            id: "trolls",
            nombre: "Trdlls",
            nombre_visible: "Trdlls",
            tipo: "Raza Secundaria",
            descripcion_breve: "Seres de piedra maleable que habitan las formaciones rocosas kársticas del mundo entero.",
            historia_o_lore: "Han existido desde tiempos remotos y absorbieron la energía natural del aire y la tierra. Pueden trasladarse rápidamente a través de complejas redes de túneles subterráneos.",
            reglas_de_magia: "Resistencia física extrema, mimetismo con la piedra y canalización pasiva de energía telúrica.",
            imagen_fondo: "imagenes_principal/mundos/trolls.jpg",
            desbloqueado: 2
          }
          
        ]
      }
    ]
  },
  {
  id: "mundo_secreto",
  nombre: "Dimensión del Vacío",
  nombre_visible: "Divinidades",
  tipo: "El reino de los dioses",
  descripcion_breve: "El dominio secreto donde residen las antiguas deidades y fuerzas primigenias de las distintas culturas.",
  historia_o_lore: "Las divinidades de diferentes culturas existen de forma real, aunque su presencia no es constante ni universal. Son entidades con poder propio, distintas de los seres celestiales: no usan magia, pues su poder proviene de su esencia divina, una fuerza completamente diferente a la magia vedlys, no clasificable ni medible por los humanos.",
  reglas_de_magia: "La magia en esta dimensión trasciende las leyes terrenales y responde al dominio conceptual de cada deidad. Las divinidades son neutrales o ambivalentes; no responden a conceptos humanos de bien o mal. Se conocen entre sí y pueden interactuar, especialmente las relacionadas con los mundos de los muertos. ",
  imagen_fondo: "imagenes_principal/mundos/locked_bg.jpg",
  desbloqueado: 2, // Nivel 3: Spoiler total hasta el Libro 3
  revelado_en: "Libro 3",
  
  // Lista de deidades / reinos culturales
  regiones: [
    {
      id: "divinidad_inframundo_mexica",
      nombre: "Mictlantecuhtli",
      cultura: "Mexica",
      region: "Mesoamérica (México)",
      tipo_divinidad: "Dios del Inframundo",
      descripcion_breve: "Señor del Mictlán y del descanso eterno de las almas.",
      historia_o_lore: "Gobernante del noveno nivel subterráneo, custodia los huesos de las eras pasadas.",
      imagen_fondo: "imagenes_principal/mundos/micu.jpg",
      desbloqueado: 3
    },
    {
      id: "divinidad_trueno_nordico",
      nombre: "Thor",
      cultura: "Nórdica",
      region: "Escandinavia",
      tipo_divinidad: "Dios del Trueno y la Fuerza",
      descripcion_breve: "Protector de los reinos y portador del rayo primigenio.",
      historia_o_lore: "Defensor incansable contra las sombras, cuyo poder resuena en las tormentas del vacío.",
      desbloqueado: 3
    }
    // Puedes ir agregando más dioses con esta misma estructura
  ]
}
];

export default MUNDOS_DATA;