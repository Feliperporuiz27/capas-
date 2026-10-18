/* CAPAS — contenido tomado del guion técnico (Felipe Restrepo Ruiz – Juliana Pinilla, oct. 2026).
   Para cambiar textos, edita solo este archivo.
   IMÁGENES: deja tus fotos en la carpeta assets/ y escribe aquí su nombre de archivo.
   Mientras una imagen sea null, la app muestra una ilustración o un aviso de "foto pendiente". */
const IMAGES = {
  // Fotos actuales propias. Ej.: 'assets/fotos/FOTO-PB-PORTADA.jpg'
  heroWelcome: null,                 // FOTO-PORTADA-APP: portada vertical de la app
  heroPB: null, heroMA: null, heroPC: null,   // FOTO-xx-PORTADA: tarjetas y ficha de cada parada
  viewPB: null, viewMA: null, viewPC: null,   // FOTO-xx-PUNTO: vista desde el QR (modo sin cámara y contornos)
  detailPC: null,                    // FOTO-PC-DETALLE: revoque ajedrezado de cerca (lupa de PC-03)
  // Fotos de archivo (deben tener crédito y licencia antes de publicarse)
  'IMG-PB-01': null, // Sector antes de la plaza (anterior a 1998), hacia la fachada del museo
  'IMG-PB-02': null, // Foto actual desde el mismo punto de IMG-PB-01
  'IMG-MA-01': null, // Palacio Municipal entre 1937 y 1987
  'IMG-MA-02': null, // Edificio entre 1987 y 1999 con la fachada obstruida
  'IMG-MA-03': null, // Obra del Grupo Stoa o inauguración de 2000
  'IMG-PC-01': null, // Retrato de Agustín Goovaerts
  'IMG-PC-02': null  // Teatro Junín–Hotel Europa
};
/* AUDIOS grabados de la voz de la Archivista. Cuando un audio exista, la app lo usa en lugar de la voz sintética.
   Ej.: 'PB-01': 'assets/audio/PB-01.m4a' */
const AUDIO = {
  'BV-02': null, 'BV-03': null, 'BV-05': null, 'BV-06': null,
  'PB-01': null, 'PB-02': null, 'PB-03': null, 'PB-04': null, 'PB-M1': null, 'PB-M2': null, 'PB-M3': null,
  'MA-01': null, 'MA-02-HOY': null, 'MA-02-2000': null, 'MA-02-1987': null, 'MA-02-1937': null, 'MA-03-A': null, 'MA-03-B': null, 'MA-04': null, 'MA-M1': null, 'MA-M2': null,
  'PC-01': null, 'PC-02': null, 'PC-03': null, 'PC-04': null, 'PC-M1': null, 'PC-M2': null,
  'DF-10': null
};
const CREDITS = { // crédito que se muestra junto a cada foto de archivo cuando exista
  'IMG-PB-01': '', 'IMG-MA-01': '', 'IMG-MA-02': '', 'IMG-MA-03': '', 'IMG-PC-01': '', 'IMG-PC-02': ''
};

const SEALS = {
  archivo: { label: 'ARCHIVO', cls: 'seal-arch', tip: 'Documento o foto real.' },
  recon: { label: 'RECONSTRUCCIÓN', cls: 'seal-recon', tip: 'Dibujada por nosotros a partir de documentos.' },
  interp: { label: 'INTERPRETACIÓN', cls: 'seal-interp', tip: 'Una hipótesis, no un registro.' },
  sonora: { label: 'RECREACIÓN SONORA', cls: 'seal-sound', tip: 'No es una grabación de la época.' }
};

