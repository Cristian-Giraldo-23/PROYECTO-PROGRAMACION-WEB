const { DataTypes } = require('sequelize'); // Importa los tipos de datos de Sequelize (para definir las columnas de la base de datos)
const sequelize = require('../config/db'); // Importa la configuración de la base de datos (instancia de Sequelize)

// Define el modelo "Permiso" para la tabla 'permisos'
const Permiso = sequelize.define('permisos', {
    // Define la columna 'id' como clave primaria, tipo de dato entero y autoincrementable
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    
    // Define la columna 'nombre' como cadena de texto, no permite valores nulos y debe ser única
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
    // Desactiva los timestamps (createdAt y updatedAt) para este modelo
    timestamps: false,

    // Especifica el nombre real de la tabla en la base de datos
    tableName: 'permisos',
});

// Exporta el modelo para ser usado en otras partes de la aplicación
module.exports = Permiso;
