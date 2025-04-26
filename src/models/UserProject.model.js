const { DataTypes } = require('sequelize');      // Importa los tipos de datos de Sequelize
const sequelize = require('../config/db');       // Instancia de Sequelize ya configurada para la DB
const User = require('./user.model');            // Importa el modelo de usuario (User)
const Project = require('./project.model');     // Importa el modelo de proyecto (Project)

// Define el modelo "UserProject" para la tabla 'usuarios_proyectos', que representará la relación entre usuarios y proyectos
const UserProject = sequelize.define('usuarios_proyectos', {
    // Definición del campo 'id', que será la clave primaria de la tabla
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,     // Establece este campo como clave primaria
        autoIncrement: true   // Hace que el valor se incremente automáticamente
    },
    // Definición del campo 'usuario_id', que es una referencia al 'id' de la tabla 'usuarios'
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,     // No puede ser nulo
        references: { 
            model: User,      // Establece una relación con la tabla 'usuarios'
            key: 'id'         // Hace referencia al campo 'id' de la tabla 'usuarios'
        }
    },
    // Definición del campo 'proyecto_id', que es una referencia al 'id' de la tabla 'proyectos'
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,     // No puede ser nulo
        references: { 
            model: Project,   // Establece una relación con la tabla 'proyectos'
            key: 'id'         // Hace referencia al campo 'id' de la tabla 'proyectos'
        }
    }
}, {
    timestamps: false,       // Desactiva los campos automáticos createdAt/updatedAt
    tableName: 'usuarios_proyectos', // Especifica el nombre exacto de la tabla en la base de datos
    indexes: [{ unique: true, fields: ['usuario_id', 'proyecto_id'] }] // Índice único para evitar duplicados en la relación
});

module.exports = UserProject;    // Exporta el modelo para usarlo en otras partes de la aplicación
