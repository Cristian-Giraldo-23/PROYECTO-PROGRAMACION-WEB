const Project = require('../models/project.model');
const projectService = require('../services/project.service');

// Crea un nuevo proyecto usando los datos del cuerpo de la solicitud
exports.createProject = async (req, res) => {
    try {
        const { nombre, descripcion, fecha_inicio, fecha_fin, administrador_id } = req.body;
        const data = { nombre, descripcion, fecha_inicio, fecha_fin, administrador_id };
        const newProject = await projectService.createProject(data);
        res.status(201).json({ message: 'Proyecto creado exitosamente', project: newProject });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Consulta todos los proyectos con sus relaciones
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json({ message: 'Proyectos consultados con exito', projects });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Consulta un proyecto específico por su ID
exports.getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await projectService.getProjectById(id);
        res.status(200).json({ message: 'Proyecto consultado con exito', project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualiza un proyecto existente según su ID
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, fecha_inicio, fecha_fin, administrador_id } = req.body;
    const data = { nombre, descripcion, fecha_inicio, fecha_fin, administrador_id };
    try {
        const project = await projectService.updateProject(id, data);
        res.status(200).json({ message: 'Proyecto actualizado con éxito', project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Elimina un proyecto por su ID
exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await projectService.deleteProject(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Asocia uno o varios usuarios a un proyecto
exports.assignUserToProjects = async (req, res) => {
    let { project_id, user_id } = req.body;

    // Asegura que user_id sea un array
    if (!Array.isArray(user_id)) {
        user_id = [user_id];
    }

    try {
        const result = await projectService.assignUserToProjects(project_id, user_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Quita la asociación de un usuario con un proyecto
exports.removeUserFromProjects = async (req, res) => {
    const { project_id, user_id } = req.body;
    try {
        const result = await projectService.removeUserFromProjects(project_id, user_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}