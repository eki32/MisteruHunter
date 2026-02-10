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
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "La Playa de La Concha es uno de los arenales urbanos más famosos del mundo.",
  imagen: ""
},
{
  titulo: "El Monte de la Ciudad",
  acertijo: "Corono una ciudad entera y guardo un castillo en mi cima. ¿Qué monte donostiarra soy?",
  respuesta: "Monte Urgull",
  latitud: 43.3240,
  longitud: -1.9860,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Monte Urgull ofrece vistas panorámicas de Donostia y su bahía.",
  imagen: ""
},
{
  titulo: "El Mirador del Dragón Verde",
  acertijo: "Mis laderas verdes caen al mar y desde mi cima se ve toda la costa. ¿Qué monte soy?",
  respuesta: "Monte Igueldo",
  latitud: 43.3140,
  longitud: -2.0270,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Monte Igueldo es famoso por su parque de atracciones y sus vistas.",
  imagen: ""
},
{
  titulo: "La Isla del Medio",
  acertijo: "Una pequeña isla protege una bahía perfecta. ¿Qué isla donostiarra soy?",
  respuesta: "Isla de Santa Clara",
  latitud: 43.3200,
  longitud: -1.9980,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "La Isla de Santa Clara es un símbolo de la bahía de Donostia.",
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Bosque de los Gigantes",
  acertijo: "Mis árboles rectos y altos parecen columnas de una catedral verde. ¿Qué bosque guipuzcoano soy?",
  respuesta: "Bosque de Artikutza",
  latitud: 43.2330,
  longitud: -1.7500,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Artikutza es un bosque húmedo protegido, propiedad del Ayuntamiento de Donostia.",
  imagen: ""
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
  imagen: ""
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
  imagen: ""
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
  imagen: ""
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
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Oria",
  acertijo: "Desde mi cima se ve un río serpenteando hacia el mar. ¿Qué monte soy?",
  respuesta: "Monte Andatza",
  latitud: 43.2400,
  longitud: -2.0900,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "El monte Andatza es uno de los mejores miradores del valle del Oria.",
  imagen: ""
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
  imagen: ""
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
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Aitzkorri",
  acertijo: "Desde mis balcones se ve la sierra más alta de Euskadi. ¿Qué mirador natural soy?",
  respuesta: "Aizkorri (zona de Urbia)",
  latitud: 42.9880,
  longitud: -2.3140,
  radioDesbloqueo: 350,
  desbloqueado: false,
  descripcion: "La zona de Urbia ofrece vistas únicas del macizo del Aizkorri.",
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Urola",
  acertijo: "Un balcón natural sobre un valle industrial y verde. ¿Qué monte soy?",
  respuesta: "Izarraitz",
  latitud: 43.2000,
  longitud: -2.3000,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El macizo de Izarraitz domina Azkoitia, Azpeitia y Zestoa.",
  imagen: ""
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
  imagen: ""
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
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Ratón",
  acertijo: "Un monte con forma de animal protege un puerto pesquero. ¿Qué monte soy?",
  respuesta: "Monte San Antón (El Ratón de Getaria)",
  latitud: 43.3055,
  longitud: -2.2050,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Ratón de Getaria es uno de los perfiles más reconocibles de la costa vasca.",
  imagen: ""
},
{
  titulo: "La Playa de los Surfistas",
  acertijo: "Una playa larga, abierta y famosa por sus olas. ¿Qué playa guipuzcoana soy?",
  respuesta: "Playa de Zarautz",
  latitud: 43.2840,
  longitud: -2.1690,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Zarautz es una de las playas más largas del Cantábrico y un referente del surf.",
  imagen: ""
},
{
  titulo: "El Mirador del Puerto",
  acertijo: "Un monte pequeño pero con vistas perfectas a un puerto pesquero. ¿Qué monte soy?",
  respuesta: "Monte San Blas (Mutriku)",
  latitud: 43.3070,
  longitud: -2.3850,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "San Blas es un mirador natural sobre Mutriku y su costa.",
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Deba",
  acertijo: "Un monte con vistas al mar y al valle del Deba. ¿Qué monte soy?",
  respuesta: "Kukuarri",
  latitud: 43.2900,
  longitud: -2.0500,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Kukuarri es un monte costero entre Orio y Usurbil.",
  imagen: ""
},
{
  titulo: "El Bosque del Dragón",
  acertijo: "Un bosque húmedo y profundo donde la niebla crea figuras. ¿Qué bosque soy?",
  respuesta: "Bosque de Pagoeta",
  latitud: 43.2400,
  longitud: -2.1500,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El Parque Natural de Pagoeta es un espacio protegido lleno de senderos y hayedos.",
  imagen: ""
},
{
  titulo: "El Mirador del Goierri",
  acertijo: "Un monte desde el que se ve todo el corazón verde de Gipuzkoa. ¿Qué monte soy?",
  respuesta: "Txindoki",
  latitud: 43.0330,
  longitud: -2.0830,
  radioDesbloqueo: 350,
  desbloqueado: false,
  descripcion: "El Txindoki es uno de los montes más emblemáticos de Gipuzkoa, conocido como el Cervino vasco.",
  imagen: ""
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
  imagen: ""
}
,
{
  titulo: "El Mirador del Cantábrico Azul",
  acertijo: "Un monte costero se asoma al mar entre prados verdes y acantilados. ¿Qué monte soy?",
  respuesta: "Monte Mendizorrotz",
  latitud: 43.2850,
  longitud: -2.0900,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Mendizorrotz es un monte costero entre Orio y Donostia con vistas espectaculares.",
  imagen: ""
},
{
  titulo: "El Faro de los Marineros",
  acertijo: "Un faro blanco vigila la entrada a un puerto pesquero famoso por su txakoli. ¿Qué faro soy?",
  respuesta: "Faro de Getaria",
  latitud: 43.3050,
  longitud: -2.2040,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El faro de Getaria se sitúa sobre el monte San Antón, conocido como El Ratón.",
  imagen: ""
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
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador de los Pirineos",
  acertijo: "Desde mi cima se ve Francia, el Bidasoa y el mar. ¿Qué monte fronterizo soy?",
  respuesta: "Monte Jaizkibel",
  latitud: 43.3580,
  longitud: -1.8500,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Jaizkibel es uno de los montes más emblemáticos de la costa vasca.",
  imagen: ""
},
{
  titulo: "La Playa de las Dunas",
  acertijo: "Una playa larga y abierta, protegida por dunas y marismas. ¿Qué playa soy?",
  respuesta: "Playa de Hondarribia",
  latitud: 43.3710,
  longitud: -1.7900,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "La playa de Hondarribia es un arenal amplio junto a la desembocadura del Bidasoa.",
  imagen: ""
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
  titulo: "El Mirador del Valle del Oria",
  acertijo: "Un monte con vistas a un valle industrial y verde. ¿Qué monte soy?",
  respuesta: "Monte Buruntza",
  latitud: 43.2400,
  longitud: -2.0500,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Buruntza es un monte emblemático entre Andoain y Lasarte-Oria.",
  imagen: ""
},
{
  titulo: "El Santuario del Pastor Blanco",
  acertijo: "Un pequeño templo blanco se alza en un collado entre montes. ¿Qué ermita soy?",
  respuesta: "Ermita de Erniozabal",
  latitud: 43.2000,
  longitud: -2.1500,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Erniozabal es una ermita situada en las laderas del monte Ernio.",
  imagen: ""
},
{
  titulo: "El Mirador del Ernio",
  acertijo: "Un monte sagrado para los guipuzcoanos, coronado por cruces. ¿Qué monte soy?",
  respuesta: "Monte Ernio",
  latitud: 43.2000,
  longitud: -2.1500,
  radioDesbloqueo: 350,
  desbloqueado: false,
  descripcion: "El Ernio es uno de los montes más populares para el senderismo en Gipuzkoa.",
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
  imagen: ""
},
{
  titulo: "El Mirador del Cantábrico Oriental",
  acertijo: "Un monte costero con vistas a Francia y al mar. ¿Qué monte soy?",
  respuesta: "Monte Guadalupe",
  latitud: 43.3680,
  longitud: -1.7900,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Guadalupe es un monte con una ermita y vistas espectaculares sobre Hondarribia.",
  imagen: ""
},
{
  titulo: "La Playa del Ratón",
  acertijo: "Una playa protegida por un monte con forma de animal. ¿Qué playa soy?",
  respuesta: "Playa de Malkorbe (Getaria)",
  latitud: 43.3040,
  longitud: -2.2050,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "Malkorbe es una playa tranquila protegida por el monte San Antón.",
  imagen: ""
},
{
  titulo: "El Mirador del Valle de Oñati",
  acertijo: "Un monte con vistas a un valle lleno de historia y monasterios. ¿Qué monte soy?",
  respuesta: "Monte Aloña",
  latitud: 43.0400,
  longitud: -2.4000,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Aloña es un monte emblemático que domina Oñati y Arantzazu.",
  imagen: ""
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
  imagen: ""
}
,
{
  titulo: "El Mirador del Bidasoa",
  acertijo: "Un monte fronterizo desde el que se ve Francia, el mar y la desembocadura del río. ¿Qué monte soy?",
  respuesta: "Monte Larun (Larrun)",
  latitud: 43.3070,
  longitud: -1.6280,
  radioDesbloqueo: 350,
  desbloqueado: false,
  descripcion: "Larrun es un monte emblemático en la frontera entre Gipuzkoa y Lapurdi, famoso por su tren cremallera.",
  imagen: ""
},
{
  titulo: "El Valle de los Túneles",
  acertijo: "Un antiguo trazado ferroviario convertido en vía verde atraviesa túneles y bosques. ¿Qué valle soy?",
  respuesta: "Vía Verde del Plazaola",
  latitud: 43.0600,
  longitud: -1.9800,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "La Vía Verde del Plazaola recorre antiguos túneles ferroviarios entre Gipuzkoa y Navarra.",
  imagen: ""
},
{
  titulo: "El Mirador del Goierri",
  acertijo: "Un monte con vistas a caseríos, prados y montañas del interior. ¿Qué monte soy?",
  respuesta: "Monte Orkatzategi",
  latitud: 43.0400,
  longitud: -2.3300,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Orkatzategi es un monte rocoso que domina el embalse de Urkulu y el valle de Oñati.",
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Cantábrico Interior",
  acertijo: "Un monte con antenas en su cima y vistas a toda la comarca del Urola. ¿Qué monte soy?",
  respuesta: "Monte Izazpi",
  latitud: 43.1000,
  longitud: -2.2500,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Izazpi es un monte emblemático entre Zumarraga y Azpeitia, con vistas amplias del interior guipuzcoano.",
  imagen: ""
}


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