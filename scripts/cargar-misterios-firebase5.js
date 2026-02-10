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
  titulo: "El Mirador del Fin del Mundo",
  acertijo: "Dicen que aquí termina la tierra y empieza el océano. Un faro vigila acantilados infinitos. ¿Qué cabo gallego soy?",
  respuesta: "Cabo Fisterra",
  latitud: 42.9079,
  longitud: -9.2634,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El Cabo Fisterra es uno de los puntos más emblemáticos de Galicia, considerado el fin del mundo en la antigüedad.",
  imagen: "https://www.paxinasgalegas.es/fiestas/cabo-y-faro-de-fisterra-fisterra_img5411n1t0.jpg"
},
{
  titulo: "La Catedral del Mar Cantábrico",
  acertijo: "Mis arcos góticos se asoman al mar. Soy símbolo de una villa marinera asturiana. ¿Qué basílica soy?",
  respuesta: "Basílica de Santa María del Conceyu (Llanes)",
  latitud: 43.4202,
  longitud: -4.7540,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "La basílica de Llanes es un templo gótico que domina el casco histórico de la villa.",
  imagen: "https://iglesiadeasturias.org/wp-content/uploads/2017/12/Llanes.Basi%CC%81lica-de-S%C2%AAM%C2%AA-del-Concejo.1-3.jpg"
},
{
  titulo: "El Mirador de los Bufones",
  acertijo: "El mar ruge bajo mis grietas y lanza chorros de agua hacia el cielo. ¿Qué fenómeno natural asturiano soy?",
  respuesta: "Bufones de Pría",
  latitud: 43.4310,
  longitud: -4.9180,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Los Bufones de Pría son formaciones kársticas donde el mar crea espectaculares chorros de agua.",
  imagen: "https://asturias.com/asturiasbasica/imagenes/ruta-guiada-bufones-de-llanes-1.jpg"
},
{
  titulo: "El Castillo del Dragón del Norte",
  acertijo: "Mis murallas se alzan sobre un promontorio rocoso frente al Cantábrico. ¿Qué castillo cántabro soy?",
  respuesta: "Castillo del Rey (San Vicente de la Barquera)",
  latitud: 43.3850,
  longitud: -4.3990,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El Castillo del Rey domina la entrada a San Vicente de la Barquera.",
  imagen: "https://aytosanvicentedelabarquera.es/wp-content/uploads/2019/06/castillo-exterior-norte.jpg"
},
{
  titulo: "El Monasterio del Silencio",
  acertijo: "Entre montañas cántabras, mis muros guardan siglos de oración. ¿Qué monasterio soy?",
  respuesta: "Monasterio de Santo Toribio de Liébana",
  latitud: 43.1510,
  longitud: -4.6340,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Monasterio de Santo Toribio es un importante centro de peregrinación en Liébana.",
  imagen: "https://www.spain.info/export/sites/segtur/.content/imagenes/cabeceras-grandes/cantabria/monasterio_santo_domingo_liebana_cantabria_s_1419877727.jpg"
},
{
  titulo: "El Castillo del Mar de Plata",
  acertijo: "Mis murallas vigilan una ría gallega llena de barcos. ¿Qué castillo soy?",
  respuesta: "Castillo de San Felipe (Ferrol)",
  latitud: 43.4880,
  longitud: -8.3090,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Castillo de San Felipe protegía la entrada a la ría de Ferrol.",
  imagen: "https://vivecamino.com/img/poi/av/castillo-san-felipe_3680.jpg"
},
{
  titulo: "El Mirador de los Dioses",
  acertijo: "Desde mis acantilados se ve el Atlántico infinito. Soy uno de los paisajes más salvajes de Galicia. ¿Qué cabo soy?",
  respuesta: "Cabo Ortegal",
  latitud: 43.7620,
  longitud: -7.8660,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El Cabo Ortegal es uno de los puntos más septentrionales de la península ibérica.",
  imagen: "https://s2.elespanol.com/2023/04/06/quincemil/cultura/historias-de-la-historia/754185062_244693966_1024x576.jpg"
},
{
  titulo: "La Fortaleza del Miño",
  acertijo: "Mis murallas abrazan un casco histórico lleno de historia. Soy ciudad amurallada junto al Miño. ¿Qué ciudad soy?",
  respuesta: "Tui",
  latitud: 42.0470,
  longitud: -8.6440,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Tui es una ciudad histórica gallega con una catedral fortificada.",
  imagen: "https://revistatierra.com/wp-content/uploads/2024/01/DJI_0009-1024x576.jpg"
},
{
  titulo: "El Castillo del Río Tormes",
  acertijo: "Mis torres vigilan un puente medieval y un río famoso. ¿Qué castillo salmantino soy?",
  respuesta: "Castillo de Alba de Tormes",
  latitud: 40.8250,
  longitud: -5.5140,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El Castillo de Alba de Tormes domina el valle del Tormes.",
  imagen: "https://www.hola.com/horizon/43/7c3f6f83a8f6-01-alba-de-tormessalamanca-castillo-de-los-duques-de-alba-andres-campos.jpg"
},
{
  titulo: "El Mirador del Jerte",
  acertijo: "Cada primavera me cubro de blanco. Soy valle, soy flor, soy fiesta. ¿Qué valle soy?",
  respuesta: "Valle del Jerte",
  latitud: 40.2000,
  longitud: -5.8000,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El Valle del Jerte es famoso por la floración de los cerezos.",
  imagen: "https://live.staticflickr.com/65535/52742704986_9bbe868204_h.jpg"
},
{
  titulo: "La Fortaleza del Guadiana",
  acertijo: "Mis murallas vigilan la frontera con Portugal. Soy castillo y soy historia. ¿Qué fortaleza extremeña soy?",
  respuesta: "Castillo de Olivenza",
  latitud: 38.6820,
  longitud: -7.1000,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Castillo de Olivenza es una fortaleza medieval en la frontera luso-española.",
  imagen: "https://content-viajes.nationalgeographic.com.es/medio/2025/01/10/castillo-de-olivenza_e30e34aa_250110105742_1200x814.webp"
},
{
  titulo: "El Castillo del Dragón de la Mancha",
  acertijo: "Mis murallas se alzan sobre un cerro solitario. Inspiré historias de caballeros. ¿Qué castillo soy?",
  respuesta: "Castillo de Calatrava la Nueva",
  latitud: 38.7080,
  longitud: -3.9440,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Calatrava la Nueva es una impresionante fortaleza medieval en Ciudad Real.",
  imagen: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-_zYn3cQgr0YFQMNrk-7OSBinXedttpdQS6jpDsK23S7zbUJfOQWuM9X5SFh7KbvPU2ALWWN4PRiS2VAjvGPQtzfyKGvBEjme5HrHD0PfyezGkG_q1FpdZgSkuV80yFAXI_HCLxqFr1oB/s1600/calatrava+la+nueva+02.jpg"
},
{
  titulo: "El Mirador del Júcar",
  acertijo: "Mis casas cuelgan sobre un río verde. No soy Cuenca, pero también vivo al borde del abismo. ¿Qué pueblo soy?",
  respuesta: "Alarcón",
  latitud: 39.5500,
  longitud: -2.0830,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "Alarcón es un pueblo medieval rodeado por un meandro del río Júcar.",
  imagen: "https://www.airenomada.com/wp-content/uploads/2020/05/DSCF8152.jpg"
},
{
  titulo: "El Castillo del Ebro",
  acertijo: "Mis murallas vigilan un meandro del Ebro. Soy símbolo de La Rioja. ¿Qué castillo soy?",
  respuesta: "Castillo de San Vicente de la Sonsierra",
  latitud: 42.5620,
  longitud: -2.7560,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El castillo domina los viñedos de la Sonsierra riojana.",
  imagen: "https://content.gnoss.ws/lrt/imagenes/Documentos/imgsem/09/09ae/09aee4c2-9647-4b41-94e0-c44465d257c6/2e62e257-ef91-393b-227c-59e3ddc26dcf.jpg"
},
{
  titulo: "El Mirador de los Viñedos",
  acertijo: "Desde mis balcones se ven mares de viñas. Soy villa medieval y cuna del vino. ¿Qué pueblo riojano soy?",
  respuesta: "Laguardia",
  latitud: 42.5540,
  longitud: -2.5840,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "Laguardia es una villa amurallada rodeada de viñedos en Rioja Alavesa.",
  imagen: "https://www.bodegasvaldelana.com/wp-content/uploads/2020/01/1b-Laguardia-Plaza-del-ayuntamiento-portada-web1.jpg"
},
{
  titulo: "El Castillo del Mar Mediterráneo",
  acertijo: "Mis murallas se asoman al mar y protegieron una villa pesquera. ¿Qué castillo catalán soy?",
  respuesta: "Castillo de Tossa de Mar",
  latitud: 41.7200,
  longitud: 2.9330,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El castillo de Tossa de Mar es uno de los iconos de la Costa Brava.",
  imagen: ""
},
{
  titulo: "El Monasterio del Silencio Blanco",
  acertijo: "Mis muros blancos se reflejan en un lago pirenaico. ¿Qué monasterio soy?",
  respuesta: "Monasterio de San Juan de la Peña (Nuevo)",
  latitud: 42.5090,
  longitud: -0.6880,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El monasterio nuevo de San Juan de la Peña se encuentra en un entorno natural espectacular.",
  imagen: "https://www.infobae.com/new-resizer/8DXGh0JD3aSQfo8OmhOlYsVaQO4=/arc-anglerfish-arc2-prod-infobae/public/2PFONBLUVVHC3I7D3OSM5JCWA4.jpg"
},
{
  titulo: "El Castillo del Mediterráneo Valenciano",
  acertijo: "Mis murallas vigilan un pueblo blanco junto al mar. ¿Qué castillo soy?",
  respuesta: "Castillo de Peñíscola",
  latitud: 40.3590,
  longitud: 0.4020,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El castillo templario de Peñíscola domina el Mediterráneo desde un peñón.",
  imagen: "https://www.castellonvirtual.es/wp-content/uploads/2018/06/castillo-de-peniscola.jpg"
},
{
  titulo: "El Mirador del Turia",
  acertijo: "Mis torres gemelas guardan la entrada a una ciudad de seda y naranjos. ¿Qué torres soy?",
  respuesta: "Torres de Serranos",
  latitud: 39.4780,
  longitud: -0.3760,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "Las Torres de Serranos son una de las antiguas puertas de la muralla medieval de Valencia.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/7/72/Puerta_de_los_Serranos%2C_Valencia%2C_Espa%C3%B1a%2C_2014-06-30%2C_DD_86.JPG"
},
{
  titulo: "El Castillo del Mediterráneo Alicantino",
  acertijo: "Desde mi cima se ve toda la bahía. Soy símbolo de una ciudad blanca. ¿Qué castillo soy?",
  respuesta: "Castillo de Santa Bárbara",
  latitud: 38.3452,
  longitud: -0.4730,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Castillo de Santa Bárbara domina Alicante desde el monte Benacantil.",
  imagen: "https://alicanteturismo.com/wp-content/uploads/2024/06/castillo-de-santa-barbara-2016-Alicante-ERN_6938-9-copia.jpg"
},
{
  titulo: "El Mirador del Guadiana",
  acertijo: "Mis murallas vigilan un río que marca frontera. Soy castillo y soy historia. ¿Qué fortaleza soy?",
  respuesta: "Castillo de Alburquerque",
  latitud: 39.2200,
  longitud: -7.0030,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Castillo de Alburquerque es una fortaleza medieval en la frontera extremeña.",
  imagen: "https://www.monumentalnet.org/datos/badajoz/alburquerque/alburquerque/castillo_de_alburquerque/BA-CAS-027-0010001.jpg"
},
{
  titulo: "El Castillo del Duero",
  acertijo: "Mis murallas se alzan sobre un meandro del Duero. Soy símbolo de Zamora. ¿Qué castillo soy?",
  respuesta: "Castillo de Zamora",
  latitud: 41.5030,
  longitud: -5.7440,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El Castillo de Zamora domina el casco histórico y el río Duero.",
  imagen: "https://www.romanicozamora.es/recursos/editor/castillo31.jpg"
},
{
  titulo: "El Mirador del Sil",
  acertijo: "Mis cañones profundos guardan viñedos imposibles. ¿Qué paraje gallego soy?",
  respuesta: "Cañones del Sil",
  latitud: 42.4300,
  longitud: -7.6000,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Los Cañones del Sil forman uno de los paisajes más espectaculares de Galicia.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/3/35/Ca%C3%B1on_del_R%C3%ADo_Sil_desde_el_mirador_de_Vilouxe.jpg"
},
{
  titulo: "El Castillo del Mediterráneo Murciano",
  acertijo: "Mis murallas vigilan una ciudad de huerta y mar. ¿Qué castillo soy?",
  respuesta: "Castillo de Lorca",
  latitud: 37.6710,
  longitud: -1.7010,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Castillo de Lorca es una fortaleza medieval conocida como la Fortaleza del Sol.",
  imagen: "https://image.arrivalguides.com/x/15/ce342f1855fc76e4b23947b2fc50166d.jpg"
}


,

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