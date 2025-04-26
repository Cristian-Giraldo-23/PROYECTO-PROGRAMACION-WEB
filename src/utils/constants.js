// Definición de los roles disponibles en el sistema
const ROLES = {
    ADMIN: 1, // Rol de administrador con todos los permisos
    USER: 2   // Rol de usuario estándar con permisos limitados
};

module.exports = ROLES; // Exporta los roles para usarlos en middlewares y autorización
