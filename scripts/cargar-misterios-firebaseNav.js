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
  titulo: "El Palacio de los Reyes",
  acertijo: "Un castillo de torres doradas se alza en una villa medieval. ¿Qué palacio soy?",
  respuesta: "Palacio Real de Olite",
  latitud: 42.4805,
  longitud: -1.6505,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "El Palacio Real de Olite fue residencia de los reyes de Navarra.",
  imagen: "https://www.escapadarural.com/blog/wp-content/uploads/2017/11/Olite-2-1.jpg"
},
{
  titulo: "La Selva Encantada",
  acertijo: "Un bosque húmedo y profundo, lleno de hayas retorcidas y niebla. ¿Qué bosque soy?",
  respuesta: "Selva de Irati",
  latitud: 43.0300,
  longitud: -1.2000,
  radioDesbloqueo: 2000,
  desbloqueado: false,
  descripcion: "La Selva de Irati es uno de los mayores hayedos de Europa.",
  imagen: "https://turismo.navarra.com/wp-content/uploads/selva_de_irati_otono-1.jpg"
},
{
  titulo: "El Mirador del Pirineo",
  acertijo: "Un puerto de montaña ofrece vistas infinitas a valles verdes y picos nevados. ¿Qué puerto soy?",
  respuesta: "Puerto de Larrau",
  latitud: 43.0300,
  longitud: -1.0500,
  radioDesbloqueo: 350,
  desbloqueado: false,
  descripcion: "Larrau conecta Navarra con el País Vasco francés y ofrece vistas espectaculares.",
  imagen: "https://www.tourisme64.com/wp-content/uploads/tis/large/PLRV1089-village-de-Larrau.jpg"
},
{
  titulo: "El Bosque de los Gigantes",
  acertijo: "Un hayedo mágico donde los árboles parecen columnas de una catedral verde. ¿Qué lugar soy?",
  respuesta: "Hayedo de Quinto Real",
  latitud: 43.1000,
  longitud: -1.4500,
  radioDesbloqueo: 300,
  desbloqueado: false,
  descripcion: "Quinto Real es un bosque húmedo y profundo en los Pirineos navarros.",
  imagen: "https://turismo.navarra.com/wp-content/uploads/Bosque_Eugui_otono_Fernando_Goni1.jpg"
},
{
  titulo: "La Ciudad del Camino",
  acertijo: "Una ciudad amurallada recibe a miles de peregrinos cada año. ¿Qué ciudad soy?",
  respuesta: "Puente la Reina",
  latitud: 42.6700,
  longitud: -1.8200,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "Puente la Reina es un punto clave del Camino de Santiago.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Puente_la_reina.jpg"
},

{
  titulo: "El Mirador del Buitre",
  acertijo: "Un desfiladero profundo donde vuelan buitres leonados. ¿Qué lugar soy?",
  respuesta: "Foz de Lumbier",
  latitud: 42.6500,
  longitud: -1.3000,
  radioDesbloqueo: 450,
  desbloqueado: false,
  descripcion: "La Foz de Lumbier es un cañón espectacular excavado por el río Irati.",
  imagen: "https://lumbier.com/wp-content/uploads/2015/08/foz-de-lumbier.jpg"
},

{
  titulo: "La Ciudad del Toro",
  acertijo: "Una ciudad famosa por una fiesta donde los toros corren por sus calles. ¿Qué ciudad soy?",
  respuesta: "Pamplona",
  latitud: 42.8169,
  longitud: -1.6432,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "Pamplona es la capital de Navarra y famosa por los Sanfermines.",
  imagen: "https://image-proxy.libere.app/images/jpg:1920/plain/https://air-production-cms-uploads.storage.googleapis.com/uploads/2022/09/05075051/alojamiento-en-pamplona.jpg@jpg"
},
{
  titulo: "La Ciudadela del Silencio",
  acertijo: "Una fortaleza en forma de estrella protege una ciudad histórica. ¿Qué ciudadela soy?",
  respuesta: "Ciudadela de Pamplona",
  latitud: 42.8120,
  longitud: -1.6510,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "La Ciudadela es uno de los mejores ejemplos de fortificación renacentista.",
  imagen: "https://turismo.navarra.com/wp-content/uploads/Ciudadela_de_Pamplona_Navarra_vista_aerea-1024x575.jpg"
},

