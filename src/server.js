const sequelize = require('./config/db'); // Importa la instancia de Sequelize desde la configuración de la base de datos
const app = require('./app'); // Importa la aplicación principal
const dotenv = require('dotenv'); // Importa dotenv para manejar variables de entorno (parece haber un error tipográfico en "dontev")
require('./models/associations'); // Importa las asociaciones de los modelos

dotenv.config(); // Carga las variables de entorno desde un archivo .env

const PORT = process.env.PORT || 3000;

// Autentica la conexión con la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conectado a PostgreSQL con Sequelize');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Error conectando a la base de datos:', err));


// Sincroniza los modelos con la base de datos sin forzar la eliminación de datos existentes
sequelize.sync({ force: false }).then(() => {
    console.log('Base de datos sincronizada');
}).catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
});
