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
  titulo: "El Mirador del Abra",
  acertijo: "Un monte costero ofrece vistas al mar, a Getxo y a la desembocadura de la ría. ¿Qué monte soy?",
  respuesta: "Monte Serantes",
  latitud: 43.3450,
  longitud: -3.0650,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El Serantes es uno de los mejores miradores naturales del Gran Bilbao.",
  imagen: "https://farm1.staticflickr.com/597/21806294612_8b160a94e2_c.jpg"
},
{
  titulo: "La Playa del Faro",
  acertijo: "Una playa amplia y dorada se extiende bajo un faro blanco. ¿Qué playa soy?",
  respuesta: "Playa de Ereaga",
  latitud: 43.3410,
  longitud: -3.0120,
  radioDesbloqueo: 350,
  desbloqueado: false,
  descripcion: "Ereaga es una de las playas más emblemáticas de Getxo.",
  imagen: "https://turismovasco.com/wp-content/uploads/2018/03/Getxo.jpg"
},
{
  titulo: "El Castillo del Puerto",
  acertijo: "Una fortaleza vigila la entrada al Abra desde un promontorio rocoso. ¿Qué castillo soy?",
  respuesta: "Castillo de la Galea",
  latitud: 43.3750,
  longitud: -3.0330,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Castillo de la Galea es una antigua batería defensiva en los acantilados de Getxo.",
  imagen: "https://ilutravel.com/wp-content/uploads/2017/05/Castillo-del-Pr%C3%ADncipe-o-Fuerte-Galea-superior.jpg"
},
{
  titulo: "El Mirador del Acantilado",
  acertijo: "Un sendero recorre acantilados espectaculares junto al mar Cantábrico. ¿Qué ruta soy?",
  respuesta: "Acantilados de La Galea",
  latitud: 43.3800,
  longitud: -3.0400,
  radioDesbloqueo: 450,
  desbloqueado: false,
  descripcion: "Los acantilados de La Galea son uno de los paisajes costeros más impresionantes de Bizkaia.",
  imagen: "https://yendoporlavida.com/wp-content/uploads/2024/06/Ruta-de-Sopela-a-Getxo-por-el-Flysch-de-Bizkaia.jpg"
},
{
  titulo: "La Playa Salvaje",
  acertijo: "Una playa abierta al mar, rodeada de dunas y acantilados, famosa por su oleaje. ¿Qué playa soy?",
  respuesta: "Playa de Barinatxe (La Salvaje)",
  latitud: 43.3790,
  longitud: -2.9860,
  radioDesbloqueo: 400,
  desbloqueado: false,
  descripcion: "Barinatxe es una playa natural entre Sopela y Getxo, muy popular entre surfistas.",
  imagen: "https://turismo.euskadi.eus/contenidos/g_naturaleza/0000003019_g1_rec_turismo/es_3019/images/FP_playasG_barinatxe1.jpg"
},
{
  titulo: "El Mirador del Flysch Vasco",
  acertijo: "Un acantilado muestra capas de roca inclinadas que cuentan millones de años. ¿Qué lugar soy?",
  respuesta: "Flysch de Barrika",
  latitud: 43.4000,
  longitud: -2.9500,
  radioDesbloqueo: 450,
  desbloqueado: false,
  descripcion: "El flysch de Barrika es uno de los paisajes geológicos más llamativos de la costa vasca.",
  imagen: "https://yendoporlavida.com/wp-content/uploads/2023/04/Playa-de-Muriola-en-el-Flysch-de-Barrika.jpg"
},

{
  titulo: "La Playa del Puerto",
  acertijo: "Una playa tranquila se esconde junto a un puerto pesquero histórico. ¿Qué playa soy?",
  respuesta: "Playa de Plentzia",
  latitud: 43.4050,
  longitud: -2.9500,
  radioDesbloqueo: 500,
  desbloqueado: false,
  descripcion: "La playa de Plentzia es un arenal protegido en la desembocadura de la ría.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/0/00/Playa_de_Plentzia.jpg"
},