const STOPS = {
  pb: {
    id: 'pb', n: 1, name: 'Plaza Botero', layer: 'Capa superficial', years: '1998–2025',
    duration: '8 min', durationOpt: '11 min',
    teaser: 'Dos palacios que ya no mandan y una plaza que no siempre estuvo ahí.',
    desc: 'Aquí se miran de frente dos palacios construidos para gobernar. Ninguno gobierna ya. Levanta la primera capa: la plaza que pisas se abrió entre 1998 y 2001, y para hacerlo hubo que demoler.',
    huella: { years: '1998–2001', text: 'Para abrir esta plaza se demolió y se desplazó. Se hizo para darle una casa al museo y liberar la fachada del antiguo Palacio Municipal.', evidence: 'Artigrama (2002); El Colombiano.' },
    next: 'ma',
    travel: 'Guarda el teléfono y camina hasta la fachada del museo. Escanea el QR de la parada 2.'
  },
  ma: {
    id: 'ma', n: 2, name: 'Museo de Antioquia', layer: 'Capa media', years: '1881 · 1937 · 2000',
    duration: '7 min', durationOpt: '10 min',
    teaser: 'La Alcaldía se fue. El museo, nacido en 1881, llegó en 2000.',
    desc: 'Antes de ser museo, este edificio fue la Alcaldía de Medellín. Desliza por sus tres vidas y descubre que la institución que hoy lo ocupa es mucho más vieja que su casa.',
    huella: { years: '1937 · 1987 · 2000', text: 'La Alcaldía se fue a La Alpujarra y el edificio quedó esperando. En 2000 llegó el museo, una institución nacida en 1881.', evidence: 'El Colombiano; Artigrama; Rivera Guzmán (2017).' },
    next: 'pc',
    travel: 'Guarda el teléfono y cruza la plaza hasta el Palacio de la Cultura. Escanea el QR de la parada 3.'
  },
  pc: {
    id: 'pc', n: 3, name: 'Palacio de la Cultura', fullName: 'Palacio de la Cultura Rafael Uribe Uribe', layer: 'Capa profunda', years: '1920–1938',
    duration: '7 min', durationOpt: '10 min',
    teaser: 'El palacio más viejo del recorrido. Y le falta algo.',
    desc: 'Un arquitecto belga, Agustín Goovaerts, proyectó en 1920 la sede de la Gobernación. Mira bien la cúpula: hay algo en este edificio que no termina de cuadrar.',
    huella: { years: '1920–1938', text: 'Se construyó una fracción del proyecto: la cúpula descentrada lo prueba.', evidence: 'Vélez White (1994); Gobernación de Antioquia.' },
    next: null,
    travel: ''
  }
};

