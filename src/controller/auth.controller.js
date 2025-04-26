const authServices = require('../services/auth.services');

// Controlador para iniciar sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Se genera un token si las credenciales son correctas
        const token = await authServices.loginUser(email, password);
        res.status(200).json({ message: 'Inicio de sesion exitoso', token });
    }
    catch (err) {
        // Error si el login falla (credenciales incorrectas, etc.)
        res.status(400).json({ message: err.message });
    }
};

// Controlador para registrar un nuevo usuario
exports.createUser = async (req, res) => {
    const { nombre, email, password, rol_id, administrador_id } = req.body;
    try {
        // Llama al servicio para crear el usuario en base de datos
        const user = await authServices.createUser(nombre, email, password, rol_id, administrador_id);
        res.status(201).json({ message: 'Usuario creado exitosamente', user });
    } catch (err) {
        // Error si falla la creación del usuario
        res.status(400).json({ message: err.message });
    }
}
