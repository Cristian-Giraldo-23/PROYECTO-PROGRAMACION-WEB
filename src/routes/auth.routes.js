const express = require('express');  // Utiliza Express para definir rutas HTTP
const router = express.Router();     // Crea un router modular para agrupar rutas de auth

const authController = require('../controller/auth.controller');
// Controlador que maneja la lógica de login y generación de JWT

// Define el endpoint de login:
// Recibe email y password, y delega en authController.login
router.post('/auth/login', authController.login);

module.exports = router;  // Exporta este router para montarlo en la aplicación principal