/* ---------------- ESCENAS ---------------- */
const SCENES = {
  /* ===== PLAZA BOTERO ===== */
  'PB-01': {
    stop: 'pb', idx: 1, title: 'Dos palacios que ya no mandan', type: 'choose', camera: true,
    intro: 'Busca los dos edificios grandes que se miran de frente.',
    question: '¿Cuál crees que fue la Alcaldía de Medellín?',
    options: [
      { id: 'a', label: 'Edificio de ladrillo de líneas rectas', art: 'museo', correct: true },
      { id: 'b', label: 'Edificio de fachada ajedrezada con cúpula', art: 'palacio', correct: false }
    ],
    ok: 'Bien visto.', ko: 'Pista: la Alcaldía es la de ladrillo.',
    reveal: 'Este, de ladrillo y líneas rectas, fue el Palacio Municipal (1937). El otro, con fachada ajedrezada y cúpula, fue la Gobernación de Antioquia. Hoy ninguno gobierna.',
    vo: 'Mira a tu alrededor: esculturas, turistas, vendedores. Ahora busca los dos edificios grandes que se miran de frente. Uno fue la Alcaldía de Medellín. El otro, la Gobernación de Antioquia. Se construyeron para mandar. Hoy uno es un museo y el otro, un centro de cultura y archivo. ¿Qué pasó aquí? Vamos capa por capa. La primera está debajo de tus pies.',
    sources: 'Medellín.Travel; Colombia.travel; Wikipedia ES; Centrópolis.'
  },
  'PB-02': {
    stop: 'pb', idx: 2, title: 'Aquí había algo', type: 'compare', camera: true,
    contour: 'museo',
    goto: 'Camina hasta la marca PB-02 en el piso y apunta a la fachada del museo.',
    alignText: 'Alinea la línea ámbar con el borde superior del museo.',
    layers: [
      { key: 'HOY', label: 'HOY', img: null },
      { key: 'ANTES', label: 'ANTES', img: 'IMG-PB-01', year: '[AÑO DE LA FOTO — por confirmar]', caption: 'Antes de la plaza', seal: 'archivo' }
    ],
    sound: { label: 'RECREACIÓN SONORA · no es una grabación de la época', desc: 'Calle comercial: murmullo, cortinas metálicas, tijeras.' },
    subtitle: 'Entre 1998 y 2000 se demolieron construcciones para abrir este espacio. Se desplazó a comerciantes, sastres y peluqueros que llevaban más de 40 años aquí.',
    vo: 'Esta foto es del archivo. Donde estás parado había construcciones. Para abrir este espacio, entre 1998 y 2000 se demolieron. Aquí vivían y trabajaban, desde hacía más de cuarenta años, pequeños comerciantes, sastres, peluqueros. Muchos sintieron que nadie les preguntó, y que lo que recibieron no alcanzaba. … La plaza que ves también es la historia de quienes tuvieron que irse.',
    micro: { id: 'PB-M2', label: 'Lo que se demolió' },
    sources: 'Hernández Martínez, Artigrama 17 (2002); Medellín.Travel; El Colombiano.'
  },
  'PB-03': {
    stop: 'pb', idx: 3, title: 'La oferta que creció', type: 'counter', camera: false,
    pre: '1997 · Botero ofrece una donación con una condición: que el museo tenga nueva sede.',
    prompt: 'La primera oferta para la plaza: 10 esculturas. Toca + para ver cómo creció.',
    steps: [10, 14, 18, 23],
    note: 'No sabemos qué esculturas llegaron en cada tanda. Por eso aquí son puntos sin nombre.',
    after: 'Ahora levanta la vista: mira el pedestal de la escultura más cercana. Su altura la decidió Botero.',
    quote: { text: 'Mi donación fue la mejor idea que tuve en mi vida y la que más placer me ha dado.', who: 'Fernando Botero', src: 'Cita publicada en El Colombiano' },
    vo: '1997. Botero lo dice sin rodeos: ‘Medellín necesita un gran museo’. Ofrece obras y un millón de dólares, con una condición: una sede nueva. Para la plaza ofreció primero diez esculturas. Luego catorce. Luego dieciocho. Al final, veintitrés. Y diseñó él mismo los pedestales, su altura y hacia dónde mira cada pieza.',
    micro: { id: 'PB-M1', label: '¿Y si la ciudad decía que no?' },
    sources: 'El Colombiano, "La historia de la Plaza Botero y el renovado Museo de Antioquia"; Medellín.Travel.'
  },
  'PB-04': {
    stop: 'pb', idx: 4, title: 'Huella 1: la plaza se hizo', type: 'huella', camera: false,
    vo: 'Primera huella: esta plaza no estaba, se hizo. Un artista puso condiciones, una ciudad firmó, un alcalde mandó demoler, y quienes vivían aquí pagaron una parte. Había construcciones tapando la fachada que tienes enfrente, la del antiguo Palacio Municipal. Para el museo, esa fachada tenía que verse. Acércate a ella: es la siguiente capa.',
    micro: { id: 'PB-M3', label: 'La plaza cerrada' },
    sources: 'El Colombiano; Artigrama (2002).'
  },

  /* ===== MUSEO DE ANTIOQUIA ===== */
  'MA-01': {
    stop: 'ma', idx: 1, title: 'La casa de la Alcaldía', type: 'hotspots', camera: true, contour: 'museo',
    alignText: 'Alinea el contorno con la fachada.',
    hotspots: [
      { x: 30, y: 45, title: 'Ladrillo a la vista', text: 'Con detalles de concreto. Los diseñadores eran de Medellín, no arquitectos extranjeros.' },
      { x: 52, y: 88, title: 'Por aquí entraban', text: 'alcaldes y concejales. Fue sede de la Alcaldía y el Concejo de Medellín.' }
    ],
    vo: 'Antes de ser museo, este edificio fue la Alcaldía. Se inauguró en 1937 como Palacio Municipal. Aquí despachaban el alcalde y el Concejo. Lo diseñó una firma de la ciudad, H. M. Rodríguez e Hijos: ladrillo a la vista, líneas rectas, un pie en la arquitectura republicana y otro en la moderna. Toca los puntos para mirarlo de cerca.',
    sources: 'El Colombiano, "Historia del Museo de Antioquia…"; Centrópolis; Artigrama (2002).'
  },
  'MA-02': {
    stop: 'ma', idx: 2, title: 'Tres vidas de un edificio', type: 'compare', camera: true, contour: 'museo',
    alignText: 'Mantén el contorno sobre la fachada y desliza.',
    layers: [
      { key: 'HOY', label: 'HOY', title: 'Museo de Antioquia.', vo: 'El edificio del poder se volvió una casa para el arte. Pero el museo es mucho más viejo que esta casa.' },
      { key: '2000', label: '2000', img: 'IMG-MA-03', seal: 'archivo', title: 'El museo llega.', text: 'Obras de enero a septiembre de 2000. Inauguración: 14 de octubre de 2000.', vo: '2000. Un grupo de arquitectos, elegido entre 33 propuestas, adapta el edificio en nueve meses. El 14 de octubre abre aquí el Museo de Antioquia.' },
      { key: '1987', label: '1987', img: 'IMG-MA-02', seal: 'archivo', title: 'La Alcaldía se va.', text: 'En 1987 la administración se traslada a La Alpujarra. El edificio pasa a Empresas Públicas de Medellín.', vo: '1987. La Alcaldía se muda a La Alpujarra, un nuevo centro administrativo. El edificio queda en manos de Empresas Públicas. El centro, mientras tanto, se deteriora: cierran industrias y el viaducto del Metro se levanta sobre la carrera Bolívar.', micro: { id: 'MA-M2', label: '¿De quién era el edificio?' } },
      { key: '1937', label: '1937', img: 'IMG-MA-01', seal: 'archivo', title: 'Palacio Municipal.', text: 'Inaugurado en 1937. Alcaldía y Concejo.', vo: '1937. Se inaugura el Palacio Municipal. Desde aquí se gobierna la ciudad.' }
    ],
    sources: 'El Colombiano; Artigrama (2002); Wikipedia ES (EPM, 1988).'
  },
  'MA-03': {
    stop: 'ma', idx: 3, title: 'Un museo más viejo que su casa', type: 'order', camera: false,
    prompt: 'Ordena la vida del museo. Toca una tarjeta y luego su año (o arrástrala).',
    slots: ['1881', '1955', '1978', '2000'],
    cards: [
      { id: 'c1881', text: 'Nace el Museo de Zea', slot: '1881' },
      { id: 'c1955', text: 'Se instala en la antigua Casa de la Moneda', slot: '1955' },
      { id: 'c1978', text: 'Pasa a llamarse Museo de Antioquia', slot: '1978' },
      { id: 'c2000', text: 'Se muda al antiguo Palacio Municipal', slot: '2000' }
    ],
    hint: 'Pista: el nombre Museo de Antioquia es posterior a la mudanza de 1955.',
    done: 'El museo tiene más de 140 años. Este edificio es su casa desde hace poco más de 25.',
    voStart: 'Una cosa es el edificio y otra el museo. El museo nació mucho antes. Ordénalo.',
    vo: 'En 1881 una ley creó un museo en la capital del Estado de Antioquia; abrió al año siguiente con el nombre de Museo de Zea. Se mudó, cerró, volvió. En 1955 llegó a la antigua Casa de la Moneda, cerca del Parque Berrío. En 1978 tomó el nombre de Museo de Antioquia. Y en 2000 llegó aquí.',
    micro: { id: 'MA-M1', label: '¿Qué había adentro?' },
    sources: 'Rivera Guzmán (2017), UNAL Medellín; Artigrama (2002); Wikipedia ES (1978); Medellín.Travel.'
  },
  'MA-04': {
    stop: 'ma', idx: 4, title: 'Huella 2: el poder se fue, el museo llegó', type: 'huella', camera: false,
    extra: 'Adentro siguen los murales que Pedro Nel Gómez pintó para el Palacio Municipal. Consulta horarios y entrada en el sitio del museo.',
    vo: 'Segunda huella. En 1987 la Alcaldía se fue y este palacio quedó esperando. Ese mismo año también se fue la Gobernación, del edificio que tienes a tu espalda. Date vuelta: ese palacio es el más viejo del recorrido, y le falta algo. Ve a buscarlo.',
    sources: 'El Colombiano; Gobernación de Antioquia (ICPA); Medellín.Travel.'
  },

  /* ===== PALACIO DE LA CULTURA ===== */
  'PC-01': {
    stop: 'pc', idx: 1, title: 'El palacio más viejo del recorrido', type: 'hotspots', camera: true, contour: 'palacio',
    alignText: 'Alinea el contorno con la cúpula.',
    labels: [
      { title: '1920', text: 'La Gobernación contrata a Agustín Goovaerts, arquitecto belga. El 23 de abril se aprueba su anteproyecto.' },
      { title: 'Hasta 1987', text: 'Fue sede de la Gobernación de Antioquia.' }
    ],
    hotspots: [
      { x: 70, y: 30, title: '¿Qué estilo es este?', micro: 'PC-M1' }
    ],
    vo: 'Este es el palacio más viejo del recorrido. En 1920 llegó a Medellín un arquitecto belga, Agustín Goovaerts, contratado por el departamento. Ese mismo año le aprobaron el proyecto: una sede para la Gobernación de Antioquia. Funcionó aquí hasta 1987. Mira bien la fachada. Hay algo en este edificio que no termina de cuadrar.',
    sources: 'Vélez White (1994); Centrópolis; ICPA.'
  },
  'PC-02': {
    stop: 'pc', idx: 2, title: 'La cúpula descentrada', type: 'dome', camera: true,
    question: '¿La cúpula está en el centro del edificio?',
    yes: 'Mira otra vez las dos líneas.', no: 'Exacto.',
    answer: 'No lo está. Y no es un error de diseño.',
    drag: 'El proyecto de Goovaerts era simétrico y su cúpula iba en el centro. Arrastra el edificio para completarlo.',
    keepGoing: 'Sigue: falta para centrar la cúpula',
    done: 'Proyectado: un edificio pensado para un lote cuatro veces mayor. Construido: cerca de una cuarta parte.',
    stamp: '1938 · La obra se suspende indefinidamente.',
    vo: 'Mira otra vez: la cúpula no está en el centro. En el proyecto sí lo estaba. Goovaerts diseñó un palacio simétrico, de cuatro pisos, para un lote cuatro veces más grande. Pero el dinero no alcanzó. Hubo recortes, vino la crisis económica de finales de los veinte, Goovaerts se fue en 1928 y otros siguieron la obra con menos presupuesto. En 1938 se suspendió. Lo que tienes enfrente es, más o menos, una cuarta parte de lo que se soñó. La cúpula descentrada es la cicatriz que lo cuenta.',
    sources: 'Vélez White (1994); Gobernación de Antioquia (ICPA); Wikipedia ES y El Colombiano 2025 (crisis de 1929).'
  },
  'PC-03': {
    stop: 'pc', idx: 3, title: '¿De qué está hecha esta fachada?', type: 'lens', camera: true,
    prompt: 'Mira de cerca el patrón ajedrezado. ¿De qué crees que está hecho?',
    options: [
      { id: 'piedra', label: 'Piedra tallada', fb: 'Eso era lo que se planeaba. Pero no llegó a ponerse.' },
      { id: 'baldosa', label: 'Baldosa de cerámica', fb: 'No. Es una capa de mortero pintada.' },
      { id: 'revoque', label: 'Revoque pintado', fb: 'Buen ojo.', correct: true }
    ],
    reveal: 'Es revoque: una capa de mortero pintada. El plan era otro: ladrillo a la vista con enchape de piedra. La piedra se cambió por revoque pintado. El ajedrezado empezó en 1935.',
    extra: 'Busca las gárgolas de la cúpula: tienen forma de hiena.',
    vo: 'No es piedra. Es revoque, mortero pintado. El plan original era ladrillo a la vista con enchape de piedra, pero, por razones económicas, la piedra se cambió por revoque pintado. Ese ajedrezado que hoy identifica al Palacio empezó en 1935. Lo que parece un capricho de estilo también es una decisión de presupuesto.',
    sources: 'Vélez White (1994); El Colombiano (2025).'
  },
  'PC-04': {
    stop: 'pc', idx: 4, title: 'Huella 3 y la revelación del archivo', type: 'huella', camera: false, final: true,
    pre: [
      { title: '1987', text: 'La Gobernación se va a La Alpujarra. Ordenanzas de 1986 y 1988: el edificio pasa a la cultura.' },
      { title: 'Hoy', text: 'Instituto de Cultura y Patrimonio de Antioquia y Archivo Histórico de Antioquia. Monumento Nacional desde 1982.' }
    ],
    extra: 'Entrada libre, según Medellín.Travel. Confirma horarios antes de entrar.',
    vo: 'En 1987 la Gobernación también se fue. Este palacio, que nunca se terminó, se volvió un lugar para la cultura. Y hay algo más: aquí adentro está el Archivo Histórico de Antioquia. Archivos como este son de donde salen las historias que te he contado: actas, planos, fotos, leyes. Yo trabajo con lo que quedó, ¿recuerdas? Esto es lo que quedó. Tercera huella. Ya puedes ordenar las tres.',
    micro: { id: 'PC-M2', label: '¿Qué más construyó?' },
    sources: 'Gobernación de Antioquia, ICPA (2024); Medellín.Travel; Colombia.travel.'
  }
};

