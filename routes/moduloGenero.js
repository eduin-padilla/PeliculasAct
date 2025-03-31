//Get
const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const ModuloGenero = require('../models/ModuloGenero');

const router = Router();

//POST
router.post('/',
    [
        check('nombre', 'nombre es requerido').not().isEmpty(),
        check('estado', 'estado es requerido').isIn(['activo', 'inactivo']),

    ],

    async function(req, res){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ message: errors.array()})
            }

            let moduloGenero = new ModuloGenero();

            moduloGenero.nombre = req.body.nombre;
            moduloGenero.estado = req.body.estado;
            moduloGenero.fechaCreacion = new Date();
            moduloGenero.fechaActualizacion = new Date();
            moduloGenero.descripcion = req.body.descripcion;

            moduloGenero = await  moduloGenero.save();
            res.send(moduloGenero);
        }
        catch(error){
            console.log(error);
            res.status(500).send('ocurrio un error')
        }
    
});

//PUT

router.put('/:moduloGeneroId',
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('estado', 'estado.requerido').isIn(['activo', 'inactivo'])
    ],
    async function(req, res) {
        try {
            let moduloGenero = await ModuloGenero.findById(req.params.moduloGeneroId);

            if (!moduloGenero) {
                return res.status(404).send('Género no encontrado');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }

            moduloGenero.nombre = req.body.nombre;
            moduloGenero.estado = req.body.estado;
            moduloGenero.fechaActualizacion = new Date();
            moduloGenero.descripcion = req.body.descripcion;
            moduloGenero = await moduloGenero.save();

            res.send(moduloGenero);
        } catch (error) {
            console.error(error);
            res.status(500).send('Ha ocurrido un error');
        }
    }
);

module.exports = router;


//GET
router.get('/', async function (req, res) {
    try{
        const genero = await ModuloGenero.find();
        res.send(genero);
    }
    catch(error){
        console.log(error);
        res.status(500).send('ocurrio un error')
    }
});

//DELETE
// DELETE por ID
router.delete('/:id', async function (req, res) {
    try {
        const { id } = req.params; // Se recibe el id desde la URL
        if (!id) return res.status(400).send('El ID es requerido');

        const genero = await ModuloGenero.findByIdAndDelete(id);
        if (!genero) return res.status(404).send('Género no encontrado');

        res.send({ message: 'Género eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error al eliminar el Género');
    }
});



module.exports = router;