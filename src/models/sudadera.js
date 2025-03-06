const mongoose = require('mongoose');

const sudaderaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        default: 'sudadera'
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    }
}, { collection: 'sudaderas' });

module.exports = mongoose.model('Sudadera', sudaderaSchema);