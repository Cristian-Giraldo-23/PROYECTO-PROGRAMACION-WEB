// Configura y exporta la conexión a la base de datos usando Sequelize y variables de entorno

const { Sequelize } = require("sequelize");
const dotenv = require('dotenv');

dotenv.config(); // Carga las variables de entorno desde .env

const sequelize = new Sequelize(
    process.env.DB_NAME,          // Nombre de la base de datos
    process.env.DB_USER,          // Usuario
    process.env.DB_PASSWORD,      // Contraseña
    {
        host: process.env.DB_HOST,    // Dirección del servidor de base de datos
        dialect: 'postgres',          // Motor de base de datos
        port: process.env.DB_PORT,    // Puerto de conexión
        logging: false,               // Desactiva logs SQL en consola
        timezone: '-05:00'            // Zona horaria (ej. Colombia)
    }
);

module.exports = sequelize; // Exporta la instancia para ser usada en otros archivos