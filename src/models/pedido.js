const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    listaProductos: [{
        _id: {
            type: Number,
            required: true
        },
        foto: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        precio: {
            type: Number,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'aceptado', 'cancelado'],
        default: 'pendiente'
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
}, { collection: 'pedidos' });

module.exports = mongoose.model('Pedido', pedidoSchema);