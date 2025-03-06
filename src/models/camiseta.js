const mongoose = require('mongoose');

const camisetaSchema = new mongoose.Schema({
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
        default: 'camiseta'
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    }
}, { collection: 'camisetas' });

module.exports = mongoose.model('Camiseta', camisetaSchema); 