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
  titulo: "La Catedral Vieja",
  acertijo: "Un templo gótico en obras eternas, famoso por su lema: 'abierto por obras'. ¿Qué catedral soy?",
  respuesta: "Catedral de Santa María (Vitoria-Gasteiz)",
  latitud: 42.8490,
  longitud: -2.6710,
  radioDesbloqueo: 350,
  desbloqueado: false,
  descripcion: "La Catedral de Santa María es uno de los templos góticos más importantes del norte de España.",
  imagen: "https://www.spain.info/export/sites/segtur/.content/imagenes/cabeceras-grandes/pais-vasco/catedral-maria-inmaculada_alava-vitoria-s_1097608751.jpg"
},
{
  titulo: "El Anillo Verde",
  acertijo: "Un cinturón natural rodea una ciudad entera, lleno de lagunas, aves y senderos. ¿Qué espacio soy?",
  respuesta: "Anillo Verde de Vitoria",
  latitud: 42.8580,
  longitud: -2.7000,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El Anillo Verde es un conjunto de parques naturales que rodean Vitoria-Gasteiz.",
  imagen: "https://www.hoteldato.com/wp-content/uploads/2017/03/anillo-verde-vitoria.jpg"
},
{
  titulo: "La Plaza del Pueblo",
  acertijo: "Una plaza medieval con soportales y forma irregular, corazón de la ciudad. ¿Qué plaza soy?",
  respuesta: "Plaza de la Virgen Blanca",
  latitud: 42.8468,
  longitud: -2.6717,
  radioDesbloqueo: 120,
  desbloqueado: false,
  descripcion: "La Virgen Blanca es el centro social e histórico de Vitoria-Gasteiz.",
  imagen: "https://thumbs.dreamstime.com/b/vitoria-gasteiz-spain-august-monument-to-battle-plaza-de-la-virgen-blanca-228893372.jpg"
},
{
  titulo: "El Embalse Esmeralda",
  acertijo: "Un lago artificial rodeado de montes y bosques, perfecto para caminar. ¿Qué embalse soy?",
  respuesta: "Embalse de Ullíbarri-Gamboa",
  latitud: 42.9440,
  longitud: -2.6200,
  radioDesbloqueo: 600,
  desbloqueado: false,
  descripcion: "Ullíbarri-Gamboa es el mayor embalse de Álava y un lugar popular para actividades al aire libre.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/8/85/Ull%C3%ADbarri-Gamboa_-_Embalse_de_Ull%C3%ADbarri_55.jpg"
},
{
  titulo: "El Bosque de los Gigantes Verdes",
  acertijo: "Un hayedo mágico donde la niebla se enreda entre los troncos. ¿Qué bosque soy?",
  respuesta: "Hayedo de Altube",
  latitud: 42.9750,
  longitud: -2.8500,
  radioDesbloqueo: 800,
  desbloqueado: false,
  descripcion: "El hayedo de Altube es uno de los bosques más extensos y húmedos de Álava.",
  imagen: "https://www.desnivel.com/images/2015/09/hayedo-de-altube2.jpg"
},
{
  titulo: "La Muralla del Silencio",
  acertijo: "Una muralla medieval rodea un casco histórico en forma de almendra. ¿Qué ciudad soy?",
  respuesta: "Vitoria-Gasteiz (Muralla Medieval)",
  latitud: 42.8495,
  longitud: -2.6705,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "La muralla medieval de Vitoria es uno de los restos defensivos mejor conservados del norte.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Muralla_medieval_de_Vitoria.JPG"
},
{
  titulo: "El Mirador del Valle Salado",
  acertijo: "Terrazas blancas brillan al sol como nieve, pero son sal. ¿Qué lugar soy?",
  respuesta: "Valle Salado de Añana",
  latitud: 42.8010,
  longitud: -2.9860,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Valle Salado de Añana es un paisaje cultural único dedicado a la producción de sal.",
  imagen: "https://www.senditur.com/multimedia/poi/7759/imagenes/Valle_Salado_de_Anana.jpg"
},
{
  titulo: "El Guardián de los Montes",
  acertijo: "Un castillo en ruinas vigila un valle desde lo alto de una colina. ¿Qué castillo soy?",
  respuesta: "Castillo de Portilla",
  latitud: 42.9000,
  longitud: -2.9500,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El castillo de Portilla domina el valle del Nervión desde un cerro rocoso.",
  imagen: "https://turismovasco.com/wp-content/uploads/2019/02/castillo-Castillo-de-Portilla-1024x768.jpg"
},
{
  titulo: "El Mirador del Nervión",
  acertijo: "Un balcón natural se asoma a la cascada más alta de España. ¿Qué mirador soy?",
  respuesta: "Mirador del Salto del Nervión",
  latitud: 42.9900,
  longitud: -2.9600,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El Salto del Nervión cae más de 200 metros en un cañón espectacular.",
  imagen: "https://content-viajes.nationalgeographic.com.es/medio/2023/11/10/adobestock_fb218c54_268496207_231110102048_1280x855.jpg"
},
{
  titulo: "La Torre del Vino",
  acertijo: "Un edificio moderno en forma de espiral domina un mar de viñedos. ¿Qué bodega soy?",
  respuesta: "Bodega Ysios",
  latitud: 42.5540,
  longitud: -2.5680,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "La bodega Ysios, diseñada por Calatrava, es uno de los iconos de Rioja Alavesa.",
  imagen: "https://gastroactivity.com/wp-content/uploads/2021/06/Bodegas-Ysios-Santiago-Calatrava-1.jpg"
},
{
  titulo: "La Ciudad del Vino",
  acertijo: "Un edificio ondulado de colores metálicos se alza junto a un pueblo medieval. ¿Qué bodega soy?",
  respuesta: "Bodega Marqués de Riscal",
  latitud: 42.5150,
  longitud: -2.6180,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "La Ciudad del Vino de Marqués de Riscal es obra de Frank Gehry y un icono arquitectónico.",
  imagen: "https://www.marquesderiscal.com/public/Image/2021/6/hotelmarqusderiscal.jpg"
},