const STOP_SCENES = { pb: ['PB-01', 'PB-02', 'PB-03', 'PB-04'], ma: ['MA-01', 'MA-02', 'MA-03', 'MA-04'], pc: ['PC-01', 'PC-02', 'PC-03', 'PC-04'] };

/* ---------------- MICROHISTORIAS ---------------- */
const MICROS = {
  'PB-M1': { stop: 'pb', from: 'PB-03', title: '150.000 firmas', art: 'counter', seal: 'recon', sealNote: 'dato de El Colombiano',
    body: 'La oferta de Botero tardó en encontrar respuesta. En agosto de 1998, la arquitecta Ana María Villa empezó a recoger firmas. Reunió 150.000. Lema: ‘si Botero no regala sus obras se nos arma la gorda’. En septiembre de 1998 el museo y la plaza se hicieron oficiales.',
    vo: 'La oferta de Botero tardó en encontrar respuesta. En agosto de 1998 una arquitecta, Ana María Villa, salió a recoger firmas. Juntó ciento cincuenta mil. Un mes después, el museo y la plaza ya eran un proyecto oficial.',
    sources: 'El Colombiano, "La historia de la Plaza Botero y el renovado Museo de Antioquia".' },
  'PB-M2': { stop: 'pb', from: 'PB-02', title: 'Tres meses de vida', art: 'img', img: 'IMG-PB-03',
    body: 'El alcalde Juan Gómez Martínez ordenó demoler un edificio del Metro de Medellín que tenía tres meses y nunca se había usado. Juan Luis Mejía, entonces secretario de Educación, lo llamó ‘un acto de valor cívico y político inmenso’.',
    note: 'Todavía no sabemos dónde estaba exactamente.',
    vo: 'Entre lo que se demolió había un edificio del Metro que tenía tres meses y nunca se había usado. El alcalde dio la orden. Hubo quien lo llamó un acto de valor cívico. Hubo quien perdió su lugar.',
    sources: 'El Colombiano, "La historia de la Plaza Botero y el renovado Museo de Antioquia".' },
  'PB-M3': { stop: 'pb', from: 'PB-04', title: 'La plaza cerrada', art: 'fence',
    body: 'En 2022 la Alcaldía cercó la plaza con vallas y tres accesos controlados por la fuerza pública. Más de 50 personas del sector cultural pidieron otra solución. En 2025 se reabrió, ya sin vallas. Botero había pedido una plaza ‘abierta, accesible y afectuosa’.',
    vo: 'Esta capa es muy reciente. En 2022 la plaza se cercó con vallas y accesos controlados. Hubo protestas del sector cultural. En 2025 volvió a abrirse. Botero la había pedido abierta, accesible y afectuosa. Ninguna plaza está terminada.',
    sources: 'El Colombiano, "La Plaza Botero otra vez está abierta para todo Medellín" (2025); medellin.co (2023).' },
  'MA-M1': { stop: 'ma', from: 'MA-03', title: 'El gabinete de Zea', art: 'cabinet', seal: 'interp', sealNote: 'no sabemos cómo estaban dispuestos los objetos',
    shelves: ['Reliquias de la Independencia', 'Armas y retratos', 'Cerámica indígena', 'Monedas y minerales', 'Plantas, animales y “curiosidades”'],
    body: 'El primer museo no era de arte. Guardaba reliquias de la Independencia, armas, retratos, cerámica indígena, monedas, minerales, plantas, animales… y ‘curiosidades’. Lo armaron coleccionistas como Manuel Uribe Ángel y Martín Gómez. El nombre lo propuso Ñito Restrepo, en honor a Francisco Antonio Zea.',
    vo: 'El primer museo de Antioquia no colgaba cuadros. Guardaba reliquias de la Independencia, armas, cerámica indígena, minerales, animales y curiosidades. Mira la lista: patria, naturaleza, rarezas. Lo que una sociedad guarda dice algo de lo que valora. Hoy este museo guarda otras cosas.',
    sources: 'Rivera Guzmán (2017), "Colección fundacional del Museo de Zea (hoy Museo de Antioquia), 1870-1905".' },
  'MA-M2': { stop: 'ma', from: 'MA-02', title: 'Un palacio por un peso', art: 'peso', seal: 'recon', sealNote: 'dato de El Colombiano',
    body: 'Cuando llegó el proyecto del museo, el antiguo Palacio Municipal era de Empresas Públicas de Medellín. EPM se lo vendió a la administración municipal por un peso.',
    vo: 'Para hacer el museo hacía falta el edificio, y el edificio era de Empresas Públicas. El precio de venta fue un peso. A veces una ciudad se transforma con una firma en una escritura.',
    sources: 'El Colombiano, "La historia de la Plaza Botero y el renovado Museo de Antioquia".' },
  'PC-M1': { stop: 'pc', from: 'PC-01', title: '“Netamente góticos”', art: 'quote', seal: 'archivo', sealNote: 'cita recogida en Vélez White (1994)',
    body: 'Un crítico de la época dijo que el estilo era ‘un poco indefinido’. Goovaerts respondió: ‘todas las formas, todos los detalles son netamente góticos, hasta que se me pruebe lo contrario’. Hoy se describe como gótico flamenco o renacimiento gótico.',
    vo: 'No a todos les gustó. Un crítico dijo que el estilo era ‘un poco indefinido’. Goovaerts contestó que todas las formas y todos los detalles eran ‘netamente góticos, hasta que se me pruebe lo contrario’.',
    sources: 'Vélez White (1994); Colombia.travel.' },
  'PC-M2': { stop: 'pc', from: 'PC-04', title: 'Lo que el centro tumbó', art: 'img', img: 'IMG-PC-02',
    body: 'Goovaerts diseñó en 1922 el edificio del Teatro Junín y el Hotel Europa. Fue demolido en 1969, y en su lugar se levantó el edificio Coltejer. Su Palacio Nacional, en Carabobo, se convirtió en un uso comercial.',
    vo: 'De Goovaerts quedan pocas obras como él las pensó. El Teatro Junín y el Hotel Europa se demolieron en 1969 para levantar el edificio Coltejer. En este centro, demoler para construir algo nuevo ha sido una costumbre. Ya lo viste en la plaza.',
    sources: 'Vélez White (1994); Artigrama (2002).' }
};

