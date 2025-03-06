const express = require('express');
const router = express.Router();
const Sudadera = require('../models/sudadera');

router.get('/', async (req, res) => {
    try {
        const sudaderas = await Sudadera.find();
        res.json(sudaderas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const sudadera = await Sudadera.findById(req.params.id);
        if (!sudadera) {
            return res.status(404).json({ mensaje: 'Sudadera no encontrada' });
        }
        res.json(sudadera);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.post('/', async (req, res) => {
    const sudadera = new Sudadera(req.body);
    try {
        const nuevaSudadera = await sudadera.save();
        res.status(201).json(nuevaSudadera);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const sudadera = await Sudadera.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!sudadera) {
            return res.status(404).json({ mensaje: 'Sudadera no encontrada' });
        }
        res.json(sudadera);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const sudadera = await Sudadera.findByIdAndDelete(req.params.id);
        if (!sudadera) {
            return res.status(404).json({ mensaje: 'Sudadera no encontrada' });
        }
        res.json({ mensaje: 'Sudadera eliminada' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = router; 