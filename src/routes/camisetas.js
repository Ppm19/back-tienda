const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Camiseta = require('../models/camiseta');

router.get('/', async (req, res) => {
    try {
        const camisetas = await Camiseta.find();
        res.json(camisetas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ mensaje: 'ID de camiseta no válido' });
        }
        const camiseta = await Camiseta.findById(req.params.id);
        if (!camiseta) {
            return res.status(404).json({ mensaje: 'Camiseta no encontrada' });
        }
        res.json(camiseta);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.post('/', async (req, res) => {
    const camiseta = new Camiseta(req.body);
    try {
        const nuevaCamiseta = await camiseta.save();
        res.status(201).json(nuevaCamiseta);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const camiseta = await Camiseta.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!camiseta) {
            return res.status(404).json({ mensaje: 'Camiseta no encontrada' });
        }
        res.json(camiseta);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const camiseta = await Camiseta.findByIdAndDelete(req.params.id);
        if (!camiseta) {
            return res.status(404).json({ mensaje: 'Camiseta no encontrada' });
        }
        res.json({ mensaje: 'Camiseta eliminada' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = router; 