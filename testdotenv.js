const dotenv = require('dotenv');
dotenv.config();

console.log("Cargando variables de entorno...");
console.log("JWT_SECRET:", process.env.JWT_SECRET);