{
  titulo: "El Bosque del Pagasarri",
  acertijo: "Un monte muy querido por los bilbaínos, coronado por un refugio. ¿Qué monte soy?",
  respuesta: "Monte Pagasarri",
  latitud: 43.2400,
  longitud: -2.9200,
  radioDesbloqueo: 500,
  desbloqueado: false,
  descripcion: "El Pagasarri es uno de los montes más populares para hacer senderismo desde Bilbao.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Pagasarri-tontorra-gurutzea-cumbre-cruz.jpg"
},
{
  titulo: "El Mirador del Nervión",
  acertijo: "Un monte con antenas domina Bilbao y su ría desde lo alto. ¿Qué monte soy?",
  respuesta: "Monte Artxanda",
  latitud: 43.2730,
  longitud: -2.9340,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Artxanda es uno de los mejores miradores de Bilbao, accesible por funicular.",
  imagen: "https://www.bilbaovisitavirtual.eus/wp-content/uploads/2020/02/funicular-artxanda-bilbao-3.jpg"
},
{
  titulo: "La Playa del Castillo",
  acertijo: "Un arenal dorado se extiende bajo una antigua fortificación costera. ¿Qué playa soy?",
  respuesta: "Playa de Gorliz",
  latitud: 43.4130,
  longitud: -2.9300,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "La playa de Gorliz es una de las más amplias y familiares de Bizkaia.",
  imagen: "https://turismo.euskadi.eus/contenidos/g_naturaleza/0000002998_g1_rec_turismo/es_2998/images/FP_golizplaya.jpg"
},
{
  titulo: "El Faro del Cantábrico",
  acertijo: "Un faro blanco se alza sobre un acantilado y vigila la entrada a la bahía. ¿Qué faro soy?",
  respuesta: "Faro de Gorliz",
  latitud: 43.4170,
  longitud: -2.9300,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El faro de Gorliz es uno de los más altos de la costa vasca.",
  imagen: "https://thumbs.dreamstime.com/b/faro-gorliz-cabo-villano-golfo-de-biscay-espa%C3%B1a-punto-referencia-en-espa%C3%B1ol-281502991.jpg"
},
{
  titulo: "El Mirador del Urdaibai",
  acertijo: "Un monte con una ermita ofrece vistas a un estuario lleno de vida. ¿Qué monte soy?",
  respuesta: "Monte San Pedro de Atxarre",
  latitud: 43.3800,
  longitud: -2.6500,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Atxarre es uno de los mejores miradores de la Reserva de Urdaibai.",
  imagen: "https://www.urdailife.com/wp-content/uploads/2018/10/Puente-Urdaibai-Familia-Vistas-San-Pedro-Atxarre.jpg"
},
{
  titulo: "La Playa del Dragón",
  acertijo: "Una playa salvaje rodeada de acantilados y dunas, famosa por su forma curva. ¿Qué playa soy?",
  respuesta: "Playa de Laga",
  latitud: 43.4200,
  longitud: -2.6500,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Laga es una de las playas más espectaculares de Bizkaia, junto al cabo Ogoño.",
  imagen: "https://www.hola.com/horizon/landscape/5215c31f7a56-alm-2g9b9ky-t.jpg"
},
{
  titulo: "El Mirador del Acantilado Negro",
  acertijo: "Un cabo rocoso se alza sobre el mar con paredes verticales oscuras. ¿Qué cabo soy?",
  respuesta: "Cabo Ogoño",
  latitud: 43.4300,
  longitud: -2.6500,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Ogoño es un impresionante acantilado que domina la playa de Laga.",
  imagen: "https://www.barcelo.com/guia-turismo/wp-content/uploads/2021/01/ogono.jpg"
},

{
  titulo: "El Mirador del Dragón de Piedra",
  acertijo: "Un peñón aislado en el mar parece la espalda de un dragón. ¿Qué islote soy?",
  respuesta: "Islote de Aketxe",
  latitud: 43.4450,
  longitud: -2.7800,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Aketxe es un islote protegido frente a la costa de Bermeo.",
  imagen: "https://www.eusko-ikaskuntza.eus/Imgs3digitala/12447.jpg"
},
{
  titulo: "El Puerto del Norte",
  acertijo: "Un puerto pesquero lleno de casas de colores se abre al Cantábrico. ¿Qué pueblo soy?",
  respuesta: "Bermeo",
  latitud: 43.4200,
  longitud: -2.7200,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "Bermeo es uno de los puertos pesqueros más importantes de Bizkaia.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/4/47/Bermeo%27s_old_port.JPG"
},
{
  titulo: "El Mirador del Faro Rojo",
  acertijo: "Un faro rojo marca la entrada a un puerto pesquero histórico. ¿Qué faro soy?",
  respuesta: "Faro de Matxitxako",
  latitud: 43.4470,
  longitud: -2.7660,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Matxitxako es uno de los cabos más emblemáticos de la costa vasca.",
  imagen: "https://media.traveler.es/photos/65001fd4c09a56d57e063db2/master/w_1600%2Cc_limit/3%2520faro.jpg"
},
{
  titulo: "La Playa del Flysch",
  acertijo: "Una playa estrecha y rocosa muestra capas de roca inclinadas hacia el mar. ¿Qué playa soy?",
  respuesta: "Playa de Bakio (zona este)",
  latitud: 43.4300,
  longitud: -2.8100,
  radioDesbloqueo: 350,
  desbloqueado: false,
  descripcion: "Bakio es una playa amplia con zonas de flysch en sus extremos.",
  imagen: "https://turismo.euskadi.eus/contenidos/g_naturaleza/0000003003_g1_rec_turismo/es_3003/images/FP_Playa_Bakio.jpg"
},

