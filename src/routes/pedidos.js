const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Pedido = require('../models/pedido');

router.get('/', async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.get('/pendientes', async (req, res) => {
    try {
        const pedidos = await Pedido.find({ estado: 'pendiente' });
        res.json(pedidos);
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
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);

        const { listaProductos, total, usuario } = req.body;
        
        if (!listaProductos || !Array.isArray(listaProductos) || listaProductos.length === 0) {
            return res.status(400).json({ mensaje: 'La lista de productos es requerida y no puede estar vacía' });
        }

        if (total === undefined || total === null) {
            return res.status(400).json({ mensaje: 'El total es requerido' });
        }

        if (!usuario) {
            return res.status(400).json({ mensaje: 'El usuario es requerido' });
        }

        const pedido = new Pedido({
            listaProductos,
            total,
            estado: 'pendiente',
            usuario
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