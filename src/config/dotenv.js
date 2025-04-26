// Carga y expone variables de entorno definidas en el archivo .env

const dotenv = require('dotenv');
dotenv.config(); // Habilita el uso de variables desde el archivo .env

module.exports = {
    PORT: process.env.PORT,               // Puerto donde correrá el servidor
    DB_NAME: process.env.DB_NAME,         // Nombre de la base de datos
    DB_USER: process.env.DB_USER,         // Usuario de la base de datos
    DB_PASSWORD: process.env.DB_PASSWORD, // Contraseña de la base de datos
    DB_HOST: process.env.DB_HOST,         // Host del servidor de base de datos
    DB_PORT: process.env.DB_PORT,         // Puerto del servidor de base de datos
    JWT_SECRET: process.env.JWT_SECRET    // Clave secreta para firmar tokens JWT
};
