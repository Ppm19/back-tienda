const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    listaProductos: [{
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        tipo: {
            type: String,
            enum: ['camiseta', 'pantalon', 'sudadera'],
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'enviado', 'entregado', 'cancelado'],
        default: 'pendiente'
    }
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