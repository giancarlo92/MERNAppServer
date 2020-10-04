const express = require('express');
const { route } = require('./auth');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator'); 

// Crea tareas
// api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre de la tarea debe ser obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto debe ser obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

router.get('/',
    auth,
    tareaController.obtenerTareas
);

router.put('/:id',
    auth,
    tareaController.actualizarTarea
);

router.delete('/:id',
    auth,
    tareaController.eliminarTarea
);

module.exports = router;