/* ---------------- DESAFÍO FINAL ---------------- */
const QUIZ = [
  { id: 'DF-01', stop: 'pb', q: '¿Qué hubo que hacer para abrir la Plaza Botero?',
    opts: ['Demoler construcciones y desplazar a quienes vivían y trabajaban allí.', 'Nada: siempre fue un espacio abierto.', 'Solo retirar ventas ambulantes de un parque que ya existía.'], a: 0,
    ok: 'Exacto. La plaza se ganó demoliendo, y para algunos tuvo un costo alto. Recuerda la cifra: más de 40 años de vida en el lugar.',
    ko: 'No. Donde hoy están las esculturas había construcciones. Se demolieron entre 1998 y 2000, y quienes vivían y trabajaban allí tuvieron que irse.',
    review: 'PB-02', src: 'Artigrama 17 (2002); Medellín.Travel.' },
  { id: 'DF-02', stop: 'pb', q: 'La primera oferta de Botero para la plaza fue de 10 esculturas. ¿Cuántas hay hoy?',
    opts: ['10', '14', '23', '30'], a: 2,
    ok: '23. Y cada pedestal lo decidió él. La próxima vez que pases, mira hacia dónde mira cada una.',
    ko: 'Son 23. La oferta creció por tandas: 10, 14, 18, 23.', hintIf: 'PB-M1', hint: 'La ciudad también empujó: 150.000 firmas.',
    review: 'PB-03', src: 'El Colombiano; Medellín.Travel.' },
  { id: 'DF-03', stop: 'ma', q: 'Antes de ser museo, ¿qué funcionaba en el edificio del Museo de Antioquia?',
    opts: ['El Palacio Municipal: Alcaldía y Concejo de Medellín.', 'La Gobernación de Antioquia.', 'La antigua Casa de la Moneda.'], a: 0,
    ok: 'Correcto. El edificio del poder municipal es hoy una casa para el arte.',
    ko: 'No. Fue la Alcaldía, inaugurada en 1937. La Gobernación estaba enfrente, y la Casa de la Moneda fue la sede anterior del museo.',
    review: 'MA-02', src: 'El Colombiano; Artigrama (2002).' },
  { id: 'DF-04', stop: 'ma', q: '¿En qué año se creó por ley el museo que hoy es el Museo de Antioquia?',
    opts: ['1881', '1937', '1978', '2000'], a: 0,
    ok: 'Sí. El museo es más de cincuenta años más viejo que el edificio que hoy ocupa.',
    ko: 'Casi. Una cosa es el edificio y otra la institución: el museo nació en 1881 como Museo de Zea.', hintIf: 'MA-M1', hint: 'Al principio guardaba reliquias, minerales y curiosidades.',
    review: 'MA-03', src: 'Rivera Guzmán (2017); Medellín.Travel.' },
  { id: 'DF-05', stop: 'pc', q: '¿Por qué la cúpula del Palacio de la Cultura no está en el centro del edificio?',
    opts: ['Porque se construyó solo una fracción del proyecto (cerca de una cuarta parte).', 'Porque Goovaerts la diseñó descentrada a propósito.', 'Porque la reubicaron al construir el Metro.'], a: 0,
    ok: 'Exacto. La cúpula descentrada es la cicatriz de un proyecto que no se terminó.',
    ko: 'No. El proyecto era simétrico. Se construyó apenas una parte, y por eso la cúpula quedó cerca de un borde.',
    review: 'PC-02', src: 'Vélez White (1994); ICPA.' },
  { id: 'DF-06', stop: 'pc', q: 'El patrón ajedrezado de la fachada del Palacio de la Cultura es…',
    opts: ['Piedra tallada', 'Revoque pintado', 'Baldosa de cerámica'], a: 1,
    ok: 'Buen ojo. Lo que parece estilo también fue presupuesto.',
    ko: 'No. Es revoque, una capa de mortero pintada. La piedra estaba en el plan, pero no se puso.',
    review: 'PC-03', src: 'Vélez White (1994); El Colombiano (2025).' },
  { id: 'DF-07', stop: 'x', q: '¿Qué pasó en 1987 con los dos palacios de la plaza?',
    opts: ['La Alcaldía y la Gobernación se trasladaron a La Alpujarra.', 'Ambos fueron declarados Monumento Nacional.', 'Se inauguró la Plaza Botero.'], a: 0,
    ok: 'Sí. Ese año el poder se fue del centro y abrió espacio para la memoria.',
    ko: 'No. En 1987 la Alcaldía y la Gobernación se mudaron a La Alpujarra. Esa salida es el punto de giro de toda esta historia.',
    review: 'MA-02', src: 'El Colombiano; Gobernación de Antioquia (ICPA).' },
  { id: 'DF-08', stop: 'x', q: '¿Qué hilo une los tres lugares del recorrido?',
    opts: ['Espacios del poder administrativo que se transformaron en lugares de arte, cultura y memoria.', 'Los tres los diseñó Agustín Goovaerts.', 'Los tres se construyeron para el Museo de Antioquia.'], a: 0,
    ok: 'Ese es el hilo. Este centro no se detuvo: cambió de dueño y de uso.',
    ko: 'No. El hilo es la transformación: del poder a la cultura.', hintIf: 'PC-M2', hint: 'Y para transformar, este centro también ha demolido.',
    review: 'PC-04', src: 'Síntesis de las fuentes de las tres paradas.' },
  { id: 'DF-09', stop: 'x', q: 'En la Plaza Botero, al deslizar hacia ANTES, escuchaste una calle con tijeras, cortinas metálicas y voces. ¿Qué era ese sonido?',
    opts: ['Una grabación hecha en la zona antes de las demoliciones.', 'Una recreación sonora producida hoy.', 'El sonido en vivo de la plaza.'], a: 1,
    ok: 'Exacto. Saber qué es archivo y qué es reconstrucción es la mitad de entender la historia.',
    ko: 'No. Era una recreación: la hicimos hoy a partir de documentos. Mira el sello: ARCHIVO, RECONSTRUCCIÓN o INTERPRETACIÓN te dice qué tipo de evidencia tienes delante.',
    review: 'PB-02', src: 'Ficha PB-02 del guion; Artigrama (2002).' }
];

