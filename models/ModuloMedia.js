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
        required: false,
        unique: true
    },
    imagenPortada: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: false
    },
    fechaActualizacion: {
        type: Date,
        required: false
    },
    añoEstreno: {
        type: Number,
        required: true
    },
    
    genero: {
        type: Schema.Types.String,
        ref: 'Genero',
        required: true,
    
    },
    director: {
        type: Schema.Types.String,
        ref: 'Director',
        required: true,
        
    },
    productora: {
        type: Schema.Types.String,
        ref: 'Productora',
        required: true,
        
    },
    tipo: {
        type: Schema.Types.String,
        ref: 'Tipo',
        required: true,
    },
    moduloDirector: {
        type: Schema.Types.String,
        ref: 'ModuloDirector',
        required:false,
    },
    moduloGenero:{
        type: Schema.Types.String,
        ref: 'ModuloGenero',
        required: false,
    },
    moduloProductora:{
        type: Schema.Types.String,
        ref: 'ModuloProductora',
        required: false,
    },
    moduloTipo:{
        type: Schema.Types.String,
        ref: 'ModuloTipo',
        required: false,
    }
});

module.exports = model('ModuloMedia', ModuloMediaSchema);
