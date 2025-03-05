//Get
const { Router } = require ('express');
const { validationResult, check } = require('express-validator');
const ModuloProductora = require('../models/ModuloProductora');

const router = Router();

//POST
router.post('/', 
    [
        check('nombre', 'nombre es requerido').not().isEmpty(),
        check('estado', 'estado es requerido').isIn(['activo', 'inactivo']),
        check('slogan', 'slogan es requerido').not().isEmpty(),

    ],

    async function (req, res) {

        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message : errors.array})
            }

            let moduloProductora = new ModuloProductora();

            moduloProductora.nombre = req.body.nombre;
            moduloProductora.estado = req.body.estado;
            moduloProductora.fechaCreacion = new Date();
            moduloProductora.fechaActualizacion = new Date();
            moduloProductora.slogan = req.body.slogan;
            moduloProductora.descripcion = req.body.descripcion;

            moduloProductora = await moduloProductora.save();

            res.send(moduloProductora);
        }
        catch (error){
            console.log(error);
            res.status(500).send('ocurrio un error')
        }
    
});


//PUT
router.put('/moduloProductoraId',

    [
        check('nombre', 'nombre es requerido').not().isEmpty(),
        check('estado', 'estado es requerido').isIn(['activo', 'inactivo']),
        check('slogan', 'slogan es requerido').not().isEmpty()
    ],

    async function (req, res) {
        try {
            let moduloProductora = new ModuloProductora.findById(req.params.ModuloProductoraID);

            if(!moduloProductora){
                return res.send('no existe este productor')
            }

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message : errors.array()})
            }

                moduloProductora.nombre = req.body.nombre;
                moduloProductora.estado = req.body.estado;
                moduloProductora.fechaActualizacion = new Date();
                moduloProductora.slogan = req.body.slogan;
                moduloProductora.descripcion = req.body.descripcion;

                moduloProductora = await moduloProductora.save();

                res.send(moduloProductora);
            }
            catch(error){
                console.log(error);
                res.status(500).send('ocurrio un error')
            }
});

//GET
router.get('/', async function (req, res) {
    try{
        const productora = await ModuloProductora.find();
        res.send(productora);
    }
    catch(error){
        console.log(error);
        res.status(500).send('ocurrio un error')
    }
});

//DELETE
router.delete('/', async function (req, res) {
    try {
        const { nombre } = req.body; // Se recibe el nombre desde el body
        if (!nombre) return res.status(400).send('El nombre es requerido');

        const productora = await ModuloProductora.findOneAndDelete({ nombre });
        if (!productora) return res.status(404).send('Productora no encontrada');

        res.send('Productora eliminado');
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al eliminar la productora');
    }
});

module.exports = router;