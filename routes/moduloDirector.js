const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const ModuloDirector = require('../models/ModuloDirector');

const router = Router();

// POST - Crear un director
router.post(
    '/',
    [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('estado', 'El estado debe ser "activo" o "inactivo"').isIn(['activo', 'inactivo']),
    ],
    async function (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }

            let moduloDirector = new ModuloDirector({
                nombre: req.body.nombre,
                estado: req.body.estado,
                fechaCreacion: new Date(),
                fechaActualizacion: new Date(),
            });

            moduloDirector = await moduloDirector.save();
            res.send(moduloDirector);
        } catch (error) {
            console.error(error);
            res.status(500).send('Ha ocurrido un error');
        }
    }
);

// PUT - Actualizar un director
router.put(
    '/:moduloDirectorId',
    [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('estado', 'El estado debe ser "activo" o "inactivo"').isIn(['activo', 'inactivo']),
    ],
    async function (req, res) {
        try {
            let moduloDirector = await ModuloDirector.findById(req.params.moduloDirectorId);

            if (!moduloDirector) {
                return res.status(404).send('Director no encontrado');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }

            moduloDirector.nombre = req.body.nombre;
            moduloDirector.estado = req.body.estado;
            moduloDirector.fechaActualizacion = new Date();

            moduloDirector = await moduloDirector.save();
            res.send(moduloDirector);
        } catch (error) {
            console.error(error);
            res.status(500).send('Ha ocurrido un error');
        }
    }
);

// GET - Obtener todos los directores
router.get('/', async function (req, res) {
    try {
        const directores = await ModuloDirector.find();
        res.send(directores);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error al obtener los directores');
    }
});

// DELETE - Eliminar un director por nombre
router.delete('/:id', async function (req, res) {
    try {
        const { id } = req.params; // Se recibe el id desde la URL

        const director = await ModuloDirector.findByIdAndDelete(id);
        if (!director) return res.status(404).send('Director no encontrado');

        res.send('Director eliminado correctamente');
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al eliminar el Director');
    }
});


module.exports = router;