{
  titulo: "La Cueva del Tiempo",
  acertijo: "Una cueva profunda guarda restos prehistóricos y leyendas antiguas. ¿Qué cueva soy?",
  respuesta: "Cueva de Baltzola",
  latitud: 43.2000,
  longitud: -2.8500,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Baltzola es una cueva famosa por su tamaño y por su importancia arqueológica.",
  imagen: "https://turismovasco.com/wp-content/uploads/2017/01/Cueva-de-Baltzola-desde-el-interior.jpg"
},

{
  titulo: "La Cueva del Eco",
  acertijo: "Una cueva profunda y húmeda devuelve cada sonido multiplicado. ¿Qué cueva soy?",
  respuesta: "Cueva de Supelegor",
  latitud: 43.1500,
  longitud: -2.7000,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Supelegor es una cueva legendaria en el macizo de Aramotz.",
  imagen: "https://s0.wklcdn.com/image_76/2295025/123390752/79000920.400x300.jpg"
},

{
  titulo: "La Ermita del Cazador",
  acertijo: "Una pequeña ermita se alza en un collado entre montes, rodeada de bosques. ¿Qué ermita soy?",
  respuesta: "Ermita de San Justo",
  latitud: 43.2300,
  longitud: -2.8500,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "San Justo es una ermita situada en un entorno natural privilegiado.",
  imagen: "https://catalogomonumentaldiocesisbilbao.com/wp-content/uploads/1-Justo-Pastor-Zeberio-1.jpg"
},
{
  titulo: "El Mirador del Nervión Verde",
  acertijo: "Un monte con vistas a un valle industrial y a la vez rural. ¿Qué monte soy?",
  respuesta: "Monte Ganekogorta",
  latitud: 43.2300,
  longitud: -2.9300,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Ganekogorta es una de las cumbres más visibles desde Bilbao.",
  imagen: "https://s0.wklcdn.com/image_213/6411651/76113638/49717065.400x300.jpg"
},
{
  titulo: "El Bosque del Dragón Oscuro",
  acertijo: "Un hayedo profundo cubre las laderas de un monte sagrado. ¿Qué bosque soy?",
  respuesta: "Hayedo de Belaustegi",
  latitud: 43.1000,
  longitud: -2.7500,
  radioDesbloqueo: 500,
  desbloqueado: false,
  descripcion: "Belaustegi es uno de los hayedos más bellos del entorno del Gorbea.",
  imagen: "https://offloadmedia.feverup.com/bilbaosecreto.com/wp-content/uploads/2021/05/01043840/belaustegi-hayedo-1024x683.jpg"
},

{
  titulo: "La Cueva del Gigante",
  acertijo: "Una cueva enorme se abre en un farallón rocoso, visible desde kilómetros. ¿Qué cueva soy?",
  respuesta: "Cueva de Pozalagua",
  latitud: 43.2600,
  longitud: -3.3000,
  radioDesbloqueo: 400,
  desbloqueado: false,
  descripcion: "Pozalagua es famosa por sus estalactitas excéntricas únicas en el mundo.",
  imagen: "https://www.cuevasturisticas.es/imagenes-ap/cuevas//zoom/cuevadepozalagua.jpg"
},

{
  titulo: "El Mirador del Valle de Galdames",
  acertijo: "Un monte rocoso con una ermita en su cima domina un valle minero. ¿Qué monte soy?",
  respuesta: "Monte La Arboleda (Peñas Negras)",
  latitud: 43.3000,
  longitud: -3.0700,
  radioDesbloqueo: 450,
  desbloqueado: false,
  descripcion: "La Arboleda es una zona minera histórica con lagos artificiales y vistas amplias.",
  imagen: "https://www.trapagaran.net/es-ES/Turismo/Que-ver/PublishingImages/arboleda3.jpg"
},
{
  titulo: "La Mina del Tiempo",
  acertijo: "Un antiguo complejo minero se ha convertido en un paisaje de lagos y montañas rojas. ¿Qué lugar soy?",
  respuesta: "Minas de La Arboleda",
  latitud: 43.3000,
  longitud: -3.0700,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Las minas de La Arboleda son uno de los paisajes industriales más singulares de Bizkaia.",
  imagen: "https://www.eusko-ikaskuntza.eus/Imgs3digitala/12546.jpg"
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