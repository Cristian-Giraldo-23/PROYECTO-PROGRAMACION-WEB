const { DataTypes } = require('sequelize');      // Importa los tipos de datos de Sequelize
const sequelize = require('../config/db');       // Instancia de Sequelize ya configurada para la DB

// Define el modelo "Rol" para la tabla 'roles', que representa los diferentes roles en el sistema
const Rol = sequelize.define('roles', {
    // Definición del campo 'id', que será la clave primaria de la tabla
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,     // Establece este campo como clave primaria
        autoIncrement: true   // Hace que el valor se incremente automáticamente
    },
    // Definición del campo 'nombre', que no puede ser nulo y debe ser único
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,      // No puede ser nulo
        unique: true           // Debe ser único en la base de datos
    }
}, {
    timestamps: false,       // Desactiva los campos automáticos createdAt/updatedAt
    tableName: 'roles'       // Especifica el nombre exacto de la tabla en la base de datos
});

module.exports = Rol;        // Exporta el modelo para usarlo en otras partes de la aplicación