{
  titulo: "El Pueblo de Piedra",
  acertijo: "Un pueblo medieval de calles empedradas se alza sobre un cerro. ¿Qué pueblo soy?",
  respuesta: "Ujué",
  latitud: 42.5000,
  longitud: -1.5000,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Ujué es uno de los pueblos más bonitos de Navarra, con vistas infinitas.",
  imagen: "https://coleccionandomomentos.com/wp-content/uploads/2021/01/ujue12_edited.jpg"
},
{
  titulo: "El Mirador del Desierto",
  acertijo: "Un paisaje árido de formaciones rocosas parece sacado de otro planeta. ¿Qué lugar soy?",
  respuesta: "Bardenas Reales",
  latitud: 42.2000,
  longitud: -1.5000,
  radioDesbloqueo: 400,
  desbloqueado: false,
  descripcion: "Las Bardenas Reales son un desierto semidesértico único en Europa.",
  imagen: "https://www.lasbardenas.com/wp-content/uploads/395227934_846578867472172_851300477609279361_n.jpg"
},
{
  titulo: "El Mirador del Valle de Baztán",
  acertijo: "Un pueblo de caseríos blancos se asoma a un valle verde lleno de leyendas. ¿Qué pueblo soy?",
  respuesta: "Elizondo",
  latitud: 43.1400,
  longitud: -1.5100,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Elizondo es la capital del valle de Baztán, famoso por su arquitectura y tradiciones.",
  imagen: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh9zBwaXBv0bQxWMzWRyrbx3UnENKK3I8EnDrRTtvLxO232G7yuZUPgHF5jmI8zHrdiVF2cYYHC5cxgvF6cdKQQtZZp6rZAcs-eEvNAFt1pFBCUXjZ89Enl0xuLtq8d5FjRK0Rhg9wetQnY47Mr9DYqeFFcX9kB7mnemrcLPc_c_QO7vXXJxW_Hm6hW9kw/w1200-h630-p-k-no-nu/Elizondo-Que-ver-ViajesyRutas.jpg"
},

{
  titulo: "La Cueva del Aquelarre",
  acertijo: "Una cueva enorme fue escenario de reuniones legendarias. ¿Qué cueva soy?",
  respuesta: "Cueva de Zugarramurdi",
  latitud: 43.2705,
  longitud: -1.5405,
  radioDesbloqueo: 500,
  desbloqueado: false,
  descripcion: "La cueva de Zugarramurdi es un lugar mítico asociado a rituales y leyendas.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Zugarramurdi_cueva.jpg"
},
{
  titulo: "El Mirador del Bidasoa",
  acertijo: "Un pueblo fronterizo se asoma a un río que marca la entrada a Navarra. ¿Qué pueblo soy?",
  respuesta: "Bera de Bidasoa",
  latitud: 43.2800,
  longitud: -1.6800,
  radioDesbloqueo: 1000,
  desbloqueado: false,
  descripcion: "Bera es un pueblo tradicional con arquitectura típica del norte navarro.",
  imagen: "https://c8.alamy.com/comp/GG5065/picturesque-bera-village-navarre-northern-spain-GG5065.jpg"
},

{
  titulo: "El Pueblo del Queso",
  acertijo: "Un pequeño pueblo pirenaico es famoso por su queso y sus tradiciones. ¿Qué pueblo soy?",
  respuesta: "Roncal",
  latitud: 42.8200,
  longitud: -0.9500,
  radioDesbloqueo: 1000,
  desbloqueado: false,
  descripcion: "Roncal es la capital del valle del mismo nombre, famoso por su queso.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Vista_de_Roncal%2C_Navarra.jpg/1280px-Vista_de_Roncal%2C_Navarra.jpg"
},

{
  titulo: "El Castillo del Rey",
  acertijo: "Una fortaleza medieval domina un pueblo histórico del Camino de Santiago. ¿Qué castillo soy?",
  respuesta: "Castillo de Javier",
  latitud: 42.5900,
  longitud: -1.2100,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "El castillo de Javier es uno de los más importantes de Navarra.",
  imagen: "https://turismo.navarra.com/wp-content/uploads/Castillo_de_Javier_Turismo_Navarra_1-1024x575.jpg"
},

{
  titulo: "El Mirador del Aragón",
  acertijo: "Un pueblo medieval se asoma a un río que baja desde los Pirineos. ¿Qué pueblo soy?",
  respuesta: "Sangüesa",
  latitud: 42.5800,
  longitud: -1.2800,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "Sangüesa es una villa histórica con un patrimonio románico excepcional.",
  imagen: "https://www.visitnavarra.es/o/adaptive-media/image/33513332/turismo-navarra-600xauto/Santiago.%20Sang%C3%BCesa.jpg"
},

