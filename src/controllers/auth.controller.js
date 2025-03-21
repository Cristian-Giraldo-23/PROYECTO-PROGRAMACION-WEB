const authService = require('../services/auth.service'); //Importamos el servicio de autenticacion

//Iniciar sesion
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const token = await authService.loginUser(email,password); //valida el email y password y muestra el token
        res.status(200).json({ message: 'Inicio de sesion exitoso', token}); //validamos el inicio de sesion y devuelve el token
    } catch (err) {
        res.status(400).json({ message: err.message }); //Lanza el mensaje de error 400 en caso tal de que no haya inicio de sesion exitoso
    }
};