const RESULTS_LEARNED = [
  'La Plaza Botero se abrió demoliendo y desplazando, entre 1998 y 2001.',
  'El Museo de Antioquia nació en 1881 y desde 2000 ocupa la antigua Alcaldía (1937).',
  'El Palacio de la Cultura es una fracción del proyecto de 1920, y su cúpula descentrada lo prueba.',
  'En 1987 el poder se fue y la cultura llegó.',
  'No todo lo que ves en una pantalla es archivo.'
];

const VO_BV = {
  welcome: 'Hola. Soy la Archivista. No viví nada de lo que vas a ver: trabajo con lo que quedó. Fotos, planos, actas, periódicos. Te voy a mostrar este centro capa por capa, y siempre te voy a decir de dónde sale cada imagen.',
  safety: 'Una regla antes de empezar: cuando la cámara está arriba, tú estás quieto.',
  tutorial: 'Tres gestos: alinear, deslizar, tocar. Y una pregunta que te vas a hacer todo el tiempo: ¿esto es archivo o es reconstrucción?',
  controls: 'Tres paradas, tres huellas. Empecemos por la que tienes debajo de los pies.',
  results: 'Ya no vas a ver esta plaza igual. Eso era todo lo que quería: que miraras las capas. Las calles del centro tienen muchas más. Sigue buscando.'
};

