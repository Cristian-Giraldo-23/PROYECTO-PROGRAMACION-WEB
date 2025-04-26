const jwt = require('jsonwebtoken'); // Importa la librería para manejar JWT (JSON Web Tokens)
const dotenv = require('dotenv'); // Importa dotenv para acceder a variables de entorno
dotenv.config(); // Carga las variables de entorno definidas en el archivo .env

const SECRET_KEY = process.env.JWT_SECRET; // Obtiene la clave secreta para firmar y verificar los tokens desde el archivo .env

// Middleware para autenticar el token en la solicitud
const authenticateToken = (req, res, next) => {
    // Extrae el token del encabezado 'Authorization' y lo separa del prefijo 'Bearer'
    const token = req.header('Authorization')?.split(' ')[1];

    // Si no se encuentra un token, retorna un error 401 (no autorizado)
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, no proporcionó token' });
    }

    // Verifica el token usando la clave secreta, y si es válido, extrae los datos del usuario
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            // Si el token no es válido o ha expirado, retorna un error 403 (prohibido)
            return res.status(403).json({ message: 'Token no válido' });
        }
        // Si el token es válido, almacena los datos del usuario en `req.user` y pasa al siguiente middleware
        req.user = user;
        next();
    });
};

// Middleware para verificar si el usuario tiene el rol permitido
const checkRole = (roles) => {
    return (req, res, next) => {
        const { rol_id } = req.user; // Obtiene el rol del usuario desde el objeto `req.user`, que fue asignado en `authenticateToken`

        // Si el rol del usuario no está en la lista de roles permitidos, retorna un error 403
        if (!roles.includes(rol_id)) {
            return res.status(403).json({ message: 'Acceso denegado, no tiene permisos para realizar esta acción' });
        }

        // Si el rol es permitido, pasa al siguiente middleware o controlador
        next();
    };
};

// Exporta los middlewares para que se puedan usar en otras partes de la aplicación
module.exports = { authenticateToken, checkRole };
