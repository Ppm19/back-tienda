const mongoose = require('mongoose');

const pantalonSchema = new mongoose.Schema({
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
        default: 'pantalon'
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    }
}, { collection: 'pantalones' });

module.exports = mongoose.model('Pantalon', pantalonSchema);