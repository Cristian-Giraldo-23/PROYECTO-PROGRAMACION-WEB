const userService = require('../services/user.services');
const User = require('../models/user.model');

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        // Extrae datos del cuerpo de la solicitud
        const { nombre, email, password, rol_id, administrador_id } = req.body;

        // Llama al servicio para crear el usuario
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);

        // Devuelve éxito con el usuario creado
        res.status(201).json({ message: 'Usuario creado con exito', user: newUser });
    } catch (err) {
        // Manejo de error en caso de fallo
        res.status(500).json({ message: err.message });
    }
};

// Obtiene todos los usuarios asociados al administrador autenticado (por el token)
exports.getAllUsersByAdministradorId = async (req, res) => {
    try {
        const admin_from_token = req.user.id; // ID del admin autenticado
        const { email } = req.query; // Filtro opcional por email

        // Llama al servicio para obtener usuarios filtrados
        const users = await userService.getAllUsersByAdministradorId(admin_from_token, email);

        // Responde con la lista de usuarios
        res.status(200).json({ message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Obtiene todos los usuarios que tienen un rol específico
exports.getAllUsersByRolId = async (req, res) => {
    try {
        // Consulta usuarios por el ID de rol recibido como parámetro
        const users = await userService.getAllUsersByRolId(req.params.id);

        req.status(200).json({ message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Actualiza un usuario según su ID
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, rol_id, administrador_id } = req.body;
    const admin_from_token = req.user.id;

    try {
        // Llama al servicio para actualizar el usuario
        const user = await userService.updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token);

        res.status(200).json({ message: 'Usuario actualizado con éxito', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Elimina un usuario verificando que quien elimina sea un administrador autenticado
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const admin_from_token = req.user.id;

    try {
        const result = await userService.deleteUser(id, admin_from_token);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};