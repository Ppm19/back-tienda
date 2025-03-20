const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Pedido = require('../models/pedido');
const Camiseta = require('../models/camiseta');
const Pantalon = require('../models/pantalon');
const Sudadera = require('../models/sudadera');

router.get('/', async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        const pedidosPopulados = await Promise.all(pedidos.map(async (pedido) => {
            const productosPopulados = await Promise.all(pedido.listaProductos.map(async (item) => {
                let producto;
                switch (item.tipo) {
                    case 'camisetas':
                        producto = await Camiseta.findById(item.producto);
                        break;
                    case 'pantalones':
                        producto = await Pantalon.findById(item.producto);
                        break;
                    case 'sudaderas':
                        producto = await Sudadera.findById(item.producto);
                        break;
                }
                return {
                    ...item.toObject(),
                    producto
                };
            }));
            return {
                ...pedido.toObject(),
                listaProductos: productosPopulados
            };
        }));
        res.json(pedidosPopulados);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.get('/pendientes', async (req, res) => {
    try {
        const pedidos = await Pedido.find({ estado: 'pendiente' });
        const pedidosPopulados = await Promise.all(pedidos.map(async (pedido) => {
            const productosPopulados = await Promise.all(pedido.listaProductos.map(async (item) => {
                let producto;
                switch (item.tipo) {
                    case 'camisetas':
                        producto = await Camiseta.findById(item.producto);
                        break;
                    case 'pantalones':
                        producto = await Pantalon.findById(item.producto);
                        break;
                    case 'sudaderas':
                        producto = await Sudadera.findById(item.producto);
                        break;
                }
                return {
                    ...item.toObject(),
                    producto
                };
            }));
            return {
                ...pedido.toObject(),
                listaProductos: productosPopulados
            };
        }));
        res.json(pedidosPopulados);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ mensaje: 'ID de pedido no válido' });
        }
        const pedido = await Pedido.findById(req.params.id);
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        const productosPopulados = await Promise.all(pedido.listaProductos.map(async (item) => {
            let producto;
            switch (item.tipo) {
                case 'camisetas':
                    producto = await Camiseta.findById(item.producto);
                    break;
                case 'pantalones':
                    producto = await Pantalon.findById(item.producto);
                    break;
                case 'sudaderas':
                    producto = await Sudadera.findById(item.producto);
                    break;
            }
            return {
                ...item.toObject(),
                producto
            };
        }));

        const pedidoPopulado = {
            ...pedido.toObject(),
            listaProductos: productosPopulados
        };

        res.json(pedidoPopulado);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { listaProductos, total, descripcion,usuario } = req.body;
        
        const pedido = new Pedido({
            listaProductos: listaProductos,
            total: total,
            estado: 'pendiente',
            descripcion: descripcion,
            usuario: usuario
        });

        const nuevoPedido = await pedido.save();
        res.status(201).json(nuevoPedido);
        
    } catch (error) {
        console.error('Error al crear pedido:', error);
        res.status(400).json({ mensaje: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ mensaje: 'ID de pedido no válido' });
        }
        const pedido = await Pedido.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
        res.json(pedido);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ mensaje: 'ID de pedido no válido' });
        }
        const pedido = await Pedido.findByIdAndDelete(req.params.id);
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
        res.json({ mensaje: 'Pedido eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = router; 