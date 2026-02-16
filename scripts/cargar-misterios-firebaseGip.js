const admin = require('firebase-admin');

// Inicializar Firebase Admin
// IMPORTANTE: Descarga tu serviceAccountKey.json desde Firebase Console
// Firebase Console > Project Settings > Service Accounts > Generate New Private Key
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Misterios por toda la península ibérica
const misterios = [
{
  titulo: "La Perla del Cantábrico",
  acertijo: "Una bahía perfecta, una isla en el centro y un paseo lleno de historia. ¿Qué playa donostiarra soy?",
  respuesta: "Playa de La Concha",
  latitud: 43.3180,
  longitud: -1.9869,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "La Playa de La Concha es uno de los arenales urbanos más famosos del mundo.",
  imagen: "https://www.barcelo.com/guia-turismo/wp-content/uploads/2024/09/ok-playa-de-la-concha.jpg"
},
{
  titulo: "El Monte de la Ciudad",
  acertijo: "Corono una ciudad entera y guardo un castillo en mi cima. ¿Qué monte donostiarra soy?",
  respuesta: "Monte Urgull",
  latitud: 43.3240,
  longitud: -1.9860,
  radioDesbloqueo: 500,
  desbloqueado: false,
  descripcion: "El Monte Urgull ofrece vistas panorámicas de Donostia y su bahía.",
  imagen: "https://www.barcelo.com/guia-turismo/wp-content/uploads/2019/10/monte-urgull_1.jpg"
},
{
  titulo: "El Mirador del Dragón Verde",
  acertijo: "Mis laderas verdes caen al mar y desde mi cima se ve toda la costa. ¿Qué monte soy?",
  respuesta: "Monte Igueldo",
  latitud: 43.3140,
  longitud: -2.0270,
  radioDesbloqueo: 400,
  desbloqueado: false,
  descripcion: "El Monte Igueldo es famoso por su parque de atracciones y sus vistas.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Lighthouse_in_San_Sebastian%27s_Igueldo_mountain_%28Donostia%2C_Spain%29..jpg"
},
{
  titulo: "La Isla del Medio",
  acertijo: "Una pequeña isla protege una bahía perfecta. ¿Qué isla donostiarra soy?",
  respuesta: "Isla de Santa Clara",
  latitud: 43.3200,
  longitud: -1.9980,
  radioDesbloqueo: 1000,
  desbloqueado: false,
  descripcion: "La Isla de Santa Clara es un símbolo de la bahía de Donostia.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/8/85/San_Sebastian_from_Igeldo.jpg"
},
{
  titulo: "El Santuario del Monte",
  acertijo: "Un templo blanco se alza sobre la ciudad, visible desde cualquier punto. ¿Qué santuario soy?",
  respuesta: "Santuario de Urkiola",
  latitud: 43.1640,
  longitud: -2.7040,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El Santuario de Urkiola es un lugar de peregrinación en la frontera entre Bizkaia y Gipuzkoa.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Urkiola_-_Santuario_29.jpg"
},
{
  titulo: "El Bosque de los Gigantes",
  acertijo: "Mis árboles rectos y altos parecen columnas de una catedral verde. ¿Qué bosque guipuzcoano soy?",
  respuesta: "Bosque de Artikutza",
  latitud: 43.2330,
  longitud: -1.7500,
  radioDesbloqueo: 600,
  desbloqueado: false,
  descripcion: "Artikutza es un bosque húmedo protegido, propiedad del Ayuntamiento de Donostia.",
  imagen: "https://www.turismodeobservacion.com/media/fotografias/bosque-de-artikutza-31815-xl.jpg"
},
{
  titulo: "El Mirador del Flysch",
  acertijo: "Mis acantilados muestran millones de años de historia geológica. ¿Qué tramo costero soy?",
  respuesta: "Flysch de Zumaia",
  latitud: 43.2990,
  longitud: -2.2570,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "El Flysch de Zumaia es uno de los paisajes geológicos más importantes del mundo.",
  imagen: "https://www.barcelo.com/guia-turismo/wp-content/uploads/2024/09/ok-geoparque-flysch.jpg"
},
{
  titulo: "La Ermita del Acantilado",
  acertijo: "Una ermita blanca se asoma al mar desde un acantilado. ¿Qué templo soy?",
  respuesta: "Ermita de San Telmo (Zumaia)",
  latitud: 43.2998,
  longitud: -2.2578,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "La ermita de San Telmo es famosa por su ubicación sobre el flysch.",
  imagen: "https://turismovasco.com/wp-content/uploads/et_temp/visitas-al-flysch-de-zumaia-ermita-de-san-telmo-202648_1024x675.jpg"
},
{
  titulo: "El Puente del Río Urola",
  acertijo: "Un puente medieval une dos orillas en una villa histórica. ¿Qué puente soy?",
  respuesta: "Puente de Zubimusu (Azpeitia)",
  latitud: 43.1830,
  longitud: -2.2660,
  radioDesbloqueo: 120,
  desbloqueado: false,
  descripcion: "El puente de Zubimusu es uno de los símbolos de Azpeitia.",
  imagen: "https://estaticosgn-cdn.deia.eus/clip/5150711f-9f1d-43d1-ab63-a985e796c547_16-9-aspect-ratio_default_0.jpg"
},
{
  titulo: "El Santuario del Hierro",
  acertijo: "Un gran templo barroco se alza en un valle industrial. ¿Qué santuario soy?",
  respuesta: "Santuario de Loyola",
  latitud: 43.1780,
  longitud: -2.2380,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Santuario de Loyola es el lugar de nacimiento de San Ignacio.",
  imagen: "https://turismo.euskadi.eus/contenidos/h_cultura_y_patrimonio/0000011147_h5_rec_turismo/es_11147/images/GL_SanIgnacioLoiola.jpg"
},
{
  titulo: "El Tren del Valle",
  acertijo: "Un pequeño tren recorre un valle verde entre montañas. ¿Qué tren turístico soy?",
  respuesta: "Tren de Azpeitia (Museo Vasco del Ferrocarril)",
  latitud: 43.1835,
  longitud: -2.2630,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El tren del Museo Vasco del Ferrocarril recorre el valle del Urola.",
  imagen: "https://turismo.euskadi.eus/contenidos/evento/0000066341_m1_rec_turismo/es_66341/images/FP_Museovascodelferrocarrilazpeitia.jpg"
},
{
  titulo: "El Mirador del Oria",
  acertijo: "Desde mi cima se ve un río serpenteando hacia el mar. ¿Qué monte soy?",
  respuesta: "Monte Andatza",
  latitud: 43.2400,
  longitud: -2.0900,
  radioDesbloqueo: 850,
  desbloqueado: false,
  descripcion: "El monte Andatza es uno de los mejores miradores del valle del Oria.",
  imagen: "https://fotolector.diariovasco.com/fotos/2024/2024/08/llegando-cima-boscosa-monte-andatza-202408062349-978x699.jpg"
},
{
  titulo: "La Playa de las Rocas Negras",
  acertijo: "Mi arena oscura y mis rocas volcánicas me hacen única en la costa vasca. ¿Qué playa soy?",
  respuesta: "Playa de Itzurun",
  latitud: 43.3010,
  longitud: -2.2570,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "Itzurun es famosa por su flysch y por aparecer en series internacionales.",
  imagen: "https://www.turismodeobservacion.com/media/fotografias/playa-de-itzurun-zumaya-gipuzkoa-91279-xl.jpg"
},
{
  titulo: "El Mirador del Valle del Deba",
  acertijo: "Un balcón natural se asoma a un valle industrial y verde. ¿Qué mirador soy?",
  respuesta: "Mirador de Karakate",
  latitud: 43.2000,
  longitud: -2.3500,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Karakate es uno de los montes más emblemáticos entre Eibar y Elgoibar.",
  imagen: "https://s3.ppllstatics.com/diariovasco/www/pre2017/multimedia/noticias/201705/04/media/24004344.JPG"
}

,
{
  titulo: "El Santuario del Valle Sagrado",
  acertijo: "Un templo blanco se alza en un valle rodeado de montes. Soy lugar de romerías y leyendas. ¿Qué santuario soy?",
  respuesta: "Santuario de Arantzazu",
  latitud: 43.0407,
  longitud: -2.4103,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Arantzazu es uno de los santuarios más importantes de Euskadi, situado en un entorno natural espectacular.",
  imagen: "https://oñatiturismo.eus/wp-content/uploads/2016/10/arantzazuko-santutegia-3.jpg"
},
{
  titulo: "El Mirador del Aitzkorri",
  acertijo: "Desde mis balcones se ve la sierra más alta de Euskadi. ¿Qué mirador natural soy?",
  respuesta: "Aizkorri (zona de Urbia)",
  latitud: 42.9880,
  longitud: -2.3140,
  radioDesbloqueo: 850,
  desbloqueado: false,
  descripcion: "La zona de Urbia ofrece vistas únicas del macizo del Aizkorri.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Urbia_%28Gipuzkoa%29.jpg"
},
{
  titulo: "El Bosque de los Secretos",
  acertijo: "Un hayedo mágico donde la niebla se enreda entre los troncos. ¿Qué bosque soy?",
  respuesta: "Hayedo de Otzarreta",
  latitud: 43.0660,
  longitud: -2.7000,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El hayedo de Otzarreta es famoso por sus árboles de formas retorcidas.",
  imagen: "https://turismovasco.com/wp-content/uploads/2017/11/Musgo-en-las-raices-de-los-%C3%A1rboles-de-Otzarreta-1024x768.jpg"
},
{
  titulo: "El Mirador del Urola",
  acertijo: "Un balcón natural sobre un valle industrial y verde. ¿Qué monte soy?",
  respuesta: "Izarraitz",
  latitud: 43.2000,
  longitud: -2.3000,
  radioDesbloqueo: 900,
  desbloqueado: false,
  descripcion: "El macizo de Izarraitz domina Azkoitia, Azpeitia y Zestoa.",
  imagen: "https://satorrak.com/web/images/stories/satorrak/diario/izarraitz-2.jpg"
},
{
  titulo: "La Cueva del Tiempo",
  acertijo: "Mis galerías guardan restos de animales prehistóricos y pinturas antiguas. ¿Qué cueva guipuzcoana soy?",
  respuesta: "Cueva de Ekain",
  latitud: 43.2400,
  longitud: -2.2500,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Ekain es una cueva con arte rupestre declarada Patrimonio de la Humanidad.",
  imagen: "https://www.ekainberri.eus/wp-content/uploads/2017/03/interior2.jpg"
},
{
  titulo: "El Balcón del Cantábrico",
  acertijo: "Un monte costero con vistas a acantilados y playas. ¿Qué monte soy?",
  respuesta: "Monte Talaimendi",
  latitud: 43.3030,
  longitud: -2.2400,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Talaimendi es un mirador natural sobre Zarautz y Getaria.",
  imagen: "https://s0.wklcdn.com/image_67/2010687/82500980/53376861Master.jpg"
},
{
  titulo: "El Faro del Ratón",
  acertijo: "Un faro vigila una montaña que parece un ratón dormido. ¿Qué faro soy?",
  respuesta: "Faro de Getaria",
  latitud: 43.3050,
  longitud: -2.2040,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El faro de Getaria se sitúa sobre el monte San Antón, conocido como 'El Ratón'.",
  imagen: "https://santacruzmipuerto.com/images4/Noticias1/farosguipuzcoagetaria/1.jpg"
},
{
  titulo: "El Mirador del Ratón",
  acertijo: "Un monte con forma de animal protege un puerto pesquero. ¿Qué monte soy?",
  respuesta: "Monte San Antón (El Ratón de Getaria)",
  latitud: 43.3055,
  longitud: -2.2050,
  radioDesbloqueo: 1000,
  desbloqueado: false,
  descripcion: "El Ratón de Getaria es uno de los perfiles más reconocibles de la costa vasca.",
  imagen: "https://hirukide.com/wp-content/uploads/2023/12/ocio14.jpg"
},
{
  titulo: "La Playa de los Surfistas",
  acertijo: "Una playa larga, abierta y famosa por sus olas. ¿Qué playa guipuzcoana soy?",
  respuesta: "Playa de Zarautz",
  latitud: 43.2840,
  longitud: -2.1690,
  radioDesbloqueo: 500,
  desbloqueado: false,
  descripcion: "Zarautz es una de las playas más largas del Cantábrico y un referente del surf.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Zarautz%2C_Gipuzkoa%2C_Euskal_Herria.jpg/1280px-Zarautz%2C_Gipuzkoa%2C_Euskal_Herria.jpg"
},

{
  titulo: "El Faro de los Acantilados",
  acertijo: "Un faro blanco se alza sobre acantilados oscuros. ¿Qué faro soy?",
  respuesta: "Faro de Santa Catalina (Lekeitio, límite cercano)",
  latitud: 43.3670,
  longitud: -2.5000,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El faro de Santa Catalina ofrece vistas espectaculares del Cantábrico.",
  imagen: "https://www.noradoa.com/wordpress/wp-content/uploads/2020/04/faro-santa-catalina-noradoa-1.jpg"
},

{
  titulo: "El Bosque del Dragón",
  acertijo: "Un bosque húmedo y profundo donde la niebla crea figuras. ¿Qué bosque soy?",
  respuesta: "Bosque de Pagoeta",
  latitud: 43.2400,
  longitud: -2.1500,
  radioDesbloqueo: 600,
  desbloqueado: false,
  descripcion: "El Parque Natural de Pagoeta es un espacio protegido lleno de senderos y hayedos.",
  imagen: "https://www.nekatur.net/datos/espacios_naturales_fotos/foto10/pagoeta1.jpg"
},

{
  titulo: "El Santuario del Pastor",
  acertijo: "Un pequeño templo en un alto, rodeado de pastos y montañas. ¿Qué ermita soy?",
  respuesta: "Ermita de Larraitz",
  latitud: 43.0335,
  longitud: -2.0835,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Larraitz es punto de partida para ascender al Txindoki.",
  imagen: "https://www.kulturweb.com/adm/imagenes/gipuzkoan/abal-larraitzbaseliza01.jpg"
}
,
{
  titulo: "El Faro de los Marineros",
  acertijo: "Un faro blanco vigila la entrada a un puerto pesquero famoso por su txakoli. ¿Qué faro soy?",
  respuesta: "Faro de Getaria",
  latitud: 43.3050,
  longitud: -2.2040,
  radioDesbloqueo: 350,
  desbloqueado: false,
  descripcion: "El faro de Getaria se sitúa sobre el monte San Antón, conocido como El Ratón.",
  imagen: "https://santacruzmipuerto.com/images4/Noticias1/farosguipuzcoagetaria/1.jpg"
},
{
  titulo: "El Mirador del Puerto Viejo",
  acertijo: "Un barrio de casas blancas y calles estrechas se asoma al mar. ¿Qué barrio soy?",
  respuesta: "Puerto Viejo de Hondarribia",
  latitud: 43.3680,
  longitud: -1.7900,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El Puerto Viejo de Hondarribia es uno de los barrios marineros más bonitos de Euskadi.",
  imagen: "https://turismo.euskadi.eus/contenidos/h_cultura_y_patrimonio/0000008812_h6_rec_turismo/es_8812/images/FP_Hondarribia_puerto.jpg"
},
{
  titulo: "La Fortaleza del Bidasoa",
  acertijo: "Mis murallas han defendido la frontera durante siglos. ¿Qué fortaleza soy?",
  respuesta: "Castillo de San Telmo (Hondarribia)",
  latitud: 43.3685,
  longitud: -1.7905,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Castillo de San Telmo es una fortaleza defensiva en la desembocadura del Bidasoa.",
  imagen: "https://www.castillosnet.org/datos/guipuzcoa/hondarribia/hondarribia/castillo_de_san_telmo/SS-CAS-003-0010001.jpg"
},
{
  titulo: "El Mirador de los Pirineos",
  acertijo: "Desde mi cima se ve Francia, el Bidasoa y el mar. ¿Qué monte fronterizo soy?",
  respuesta: "Monte Jaizkibel",
  latitud: 43.3580,
  longitud: -1.8500,
  radioDesbloqueo: 600,
  desbloqueado: false,
  descripcion: "Jaizkibel es uno de los montes más emblemáticos de la costa vasca.",
  imagen: "https://thumbs.dreamstime.com/b/monte-jaizkibel-en-guipuzcoa-espa%C3%B1a-29681796.jpg"
},
{
  titulo: "La Playa de las Dunas",
  acertijo: "Una playa larga y abierta, protegida por dunas y marismas. ¿Qué playa soy?",
  respuesta: "Playa de Hondarribia",
  latitud: 43.3710,
  longitud: -1.7900,
  radioDesbloqueo: 600,
  desbloqueado: false,
  descripcion: "La playa de Hondarribia es un arenal amplio junto a la desembocadura del Bidasoa.",
  imagen: "https://www.guide-du-paysbasque.com/_bibli/annonces/6806/hd/playa-hondarribia.jpg"
},
{
  titulo: "El Bosque del Dragón Blanco",
  acertijo: "Un bosque húmedo donde los árboles parecen criaturas antiguas. ¿Qué bosque soy?",
  respuesta: "Bosque de Leitzaran",
  latitud: 43.1200,
  longitud: -2.0200,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El valle del Leitzaran es un espacio natural protegido lleno de senderos y túneles ferroviarios antiguos.",
  imagen: ""
},

{
  titulo: "El Puente del Urola",
  acertijo: "Un puente histórico une dos orillas en una villa famosa por su tren. ¿Qué puente soy?",
  respuesta: "Puente de Iraeta (Zestoa)",
  latitud: 43.2400,
  longitud: -2.2400,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El puente de Iraeta es uno de los símbolos de Zestoa.",
  imagen: "https://s0.wklcdn.com/image_210/6300530/155722907/97837227.400x300.jpg"
},

{
  titulo: "La Playa del Ratón",
  acertijo: "Una playa protegida por un monte con forma de animal. ¿Qué playa soy?",
  respuesta: "Playa de Malkorbe (Getaria)",
  latitud: 43.3040,
  longitud: -2.2050,
  radioDesbloqueo: 350,
  desbloqueado: false,
  descripcion: "Malkorbe es una playa tranquila protegida por el monte San Antón.",
  imagen: "https://turismo.euskadi.eus/contenidos/g_naturaleza/0000003002_g1_rec_turismo/es_3002/images/FP_malkorbe_ok.jpg"
},

{
  titulo: "El Santuario del Valle Oculto",
  acertijo: "Un monasterio escondido entre montañas, famoso por su claustro. ¿Qué monasterio soy?",
  respuesta: "Monasterio de Bidaurreta",
  latitud: 43.0330,
  longitud: -2.4100,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Monasterio de Bidaurreta es un edificio renacentista situado en Oñati.",
  imagen: "https://oñatiturismo.eus/wp-content/uploads/2016/10/bidaurreta.jpg"
}
,

{
  titulo: "El Valle de los Túneles",
  acertijo: "Un antiguo trazado ferroviario convertido en vía verde atraviesa túneles y bosques. ¿Qué valle soy?",
  respuesta: "Vía Verde del Plazaola",
  latitud: 43.0600,
  longitud: -1.9800,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "La Vía Verde del Plazaola recorre antiguos túneles ferroviarios entre Gipuzkoa y Navarra.",
  imagen: "https://donosticity.org/wp-content/uploads/2025/05/q4-1-1024x577.jpg"
},

{
  titulo: "El Embalse Escondido",
  acertijo: "Un lago artificial rodeado de montes y senderos, perfecto para caminar. ¿Qué embalse soy?",
  respuesta: "Embalse de Urkulu",
  latitud: 43.0400,
  longitud: -2.3300,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El embalse de Urkulu es un espacio natural muy visitado en el interior de Gipuzkoa.",
  imagen: "https://www.lonifasiko.com/wp-content/uploads/2014/10/Urkulu_Slider.jpg"
},


];

// Función para cargar los misterios en Firebase
async function cargarMisteriosEnFirebase() {
  try {
    console.log('🔄 Iniciando carga de misterios en Firebase...');
    console.log(`📊 Total de misterios a cargar: ${misterios.length}`);
    
    // Usar batch para operaciones más eficientes
    // Firebase limita los batch a 500 operaciones, pero tenemos menos
    const batch = db.batch();
    
    misterios.forEach((misterio, index) => {
      const docRef = db.collection('misterios').doc();
      batch.set(docRef, misterio);
      console.log(`✅ Preparado misterio ${index + 1}/${misterios.length}: ${misterio.titulo}`);
    });
    
    // Ejecutar el batch
    await batch.commit();
    
    console.log('\n🎉 ¡Todos los misterios se han cargado exitosamente en Firebase!');
    
  } catch (error) {
    console.error('❌ Error al cargar los misterios:', error);
    throw error;
  } finally {
    // Cerrar la app de Firebase
    await admin.app().delete();
    console.log('\n👋 Conexión con Firebase cerrada');
  }
}

// Ejecutar la función
cargarMisteriosEnFirebase()
  .then(() => {
    console.log('\n✨ Proceso completado con éxito');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error);
    process.exit(1);
  });