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
  titulo: "La Ciudad de Piedra y Series",
  acertijo: "Mis calles empedradas y palacios renacentistas han sido escenario de dragones y tronos. ¿Qué ciudad extremeña soy?",
  respuesta: "Cáceres",
  latitud: 39.4760,
  longitud: -6.3710,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "La ciudad monumental de Cáceres es Patrimonio de la Humanidad y escenario de numerosas producciones.",
  imagen: "https://www.saboraextremadura.es/wp-content/uploads/2018/06/caceres-ciudad-monumental.jpg"
},
{
  titulo: "El Monasterio de la Virgen Morena",
  acertijo: "Entre montes y dehesas, una virgen morena atrae peregrinos. Mis claustros guardan tesoros de fe. ¿Qué monasterio extremeño soy?",
  respuesta: "Monasterio de Guadalupe",
  latitud: 39.4520,
  longitud: -5.3260,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Real Monasterio de Santa María de Guadalupe es Patrimonio de la Humanidad.",
  imagen: "https://www.spain.info/export/sites/segtur/.content/imagenes/cabeceras-grandes/extremadura/real-monasterio-guadalupe2-c-extremadura-turismo.jpg"
},
{
  titulo: "El Castillo del Río Tajo",
  acertijo: "Mis murallas se asoman a un gran río y a un cielo lleno de buitres. Soy puerta de un parque nacional. ¿Qué castillo soy?",
  respuesta: "Castillo de Monfragüe",
  latitud: 39.8550,
  longitud: -6.0600,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El Castillo de Monfragüe se alza sobre el Parque Nacional del mismo nombre.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/0/00/DSC08248_Castillo_de_Monfrag%C3%BCe%2C_Parque_Nacional_de_Monfrag%C3%BCe_%28Extremadura%2C_Espa%C3%B1a%29.jpg"
},
{
  titulo: "El Castillo de los Molinos",
  acertijo: "Desde mis murallas se ven gigantes de aspas blancas. Un hidalgo loco los confundió con monstruos. ¿Qué castillo manchego soy?",
  respuesta: "Castillo de Consuegra",
  latitud: 39.4630,
  longitud: -3.6080,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Castillo de Consuegra se alza junto a los famosos molinos de viento de La Mancha.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/b/bb/%28Castillo_de_la_Muela%29_Consuegra_%28cropped%29.jpg"
},
{
  titulo: "El Pueblo del Río Profundo",
  acertijo: "Casas blancas trepan por un cañón, un río verde serpentea abajo y un castillo vigila desde lo alto. ¿Qué pueblo albaceteño soy?",
  respuesta: "Alcalá del Júcar",
  latitud: 39.1930,
  longitud: -1.4300,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Alcalá del Júcar es un pintoresco pueblo excavado en la roca sobre un profundo cañón.",
  imagen: "https://www.turium.es/wp-content/uploads/sites/4/2025/04/alcala-del-jucar-1200x800.jpg"
},
{
  titulo: "El Castillo del Quijote",
  acertijo: "Dicen que un caballero de triste figura pasó cerca de mis murallas. Soy fortaleza manchega de película. ¿Qué castillo conquense soy?",
  respuesta: "Castillo de Belmonte",
  latitud: 39.5570,
  longitud: -2.7040,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Castillo de Belmonte es una fortaleza gótica muy bien conservada en la provincia de Cuenca.",
  imagen: "https://castillodebelmonte.com/galerias/portada/Savini-II.jpg"
},
{
  titulo: "Las Lagunas Azules de la Mancha",
  acertijo: "Soy un collar de lagunas conectadas por cascadas. Mis aguas cambian de color con la luz. ¿Qué parque natural manchego soy?",
  respuesta: "Lagunas de Ruidera",
  latitud: 38.9500,
  longitud: -2.8700,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Las Lagunas de Ruidera forman uno de los humedales más bellos de la península.",
  imagen: "https://www.ruidera.es/imagenes/lagunas-ruidera2.jpg"
},
{
  titulo: "La Plaza del Corazón Verde",
  acertijo: "Mi plaza mayor está llena de soportales y teatro clásico. Cada verano, el corral se llena de comedias. ¿Qué pueblo manchego soy?",
  respuesta: "Almagro",
  latitud: 38.8890,
  longitud: -3.7110,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Almagro es famoso por su Corral de Comedias y su plaza mayor porticada.",
  imagen: "https://www.almagro.es/recursos/imagenes/imagen_defecto.jpg"
},
{
  titulo: "El Templo del Sol Poniente",
  acertijo: "Soy un templo egipcio que mira al atardecer madrileño. Crucé medio mundo para descansar junto a un parque. ¿Qué templo soy?",
  respuesta: "Templo de Debod",
  latitud: 40.4240,
  longitud: -3.7170,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El Templo de Debod es un templo egipcio reconstruido piedra a piedra en Madrid.",
  imagen: "https://media.traveler.es/photos/613776516936668f30c3f61c/master/pass/107906.jpg"
},
{
  titulo: "El Palacio de las Mil Habitaciones",
  acertijo: "Soy residencia real con más de tres mil estancias. Frente a mí se abre una gran plaza y unos jardines geométricos. ¿Qué palacio madrileño soy?",
  respuesta: "Palacio Real de Madrid",
  latitud: 40.4179,
  longitud: -3.7143,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Palacio Real de Madrid es la residencia oficial del rey de España, aunque solo se usa para actos ceremoniales.",
  imagen: "https://media.tacdn.com/media/attractions-splice-spp-674x446/16/8e/87/e8.jpg"
},
{
  titulo: "La Estación del Jardín Tropical",
  acertijo: "Trenes, hierro y cristal me definen, pero en mi interior crece una selva de palmeras. ¿Qué estación madrileña soy?",
  respuesta: "Estación de Atocha",
  latitud: 40.4066,
  longitud: -3.6890,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "La estación de Atocha combina arquitectura histórica con un jardín tropical interior.",
  imagen: "https://magazine.smartrental.com/wp-content/uploads/2023/09/Fachada-Estacion-de-atocha-de-Madrid.jpg"
},
{
  titulo: "El Monasterio de los Reyes de Piedra",
  acertijo: "Soy monasterio, palacio y panteón real. Mis patios y bibliotecas guardan siglos de historia. ¿Qué complejo monumental madrileño soy?",
  respuesta: "Monasterio de El Escorial",
  latitud: 40.5890,
  longitud: -4.1470,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El Monasterio de San Lorenzo de El Escorial fue mandado construir por Felipe II.",
  imagen: "https://s1.indomio.es/news/app/uploads/2025/02/Monasterio-de-El-Escorial-historia-y-legado-cultural.jpg"
},
{
  titulo: "El Faro sin Mar",
  acertijo: "Me alzo sobre la ciudad como un faro, pero no guío barcos, sino miradas. Desde mi mirador se ve todo Madrid. ¿Qué torre soy?",
  respuesta: "Faro de Moncloa",
  latitud: 40.4410,
  longitud: -3.7260,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Faro de Moncloa es una torre-mirador de 110 metros de altura en Madrid.",
  imagen: "https://www.barcelo.com/guia-turismo/wp-content/uploads/2024/09/ok-faro-de-moncloa.jpg"
},
{
  titulo: "El Rascacielos de la Gran Vía",
  acertijo: "Fui uno de los primeros rascacielos de Europa. Desde mi corona se domina la calle de los cines. ¿Qué edificio madrileño soy?",
  respuesta: "Edificio Telefónica",
  latitud: 40.4203,
  longitud: -3.7038,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El Edificio Telefónica es uno de los iconos arquitectónicos de la Gran Vía madrileña.",
  imagen: "https://media.timeout.com/images/102514751/750/422/image.jpg"
},
{
  titulo: "El Desierto junto al Mar",
  acertijo: "Mis dunas doradas se mueven con el viento. Parezco Sahara, pero escucho olas atlánticas. ¿Qué lugar canario soy?",
  respuesta: "Dunas de Maspalomas",
  latitud: 27.7400,
  longitud: -15.5780,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Las Dunas de Maspalomas forman un pequeño desierto junto al mar en Gran Canaria.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Aerial_view_of_the_dunes_and_beach_of_Maspalomas%2C_Canary_Islands_%2852757630746%29.jpg"
},
{
  titulo: "El Roque del Cielo",
  acertijo: "Me alzo como un monolito en el centro de una isla redonda. Desde mi base se ve el mar por todos lados. ¿Qué roque canario soy?",
  respuesta: "Roque Nublo",
  latitud: 27.9650,
  longitud: -15.5870,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "El Roque Nublo es uno de los símbolos naturales de Gran Canaria.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Roque_Nublo_2024-12-14.jpg"
},
{
  titulo: "El Mirador del Abismo Azul",
  acertijo: "Desde mi cristal se ve un acantilado que cae al océano. Fui diseñado por un artista que amaba el volcán. ¿Qué mirador lanzaroteño soy?",
  respuesta: "Mirador del Río",
  latitud: 29.2130,
  longitud: -13.4760,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Mirador del Río, en Lanzarote, fue diseñado por César Manrique sobre un acantilado.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/1/19/Mirador_del_R%C3%ADo_-_Lanzarote_-_04.jpg"
},
{
  titulo: "La Cueva del Fuego Helado",
  acertijo: "Soy un túnel volcánico convertido en sala de conciertos natural. Mis paredes cuentan historias de lava. ¿Qué cueva lanzaroteña soy?",
  respuesta: "Cueva de los Verdes",
  latitud: 29.1610,
  longitud: -13.4430,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "La Cueva de los Verdes forma parte de un largo tubo volcánico en Lanzarote.",
  imagen: "https://www.lanzarote.com/wp-content/uploads/2021/11/20220324_115130-2.jpg"
},
{
  titulo: "El Jardín de Espinas Amables",
  acertijo: "Miles de cactus de todo el mundo crecen ordenados en terrazas de lava. ¿Qué jardín lanzaroteño soy?",
  respuesta: "Jardín de Cactus",
  latitud: 29.0600,
  longitud: -13.4800,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Jardín de Cactus es una de las últimas obras de César Manrique en Lanzarote.",
  imagen: "https://turismolanzarote.com/wp-content/uploads/2017/04/Jardi%CC%81n-general-08.jpg"
},
{
  titulo: "El Charco Esmeralda",
  acertijo: "Soy una laguna verde en el cráter de un volcán junto al mar. Mi color viene de algas y minerales. ¿Qué charco lanzaroteño soy?",
  respuesta: "Charco de los Clicos",
  latitud: 28.9870,
  longitud: -13.8280,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El Charco de los Clicos es una laguna verde situada en El Golfo, Lanzarote.",
  imagen: "https://www.spain.info/export/sites/segtur/.content/imagenes/cabeceras-grandes/naturaleza/laguna-charco-de-los-clicos-en-lanzarote-islas-canarias-s2385996469.jpg"
},
{
  titulo: "La Caldera del Viento",
  acertijo: "Soy un cráter perfecto en Gran Canaria, rodeado de viñedos y casas blancas. ¿Qué caldera soy?",
  respuesta: "Caldera de Bandama",
  latitud: 28.0310,
  longitud: -15.4760,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "La Caldera de Bandama es un cráter volcánico de gran tamaño en Gran Canaria.",
  imagen: "https://fotos.hoteles.net/articulos/caldera-bandama-gran-canaria-6117-1.jpg"
},
{
  titulo: "El Bosque de la Niebla Eterna",
  acertijo: "Soy un bosque de laurisilva donde la niebla se enreda en los árboles. Parezco un cuento antiguo. ¿Qué parque canario soy?",
  respuesta: "Parque Nacional de Garajonay",
  latitud: 28.1100,
  longitud: -17.2500,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El Parque Nacional de Garajonay, en La Gomera, protege un bosque de laurisilva único.",
  imagen: "https://images.squarespace-cdn.com/content/v1/5a86b05bcf81e0af04936cc7/1532099705964-QLCRB9X2MMKOE9AC2WW6/garajonay-la-gomera-agando.jpg"
},
{
  titulo: "El Castillo del Mar Cantábrico",
  acertijo: "Mis muros se asoman al Cantábrico y protegieron una villa marinera durante siglos. No estoy en Bizkaia. ¿Qué castillo cántabro soy?",
  respuesta: "Castillo de Santa Ana (Castro Urdiales)",
  latitud: 43.3820,
  longitud: -3.2180,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El Castillo de Santa Ana vigila la entrada al puerto de Castro Urdiales.",
  imagen: "https://www.turismoroquetasdemar.es/wp-content/uploads/2016/07/Turismo-Roquetas-de-Mar-Castillo-Santa-Ana-03.jpg"
},
{
  titulo: "La Cueva del Arte Antiguo",
  acertijo: "Mis paredes guardan bisontes y manos de hace miles de años. Soy una de las cuevas más famosas del mundo. ¿Qué cueva cántabra soy?",
  respuesta: "Cueva de Altamira",
  latitud: 43.3770,
  longitud: -4.1220,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "La Cueva de Altamira es conocida como la 'Capilla Sixtina del Paleolítico'.",
  imagen: "https://www.worldhistory.org/img/r/p/1500x1500/3537.jpg"
},
{
  titulo: "El Palacio del Marqués",
  acertijo: "Soy un palacio barroco junto al Cantábrico, con jardines geométricos y vistas al mar. ¿Qué palacio asturiano soy?",
  respuesta: "Palacio de la Quinta de Selgas",
  latitud: 43.5560,
  longitud: -6.2840,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "La Quinta de Selgas es conocida como el 'Versalles asturiano'.",
  imagen: "https://www.barcelo.com/guia-turismo/wp-content/uploads/2024/11/palacio-de-selgas.jpg"
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