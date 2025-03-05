const { Schema, model} = require('mongoose')

const ModuloProductoraSchema = Schema ({
    
    nombre: {
        type: String,
        required: true,
        
    },
    estado: {
        type: String,
        required: true,
        enum: [
            'activo', 'inactivo'
        ]
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaActualizacion:{
        type: Date,
        required: true
    },
    slogan:{
        type: String,
        required: true
    },
    
    descripcion:{
        type: String,
        required: false
    }

});

module.exports = model('ModuloProductora', ModuloProductoraSchema);