{
  titulo: "La Torre del Silencio",
  acertijo: "Una torre solitaria se alza en un cerro sobre un valle. ¿Qué torre soy?",
  respuesta: "Torre de Mendoza",
  latitud: 42.8540,
  longitud: -2.7250,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "La Torre de Mendoza es una torre defensiva medieval muy bien conservada.",
  imagen: "https://turismo.euskadi.eus/contenidos/h_cultura_y_patrimonio/0000010970_h5_rec_turismo/es_10970/images/FP_torremendoza.jpg"
},
{
  titulo: "El Embalse de los Picos",
  acertijo: "Un lago rodeado de montes verdes y rutas de senderismo. ¿Qué embalse soy?",
  respuesta: "Embalse de Albina",
  latitud: 42.9500,
  longitud: -2.7000,
  radioDesbloqueo: 650,
  desbloqueado: false,
  descripcion: "Albina es un embalse pequeño pero muy popular entre montañeros.",
  imagen: "https://i.pinimg.com/736x/ef/6e/80/ef6e80c6f5e022afc2233dd5354681e7.jpg"
},

{
  titulo: "El Guardián del Zadorra",
  acertijo: "Un puente medieval de piedra cruza un río que atraviesa la llanada. ¿Qué puente soy?",
  respuesta: "Puente de Trespuentes",
  latitud: 42.8390,
  longitud: -2.7570,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El puente de Trespuentes es uno de los puentes medievales más emblemáticos de Álava.",
  imagen: "https://www.irunadeoca.com/wp-content/uploads/puente-romano-de-trespuentes.jpg"
},
{
  titulo: "La Fortaleza del Silencio",
  acertijo: "Un castillo en ruinas vigila un valle tranquilo desde lo alto de una colina. ¿Qué castillo soy?",
  respuesta: "Castillo de Ocio",
  latitud: 42.6270,
  longitud: -2.9300,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El castillo de Ocio domina el valle del Inglares desde un promontorio rocoso.",
  imagen: "https://www.turismo-prerromanico.com/wp-content/uploads/2020/03/FOTO2-2.jpg"
},
{
  titulo: "El Mirador del Ebro Alavés",
  acertijo: "Un balcón natural se asoma a un cañón profundo excavado por el Ebro. ¿Qué mirador soy?",
  respuesta: "Mirador de Sobrón",
  latitud: 42.7600,
  longitud: -3.1000,
  radioDesbloqueo: 450,
  desbloqueado: false,
  descripcion: "El desfiladero de Sobrón es uno de los paisajes más espectaculares del sur de Álava.",
  imagen: "https://image.jimcdn.com/app/cms/image/transf/none/path/sc3f4077ed2a0f4b4/image/i5beb86118a6e2b4c/version/1415731626/embalse-de-sobr%C3%B3n-y-desfiladero.jpg"
},
{
  titulo: "El Bosque del Agua",
  acertijo: "Un humedal lleno de aves y pasarelas de madera rodea una laguna tranquila. ¿Qué lugar soy?",
  respuesta: "Parque Ornitológico de Mendixur",
  latitud: 42.9050,
  longitud: -2.6200,
  radioDesbloqueo: 500,
  desbloqueado: false,
  descripcion: "Mendixur es una de las principales zonas de observación de aves del embalse de Ullíbarri.",
  imagen: "https://wastemagazine.es/fotos2/parque-ornitologico-mendixur-1.jpg"
},

