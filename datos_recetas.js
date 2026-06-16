/* ============================================================
   BASE DE DATOS: LAS RECETAS DE LA SAGA
   El Legado de la Magia
   ============================================================
   FORMATO RECETA NORMAL:
   {
       ID: "R01",
       Nombre: "Nombre del platillo",
       Tipo: "Desayuno" | "Plato principal" | "Bocadillo" | "Pan" |
             "Postre" | "Bebida" | "Acompañamiento" | "Tabla de bocadillos",
       Libro: 1,
       Capitulo: 0,
       Orden: 0,
       Autor: "Quién la hace",
       Lugar: "Ciudad, País",
       Porciones: 4,
       Dificultad: "Fácil" | "Intermedia" | "Avanzada",
       Ingredientes: "Ingrediente 1; Ingrediente 2; Ingrediente 3",
       Preparacion: "Paso a paso...",
       InformacionLibro: "Contexto narrativo, qué pasa en la escena...",
       NotasCocina: "Sustituciones, consejos, variantes...",
       EsTabla: false,
       MiniRecetas: [],   // vacío para recetas normales
       Imagen: "r01.jpg"  // archivo en carpeta imagen_receta/
   }

   FORMATO TABLA DE BOCADILLOS:
   {
       ID: "R00",
       Nombre: "Tabla de bocadillos",
       Tipo: "Tabla de bocadillos",
       Libro: 1,
       Capitulo: 0,
       Orden: 0,
       Autor: "...",
       Lugar: "...",
       Porciones: 0,       // se define por mini receta
       Dificultad: "...",
       Ingredientes: "",   // vacío, se usa MiniRecetas
       Preparacion: "",    // vacío, se usa MiniRecetas
       InformacionLibro: "Contexto narrativo...",
       NotasCocina: "",
       EsTabla: true,      // IMPORTANTE: activa el modo pestañas
       MiniRecetas: [
           {
               Nombre: "Canapés salados",
               Ingredientes: "Ingrediente 1; Ingrediente 2",
               Preparacion: "Paso a paso..."
           },
           {
               Nombre: "Canapés dulces",
               Ingredientes: "...",
               Preparacion: "..."
           },
           {
               Nombre: "Mini tostadas",
               Ingredientes: "...",
               Preparacion: "..."
           },
           {
               Nombre: "Volovanes",
               Ingredientes: "...",
               Preparacion: "..."
           },
           {
               Nombre: "Brochetas frías",
               Ingredientes: "...",
               Preparacion: "..."
           }
       ],
       Imagen: "r00.jpg"
   }
   ============================================================ */

const RECETAS = [
    {
        ID: "R05",
        Nombre: "Sandwich",
        Tipo: "Bocadillo",
        Libro: 1,
        Capitulo: 4,
        Orden: 6,
        Autor: "Magia",
        Lugar: "Tren, Europa",
        Porciones: 1,
        Dificultad: "Fácil",
        Ingredientes: "Pan blanco de caja sin orillas; mayonesa; queso gouda rebanado; jamón de pavo",
        Preparacion: "Aplica una capa generosa de mayonesa en ambas tapas. Recorta el jamón y el queso al tamaño del pan. Pon dos rebanadas de queso intercaladas con rebanadas de jamón. Corta en triángulos.",
        InformacionLibro: "",
        NotasCocina: "",
        EsTabla: false,
        MiniRecetas: [],
        Imagen: "r05.jpg"
    },
    // ─────────────────────────────────────────────────────────
    // AGREGA AQUÍ LAS SIGUIENTES RECETAS
    // Recuerda: coma después de cada } que no sea la última
    // ─────────────────────────────────────────────────────────
{
        ID: "R01",
        Nombre: "Waffles Belgas estilo americano",
        Tipo: "Desayuno",
        Libro: 1,
        Capitulo: 1,
        Orden: 1,
        Autor: "Zaha",
        Lugar: "Casa Kaira",
        Porciones: 4,
        Dificultad: "Intermedia",
        Ingredientes: "harina de trigo; polvo para hornear; azúcar; sal; huevos; leche; mantequilla; extracto de vainilla; fresas; miel de maple",
        Preparacion: "Mezcla ingredientes secos. Incorpora yemas, leche, mantequilla y vainilla. Añade claras montadas y cocina en waflera. Sirve con fresas y maple.",
        InformacionLibro: " Son los favoritos de Kaira",
        NotasCocina: "Dejar reposar la masa 15 minutos mejora la textura.",
        EsTabla: false,
        MiniRecetas: [],
        Imagen: "r01.jpg"
    }

];