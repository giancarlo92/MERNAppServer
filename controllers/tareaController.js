const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearTarea = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try {
        const {proyecto} = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'El proyecto no existe'});
        }

        // verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        // crear un nuevo Tarea
        const tarea = new Tarea(req.body);

        // guardamos el tarea
        await tarea.save();
        return res.json(tarea);

    } catch (error) {
        console.log(error);
    }
};

// Obtiene todos los proyectos del usuario actual
exports.obtenerTareas = async (req, res) => {
    try {
        const {proyecto} = req.query;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'El proyecto no existe'});
        }

        const tareas = await Tarea.find({proyecto}).sort({creado: -1});
        return res.json({tareas});
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

// actualizar tarea
exports.actualizarTarea = async (req, res) => {
    try {
        // revisar si hay errores
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()});
        }

        const {proyecto, nombre, estado} = req.body;

        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'La tarea no existe'});
        }

        const existeProyecto = await Proyecto.findById(proyecto);

        // verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        // actualizar
        tarea = await Tarea.findByIdAndUpdate({_id: req.params.id}, {$set: nuevaTarea}, {new: true});
        return res.json({tarea});

    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

// eliminar tarea
exports.eliminarTarea = async (req, res) => {
    try {
        // revisar si hay errores
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()});
        }

        const {proyecto} = req.query;

        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'La tarea no existe'});
        }

        const existeProyecto = await Proyecto.findById(proyecto);

        // verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        // eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});
        return res.json({msg: 'Tarea eliminada'});

    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}