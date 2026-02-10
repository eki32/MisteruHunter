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
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "La Catedral de Santa María es uno de los templos góticos más importantes del norte de España.",
  imagen: ""
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
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Embalse Esmeralda",
  acertijo: "Un lago artificial rodeado de montes y bosques, perfecto para caminar. ¿Qué embalse soy?",
  respuesta: "Embalse de Ullíbarri-Gamboa",
  latitud: 42.9440,
  longitud: -2.6200,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Ullíbarri-Gamboa es el mayor embalse de Álava y un lugar popular para actividades al aire libre.",
  imagen: ""
},
{
  titulo: "El Bosque de los Gigantes Verdes",
  acertijo: "Un hayedo mágico donde la niebla se enreda entre los troncos. ¿Qué bosque soy?",
  respuesta: "Hayedo de Altube",
  latitud: 42.9750,
  longitud: -2.8500,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El hayedo de Altube es uno de los bosques más extensos y húmedos de Álava.",
  imagen: ""
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
  imagen: ""
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
  imagen: ""
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
  imagen: ""
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
  imagen: ""
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
  imagen: ""
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
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Embalse de los Picos",
  acertijo: "Un lago rodeado de montes verdes y rutas de senderismo. ¿Qué embalse soy?",
  respuesta: "Embalse de Albina",
  latitud: 42.9500,
  longitud: -2.7000,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Albina es un embalse pequeño pero muy popular entre montañeros.",
  imagen: ""
},
{
  titulo: "El Mirador del Gorbea",
  acertijo: "Un monte con una gran cruz metálica en su cima, visible desde kilómetros. ¿Qué monte soy?",
  respuesta: "Monte Gorbea",
  latitud: 43.0330,
  longitud: -2.7330,
  radioDesbloqueo: 350,
  desbloqueado: false,
  descripcion: "El Gorbea es el monte más alto de Álava y Bizkaia, símbolo del montañismo vasco.",
  imagen: ""
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
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Ebro Alavés",
  acertijo: "Un balcón natural se asoma a un cañón profundo excavado por el Ebro. ¿Qué mirador soy?",
  respuesta: "Mirador de Sobrón",
  latitud: 42.7600,
  longitud: -3.1000,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "El desfiladero de Sobrón es uno de los paisajes más espectaculares del sur de Álava.",
  imagen: ""
},
{
  titulo: "El Bosque del Agua",
  acertijo: "Un humedal lleno de aves y pasarelas de madera rodea una laguna tranquila. ¿Qué lugar soy?",
  respuesta: "Parque Ornitológico de Mendixur",
  latitud: 42.9050,
  longitud: -2.6200,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Mendixur es una de las principales zonas de observación de aves del embalse de Ullíbarri.",
  imagen: ""
},
{
  titulo: "El Mirador del Toloño",
  acertijo: "Un monte sagrado para los pueblos del vino, con vistas a toda Rioja Alavesa. ¿Qué monte soy?",
  respuesta: "Monte Toloño",
  latitud: 42.6000,
  longitud: -2.7000,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "El Toloño es uno de los montes más emblemáticos de la sierra Cantabria.",
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Inglares",
  acertijo: "Un pueblo en lo alto de un risco domina un valle estrecho y verde. ¿Qué pueblo soy?",
  respuesta: "Peñacerrada",
  latitud: 42.6500,
  longitud: -2.8000,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Peñacerrada es una villa medieval fortificada con vistas al valle del Inglares.",
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Zadorra",
  acertijo: "Un cerro con antenas ofrece vistas a toda la llanada alavesa. ¿Qué monte soy?",
  respuesta: "Monte Zaldiaran",
  latitud: 42.8200,
  longitud: -2.7300,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Zaldiaran es uno de los montes más populares para ascender desde Vitoria.",
  imagen: ""
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
  titulo: "El Mirador del Ebro Profundo",
  acertijo: "Un pueblo colgado sobre un meandro del Ebro ofrece vistas únicas. ¿Qué pueblo soy?",
  respuesta: "Laguardia de Sobrón (punto alto)",
  latitud: 42.7600,
  longitud: -3.1000,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "La zona alta de Sobrón ofrece vistas espectaculares del desfiladero.",
  imagen: ""
},
{
  titulo: "El Santuario del Valle Verde",
  acertijo: "Un pequeño templo blanco se alza en un valle agrícola rodeado de montes. ¿Qué ermita soy?",
  respuesta: "Ermita de Santa Teodosia",
  latitud: 42.9000,
  longitud: -2.4000,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "Santa Teodosia es una ermita situada en un entorno natural privilegiado.",
  imagen: ""
},
{
  titulo: "El Mirador del Agua Azul",
  acertijo: "Un cerro rocoso se asoma a un embalse de aguas turquesas. ¿Qué monte soy?",
  respuesta: "Monte Maroto",
  latitud: 42.9500,
  longitud: -2.6500,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Maroto es un monte con vistas al embalse de Ullíbarri-Gamboa.",
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
  imagen: ""
},
{
  titulo: "El Mirador del Desfiladero",
  acertijo: "Un balcón natural se asoma a un cañón estrecho y profundo excavado por el río Ayuda. ¿Qué lugar soy?",
  respuesta: "Desfiladero de Okina",
  latitud: 42.7800,
  longitud: -2.6000,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "El desfiladero de Okina es uno de los rincones naturales más espectaculares de Álava.",
  imagen: ""
}
,
{
  titulo: "El Guardián del Ebro",
  acertijo: "Un pueblo amurallado se asoma a un meandro del Ebro, vigilando la frontera natural. ¿Qué pueblo soy?",
  respuesta: "Labastida",
  latitud: 42.5900,
  longitud: -2.8000,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Labastida es una villa histórica situada en la entrada a Rioja Alavesa.",
  imagen: ""
},
{
  titulo: "El Mirador del León Dormido",
  acertijo: "Un monte con forma de animal vigila un valle lleno de viñedos. ¿Qué monte soy?",
  respuesta: "Sierra de Cantabria (León Dormido)",
  latitud: 42.6000,
  longitud: -2.6500,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "La Sierra de Cantabria es la muralla natural que protege Rioja Alavesa.",
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Ayala",
  acertijo: "Un monte con vistas a un valle verde lleno de caseríos. ¿Qué monte soy?",
  respuesta: "Monte Babio",
  latitud: 43.1000,
  longitud: -2.9500,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Babio es uno de los montes más representativos del valle de Ayala.",
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Agua Serena",
  acertijo: "Un cerro rocoso se asoma a un embalse tranquilo rodeado de montes. ¿Qué lugar soy?",
  respuesta: "Punta de Garaio",
  latitud: 42.9200,
  longitud: -2.6200,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Garaio es una península natural dentro del embalse de Ullíbarri-Gamboa.",
  imagen: ""
},
{
  titulo: "El Bosque del Silencio Verde",
  acertijo: "Un bosque húmedo y profundo cubre las laderas de un monte sagrado. ¿Qué bosque soy?",
  respuesta: "Bosque de Armentia",
  latitud: 42.8400,
  longitud: -2.7100,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El bosque de Armentia es uno de los pulmones naturales de Vitoria.",
  imagen: ""
},
{
  titulo: "El Mirador del Valle de Kuartango",
  acertijo: "Un cerro aislado ofrece vistas a un valle amplio y silencioso. ¿Qué monte soy?",
  respuesta: "Monte Indamendi",
  latitud: 42.9000,
  longitud: -2.8500,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Indamendi es un monte solitario con vistas al valle de Kuartango.",
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Desfiladero Oculto",
  acertijo: "Un sendero estrecho recorre un cañón excavado por un río pequeño pero bravo. ¿Qué desfiladero soy?",
  respuesta: "Desfiladero de la Leze",
  latitud: 42.9000,
  longitud: -2.3500,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "La Leze es un desfiladero y cueva atravesada por un río subterráneo.",
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Mirador del Valle de Aramaio",
  acertijo: "Un monte fronterizo ofrece vistas a un valle verde rodeado de montañas. ¿Qué monte soy?",
  respuesta: "Monte Orisol",
  latitud: 43.0500,
  longitud: -2.5500,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Orisol es un monte emblemático entre Álava y Gipuzkoa.",
  imagen: ""
},
{
  titulo: "El Guardián del Ebro Profundo",
  acertijo: "Un pueblo colgado sobre un desfiladero domina un río poderoso. ¿Qué pueblo soy?",
  respuesta: "Puentelarrá",
  latitud: 42.7500,
  longitud: -2.9500,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "Puentelarrá se sitúa en un punto estratégico sobre el Ebro.",
  imagen: ""
},
{
  titulo: "El Mirador del Valle de Arlucea",
  acertijo: "Un cerro rocoso se alza sobre un valle estrecho lleno de caseríos. ¿Qué monte soy?",
  respuesta: "Monte Iturrieta",
  latitud: 42.7800,
  longitud: -2.4500,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Iturrieta es una sierra que separa la Montaña Alavesa de la Llanada.",
  imagen: ""
},
{
  titulo: "El Santuario del Pastor Blanco",
  acertijo: "Una pequeña ermita se alza en un collado entre montes, rodeada de pastos. ¿Qué ermita soy?",
  respuesta: "Ermita de San Vítores",
  latitud: 42.8800,
  longitud: -2.9000,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "San Vítores es una ermita situada en un entorno natural privilegiado.",
  imagen: ""
}
,
{
  titulo: "El Mirador del Valle de Aramaio",
  acertijo: "Un monte fronterizo ofrece vistas a un valle verde rodeado de montañas. ¿Qué monte soy?",
  respuesta: "Monte Kurtzegan",
  latitud: 43.0600,
  longitud: -2.5500,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Kurtzegan es un monte que domina el valle de Aramaio desde el límite entre Álava y Gipuzkoa.",
  imagen: ""
},
{
  titulo: "El Guardián del Alto Nervión",
  acertijo: "Una atalaya natural vigila el nacimiento de un río que cae en un salto gigantesco. ¿Qué lugar soy?",
  respuesta: "Monte Santiago",
  latitud: 42.9900,
  longitud: -2.9600,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Monte Santiago es un espacio natural que rodea el Salto del Nervión.",
  imagen: ""
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
  imagen: ""
},
{
  titulo: "El Valle del Silencio",
  acertijo: "Un valle remoto, rodeado de montañas y atravesado por un río tranquilo, guarda uno de los pueblos más aislados de Álava. ¿Qué valle soy?",
  respuesta: "Valle de Valderejo",
  latitud: 42.7000,
  longitud: -3.1000,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Valderejo es un parque natural con uno de los paisajes más salvajes y solitarios de Álava.",
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