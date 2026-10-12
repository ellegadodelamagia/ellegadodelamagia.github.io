// js/datos_mundos.js

// Nivel 1: Completamente visible
// Nivel 2: Bloqueado pero identificable
// Nivel 3: Totalmente oculto (spoiler)

const MUNDOS_DATA = [
  {
    id: "mundo_humano",
    nombre: "Plano Humano",
    nombre_visible: "Humano",
    tipo: "Mundo físico",
    descripcion_breve: "Los seres humanos, mortales que habitan el plano terrenal.",
    historia_o_lore: "El Hacedor de todo creó al ser humano para que la magia desapareciera y los Nemori dejaran de pelear: se suponía que los humanos no tendrían acceso a ella ni llegarían a creer en su existencia. Sin embargo, tras la Primera Guerra Mágica, la magia se concentró en ciertos lugares y algunos humanos adquirieron la capacidad de manejarla.",
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
        descripcion_breve: "Los communia constituyen la población general: personas ajenas al mundo mágico, que viven su vida cotidiana sin saber que la magia existe.",
        historia_o_lore: "Son la mayoría de los humanos: aquellos en quienes nunca se manifestó la capacidad mágica, y que siguen siendo, tal como los concibió el Hacedor, ajenos a la magia y a la idea de que existe. Cuando un communia la descubre, la reacción del mundo vedlys depende de las circunstancias: puede ser vigilado, puede borrarsele la memoria o puede ser integrado en la comunidad mágica.",
        reglas_de_magia: "La mayoría no detecta la magia en absoluto, lo cual facilita mantener el secreto. Es excepcional que un communia tenga conocimiento parcial de ella, y suele darse por un vínculo cercano con algún vedlys.",
        imagen_fondo: "imagenes_principal/mundos/communia.jpg",
        desbloqueado: 1
      },
      {
        id: "vedlys",
        nombre: "Vedlys",
        nombre_visible: "Vedlys",
        tipo: "Mundo físico",
        descripcion_breve: "Humanos capaces de percibir y manipular la magia.",
        historia_o_lore: "Cuando aparecieron los humanos, la magia antigua se replegó hacia la tierra porque no creían en su existencia. En algunos lugares esa magia replegada se integró al ambiente, y los humanos que tuvieron contacto con esos lugares lograron vincularse a ella: así nacieron los vedlys. Existe una práctica social y cultural no escrita: los vedlys no revelan su naturaleza ni la existencia de la magia a los communia. Algunos vedlys viven completamente integrados entre communia, ejerciendo profesiones comunes, mientras que otros se aíslan en comunidades mágicas.",
        reglas_de_magia: "Utilizan la magia contemporánea, la mayoría la percibe pero no la ve completamente. Son muy pocos los que pueden percibir los demás tipos de magia y aún no se conoce alguien que las pueda utilizar todos. La magia contemporánea es la que se enseña en las escuelas de magia y la que se utiliza en la vida cotidiana. Algunos también pueden manipular la energía ambiental.",
        imagen_fondo: "imagenes_principal/mundos/vedlys.jpg",
        desbloqueado: 1
      },
      {
        id: "vedlys_naturales",
        nombre: "Vedlys naturales",
        nombre_visible: "Vedlys naturales",
        tipo: "Mundo físico",
        descripcion_breve: "Descendientes de los primeros humanos con magia. Se apartaron de la magia contemporánea para mantenerse puros.",
        historia_o_lore: "Cuando se organizó la custodia de La Sombra, un grupo de humanos con magia fue quien proveyó a sus guardianes, y para cumplir esa función debían permanecer puros. Por eso se apartaron de la magia contemporánea y formaron un pueblo aparte. Solo después, cuando los dioses armaron el plan de la Tríada, se les hizo saber lo que se avecinaba. Hoy siguen existiendo en Escandinavia , al norte del Báltico.",
        reglas_de_magia: "Solo usan la energía ambiental y la poca energía natural que los Nemori les permiten conocer; no utilizan la magia contemporánea.",
        imagen_fondo: "imagenes_principal/mundos/vedlys_naturales.jpg",
        desbloqueado: 2
      },
      {
        id: "achlys",
        nombre: "Achlys",
        nombre_visible: "Achlys",
        tipo: "Mundo físico",
        descripcion_breve: "Humanos seguidores de La Sombra, corrompidos por su magia; coloquialmente conocidos como \"los oscuros\".",
        historia_o_lore: "Los primeros achlys surgieron cuando algunos humanos con magia accedieron a la magia de la Sombra a través de libros oscuros, encantamientos, maleficios o el convencimiento de otros seguidores. Con el tiempo se formó una jerarquía similar a la de los vedlys: los maestros, que son quienes más saben, que evitan manejar la magia oscura directamente (prefieren que otros la usen) y que son quienes más en contacto están con La Sombra sin saberlo; y los achlys comunes, que sí la manejan y son los que corren el riesgo de convertirse en golems.",
        reglas_de_magia: "Usan la magia oscura, que se destaca porque apaga el color original de la magia; pueden manipular sin problema la magia contemporánea y la energía ambiental y en algunos casos modificar la magia antigua. Qué tan lejos llega la corrupción depende de cuánto se haya usado: un contacto breve despierta lo peor de cada quien, del egoísmo a la envidia, sin convertir a nadie en Achlys todavía, pero una vez que se cae por completo en las garras de La Sombra es muy difícil salir de ahí.",
        imagen_fondo: "imagenes_principal/mundos/achlys.jpg",
        desbloqueado: 2
      },
      {
        id: "golems",
        nombre: "Golems",
        nombre_visible: "Golems",
        tipo: "Mundo físico",
        descripcion_breve: "Humanos sin alma ni voluntad propia, completamente al servicio de La Sombra.",
        historia_o_lore: "Un vedlys se convierte en golem al matar a su ángel guardián (algo que no es fácil) perdiendo el alma en el proceso. Los achlys más poderosos convencen a sus seguidores de hacerlo prometiéndoles más poder, sin revelarles las consecuencias reales. Al no tener alma, un golem no puede durar mucho tiempo con vida.",
        reglas_de_magia: "Pueden hablar y razonar, pero carecen de voluntad propia: actúan por completo al servicio de quien los controla. Conservan la magia contemporánea y la energía ambiental que tenían como vedlys, pero a un nivel mucho más básico.",
        imagen_fondo: "imagenes_principal/mundos/golems.jpg",
        desbloqueado: 2
      }
    ]
  },
  {
    id: "mundo_celestial",
    nombre: "Plano Celestial",
    nombre_visible: "Celestial",
    tipo: "Dimensión etérea",
    descripcion_breve: "El reino de las esferas superiores, el orden sagrado y la justicia etérea.",
    historia_o_lore: "Los seres celestiales son subordinados del Hacedor de todo. Al principio no existían diferencias entre ellos; las categorías fueron apareciendo con el tiempo: primero con la creación de los humanos, y después con la corrupción de uno de los suyos, La Sombra.",
    reglas_de_magia: "Por regla general no ven la magia pero sí perciben su presencia. Los nemori detectan inmediatamente su naturaleza celestial. Los humanos los olvidan fácilmente a menos que les den su nombre completo. La magia no les afecta, aunque sí puede causarles dolor.",
    desbloqueado: 1, 
    revelado_en: "Libro 2",
    imagen_fondo: "imagenes_principal/mundos/celestial_bg.jpg",
    regiones: [
      { 
        id: "serafines", 
        nombre: "Serafines", 
        nombre_visible: "Serafines", 
        tipo: "Orden Celestial", 
        descripcion_breve: "Enviados al mundo humano por el Hacedor de Todo.",
        historia_o_lore: "Cuando surgieron las demás categorías (guardianes, querubines, guerreros), los serafines quedaron como los ayudantes generales del Hacedor de todo hacia los humanos, tanto en situaciones difíciles como en la concesión de algún deseo a quienes elHacedor de Todo considera dignos. No suelen relacionarse directamente con las personas. Cuando necesitan estar en el mundo físico, toman prestado el cuerpo de un recipiente: un ser humano con características especiales que de antemano ha dado su consentimiento. Una de sus principales características es poder escuchar los pensamientos del humano al que le van a conceder los deseos. ", 
        reglas_de_magia: "No soportan la magia activa, y si están en contacto prolongado o intenso con ella, se convierten en polvo cósmico.",
        imagen_fondo: "imagenes_principal/mundos/serafines.jpg", 
        desbloqueado: 1 
      },
      {
        id: "la_sombra",
        nombre: "La Sombra",
        nombre_visible: "La Sombra",
        tipo: "Ser Celestial Corrompido",
        descripcion_breve: "De origen celestial, corrompido por intentar apropiarse de la energía del mundo.",
        historia_o_lore: "Al darse cuenta de todo el poder que había dentro del planeta, un ángel del reino celestial quiso apropiárselo y bajó al plano humano. Por hacerlo desde el egoísmo, su propia energía se fue oscureciendo. Miguel lo derrotó y lo encerró en una fortaleza en las entrañas de la Tierra, pero encerrarlo no bastó para contener su influencia: su poder sigue corrompiendo la energía ambiental a su alrededor, y de esa corrupción nació la magia oscura, la misma que dio origen a los Achlys.",
        reglas_de_magia: "Es la fuente de la magia oscura. Corrompe el ambiente a través de magia entretejida y residual oscura, y de escritos que él mismo dejó. Un círculo de protección mantiene a los demás alejados de esa influencia, pero vedlys y communia atraídos por lo desconocido a veces lo burlan y caen gradualmente en sus garras. Cuanto más poder acumula, más amplia se vuelve su esfera de corrupción.",
        imagen_fondo: "imagenes_principal/mundos/la_sombra.jpg",
        desbloqueado: 2
      }, 
      { 
        id: "angeles_guardianes", 
        nombre: "Ángeles Guardianes", 
        nombre_visible: "Ángeles Guardianes", 
        tipo: "Orden Celestial", 
        descripcion_breve: "Protectores asignados al plano terrenal.",
        historia_o_lore: "Son creados y enviados cada vez que nace una persona, por lo que toda su existencia transcurre en la Tierra. Sus poderes son limitados y no tienen permitido alejarse de su humano. Tienen una conexión completa con el ser que cuidan: cuando este se encuentra en peligro pueden influir parcialmente en sus decisiones, dentro de los límites del libre albedrío.",
        reglas_de_magia: "La magia no los afecta. No tienen permitido aparecer ante los humanos.",
        imagen_fondo: "imagenes_principal/mundos/guardianes.jpg", 
        desbloqueado: 2 
      },
      { 
        id: "querubines", 
        nombre: "Querubines Estudiosos", 
        nombre_visible: "Querubines Estudiosos", 
        tipo: "Orden Celestial", 
        descripcion_breve: "Archivistas del conocimiento.",
        historia_o_lore: "Observan,analizan y registran todos acontecimientos del mundo humano. Guardias del conocimiento ancestral y observadores del tejido espacio-temporal.", 
        reglas_de_magia: "No están en contacto con la magia por lo que se desconoce si los afecta.",
        imagen_fondo: "imagenes_principal/mundos/querubines.jpg", 
        desbloqueado: 2 
      },
      { 
        id: "guerreros", 
        nombre: "Guerreros", 
        nombre_visible: "Guerreros", 
        tipo: "Orden Celestial", 
        descripcion_breve: "El ejército celestial, creado para enfrentar a La Sombra.",
        historia_o_lore: "El Hacedor de todo designó esta categoría cuando La Sombra corrompió su naturaleza y hubo que enfrentarla. Su líder recibió el título de Arcángel: Miguel.", 
        reglas_de_magia: "La magia los afecta menos que a los serafines, aunque si les causa dolor.",
        imagen_fondo: "imagenes_principal/mundos/guerreros.jpg", 
        desbloqueado: 2 
      }
    ]
  },
  {
    id: "el_nemori",
    nombre: "Plano Nemori",
    nombre_visible: "Nemori",
    tipo: "Fenrasa Ancestral",
    descripcion_breve: "El conjunto de todos los seres mágicos pensantes del mundo. La cuna de la magia de la naturaleza, espíritus elementales y razas antiguas.",
    historia_o_lore: "El Hacedor de todo creó a los Nemori; cuatro razas originales, para que cuidaran su creación: cada una con la capacidad de transformar un elemento de la energía natural y usarlo para distintos fines. Con el tiempo se distribuyeron por el mundo, y de ahí surgieron los distintos pueblos culturales de cada raza. Tras la Primera Guerra Mágica y los desequilibrios que esta generó, aparecieron nuevas razas.",
    reglas_de_magia: "Cada raza nemori extrae su poder únicamente de una parte de la energía natural, nunca de toda (aire, agua, tierra o fuego). Su magia fluye libremente: no necesita catalizadores, sino que se moldea con la voluntad y el respeto a la naturaleza.",
    imagen_fondo: "imagenes_principal/mundos/nemori_bg.jpg",
    desbloqueado: 1,
    regiones: [
      {
        id: "dridalys",
        nombre: "Dridalys",
        nombre_visible: "Dridalys",
        tipo: "Raza Ancestral",
        descripcion_breve: "Guardianes del equilibrio.",
        historia_o_lore: "Encargados de mantener el equilibrio entre elementos, mantener la paz entre razas, y ser mensajeros. Elfos y nereidas, con el paso del tiempo, empezaron a tratarlos como inferiores y a aprovecharse de ellos; como son de muy buen corazón, no se dieron cuenta hasta que la situación ya era insostenible. Cuando estalló la Primera Guerra Mágica, los dridalys procuraron no entrar en ella.",
        reglas_de_magia: "Usan la energía natural del fuego y son cocineros excelentes.",
        imagen_fondo: "imagenes_principal/mundos/dridalys.jpg",
        desbloqueado: 1,
        sub_razas: [
          {
            nombre: "Brownies (ahora Dridalys)",
            region: "Europa (Celta)",
            imagen_fondo: "imagenes_principal/mundos/celta.jpg",
            descripcion_breve: "Protectores del hogar y artesanos de la cocina mística.",
            desbloqueado: 1
          },
          {
            nombre: "Aluxes",
            region: "México",
            imagen_fondo: "imagenes_principal/mundos/aluxes.jpg",
            descripcion_breve: "Cuidadores de la selva y antiguos santuarios del plano mesoamericano. Su apariencia varía según quien los vea.",
            desbloqueado: 3
          },
          {
            nombre: "Kete",
            region: "África",
            imagen_fondo: "imagenes_principal/mundos/kete.jpg",
            descripcion_breve: "Espíritus guardianes de las sabanas y las raíces milenarias.",
            desbloqueado: 3
          },
          {
            nombre: "Uchuy",
            region: "Sudamérica",
            imagen_fondo: "imagenes_principal/mundos/uchuy.jpg",
            descripcion_breve: "Moradores de las alturas andinas y guardianes del fuego sagrado.",
            desbloqueado: 3
          },
          {
            nombre: "Qizm",
            region: "Arabia",
            imagen_fondo: "imagenes_principal/mundos/qizm.jpg",
            descripcion_breve: "Nómadas de los oasis y guardianes de secretos bajo las arenas.",
            desbloqueado: 3
          },
          {
            nombre: "Malenky",
            region: "Siberia",
            imagen_fondo: "imagenes_principal/mundos/malenky.jpg",
            descripcion_breve: "Resistentes al frío eterno, guardianes de los bosques taiga.",
            desbloqueado: 3
          },
          {
            nombre: "Xiao",
            region: "China",
            imagen_fondo: "imagenes_principal/mundos/xiao.jpg",
            descripcion_breve: "Orejas más pequeñas y ojos menos saltones que el resto de los dridalys; armoniosos custodios de las montañas sagradas y valles de bambú.",
            desbloqueado: 3
          },
          {
            nombre: "Tanuki",
            region: "Japón",
            imagen_fondo: "imagenes_principal/mundos/tanuki.jpg",
            descripcion_breve: "Humanoides blancos de ojos negros, sin facciones visibles ni manos aparentes; astutos guardianes de la naturaleza urbana y rural.",
            desbloqueado: 3
          }
        ]
      },
      {
        id: "elfos",
        nombre: "Elfos",
        nombre_visible: "Elfos",
        tipo: "Raza Ancestral",
        descripcion_breve: "Custodios del mundo animal y vegetal sobre la tierra.",
        historia_o_lore: "Con el tiempo se volvieron soberbios y descuidaron su función original; un grupo fiel a sus raíces eligió el exilio antes que abandonar su propósito. Es la raza Nemori de apariencia más parecida a la humana, y por eso son los curanderos que asisten a los vedlys. Los elfos corrompidos por la soberbia perdieron la capacidad de hablar con los animales; los del grupo exiliado conservaron la magia pura, e incluso pueden transformarse en animales.",
        reglas_de_magia: "Usan la energía natural del aire, y son la raza que maneja la magia antigua con mayor facilidad. ",
        imagen_fondo: "imagenes_principal/mundos/elfos.jpg",
        desbloqueado: 1,
        sub_razas: [
          {
            nombre: "Vakarys",
            region: "Regiones templadas",
            imagen_fondo: "imagenes_principal/mundos/vakarys.jpg",
            descripcion_breve: "Custodios de bosques y fauna de climas templados; los más cercanos a los humanos, y por eso los más frecuentes entre los curanderos que asisten a los vedlys.",
            desbloqueado: 1
          },
          {
            nombre: "Siaurys",
            region: "Norte helado",
            imagen_fondo: "imagenes_principal/mundos/siaurys.jpg",
            descripcion_breve: "Custodios de bosques y fauna de climas fríos; los más reservados de las cuatro estirpes.",
            desbloqueado: 3
          },
          {
            nombre: "Pietys",
            region: "Regiones cálidas y tormentosas",
            imagen_fondo: "imagenes_principal/mundos/pietys.jpg",
            descripcion_breve: "Custodios de la vida en climas húmedos y tempestuosos; temperamento intenso, igual que el viento que los nombra.",
            desbloqueado: 3
          },
          {
            nombre: "Ritys",
            region: "Oriente",
            imagen_fondo: "imagenes_principal/mundos/ritys.jpg",
            descripcion_breve: "Custodios de bosques y fauna de Asia; conocidos por su disciplina y su cercanía con las tradiciones más antiguas de los elfos.",
            desbloqueado: 3
          }
          
        ]
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
            imagen_fondo: "imagenes_principal/mundos/kotole_nordico.jpg",
            descripcion_breve: "Maestros forjadores de las cumbres más frías, expertos en dar forma a los minerales que extraen.",
            desbloqueado: 1
          },
          {
            nombre: "Asiáticos",
            region: "Vetas de Jade",
            imagen_fondo: "imagenes_principal/mundos/kotole_asiatico.jpg",
            descripcion_breve: "Artesanos del equilibrio y la energía fluida, expertos en el moldeado de piedras preciosas.",
            desbloqueado: 3
          },
          {
            nombre: "Americanos",
            region: "Cavernas Sagradas",
            imagen_fondo: "imagenes_principal/mundos/kotole_americano.jpg",
            descripcion_breve: "Guardianes de la tierra ancestral con un lazo espiritual directo con las piedras vivas.",
            desbloqueado: 3
          },
          {
            nombre: "Africanos",
            region: "Cumbres Volcánicas",
            imagen_fondo: "imagenes_principal/mundos/kotole_africano.jpg",
            descripcion_breve: "Sabios de la tierra profunda, maestros en la fundición de metales junto al calor volcánico.",
            desbloqueado: 3
          }
        ]
      },
      {
        id: "nereidas",
        nombre: "Nereidas",
        nombre_visible: "Nereidas",
        tipo: "Raza Ancestral",
        descripcion_breve: "Guardianas de las aguas (ríos, lagos y mares) y de los animales y plantas acuáticos que dependen de ellas.",
        historia_o_lore: "Con el tiempo, algunas se corrompieron por soberbia y codicia; un grupo fiel a sus raíces eligió el exilio y conservó la pureza de su magia. Las corrompidas solo pueden obtener magia de las plantas arrancándolas, por lo que procuran no usarla; las del grupo exiliado pueden obtener su esencia sin dañarlas.",
        reglas_de_magia: "Su magia proviene de la energía natural del agua. Pueden manipularla directamente y son capaces de volverse invisibles.",
        imagen_fondo: "imagenes_principal/mundos/nereidas.jpg",
        desbloqueado: 1,
        sub_razas: [
          {
            nombre: "Ondinas",
            region: "Lagos y rios",
            imagen_fondo: "imagenes_principal/mundos/ondinas.jpg",
            descripcion_breve: "Cuidan los lagos y ríos del mundo.",
            desbloqueado: 1
          },
          {
            nombre: "Oceánides",
            region: "Mares y oceanos",
            imagen_fondo: "imagenes_principal/mundos/oceanida.jpg",
            descripcion_breve: "Cuidan los mares y arrecifes de coral",
            desbloqueado: 3
          }
        ]
      },
      {
        id: "otras_razas_nemori",
        nombre: "Otras Razas del Nemori",
        nombre_visible: "Otras Razas",
        tipo: "Razas Secundarias",
        descripcion_breve: "Criaturas y clanes independientes que habitan el mundo.",
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
            descripcion_breve: "Guardianes de naturaleza instintiva surgidos entre las guerras mágicas.",
            historia_o_lore: "Surgieron con una inclinación protectora innata. Los vedlys los han incorporado como guardianes entrenados, una práctica que causa cierta incomodidad en el resto de la comunidad Nemori.",
            reglas_de_magia: "Su naturaleza protectora se despierta al vincularse con lo que deben cuidar, sea un lugar, un objeto o una persona; su magia proviene de la energía natural de la tierra y el aire.",
            imagen_fondo: "imagenes_principal/mundos/volkov.jpg",
            desbloqueado: 1
          },
          {
            id: "bizuhur",
  nombre: "Bizuhur",
  nombre_visible: "Bizuhur",
  tipo: "Raza Secundaria",
  descripcion_breve: "Pequeños seres mágicos, inquietos y astutos, ligados a los lugares donde la magia se concentra.",
  historia_o_lore: "Nacieron tras la Segunda Guerra Mágica que casi estalló. Suelen rondar manantiales, cuevas y otros rincones donde la energía ambiental es más fuerte.",
  reglas_de_magia: "Su magia proviene de la energía natural del fuego y el aire.",
  imagen_fondo: "imagenes_principal/mundos/bizuhur.jpg",
  desbloqueado: 2
          },
          {
            id: "farlo",
  nombre: "Farlo",
  nombre_visible: "Farlo",
  tipo: "Raza Secundaria",
  descripcion_breve: "Seres etéreos de temperamento volátil, recelosos de la mayoría de los vedlys.",
  historia_o_lore: "Nacieron tras la Segunda Guerra Mágica que casi estalló. Desconfían de los vedlys comunes, pero hacen una excepción con los vedlys naturales, a quienes sí respetan.",
  reglas_de_magia: "Su magia proviene de la energía natural del agua y el aire.",
  imagen_fondo: "imagenes_principal/mundos/farlo.jpg",
  desbloqueado: 2
          }
        ]
      },
      {
        id: "trodls",
        nombre: "Trodls",
        nombre_visible: "Trodls",
        tipo: "Raza Ancestral",
        descripcion_breve: "Seres de piedra maleable que habitan las formaciones rocosas kársticas del mundo entero.",
        historia_o_lore: "Existen desde tiempos remotos, surgidos mientras los cinco elementos daban forma al planeta. Cuando parte de las cuatro razas originales se exilió a las cuevas kársticas tras la Primera Guerra Mágica, convivieron con los trodls y les enseñaron el uso de la magia; desde entonces se consideran parte de los Nemori.",
        reglas_de_magia: "Su magia proviene de la energía natural de la tierra y el fuego, más afines a esos dos por ser seres físicos de esos elementos. Resistencia física extrema, mimetismo con la piedra y capacidad de trasladarse rápidamente por redes de túneles subterráneos.",
        imagen_fondo: "imagenes_principal/mundos/trdlls.jpg",
        desbloqueado: 2
      }
    ]
  },
  {
    id: "mundo_secreto",
    nombre: "Dimensión del Vacío",
    nombre_visible: "Panteones culturales",
    tipo: "El reino de los dioses",
    descripcion_breve: "El dominio secreto donde residen las antiguas deidades y fuerzas primigenias de las distintas culturas.",
    historia_o_lore: "Las divinidades de diferentes culturas existen de forma real, aunque su presencia no es constante ni universal. Son entidades con poder propio, distintas de los seres celestiales: su poder proviene de su esencia divina, una fuerza completamente diferente a la magia vedlys, no clasificable ni medible por los humanos. Debido a que la gente dejó de creer en ellos sus poderes fueron mermando, y hoy solo se manifiestan en lugares donde aún se les recuerda. La mayoría de los dioses no interactúa con los humanos, sin embargo algunos sí lo hacen, especialmente aquellos que tienen un vínculo con la muerte y el más allá.",
    reglas_de_magia: "El poder en esta dimensión trasciende las leyes terrenales y responde al dominio conceptual de cada deidad. Las divinidades son neutrales o ambivalentes; no responden a conceptos humanos de bien o mal. Se conocen entre sí y pueden interactuar, especialmente las relacionadas con los mundos de los muertos.",
    imagen_fondo: "imagenes_principal/mundos/locked_bg.jpg",
    desbloqueado: 1, // Nivel 3: Spoiler total hasta el Libro 3
    revelado_en: "Libro 3",
    regiones: [
      
      {
        id: "panteon_egipcio",
  nombre: "Panteón Egipcio",
  region: "Antiguo Egipto",
  descripcion_breve: "Una civilización que veía la muerte como un viaje, no un final, y llenó su inframundo de pruebas y guardianes.",
  historia_o_lore: "Los antiguos egipcios creían que el alma, tras morir, cruzaba el Duat, el mundo subterráneo, en una travesía llena de peligros antes de llegar al juicio final. Ahí el corazón del difunto se pesaba contra una pluma: si era más liviano, el alma continuaba su camino; si no, era devorada. De esa idea de la muerte como proceso, más que como fin, nace buena parte de su cultura funeraria: momificación, textos guía para el más allá y tumbas construidas como mapas del otro mundo.",
  reglas_de_magia: "Para los egipcios, la magia (heka) no era una fuerza aparte de la religión, sino su motor: los mismos rituales que invocaban protección divina también sostenían el orden del cosmos. Los sacerdotes eran, a la vez, magos, médicos y guardianes del conocimiento sagrado, y las palabras escritas o pronunciadas correctamente tenían poder real sobre el mundo y el más allá.",
  imagen_fondo: "imagenes_principal/mundos/panteon_egipcio.jpg",
  desbloqueado: 1
      },
      
      
        {
  id: "panteon_mesoamericano",
  nombre: "Panteón Mesoamericano",
  region: "México",
  descripcion_breve: "Una civilización cuya idea de la muerte y el inframundo sigue muy viva en el imaginario mexicano.",
  historia_o_lore: "Para las culturas mesoamericanas, el alma del difunto no terminaba su camino al morir: debía descender por los nueve niveles del Mictlán, superando pruebas y obstáculos en cada uno. Al llegar al noveno nivel, el alma alcanzaba por fin el descanso eterno.",
  reglas_de_magia: "Lo sobrenatural estaba tejido en la vida cotidiana a través de calendarios, rituales y ofrendas. El tiempo se entendía como cíclico, y los actos humanos —sacrificios, ceremonias, ofrendas— servían para mantener el equilibrio entre el mundo de los vivos y el de los dioses.",
  imagen_fondo: "imagenes_principal/mundos/panteon_mesoamerica.jpg",
  desbloqueado: 1
},
       {
  id: "panteon_chino",
  nombre: "Panteón Chino",
  region: "China",
  descripcion_breve: "Una cosmovisión donde el inframundo no es un destino final, sino un paso hacia una nueva vida.",
  historia_o_lore: "El inframundo chino, el Diyu, se compone de diez cortes, cada una presidida por su propio juez, donde las almas son evaluadas según sus actos en vida. Al concluir el recorrido, beben el caldo del olvido, que borra sus recuerdos antes de reencarnarse.",
  reglas_de_magia: "La idea de un orden cósmico gobierna esta cosmovisión: el bien y el mal se equilibran a través del ciclo de reencarnación, y la conducta de cada vida determina el trato que se recibe en la siguiente.",
  imagen_fondo: "imagenes_principal/mundos/panteon_chino.jpg",
  desbloqueado: 1
},
      {
  id: "panteon_persa",
  nombre: "Panteón Persa / Zoroástrico",
  region: "Antigua Persia",
  descripcion_breve: "Una religión que entendió la existencia como una lucha constante entre la luz y la oscuridad.",
  historia_o_lore: "El alma, tras la muerte, debía cruzar el puente Chinvat, el paso entre el mundo de los vivos y el más allá. El puente se ensanchaba para las almas virtuosas, que llegaban al paraíso, y se estrechaba hasta volverse un filo bajo los pies de las almas condenadas, que caían al abismo.",
  reglas_de_magia: "El zoroastrismo concebía la existencia como un enfrentamiento constante entre dos fuerzas: Ahura Mazda, la luz y la verdad, y Ahriman, la oscuridad y la mentira. Cada pensamiento, palabra y acción de una persona inclinaba la balanza de ese enfrentamiento cósmico.",
  imagen_fondo: "imagenes_principal/mundos/panteon_persa.jpg",
  desbloqueado: 1
},

{
  id: "panteon_griego",
  nombre: "Panteón Griego",
  region: "Antigua Grecia",
  descripcion_breve: "La cultura que dio nombre al Hades, y con él, a buena parte de la imaginería del inframundo occidental.",
  historia_o_lore: "Al morir, el alma era guiada hasta el río que separa el mundo de los vivos del Hades, donde el barquero Caronte la cruzaba a cambio de una moneda. Cerbero, el perro de tres cabezas, vigilaba las puertas para que ninguna alma escapara. Una vez dentro, un tribunal decidía su destino: los Campos Elíseos para las almas virtuosas, o el Tártaro para las que habían llevado una mala vida.",
  reglas_de_magia: "Los griegos entendían lo divino como una fuerza cercana y caprichosa: los dioses intervenían directamente en los asuntos humanos, premiando, castigando o poniendo a prueba a mortales y héroes según sus propios intereses y rivalidades.",
  imagen_fondo: "imagenes_principal/mundos/panteon_griego.jpg",
  desbloqueado: 1
},

{
  id: "panteon_nordico",
  nombre: "Panteón Nórdico",
  region: "Escandinavia",
  descripcion_breve: "Una mitología que dividía a los muertos según cómo habían vivido, no según cómo habían actuado.",
  historia_o_lore: "El inframundo nórdico, Hel, era el destino de quienes morían de enfermedad o vejez, gobernado por la diosa que lleva su mismo nombre. Los guerreros caídos en batalla, en cambio, seguían un camino distinto: iban al Valhalla, el salón de Odín.",
  reglas_de_magia: "El destino, más que la voluntad de los dioses, regía esta cosmovisión: incluso los propios dioses conocían de antemano el Ragnarök, el fin del mundo, y sabían que no podían evitarlo. La escritura rúnica era la forma en que ese conocimiento oculto podía consultarse y usarse.",
  imagen_fondo: "imagenes_principal/mundos/panteon_nordico.jpg",
  desbloqueado: 1
},
{
  id: "panteon_hindu",
  nombre: "Panteón Hindú",
  region: "India",
  descripcion_breve: "Una cosmovisión donde ni el castigo ni la recompensa son para siempre.",
  historia_o_lore: "El Naraka, el inframundo hindú, no es un destino eterno: es una escala temporal en el ciclo de nacer, morir y renacer. Ahí, las almas pagan las culpas de su vida terrenal antes de reencarnarse en un nuevo cuerpo, más alto o más bajo según sus méritos.",
  reglas_de_magia: "El karma gobierna esta cosmovisión: cada acción tiene una consecuencia que tarde o temprano regresa a quien la cometió, ya sea en esta vida o en la siguiente. Lo sobrenatural no castiga arbitrariamente, sino que devuelve exactamente lo que cada quien sembró.",
  imagen_fondo: "imagenes_principal/mundos/panteon_hindu.jpg",
  desbloqueado: 1
},
{
  id: "panteon_incaico",
  nombre: "Panteón Incaico / Andino",
  region: "Andes",
  descripcion_breve: "Una cosmovisión donde el inframundo no es opuesto a la vida, sino su raíz.",
  historia_o_lore: "El mundo andino se dividía en tres planos conectados entre sí: el Hanan Pacha, el mundo de arriba; el Kay Pacha, el mundo de los vivos; y el Uku Pacha, el mundo de abajo, gobernado por Supay. Lejos de ser solo un lugar de castigo, el Uku Pacha era la tierra de donde brota la vida vegetal y donde descansan los huesos de los ancestros.",
  reglas_de_magia: "Esta cosmovisión entendía el universo desde la dualidad y la reciprocidad: cada plano dependía de los otros dos, y el equilibrio entre ellos se mantenía a través de rituales y ofrendas, no de la sumisión a una sola fuerza.",
  imagen_fondo: "imagenes_principal/mundos/panteon_incaico.jpg",
  desbloqueado: 1
},
{
  id: "panteon_celta",
  nombre: "Panteón Celta",
  region: "Gales / Irlanda",
  descripcion_breve: "Una mitología donde el inframundo no castiga: es un paraíso tan hermoso como peligroso.",
  historia_o_lore: "El Otro Mundo, conocido en Gales como Annwn, no era un lugar de muerte ni de castigo, sino un reino de juventud eterna donde no existían la enfermedad ni el hambre. Su belleza, sin embargo, escondía peligros reales: quien lo visitaba podía quedar atrapado en su encanto, o enfrentarse a sus guerras y a sus cazadores espectrales.",
  reglas_de_magia: "Para los celtas, lo sobrenatural convivía cerca del mundo humano, separado apenas por un velo delgado que en ciertos momentos del año se volvía más fácil de cruzar. La magia se expresaba menos como poder personal y más como el propio tejido del Otro Mundo, presente en bosques, pozos y colinas sagradas.",
  imagen_fondo: "imagenes_principal/mundos/panteon_celta.jpg",
  desbloqueado: 1
},
{
  id: "panteon_hawaiano",
  nombre: "Panteón Hawaiano",
  region: "Hawái",
  descripcion_breve: "Una mitología donde el alma salta al más allá desde acantilados sagrados, y no todos los espíritus se van.",
  historia_o_lore: "El alma del difunto descendía al Lua-o-Milu, el inframundo gobernado por Milu, saltando desde ciertos acantilados y valles considerados lugares de paso. No todos los espíritus hacían ese viaje: algunos permanecían en el mundo de los vivos como protectores silenciosos de su propia familia.",
  reglas_de_magia: "Lo sobrenatural en esta cultura estaba profundamente ligado al linaje y a la naturaleza: ciertos ancestros se convertían en guardianes espirituales de su descendencia, y el mundo natural (volcanes, mar, tierra) era habitado por fuerzas divinas con voluntad propia, capaces de intervenir directamente en la vida de las personas.",
  imagen_fondo: "imagenes_principal/mundos/panteon_hawaiano.jpg",
  desbloqueado: 1
},
{
  id: "panteon_mesopotamico",
  nombre: "Panteón Mesopotámico",
  region: "Mesopotamia",
  descripcion_breve: "Una de las cosmovisiones más antiguas del mundo, donde la muerte era el mismo destino para todos.",
  historia_o_lore: "El inframundo mesopotámico, Kur, era 'la tierra sin retorno': un reino oscuro bajo tierra gobernado por la diosa Ereshkigal, al que llegaban por igual reyes y campesinos, héroes y villanos. No existía distinción entre buenos y malos: era simplemente el único destino que esperaba a todo mortal después de la vida.",
  reglas_de_magia: "A diferencia de otras cosmovisiones, aquí lo sobrenatural no premiaba ni castigaba: el más allá era un hecho ineludible, no una consecuencia moral. Los dioses gobernaban el destino del mundo desde consejos divinos, y el equilibrio entre los reinos —el cielo, la tierra y el inframundo— dependía de que cada uno respetara sus límites.",
  imagen_fondo: "imagenes_principal/mundos/panteon_mesopotamico.jpg",
  desbloqueado: 1
}
    ]
  }
];

export default MUNDOS_DATA;