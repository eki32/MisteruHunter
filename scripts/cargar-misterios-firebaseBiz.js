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
  imagen: ""
},
{
  titulo: "La Playa del Faro",
  acertijo: "Una playa amplia y dorada se extiende bajo un faro blanco. ¿Qué playa soy?",
  respuesta: "Playa de Ereaga",
  latitud: 43.3410,
  longitud: -3.0120,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "Ereaga es una de las playas más emblemáticas de Getxo.",
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Acantilado",
  acertijo: "Un sendero recorre acantilados espectaculares junto al mar Cantábrico. ¿Qué ruta soy?",
  respuesta: "Acantilados de La Galea",
  latitud: 43.3800,
  longitud: -3.0400,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Los acantilados de La Galea son uno de los paisajes costeros más impresionantes de Bizkaia.",
  imagen: ""
},
{
  titulo: "La Playa Salvaje",
  acertijo: "Una playa abierta al mar, rodeada de dunas y acantilados, famosa por su oleaje. ¿Qué playa soy?",
  respuesta: "Playa de Barinatxe (La Salvaje)",
  latitud: 43.3790,
  longitud: -2.9860,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Barinatxe es una playa natural entre Sopela y Getxo, muy popular entre surfistas.",
  imagen: ""
},
{
  titulo: "El Mirador del Flysch Vasco",
  acertijo: "Un acantilado muestra capas de roca inclinadas que cuentan millones de años. ¿Qué lugar soy?",
  respuesta: "Flysch de Barrika",
  latitud: 43.4000,
  longitud: -2.9500,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "El flysch de Barrika es uno de los paisajes geológicos más llamativos de la costa vasca.",
  imagen: ""
},
{
  titulo: "La Ermita del Acantilado",
  acertijo: "Una pequeña ermita blanca se asoma al mar desde un acantilado. ¿Qué ermita soy?",
  respuesta: "Ermita de San Telmo (Plentzia)",
  latitud: 43.4060,
  longitud: -2.9500,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "La ermita de San Telmo es un pequeño templo costero con vistas al Cantábrico.",
  imagen: ""
},
{
  titulo: "La Playa del Puerto",
  acertijo: "Una playa tranquila se esconde junto a un puerto pesquero histórico. ¿Qué playa soy?",
  respuesta: "Playa de Plentzia",
  latitud: 43.4050,
  longitud: -2.9500,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "La playa de Plentzia es un arenal protegido en la desembocadura de la ría.",
  imagen: ""
},

{
  titulo: "El Bosque del Pagasarri",
  acertijo: "Un monte muy querido por los bilbaínos, coronado por un refugio. ¿Qué monte soy?",
  respuesta: "Monte Pagasarri",
  latitud: 43.2400,
  longitud: -2.9200,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El Pagasarri es uno de los montes más populares para hacer senderismo desde Bilbao.",
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Dragón Verde",
  acertijo: "Un monte costero cubierto de prados cae en vertical hacia el mar. ¿Qué monte soy?",
  respuesta: "Monte Jata",
  latitud: 43.4000,
  longitud: -2.8500,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Jata es uno de los montes más emblemáticos de la costa vizcaína, con vistas al Cantábrico.",
  imagen: ""
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
  imagen: ""
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
  imagen: ""
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
  imagen: ""
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
  imagen: ""
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
  imagen: ""
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
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Faro Rojo",
  acertijo: "Un faro rojo marca la entrada a un puerto pesquero histórico. ¿Qué faro soy?",
  respuesta: "Faro de Matxitxako",
  latitud: 43.4470,
  longitud: -2.7660,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Matxitxako es uno de los cabos más emblemáticos de la costa vasca.",
  imagen: ""
},
{
  titulo: "La Playa del Flysch",
  acertijo: "Una playa estrecha y rocosa muestra capas de roca inclinadas hacia el mar. ¿Qué playa soy?",
  respuesta: "Playa de Bakio (zona este)",
  latitud: 43.4300,
  longitud: -2.8100,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "Bakio es una playa amplia con zonas de flysch en sus extremos.",
  imagen: ""
},
{
  titulo: "El Mirador del Valle del Duranguesado",
  acertijo: "Un monte rocoso domina un valle industrial y verde. ¿Qué monte soy?",
  respuesta: "Monte Mugarra",
  latitud: 43.1500,
  longitud: -2.6500,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Mugarra es una de las cumbres más características del Duranguesado.",
  imagen: ""
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
  imagen: ""
},

{
  titulo: "El Guardián del Duranguesado",
  acertijo: "Una cumbre afilada domina un valle industrial y verde. ¿Qué monte soy?",
  respuesta: "Monte Untzillatx",
  latitud: 43.1500,
  longitud: -2.7000,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Untzillatx es una de las cumbres más características del macizo del Duranguesado.",
  imagen: ""
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
  imagen: ""
},


{
  titulo: "El Mirador del Valle de Arratia",
  acertijo: "Un monte boscoso ofrece vistas a un valle lleno de vida. ¿Qué monte soy?",
  respuesta: "Monte Upo",
  latitud: 43.2000,
  longitud: -2.7800,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Upo es un monte accesible con vistas al valle de Arratia.",
  imagen: ""
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
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Bosque del Dragón Oscuro",
  acertijo: "Un hayedo profundo cubre las laderas de un monte sagrado. ¿Qué bosque soy?",
  respuesta: "Hayedo de Belaustegi",
  latitud: 43.1000,
  longitud: -2.7500,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Belaustegi es uno de los hayedos más bellos del entorno del Gorbea.",
  imagen: ""
},

{
  titulo: "La Cueva del Gigante",
  acertijo: "Una cueva enorme se abre en un farallón rocoso, visible desde kilómetros. ¿Qué cueva soy?",
  respuesta: "Cueva de Pozalagua",
  latitud: 43.2600,
  longitud: -3.3000,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Pozalagua es famosa por sus estalactitas excéntricas únicas en el mundo.",
  imagen: ""
},

{
  titulo: "El Mirador del Valle de Galdames",
  acertijo: "Un monte rocoso con una ermita en su cima domina un valle minero. ¿Qué monte soy?",
  respuesta: "Monte La Arboleda (Peñas Negras)",
  latitud: 43.3000,
  longitud: -3.0700,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "La Arboleda es una zona minera histórica con lagos artificiales y vistas amplias.",
  imagen: ""
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