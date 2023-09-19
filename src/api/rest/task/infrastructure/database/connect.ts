import mongoose from 'mongoose';

// Define la URL de conexión a la base de datos
const url_db = process.env.MONGO_URL!
// Configura y establece la conexión a la base de datos
mongoose.connect(url_db).then(() => {
  
  console.log('Conexión a la base de datos establecida con éxito');
}).catch((error) => {
  console.error('Error de conexión a la base de datos:', error);
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error de conexión a la base de datos:', error);
});

// Exporta la instancia de conexión para su uso en otros archivos
export default mongoose;
