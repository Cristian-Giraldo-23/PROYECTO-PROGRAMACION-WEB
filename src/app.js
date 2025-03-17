const express = require('express'); // Importa el framework Express
const cors = require('cors'); // Importa CORS para permitir solicitudes entre dominios
const app = express(); // Crea una instancia de la aplicación Express

app.use(express.json()); // Habilita el middleware para procesar solicitudes con JSON
app.use(cors()); // Habilita CORS para permitir solicitudes desde otros dominios

// Importar rutas
const userRoutes = require('./routes/user.routes'); // Importa las rutas de usuarios
const authRoutes = require('./routes/auth.routes'); // Importa las rutas de autenticación
const projectRoutes = require('./routes/project.routes'); // Importa las rutas de proyectos

// Configura las rutas para que todas comiencen con /api/v1
app.use('/api/v1', userRoutes); // Habilita las rutas de usuarios
app.use('/api/v1', authRoutes); // Habilita las rutas de autenticación
app.use('/api/v1', projectRoutes); // Habilita las rutas de proyectos

module.exports = app; // Exporta la instancia de la aplicación para su uso en otros archivos