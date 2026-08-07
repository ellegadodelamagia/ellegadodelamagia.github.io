window.datosEscritos = [
  {
    id: "profecia-principal",
    titulo: "La Profecía de la triada",
    categoria: "profecias",
    subtitulo: "Registro enigmático que espera en el oráculo",
   desbloqueado: 2, // <-- 2 significa Bloqueado / Protegido
    imagen: "imagenes_principal/escritos/profecia_triada.jpg",
    descripcionCorta: "El verso antiguo que predice el surgimiento de los herederos y el destino de la magia.",
    contenidoCompleto: {
      origen: "Desconocido",
      texto: `Cuando las sombras reclamen los confines de la tierra,<br>
y la luz primigenia pierda su fulgor,<br>
resurgirán los lazos del antiguo linaje...<br><br>
Un heredero despertará la llama,<br>
mientras el olvido amenaza con consumirlo todo.`,
      notas: "Texto trascrito a partir de la imagen creada por la prifecía."
    }
  },
  {
  id: "profecia-recolector",
  titulo: "La Profecía del Recolector",
  subtitulo: "Registro antiguo",
  categoria: "profecias",
  desbloqueado: 1,
  imagen: "imagenes_principal/escritos/recolector-bg.jpg",
  descripcionCorta: "Predicción ancestral de la prueba en un portal sagrado para equilibrar la magia",
  contenidoCompleto: {
    origen: "Nemori",
    texto: `
      <!-- VISTA 1: Tríptico de miniaturas -->
      <div id="vista-triptico" class="contenedor-triptico-profecia">
        <div class="tarjeta-version-profecia" 
             data-titulo="Profecía original elaborada por los elfos"
             data-img="imagenes_principal/escritos/profecia_recolector_v1.jpg"
             data-desc="Escrita en idioma antiguo, se cree que su lectura es por raíces con un sistema de runas y fonemas, sin embargo no se sabe de nadie que pueda leerlo.">
          <img src="imagenes_principal/escritos/profecia_recolector_v1.jpg" alt="Original" class="img-profecia-miniatura">
          <span class="label-version">Original</span>
        </div>

        <div class="tarjeta-version-profecia" 
             data-titulo="Primera traducción "
             data-img="imagenes_principal/escritos/profecia_recolector_v2.jpg"
             data-desc="Se cree que fue elaborada por erudito italiano alrededor de 1700 ya  que usó un registro herméticos/alquímicos de esa época, que mezclaban terminología griega con sintaxis latina. No se sabe si conocía el idioma antiguo.">
          <img src="imagenes_principal/escritos/profecia_recolector_v2.jpg" alt="Primera traducción" class="img-profecia-miniatura">
          <span class="label-version">Primera traducción</span>
        </div>

        <div class="tarjeta-version-profecia" 
             data-titulo="Segunda traducción"
             data-img="imagenes_principal/escritos/profecia_recolector_v3.jpg"
             data-desc="Realizada por Stefen, corregida entre Stefen y Jeziel. Utilizada para la prueba de Kaira.">
          <img src="imagenes_principal/escritos/profecia_recolector_v3.jpg" alt="Segunda traducción" class="img-profecia-miniatura">
          <span class="label-version">Segunda traducción</span>
        </div>
      </div>

      <!-- VISTA 2: Vista ampliada (Oculta por defecto) -->
      <div id="vista-ampliada-profecia" class="vista-ampliada-profecia" style="display: none;">
        <div style="text-align: left; margin-bottom: 1rem;">
          <button id="btn-volver-triptico" class="btn-volver-triptico">← Volver al Tríptico</button>
        </div>
        <div class="contenedor-profecia-foco">
          <img id="img-profecia-foco" src="" alt="Visión Ampliada" class="img-profecia-grande">
          <div class="info-profecia-foco">
            <h3 id="titulo-profecia-foco" class="titulo-foco"></h3>
            <p id="desc-profecia-foco" class="desc-foco"></p>
          </div>
        </div>
      </div>
    `,
    notas: "Haz clic en cualquier versión para examinar el grabado a detalle."
  }
},

  {
  id: "canto-de-los-libros",
  titulo: "El Canto de la Saga",
  subtitulo: "Los versos de los tomos futuros",
  categoria: "profecias",
  desbloqueado: 1,
  imagen: "assets/img/canto-saga-bg.jpg",
  descripcionCorta: "Una estrofa grabada en el tiempo por cada tomo que compone la historia.",
  contenidoCompleto: {
    origen: "Canto continuo registrado en las Crónicas de la Saga",
    texto: `
      <div class="canto-saga-contenedor">
        <p class="verso-tomo link-saga" data-libro="libro-1"><span class="badge-tomo">I</span> "La magia permanece oculta, hasta que una profecía la despierta."</p>
        <p class="verso-tomo link-saga" data-libro="libro-2"><span class="badge-tomo">II</span> "Lo robado exige ser devuelto."</p>
        <p class="verso-tomo link-saga" data-libro="libro-3"><span class="badge-tomo">III</span> "Nadie recibe sin antes demostrar que lo merece."</p>
        <p class="verso-tomo link-saga" data-libro="libro-4"><span class="badge-tomo">IV</span> "No toda misión termina donde promete."</p>
        <p class="verso-tomo link-saga" data-libro="libro-5"><span class="badge-tomo">V</span> "El tiempo guarda secretos que pocos pueden leer."</p>
        <p class="verso-tomo link-saga" data-libro="libro-6"><span class="badge-tomo">VI</span> "Verdades que estan ocultas, hasta que los tres se encuentran."</p>
        <p class="verso-tomo link-saga" data-libro="libro-7"><span class="badge-tomo">VII</span> "No toda magia se controla, ni todo lo perdido regresa."</p>
        <p class="verso-tomo link-saga" data-libro="libro-8"><span class="badge-tomo">VIII</span> "Los antiguos dejaron instrucciones, hoy dispersas."</p>
        <p class="verso-tomo link-saga" data-libro="libro-9"><span class="badge-tomo">IX</span> "Antes de la prueba final, hay que aprender lo que nadie enseña."</p>
        <p class="verso-tomo link-saga" data-libro="libro-10"><span class="badge-tomo">X</span> "La sombra y el despertar se enfrentan por primera y última vez."</p>
      </div>
    `,
    notas: "Haz clic en cualquier verso para viajar a su tomo."
  }
},
  {
    id: "atlas-del-mundo",
    titulo: "El Atlas del Mundo Vedlys",
    categoria: "compendios",
    subtitulo: "Guía no autorizada de los Consejos Vedlys.",
    desbloqueado: 1, // <-- 1 significa Desbloqueado y Visible
    imagen: "imagenes_principal/escritos/atlas.jpg",
    descripcionCorta: "Compendio de mapas y anotaciones de exploradores incógnitos.",
    contenidoCompleto: {
      origen: "Solo se sabe que Zaha lo encontró en un pueblo perdido en España.",
      texto: "La comunidad Vedlys internacional no reconoce oficialmente la existencia de esta obra. Aun así, es la referencia más completa sobre los Consejos Vedlys del mundo.",
      notas: "Incluye ubicaciones aproximadas de Consejos pertenecientes a la Hermandad de Merlín."
    }
  },
  {
    id: "legado-1",
    titulo: "El origen de la Magia",
    categoria: "legado",
    subtitulo: "MAGIA",
    desbloqueado: 1, // <-- 1 significa Desbloqueado y Visible
    imagen: "imagenes/escritos/legado_1.jpg",
    descripcionCorta: "Sobre la naturaleza, las leyes y el origen de la magia.",
    contenidoCompleto: {
      origen: "Conservado en el archivo junto con la última profecía del recolector",
      texto: "Primer códice del Legado de los Herederos. En sus páginas se revelan el origen de la magia, las leyes que gobiernan su existencia y los principios que mantienen el equilibrio entre el mundo humano y el Nemori.",
      notas: "Ninguna mente incapaz de comprender el equilibrio revelará estas páginas."
    }
  },
  {
    id: "legado-2",
    titulo: "La memoria del Mundo Oculto",
    categoria: "legado",
    subtitulo: "CONOCIMIENTO",
    desbloqueado: 1, // <-- 1 significa Desbloqueado y Visible
    imagen: "imagenes/escritos/legado_2.jpg",
    descripcionCorta: "Compendio del conocimiento acumulado por los guardianes y sabios de todas las eras.",
    contenidoCompleto: {
      origen: "Oculto en el santuario del maestro del aire hasta el momento señalado.",
      texto: "Reúne el conocimiento acumulado por generaciones de herederos, guardianes y sabios: criaturas, reliquias, lugares de poder, linajes, portales, acontecimientos y secretos del mundo mágico. Sus páginas conservan la memoria de aquello que el tiempo intentó borrar.",
      notas: "Aquello que el tiempo destruye permanece escrito aquí."
    }
  },
  {
    id: "legado-3",
    titulo: "Las fórmulas del Arte Antiguo ",
    categoria: "legado",
    subtitulo: "PODER",
    desbloqueado: 1, // <-- 1 significa Desbloqueado y Visible
    imagen: "imagenes/escritos/legado_3.jpg",
    descripcionCorta: "Hechizos, rituales y palabras del Arte Antiguo capaces de transformar la realidad.",
    contenidoCompleto: {
      origen: "Sepultado en tierras antiguas hasta el regreso de los Herederos",
      texto: "Contiene las palabras, fórmulas y rituales capaces de transformar la realidad. Cada encantamiento exige comprender las leyes descritas en el Origen y el conocimiento preservado en la Memoria, pues el poder sin sabiduría conduce inevitablemente a la corrupción.",
      notas: "Toda palabra pronunciada sin sabiduría reclama un precio."
    }
  },
  {
    id: "libro-herederos",
    titulo: "El Libro de los Herederos",
    categoria: "registros",
    subtitulo: "Crónica de linajes y marcas de sangre",
    desbloqueado: 2, // <-- 2 significa Bloqueado / Protegido
    imagen: "imagenes/escritos/libro_herederos.jpg",
    descripcionCorta: "Registro de las familias bendecidas por la magia antigua y sus descendientes legítimos.",
    contenidoCompleto: {
      origen: "Custodiado por los Cronistas de la Dinastía.",
      texto: "Árboles genealógicos, marcas hereditarias y la sucesión histórica de los guardianes.",
      notas: "Contiene pasajes cifrados sobre los herederos perdidos."
    },
    /* Lista de los 8 elementos/tarjetas internas */
    partesHerederos: [
      { titulo: "I. El Linaje del Fuego", desc: "Guardianes de la llama primigenia y el dominio de la forja de almas." },
      { titulo: "II. El Círculo de las Mareas", desc: "Herederos del flujo vital, guardianes de las aguas profundas." },
      { titulo: "III. Los Señores del Susurro", desc: "Linaje vinculado al viento arcano y la transmisión de presagios." },
      { titulo: "IV. La Raíz Ancestral", desc: "Sostenedores del equilibrio terrenal y las fuerzas de la naturaleza." },
      { titulo: "V. Los Tejedores de Luz", desc: "Portadores del resplandor primario y la magia de consagración." },
      { titulo: "VI. La Estirpe Umbría", desc: "Guardianes del velo de la sombra, guardianes del juicio nocturno." },
      { titulo: "VII. La Marca del Cristal", desc: "Manipuladores de la geometría sagrada y la resonancia arcana." },
      { titulo: "VIII. El Heredero Olvidado", desc: "Fragmentos del registro perdido cuya presencia aún no se manifiesta." }
    ]
  }
];