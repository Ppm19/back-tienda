const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    correo: {
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    pedidos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido'
    }],
    admin: {
        type: Boolean,
        default: false
    }
}, { collection: 'usuarios' });

module.exports = mongoose.model('Usuario', usuarioSchema); 