{
  titulo: "La Cueva del Silencio",
  acertijo: "Una cueva escondida en un barranco guarda restos prehistóricos. ¿Qué cueva soy?",
  respuesta: "Cueva de Los Husos",
  latitud: 42.6500,
  longitud: -2.6500,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Los Husos es un conjunto de cuevas con restos arqueológicos importantes.",
  imagen: "https://turismo.euskadi.eus/contenidos/blog_post/0000000061_post_turismo/es_61/images/GLG_Fotoportadamegaliticos.jpg"
},
{
  titulo: "El Mirador del Inglares",
  acertijo: "Un pueblo en lo alto de un risco domina un valle estrecho y verde. ¿Qué pueblo soy?",
  respuesta: "Peñacerrada",
  latitud: 42.6500,
  longitud: -2.8000,
  radioDesbloqueo: 2000,
  desbloqueado: false,
  descripcion: "Peñacerrada es una villa medieval fortificada con vistas al valle del Inglares.",
  imagen: "https://turismovasco.com/wp-content/uploads/2022/09/penacerrada-urizaharra-que-ver-y-hacer-1.jpg"
},
{
  titulo: "El Guardián de la Llanada",
  acertijo: "Una torre defensiva medieval se alza en un pequeño pueblo agrícola. ¿Qué torre soy?",
  respuesta: "Torre de los Varona",
  latitud: 42.7600,
  longitud: -2.9000,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "La Torre de los Varona es una de las casas-torre mejor conservadas de Euskadi.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/a/a1/VaronakoDorretxea.jpg"
},

{
  titulo: "El Bosque del Dragón Verde",
  acertijo: "Un hayedo húmedo y profundo cubre las laderas de un monte sagrado. ¿Qué bosque soy?",
  respuesta: "Hayedo de Izki",
  latitud: 42.7000,
  longitud: -2.5000,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El Parque Natural de Izki alberga uno de los mayores robledales de Europa.",
  imagen: ""
},


{
  titulo: "El Guardián de los Viñedos",
  acertijo: "Una torre medieval vigila un mar de viñas en Rioja Alavesa. ¿Qué torre soy?",
  respuesta: "Torre Abacial (Laguardia)",
  latitud: 42.5545,
  longitud: -2.5835,
  radioDesbloqueo: 120,
  desbloqueado: false,
  descripcion: "La Torre Abacial es uno de los símbolos defensivos de Laguardia.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/8/82/Laguardia_-_Torre_Abacial_2.JPG"
},

,
{
  titulo: "El Guardián del Ebro",
  acertijo: "Un pueblo amurallado se asoma a un meandro del Ebro, vigilando la frontera natural. ¿Qué pueblo soy?",
  respuesta: "Labastida",
  latitud: 42.5900,
  longitud: -2.8000,
  radioDesbloqueo: 2000,
  desbloqueado: false,
  descripcion: "Labastida es una villa histórica situada en la entrada a Rioja Alavesa.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Labastida%2C_en_%C3%81lava_%28Espa%C3%B1a%29.jpg"
},

