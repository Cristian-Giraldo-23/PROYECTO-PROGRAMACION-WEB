const jwt = require('jsonwebtoken');//importar libreria jsonweb token para generar token
const bcrypt = require('bcrypt');//importar libreria bcrypt para encriptar contraseñas
const dotenv = require('dotenv');
const User = require('../models/user.model');//importar los modelos de usuario y roles
const RolePermissions = require('../models/role_permissions.models');//importar los modelos de usuario y roles

dotenv.config();

console.log(process.env.JWT_SECRET); // Esto debería imprimir la clave secreta de tu archivo .env

const SECRET_KEY = process.env.JWT_SECRET; //Obtener la clave secreta desde las variables de entorno

exports.loginUser = async (email, password) => { //El servicio que se va a llamar loginUser, recibe un email y password
    try {
        //Verificar si el usuario existe
        const user = await User.findOne({ where: { email } }); //Verifica el email

        //Si el user es undefind, nos arroja el error si no lo encuentra
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        //Verifica la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password) //Encritpta la contraseña y la compara con la del usuario en la base de datos
        
        //Si la contraseña es undefind, nos arroja el error si no lo encuentra
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        //Consultar los permisos de rol
        const rolePermissions = await RolePermissions.findAll({
            where: { rol_id: user.rol_id }, //Revisa los permisos si es usuario o administrador
            attributes: ['permiso_id']
        });

        const permisos = rolePermissions.map(rp => rp.permiso_id);

        //Generear un token JWT
        const token = jwt.sign( //Con la firma sign le damos la estructura del token
            { id:user.id, nombre: user.nombre, email: user.email, rol_id: user.rol_id, permisos },
            SECRET_KEY,
            { expiresIn: '1h' } //Le damos una expiracion de seguridad a la cuenta cuando este inactiva por una hora por seguridad
        );

        return token; //Retornamos el token
    } catch (error) {
        //Si existe error en todas las validaciones anteriores nos sale un error en consola que es error al iniciar sesion
        throw new Error(error.message || 'Error al iniciar sesion');
    }
};