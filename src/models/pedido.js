const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    listaProductos: [{
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        tipo: {
            type: String,
            enum: ['camisetas', 'pantalones', 'sudaderas'],
            required: true
        },
        descripcion: {
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
        enum: ['pendiente', 'enviado', 'cancelado'],
        default: 'pendiente'
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
}, { 
    collection: 'pedidos',
    toJSON: {
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Pedido', pedidoSchema); 