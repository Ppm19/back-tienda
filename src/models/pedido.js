const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    listaProductos: [{
        _id: Number,
        nombre: String,
        descripcion: String,
        precio: Number,
        foto: String,
        tipo: String,
        stock: Number
    }],
    total: Number,
    estado: {
        type: String,
        enum: ['pendiente', 'aceptado', 'rechazado'],
        default: 'pendiente'
    },
    usuario: String
}, {
    collection: 'pedidos'
});

module.exports = mongoose.model('Pedido', pedidoSchema);