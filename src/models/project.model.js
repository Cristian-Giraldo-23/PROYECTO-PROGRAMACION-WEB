const { DataTypes } = require('sequelize');           // Importa los tipos de datos de Sequelize
const sequelize = require('../config/db');            // Instancia de Sequelize configurada para la DB
const User = require('./user.model');                  // Modelo Usuario, usado para la FK administrador_id

// Define el modelo "Project" apuntando a la tabla 'proyectos'
const Project = sequelize.define('proyectos', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,         // Clave primaria
        autoIncrement: true       // Auto-incremental
    },
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false          // No permite nulos
    },
    descripcion: { 
        type: DataTypes.STRING, 
        allowNull: false          // No permite nulos
    },
    fecha_creacion: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW  // Valor por defecto: fecha y hora actual
    },
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,         // No permite nulos: cada proyecto debe tener un admin
        references: { 
            model: User,          // FK hacia el modelo User
            key: 'id' 
        },
        onDelete: 'CASCADE'       // Si un admin se borra, sus proyectos también
    },
}, {
    timestamps: false,           // Desactiva createdAt / updatedAt automáticos
    tableName: 'proyectos',      // Nombre real de la tabla
    hooks: {
        // Ajusta zona horaria restando 5 horas tras la creación
        afterCreate: (project) => {
            if (project.fecha_creacion) {
                project.fecha_creacion.setHours(
                    project.fecha_creacion.getHours() - 5
                );
            }
        }
    }
});

module.exports = Project;      // Exporta el modelo para usarlo en la aplicación
