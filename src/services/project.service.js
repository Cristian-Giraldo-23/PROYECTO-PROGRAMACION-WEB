const Project = require('../models/project.model');
const User = require('../models/user.model'); // Asegúrate de que este modelo exista

exports.createProject = async (data) => {
    try {
        const project = await Project.create(data);
        return project;
    } catch (err) {
        throw new Error(`Error al crear el proyecto: ${err.message}`);
    }
};


exports.getAllProjects = async () => {
    try {
        const projects = await Project.findAll({
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre']
                },
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: { attributes: [] }
                }
            ]
        });
        return projects;
    } catch (err) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};


// project.services.js

exports.updateProject = async (id, data) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }

        await project.update(data);
        return project;
    } catch (err) {
        throw new Error(`Error al actualizar el proyecto: ${err.message}`);
    }
};


exports.deleteProject = async (id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }

        await project.destroy();
        return { message: 'Proyecto eliminado con éxito' };
    } catch (err) {
        throw new Error(`Error al eliminar el proyecto: ${err.message}`);
    }
};