const SOURCES = [
  ['Vélez White, M. L. (1994). Agustín Goovaerts y la arquitectura en Medellín. Editorial El Propio Bolsillo.', 'https://bibliotecadigital.udea.edu.co/bitstream/10495/333/1/AgustinGoovaerts%20.pdf'],
  ['Rivera Guzmán, J. C. (2017). Colección fundacional del Museo de Zea (hoy Museo de Antioquia), 1870-1905. UNAL Medellín.', 'https://humanasyeconomicas.medellin.unal.edu.co/images/revista-quiron-pdf/edicion-7/4Articulo_Coleccion_Fundacional_del_Museo_de__Zea_1870-1905.pdf'],
  ['Hernández Martínez, A. (2002). El efecto Guggenheim-Bilbao en Latinoamérica: Medellín, Ciudad Botero. Artigrama, 17.', 'https://papiro.unizar.es/ojs/index.php/artigrama/article/download/8396/7101/29142'],
  ['Gobernación de Antioquia (2024). Documento institucional del ICPA.', 'https://www.antioquia.gov.co/images/PDF2/Comunicaciones/2024/identidad/ICPA.pdf'],
  ['Medellín.Travel. Museo de Antioquia.', 'https://www.medellin.travel/museo-de-antioquia/'],
  ['Medellín.Travel. Palacio de la Cultura Rafael Uribe Uribe.', 'https://www.medellin.travel/palacio-de-la-cultura-rafael-uribe-uribe/'],
  ['Colombia.travel. Conoce el Palacio de la Cultura Rafael Uribe Uribe.', 'https://colombia.travel/es/medellin/conoce-el-palacio-de-la-cultura-rafael-uribe-uribe'],
  ['El Colombiano. La historia de la Plaza Botero y el renovado Museo de Antioquia.', 'https://www.elcolombiano.com/cultura/la-historia-de-la-plaza-botero-y-el-renovado-museo-de-antioquia-HJ13836199'],
  ['El Colombiano. Historia del Museo de Antioquia: de centro del poder a sede cultural.', 'https://www.elcolombiano.com/medellin/historia-del-museo-de-antioquia-de-centro-del-poder-a-sede-cultural-AF37457135'],
  ['El Colombiano (2025). El centenario Palacio de Calibío estrena "pinta".', 'https://www.elcolombiano.com/medellin/obras-de-mantenimiento-palacio-de-la-cultura-medellin-2025-AG27304477'],
  ['El Colombiano (2025). La Plaza Botero otra vez está abierta para todo Medellín.', 'https://www.elcolombiano.com/generacion/la-plaza-botero-otra-vez-esta-abierta-para-todo-medellin-IC27436259'],
  ['Centrópolis. Palacios en el centro.', 'https://www.centropolismedellin.com/palacios-en-el-centro-de-medellin/']
];
