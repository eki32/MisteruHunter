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
  titulo: "El Faro del Fin del Mundo",
  acertijo: "Soy faro romano que aún mira al Atlántico. De piedra y leyenda, vigilo una ciudad de cristal. ¿Qué torre milenaria soy?",
  respuesta: "Torre de Hércules",
  latitud: 43.3853,
  longitud: -8.4066,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "La Torre de Hércules, en A Coruña, es el faro romano en funcionamiento más antiguo del mundo.",
  imagen: "https://galiciaturismorural.es/views/layouts/plantilla/img/recursos/1/torre-de-hercules-NXG1sO.jpg"
},
{
  titulo: "La Isla de los Pájaros Reales",
  acertijo: "Entre aguas turquesas y arena blanca, los pavos reales pasean libres. Solo una pequeña aldea me habita. ¿Qué isla mediterránea soy?",
  respuesta: "Isla de Tabarca",
  latitud: 38.1650,
  longitud: -0.4730,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "La Isla de Tabarca, frente a la costa de Alicante, es una pequeña joya mediterránea llena de historia.",
  imagen: "https://www.seatravel.es/wp-content/uploads/2024/07/habilitaciones-anejas-per-2.jpg"
},
{
  titulo: "El Castillo del Mar de Nubes",
  acertijo: "Corono una roca sobre el Mediterráneo. Fui refugio de papas y escenario de cine. ¿Qué castillo corono en la costa castellonense?",
  respuesta: "Castillo de Peñíscola",
  latitud: 40.3590,
  longitud: 0.4020,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Castillo de Peñíscola se alza sobre un peñón que se adentra en el mar, dominando la costa.",
  imagen: "https://www.tamarindos.net/wp-content/uploads/2019/03/vistas-aereas-castillo.jpg"
},
{
  titulo: "El Oasis de las Palmeras",
  acertijo: "Más de doscientas mil palmeras me dan sombra. Parezco un oasis africano, pero estoy en el Levante español. ¿Qué palmeral soy?",
  respuesta: "Palmeral de Elche",
  latitud: 38.2699,
  longitud: -0.6983,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "El Palmeral de Elche es el mayor palmeral de Europa y Patrimonio de la Humanidad.",
  imagen: "https://www.visitelche.com/wp-content/uploads/2016/08/Elche-Parque-Municipal-22-870x480.jpg"
},
{
  titulo: "La Fortaleza del Dragón",
  acertijo: "Sobre una colina frente al mar, mis murallas vigilan una ciudad blanca. Desde mi torre se ve toda la bahía. ¿Qué castillo alicantino soy?",
  respuesta: "Castillo de Santa Bárbara",
  latitud: 38.3452,
  longitud: -0.4730,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Castillo de Santa Bárbara domina la ciudad de Alicante desde el monte Benacantil.",
  imagen: "https://www.montiboli.com/assets/uploads/hoteles/montiboli/gallery/blog/2021/99-castillo-santa-barbara/cara-del-moro-santa-barbara.jpg"
},
{
  titulo: "El Puente del Diablo",
  acertijo: "Dicen que el diablo me construyó en una noche. Cruzo un río entre paredes de roca en Cataluña. ¿Qué puente románico soy?",
  respuesta: "Puente del Diablo de Martorell",
  latitud: 41.4740,
  longitud: 1.9300,
  radioDesbloqueo: 120,
  desbloqueado: false,
  descripcion: "El Puente del Diablo de Martorell es un puente medieval reconstruido sobre cimientos romanos.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Puente_del_Diablo%2C_Martorell%2C_Catalonia%2C_Spain._Pic_01.jpg"
},
{
  titulo: "La Montaña de las Agujas",
  acertijo: "Mis rocas parecen dedos de gigantes apuntando al cielo. Un monasterio se esconde en mi corazón. ¿Qué montaña sagrada catalana soy?",
  respuesta: "Montserrat",
  latitud: 41.5956,
  longitud: 1.8374,
  radioDesbloqueo: 400,
  desbloqueado: false,
  descripcion: "Montserrat es una montaña singular de Cataluña, famosa por su monasterio benedictino y sus formas rocosas.",
  imagen: "https://www.civitatis.com/f/espana/barcelona/excursion-montserrat-589x392.jpg"
},
{
  titulo: "El Jardín de los Bancos Serpenteantes",
  acertijo: "Soy un parque donde los dragones de cerámica duermen y los bancos ondulan como olas. ¿Qué obra de Gaudí soy?",
  respuesta: "Parc Güell",
  latitud: 41.4145,
  longitud: 2.1527,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El Parc Güell es un parque modernista de Barcelona diseñado por Antoni Gaudí, lleno de mosaicos de colores.",
  imagen: "https://www.camibarcelona.com/assets/cache/uploads/cami-b-and-b/entorn/570x373/parc-guell-gaudi-cami-bed-breakfast-hotel-barcelona.webp?from=jpg"
},
{
  titulo: "El Templo del Dragón de Piedra",
  acertijo: "En el corazón del barrio gótico, mis gárgolas vigilan las calles. Soy catedral sin nombre de mar. ¿Qué catedral barcelonesa soy?",
  respuesta: "Catedral de Barcelona",
  latitud: 41.3840,
  longitud: 2.1760,
  radioDesbloqueo: 120,
  desbloqueado: false,
  descripcion: "La Catedral de Barcelona, dedicada a la Santa Cruz y Santa Eulalia, domina el barrio gótico.",
  imagen: "https://www.urbipedia.org/w/images/6/60/Catedral_de_Barcelona_-_50270508626.jpg"
},
{
  titulo: "La Ciudad Rosa del Amor Mudéjar",
  acertijo: "Mis torres de ladrillo cuentan historias de amantes y estrellas. Soy capital de provincia y joya mudéjar. ¿Qué ciudad aragonesa soy?",
  respuesta: "Teruel",
  latitud: 40.3456,
  longitud: -1.1065,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Teruel es famosa por su arte mudéjar y la leyenda de los Amantes.",
  imagen: "https://content-viajes.nationalgeographic.com.es/medio/2018/02/27/teruel__1280x720.jpg"
},
{
  titulo: "El Castillo del Vino",
  acertijo: "Mis murallas blancas vigilan un río de vino. Desde mi torre se ven viñedos infinitos en la meseta. ¿Qué castillo castellano soy?",
  respuesta: "Castillo de Peñafiel",
  latitud: 41.6000,
  longitud: -4.1210,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Castillo de Peñafiel, en Valladolid, alberga el Museo Provincial del Vino.",
  imagen: "https://www.civitatis.com/f/espana/valladolid/guia/penafiel-m.jpg"
},
{
  titulo: "El Lago de la Ciudad Sumergida",
  acertijo: "Dicen que bajo mis aguas duerme una ciudad encantada. Soy el mayor lago glaciar de España. ¿Qué lago zamorano soy?",
  respuesta: "Lago de Sanabria",
  latitud: 42.1167,
  longitud: -6.7333,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "El Lago de Sanabria es un lago de origen glaciar rodeado de montañas y leyendas.",
  imagen: "https://www.turismosanabria.es/my_images/lago/lago_horizonte.jpg"
},
{
  titulo: "La Muralla de las Piedras Gigantes",
  acertijo: "Mis murallas de granito abrazan una ciudad de santos y caballeros. Soy ciudad de Santa Teresa. ¿Qué ciudad amurallada soy?",
  respuesta: "Ávila",
  latitud: 40.6565,
  longitud: -4.6818,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Ávila conserva una de las murallas medievales mejor preservadas de Europa.",
  imagen: "https://ocioavila.com/public/large/busima-484-muralla-de-avila-ocioavila.NZF.jpg"
},
{
  titulo: "El Castillo de la Arena Roja",
  acertijo: "Mis muros de ladrillo rojizo se alzan sobre la llanura de Castilla. Parezco un castillo de cuento en medio de pinares. ¿Qué castillo soy?",
  respuesta: "Castillo de Coca",
  latitud: 41.2170,
  longitud: -4.5210,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Castillo de Coca, en Segovia, es un magnífico ejemplo de arquitectura gótico-mudéjar.",
  imagen: "https://saposyprincesas.elmundo.es/assets/2016/09/cabecera-castillo-de-coca.jpg"
},
{
  titulo: "El Puente de las Mil Piedras",
  acertijo: "Cruzo el Duero con arcos de piedra que han visto siglos de historia. A mi lado se alza una ciudad de iglesias románicas. ¿Qué puente zamorano soy?",
  respuesta: "Puente de Piedra de Zamora",
  latitud: 41.5033,
  longitud: -5.7444,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El Puente de Piedra de Zamora une las dos orillas del Duero desde la Edad Media.",
  imagen: "https://www.romanicozamora.es/recursos/editor/Puente_de_Piedra_01.JPG"
},
{
  titulo: "El Mirador del Cantábrico",
  acertijo: "Desde mi cima se ve el mar y las montañas. Soy un pico emblemático de los Picos de Europa, pero no el más alto. ¿Qué cumbre asturiana soy?",
  respuesta: "Naranjo de Bulnes",
  latitud: 43.1870,
  longitud: -4.8290,
  radioDesbloqueo: 400,
  desbloqueado: false,
  descripcion: "El Naranjo de Bulnes, o Picu Urriellu, es una de las montañas más icónicas de España.",
  imagen: "https://jesusibarzguiadeescalada.com/wp-content/uploads/picu-min.jpg"
},
{
  titulo: "El Bosque Encantado del Norte",
  acertijo: "Soy un bosque atlántico donde la niebla se enreda en los robles. Un río serpentea entre musgos y helechos. ¿Qué bosque gallego soy?",
  respuesta: "Fragas do Eume",
  latitud: 43.4167,
  longitud: -8.0833,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Las Fragas do Eume son uno de los bosques atlánticos mejor conservados de Europa.",
  imagen: "https://www.elserenoindiscreto.com/wp-content/uploads/2023/07/Fragas-do-Eume-01.jpg"
},
{
  titulo: "El Castro del Océano",
  acertijo: "Soy un poblado celta colgado sobre el Atlántico. Mis piedras miran al mar desde hace siglos. ¿Qué castro gallego soy?",
  respuesta: "Castro de Baroña",
  latitud: 42.6720,
  longitud: -9.0270,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Castro de Baroña es un asentamiento celta situado en una pequeña península rocosa.",
  imagen: "https://www.guiategalicia.com/wp-content/uploads/2016/03/IMG_7350-900x480.jpg"
},
{
  titulo: "El Santuario del Acantilado",
  acertijo: "Si no vas de vivo, irás de muerto, dicen de mí. Me asomo a un acantilado donde rompen las olas. ¿Qué santuario gallego soy?",
  respuesta: "San Andrés de Teixido",
  latitud: 43.7080,
  longitud: -7.9900,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "El Santuario de San Andrés de Teixido es lugar de peregrinación y leyendas en la costa gallega.",
  imagen: "https://mondonedoferrol.org/parroquias/wp-content/uploads/2023/02/Santo-Andre.jpg"
},
{
  titulo: "La Isla de los Dioses del Mar",
  acertijo: "Dicen que mis playas son las mejores del mundo. Formo parte de un parque nacional marino. ¿Qué islas gallegas soy?",
  respuesta: "Islas Cíes",
  latitud: 42.2200,
  longitud: -8.9000,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Las Islas Cíes, en la ría de Vigo, son un paraíso de arena blanca y aguas turquesas.",
  imagen: "https://www.costacruceros.es/content/dam/costa/costa-magazine/articles-magazine/islands/islas-cies-donde-ir/islas-cies_m.jpg.image.694.390.low.jpg"
},
{
  titulo: "El Puente del Agua Caliente",
  acertijo: "Cruzo un río de aguas termales en una ciudad de piedra. Mis arcos han visto pasar romanos y peregrinos. ¿Qué puente ourensano soy?",
  respuesta: "Ponte Vella de Ourense",
  latitud: 42.3360,
  longitud: -7.8640,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "La Ponte Vella de Ourense es un puente histórico sobre el río Miño.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/6/67/Roman_bridge%2C_Ourense_%28Spain%29.jpg"
},
{
  titulo: "El Castillo de las Cigüeñas",
  acertijo: "Mis torres se llenan de nidos blancos. Desde mis murallas se ve una plaza mayor de piedra dorada. ¿Qué castillo extremeño soy?",
  respuesta: "Castillo de Trujillo",
  latitud: 39.4570,
  longitud: -5.8820,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Castillo de Trujillo domina la ciudad desde lo alto de una colina.",
  imagen: "https://saposyprincesas.elmundo.es/assets/2022/01/Castillo-de-Trujillo-en-Caceres.jpg"
},
{
  titulo: "El Monasterio del Emperador",
  acertijo: "Un emperador cansado de guerras vino a morir entre mis muros. Estoy junto a un lago en la Vera. ¿Qué monasterio soy?",
  respuesta: "Monasterio de Yuste",
  latitud: 40.0920,
  longitud: -5.7470,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Monasterio de Yuste fue la residencia final del emperador Carlos V.",
  imagen: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_KYoIAHC_SpIlJNdb7f3Xnr5ItHM9ShvJuoookBFaHXjKh0JKMigRryV5qv_PJMDZjKsIZl8_UzHF-n0-ahQDJj6ebDEYA-nOgMFyZEl2Zv-N7nR-19uKpDO-Wh8V1H71JeOtmcpEfMJ7/s1600/Monasterio-de-Yuste-vista-general.jpg"
},
{
  titulo: "El Puente del Imperio",
  acertijo: "Cruzo un río profundo con arcos romanos perfectos. Fui clave para unir Hispania. ¿Qué puente extremeño soy?",
  respuesta: "Puente de Alcántara",
  latitud: 39.7220,
  longitud: -6.8920,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Puente de Alcántara es uno de los puentes romanos mejor conservados del mundo.",
  imagen: "https://www.saboraextremadura.es/wp-content/uploads/2019/07/puente-de-alcantara.jpg"
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
    console.log(`📍 ${misterios.length} misterios distribuidos por toda la península`);
    console.log('\n📋 Resumen de ubicaciones:');
    console.log('   - Andalucía: Granada, Sevilla, Córdoba, Cabo de Gata');
    console.log('   - Cataluña: Barcelona, Valencia');
    console.log('   - Madrid: Parque del Retiro');
    console.log('   - Castilla y León: Segovia, Salamanca, León');
    console.log('   - Galicia: Santiago, Lugo, Playa de las Catedrales');
    console.log('   - País Vasco: Bilbao, San Sebastián');
    console.log('   - Aragón: Zaragoza, Ordesa');
    console.log('   - Extremadura: Mérida');
    console.log('   - Castilla-La Mancha: Toledo, Cuenca');
    console.log('   - Canarias: Tenerife');
    console.log('   - Asturias/Cantabria: Picos de Europa');
    
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