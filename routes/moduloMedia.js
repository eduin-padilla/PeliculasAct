const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const ModuloMedia = require('../models/ModuloMedia');

const router = Router();


router.post('/',
    [
        check('serial', 'El serial es requerido y debe ser único').not().isEmpty(),
        check('titulo', 'El título es requerido').not().isEmpty(),
        check('sinopsis', 'La sinopsis es requerida').not().isEmpty(),
        check('url', 'La URL es requerida y debe ser única').not().isEmpty(),
        check('imagenPortada', 'La imagen de portada es requerida').not().isEmpty(),
        check('añoEstreno', 'El año de estreno es requerido').isNumeric(),
        check('genero', 'El género es requerido').not().isEmpty(),
        check('director', 'El director es requerido').not().isEmpty(),
        check('productora', 'La productora es requerida').not().isEmpty(),
        check('tipo', 'El tipo es requerido').not().isEmpty(),
        check('moduloDirector', 'El módulo director es requerido').not().isEmpty(),
        check('moduloGenero', 'El módulo género es requerido').not().isEmpty(),
        check('moduloProductora', 'El módulo productora es requerido').not().isEmpty(),
        check('moduloTipo', 'El módulo tipo es requerido').not().isEmpty()
    ],
    async function (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }

            let moduloMedia = new ModuloMedia();
            moduloMedia.serial = req.body.serial;
            moduloMedia.titulo = req.body.titulo;
            moduloMedia.sinopsis = req.body.sinopsis;
            moduloMedia.url = req.body.url;
            moduloMedia.imagenPortada = req.body.imagenPortada;
            moduloMedia.añoEstreno = req.body.añoEstreno;
            moduloMedia.genero = req.body.genero;
            moduloMedia.director = req.body.director;
            moduloMedia.productora = req.body.productora;
            moduloMedia.tipo = req.body.tipo;
            moduloMedia.moduloDirector = req.body.moduloDirector;
            moduloMedia.moduloGenero = req.body.moduloGenero;
            moduloMedia.moduloProductora = req.body.moduloProductora;
            moduloMedia.moduloTipo = req.body.moduloTipo;
            moduloMedia.fechaCreacion = new Date();
            moduloMedia.fechaActualizacion = new Date();

            moduloMedia = await moduloMedia.save();
            res.send(moduloMedia);
        } catch (error) {
            console.log(error);
            res.status(500).send('Ha ocurrido un error');
        }
    }
);


router.put('/:moduloMediaId',
    [
        check('serial', 'El serial es requerido y debe ser único').not().isEmpty(),
        check('titulo', 'El título es requerido').not().isEmpty(),
        check('sinopsis', 'La sinopsis es requerida').not().isEmpty(),
        check('url', 'La URL es requerida y debe ser única').not().isEmpty(),
        check('imagenPortada', 'La imagen de portada es requerida').not().isEmpty(),
        check('añoEstreno', 'El año de estreno es requerido').isNumeric(),
        check('genero', 'El género es requerido').not().isEmpty(),
        check('director', 'El director es requerido').not().isEmpty(),
        check('productora', 'La productora es requerida').not().isEmpty(),
        check('tipo', 'El tipo es requerido').not().isEmpty(),
        check('moduloDirector', 'El módulo director es requerido').not().isEmpty(),
        check('moduloGenero', 'El módulo género es requerido').not().isEmpty(),
        check('moduloProductora', 'El módulo productora es requerido').not().isEmpty(),
        check('moduloTipo', 'El módulo tipo es requerido').not().isEmpty()
    ],
    async function (req, res) {
        try {
            let moduloMedia = await ModuloMedia.findById(req.params.moduloMediaId);
            if (!moduloMedia) {
                return res.status(404).send('Media no encontrado');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }

            moduloMedia.serial = req.body.serial;
            moduloMedia.titulo = req.body.titulo;
            moduloMedia.sinopsis = req.body.sinopsis;
            moduloMedia.url = req.body.url;
            moduloMedia.imagenPortada = req.body.imagenPortada;
            moduloMedia.añoEstreno = req.body.añoEstreno;
            moduloMedia.genero = req.body.genero;
            moduloMedia.director = req.body.director;
            moduloMedia.productora = req.body.productora;
            moduloMedia.tipo = req.body.tipo;
            moduloMedia.moduloDirector = req.body.moduloDirector;
            moduloMedia.moduloGenero = req.body.moduloGenero;
            moduloMedia.moduloProductora = req.body.moduloProductora;
            moduloMedia.moduloTipo = req.body.moduloTipo;
            moduloMedia.fechaActualizacion = new Date();

            moduloMedia = await moduloMedia.save();
            res.send(moduloMedia);
        } catch (error) {
            console.log(error);
            res.status(500).send('Ha ocurrido un error');
        }
    }
);


router.get('/', async function (req, res) {
    try {
        const media = await ModuloMedia.find();
        res.send(media);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});


router.get('/:moduloMediaId', async function (req, res) {
    try {
        const media = await ModuloMedia.findById(req.params.moduloMediaId);
        if (!media) {
            return res.status(404).send('Media no encontrado');
        }
        res.send(media);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});


router.delete('/:moduloMediaId', async function (req, res) {
    try {
        const media = await ModuloMedia.findByIdAndDelete(req.params.moduloMediaId);
        if (!media) {
            return res.status(404).send('Media no encontrado');
        }
        res.send('Media eliminado correctamente');
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;