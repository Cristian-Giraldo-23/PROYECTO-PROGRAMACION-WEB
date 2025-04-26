const { DataTypes } = require('sequelize');      // Importa los tipos de datos de Sequelize
const sequelize = require('../config/db');       // Instancia de Sequelize ya configurada para la DB

// Define el modelo "User" para la tabla 'usuarios', que representa a los usuarios en el sistema
const User = sequelize.define('usuarios', {
    // Definición del campo 'id', que será la clave primaria de la tabla
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,     // Establece este campo como clave primaria
        autoIncrement: true   // Hace que el valor se incremente automáticamente
    },
    // Definición del campo 'nombre', que no puede ser nulo
    nombre: {
        type: DataTypes.STRING,
        allowNull: false      // No puede ser nulo
    },
    // Definición del campo 'email', que debe ser único y no puede ser nulo
    email: {
        type: DataTypes.STRING,
        allowNull: false,     // No puede ser nulo
        unique: true          // Debe ser único en la base de datos
    },
    // Definición del campo 'password', que no puede ser nulo
    password: {
        type: DataTypes.STRING,
        allowNull: false      // No puede ser nulo
    },
    // Definición del campo 'rol_id', que hace referencia al 'id' de la tabla 'roles'
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,     // No puede ser nulo
        references: { 
            model: 'roles',   // Establece una relación con la tabla 'roles'
            key: 'id'         // Hace referencia al campo 'id' de la tabla 'roles'
        }
    },
    // Definición del campo 'administrador_id', que hace referencia al 'id' de otro usuario (si aplica)
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: true,      // Puede ser nulo si no tiene administrador asignado
        references: { 
            model: 'usuarios', // Establece una relación con la tabla 'usuarios'
            key: 'id'          // Hace referencia al campo 'id' de la tabla 'usuarios'
        }
    }
}, {
    timestamps: false,       // Desactiva los campos automáticos createdAt/updatedAt
    tableName: 'usuarios'    // Especifica el nombre exacto de la tabla en la base de datos
});

module.exports = User;        // Exporta el modelo para usarlo en otras partes de la aplicación
