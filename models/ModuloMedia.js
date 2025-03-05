const { Schema, model } = require('mongoose');

const ModuloMediaSchema = Schema({
    serial: {
        type: Number,
        required: true,
        unique: true
    },
    titulo: {
        type: String,
        required: true,
    },
    sinopsis: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    imagenPortada: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaActualizacion: {
        type: Date,
        required: true
    },
    añoEstreno: {
        type: Number,
        required: true
    },
    
    genero: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: true,
    
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true,
        
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: true,
        
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
    },
    moduloDirector: {
        type: Schema.Types.ObjectId,
        ref: 'ModuloDirector',
        required:true
    },
    moduloGenero:{
        type: Schema.Types.ObjectId,
        ref: 'ModuloGenero',
        required: true
    },
    moduloProductora:{
        type: Schema.Types.ObjectId,
        ref: 'ModuloProductora',
        required: true
    },
    moduloTipo:{
        type: Schema.Types.ObjectId,
        ref: 'ModuloTipo',
        required: true
    }
});

module.exports = model('ModuloMedia', ModuloMediaSchema);