{
  titulo: "El Pueblo del Pirineo",
  acertijo: "Un pueblo de casas de piedra se alza en un valle estrecho y frío. ¿Qué pueblo soy?",
  respuesta: "Isaba",
  latitud: 42.8500,
  longitud: -0.9500,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "Isaba es uno de los pueblos más bonitos del Pirineo navarro.",
  imagen: "https://turismo.navarra.com/wp-content/uploads/Isaba_Valle_de_Roncal_Navarra.jpg"
},
{
  titulo: "El Mirador del Valle de Aezkoa",
  acertijo: "Un pueblo de caseríos de piedra domina un valle verde que conduce a Irati. ¿Qué pueblo soy?",
  respuesta: "Orbaizeta",
  latitud: 42.9800,
  longitud: -1.2500,
  radioDesbloqueo: 200,
  desbloqueado: false,
  descripcion: "Orbaizeta es conocido por su antigua fábrica de armas y su cercanía a Irati.",
  imagen: "https://t3.ftcdn.net/jpg/03/41/16/90/360_F_341169057_zkfoTGMYHKqKHQD8jBg7P2fuhWdAvQUk.jpg"
},
{
  titulo: "El Parque del Valle Encantado",
  acertijo: "En un valle donde viven animales de todo el mundo, un parque mezcla naturaleza, aventura y espectáculos. ¿Qué lugar soy?",
  respuesta: "Sendaviva",
  latitud: 42.1770,
  longitud: -1.5980,
  radioDesbloqueo: 250,
  desbloqueado: false,
  descripcion: "Sendaviva es un parque de naturaleza y aventura situado junto a las Bardenas Reales, ideal para familias y amantes de los animales.",
  imagen: "https://www.guide-du-paysbasque.com/_bibli/annonces/8798/hd/senda-viva-parque-2.jpg"
},

{
  titulo: "El Pueblo del Camino Alto",
  acertijo: "Un pueblo de casas blancas domina un valle por el que pasan miles de peregrinos. ¿Qué pueblo soy?",
  respuesta: "Roncesvalles",
  latitud: 43.0090,
  longitud: -1.3200,
  radioDesbloqueo: 1000,
  desbloqueado: false,
  descripcion: "Roncesvalles es uno de los lugares más emblemáticos del Camino de Santiago.",
  imagen: "https://www.visitnavarra.es/o/adaptive-media/image/8214429/turismo-navarra-1400xauto/ronces%20(1).jpg"
},

{
  titulo: "El Pueblo del Río Irati",
  acertijo: "Un pueblo pequeño y tranquilo se asienta junto al río que da nombre a un bosque legendario. ¿Qué pueblo soy?",
  respuesta: "Aoiz",
  latitud: 42.7800,
  longitud: -1.3800,
  radioDesbloqueo: 450,
  desbloqueado: false,
  descripcion: "Aoiz es una villa histórica situada junto al río Irati.",
  imagen: "https://www.guiarepsol.com/content/dam/repsol-guia/guia-cf/ubicacion/localidad/imagenes/media-filer_public-34-a3-34a3fae5-9041-43ab-9750-a094647b9b5d-casco_historico_alfredo_leon.jpg.transform/rp-rendition-xs/image.jpg"
},
{
  titulo: "El Mirador del Embalse Azul",
  acertijo: "Un embalse rodeado de montes refleja el cielo como un espejo. ¿Qué embalse soy?",
  respuesta: "Embalse de Itoiz",
  latitud: 42.8200,
  longitud: -1.3500,
  radioDesbloqueo: 600,
  desbloqueado: false,
  descripcion: "Itoiz es uno de los embalses más grandes y recientes de Navarra.",
  imagen: "https://thumbs.dreamstime.com/b/vista-del-embalse-de-itoiz-en-navarra-muy-vac%C3%ADa-debido-la-sequ%C3%ADa-veraniega-foto-alta-calidad-254494029.jpg"
},

{
  titulo: "El Bosque del Roble Sagrado",
  acertijo: "Un robledal antiguo guarda historias de pastores y leyendas. ¿Qué bosque soy?",
  respuesta: "Robledal de Orbara",
  latitud: 42.9500,
  longitud: -1.2500,
  radioDesbloqueo: 900,
  desbloqueado: false,
  descripcion: "Orbara es un pequeño valle lleno de bosques y senderos.",
  imagen: "https://www.guiarepsol.com/content/dam/repsol-guia/guia-cf/ubicacion/localidad/imagenes/media-filer_public-b2-82-b282b809-cb07-49f7-8811-ebe54e95a30b-orbara_t.jpg.transform/rp-rendition-xs/image.jpg"
},
{
  titulo: "El Mirador del Valle de Yerri",
  acertijo: "Un cerro con una ermita domina un valle agrícola lleno de pueblos pequeños. ¿Qué lugar soy?",
  respuesta: "Ermita de Santa Bárbara (Estella)",
  latitud: 42.6700,
  longitud: -2.0300,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "La ermita de Santa Bárbara ofrece vistas a Estella y al valle de Yerri.",
  imagen: "https://turismo.lafontdelafiguera.es/wp-content/uploads/2024/11/SANTA-BARBARA-1-scaled.jpg"
},
{
  titulo: "La Ciudad del Ega",
  acertijo: "Una ciudad medieval atravesada por un río es famosa por su patrimonio románico. ¿Qué ciudad soy?",
  respuesta: "Estella-Lizarra",
  latitud: 42.6700,
  longitud: -2.0300,
  radioDesbloqueo: 150,
  desbloqueado: false,
  descripcion: "Estella es una ciudad clave del Camino de Santiago.",
  imagen: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Puente_Estella.jpg"
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