{
  titulo: "La Torre del Recuerdo",
  acertijo: "Una torre solitaria se alza sobre un cerro en un paisaje agrícola. ¿Qué torre soy?",
  respuesta: "Torre de Murga",
  latitud: 43.0800,
  longitud: -2.9000,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "La Torre de Murga es una antigua casa-torre medieval del valle de Ayala.",
  imagen: "https://www.tierrasinsolitas.com/wp-content/uploads/2019/12/torre-de-murga-alava.jpg"
},

{
  titulo: "El Santuario del Roble",
  acertijo: "Un templo escondido entre robles centenarios guarda historias antiguas. ¿Qué santuario soy?",
  respuesta: "Santuario de Nuestra Señora de la Encina",
  latitud: 42.6800,
  longitud: -2.5500,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El santuario de la Encina es un lugar de devoción en el corazón de Álava.",
  imagen: "https://www.senditur.com/multimedia/poi/2116/imagenes/Santuario-de-Nuestra-Senora-de-la-Encina.jpg"
},

{
  titulo: "El Bosque del Silencio Verde",
  acertijo: "Un bosque húmedo y profundo cubre las laderas de un monte sagrado. ¿Qué bosque soy?",
  respuesta: "Bosque de Armentia",
  latitud: 42.8400,
  longitud: -2.7100,
  radioDesbloqueo: 650,
  desbloqueado: false,
  descripcion: "El bosque de Armentia es uno de los pulmones naturales de Vitoria.",
  imagen: "https://turispain.es/wp-content/uploads/2024/11/Bosque-de-Armentia1.jpg"
},

{
  titulo: "El Guardián del Camino Viejo",
  acertijo: "Una torre defensiva medieval protegía antiguas rutas comerciales. ¿Qué torre soy?",
  respuesta: "Torre de Doña Otxanda",
  latitud: 42.8500,
  longitud: -2.6700,
  radioDesbloqueo: 120,
  desbloqueado: false,
  descripcion: "La Torre de Doña Otxanda es uno de los edificios medievales más emblemáticos de Vitoria.",
  imagen: "https://www.nekatur.net/datos/lugar_interes/266/fotos_galeria/Torre-de-Dona-Ochanda042_500.jpg"
},

{
  titulo: "El Bosque del Roble Milenario",
  acertijo: "Un roble gigantesco, más viejo que muchos pueblos, domina un claro del bosque. ¿Qué árbol soy?",
  respuesta: "El Roble de Munain",
  latitud: 42.8300,
  longitud: -2.4500,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El Roble de Munain es uno de los árboles más antiguos de Álava.",
  imagen: "https://www.senditur.com/multimedia/uploads/images/Rutas/Espa%C3%B1a/Euskadi/%C3%81lava/Senderismo/Ruta%20de%20los%20Robles%20Centenarios/Robles.jpg"
},

{
  titulo: "El Guardián del Ebro Profundo",
  acertijo: "Un pueblo colgado sobre un desfiladero domina un río poderoso. ¿Qué pueblo soy?",
  respuesta: "Puentelarrá",
  latitud: 42.7500,
  longitud: -2.9500,
  radioDesbloqueo: 750,
  desbloqueado: false,
  descripcion: "Puentelarrá se sitúa en un punto estratégico sobre el Ebro.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Puentelarr%C3%A1%2C_puente_sobre_el_r%C3%ADo_Ebro.jpg"
},


{
  titulo: "El Mirador del Ebro Escondido",
  acertijo: "Un cerro rocoso se asoma a un tramo del Ebro rodeado de paredes verticales. ¿Qué mirador soy?",
  respuesta: "Mirador de Lalastra",
  latitud: 42.7000,
  longitud: -3.0500,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Lalastra es la entrada al Parque Natural de Valderejo, uno de los rincones más tranquilos de Álava.",
  imagen: "https://www.senditur.com/multimedia/uploads/images/Localidades/Espa%C3%B1a/Euskadi/%C3%81lava/Lalastra/Casa-del-parque-natural-de-Valderejo-en-Lalastra.jpg"
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