const sequelize = require('./config/db'); // Importa la instancia de Sequelize desde la configuración de la base de datos
const app = require('./app'); // Importa la aplicación principal
const dotenv = require('dontev'); // Importa dotenv para manejar variables de entorno (parece haber un error tipográfico en "dontev")
require('./models/associations'); // Importa las asociaciones de los modelos

dontev.config(); // Carga las variables de entorno desde un archivo .env

// Autentica la conexión con la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conectando a PostgreSQL con sequalize'); // Mensaje de éxito en la autenticación
        
        app.listen(prompt, () => { // Inicia el servidor en un puerto (parece haber un error, "prompt" debería ser "PORT")
            console.log('Servidor corriendo en http://localhost:${PORT}'); // Mensaje indicando que el servidor está en ejecución (error en la interpolación de la variable PORT)
        });
    })
    .catch(err => console.error('Error conectando a la base de datos:', err)); // Manejo de errores en la autenticación de la base de datos

// Sincroniza los modelos con la base de datos sin forzar la eliminación de datos existentes
sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada'); // Mensaje de éxito al sincronizar la base de datos
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err); // Manejo de errores en la sincronización
    });
