//Get
const { Router } = require ('express');
const { validationResult, check } = require('express-validator');
const ModuloTipo = require('../models/ModuloTipo');

const router = Router();

//POST
router.post('/',
    [
        check ('nombre', 'nombre.requerido').not().isEmpty(),

    ],

    async function (req, res) {

        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({messaje : errors.array})
            }

            let moduloTipo	= new ModuloTipo();

            moduloTipo.nombre = req.body.nombre;
            moduloTipo.fechaCreacion = new Date();
            moduloTipo.fechaActualizacion = new Date();
            moduloTipo.descripcion = req.body.descripcion;

            moduloTipo = await moduloTipo.save();

            res.send(moduloTipo);
        }

        catch (error){
            console.log(error);
            res.status(500).send('ocurrio un error')
        }
        
    }
);

//PUT
router.put('/:moduloTipoId',
    [
        check('nombre', 'nombre.requerido').not().isEmpty()
    ],
    async function(req, res) {
        try {
            let moduloTipo = await ModuloTipo.findById(req.params.moduloTipoId);

            if (!moduloTipo) {
                return res.status(404).send('Módulo Tipo no existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }

            moduloTipo.nombre = req.body.nombre;
            moduloTipo.fechaActualizacion = new Date();
            moduloTipo.descripcion = req.body.descripcion;
            moduloTipo = await moduloTipo.save();
            
            res.send(moduloTipo);

        } catch (error) {
            console.log(error);
            res.status(500).send('Ha ocurrido un error');
        }
    }
);



//GET
router.get('/', async function (req, res) {
    try{
        const tipo = await ModuloTipo.find();
        res.send(tipo);
    }
    catch(error){
        console.log(error);
        res.status(500).send('ocurrio un error')
    }
});

//DELETE

router.delete('/', async function (req, res) {
    try {
        const { nombre } = req.body; 
        if (!nombre) return res.status(400).send('El nombre es requerido');

        const tipo = await ModuloTipo.findOneAndDelete({ nombre }); 
        if (!tipo) return res.status(404).send('Tipo de equipo no encontrado'); 

        res.send('Tipo de equipo eliminado'); 
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al eliminar el tipo de equipo'); 
    }
});


module.exports = router;