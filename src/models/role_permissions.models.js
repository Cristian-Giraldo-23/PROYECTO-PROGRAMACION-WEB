const { DataTypes } = require('sequelize');      // Importa los tipos de datos de Sequelize
const sequelize = require('../config/db');       // Instancia de Sequelize ya configurada para la DB

// Define el modelo intermedio "RolePermission" para la tabla 'roles_permisos',
// que representa la relación many-to-many entre Roles y Permisos.
const RolePermission = sequelize.define('roles_permisos', {
    // Clave foránea hacia la tabla 'roles'
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' }
    },
    // Clave foránea hacia la tabla 'permisos'
    permiso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'permisos', key: 'id' }
    }
}, {
    timestamps: false,        // Desactiva campos automáticos createdAt/updatedAt
    tableName: 'roles_permisos' // Especifica el nombre exacto de la tabla en la DB
});

module.exports = RolePermission; // Exporta el modelo para usarlo en asociaciones u queries
