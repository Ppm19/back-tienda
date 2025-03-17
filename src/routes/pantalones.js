const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Pantalon = require('../models/pantalon');

router.get('/', async (req, res) => {
    try {
        const pantalones = await Pantalon.find();
        res.json(pantalones);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ mensaje: 'ID de pantalón no válido' });
        }
        const pantalon = await Pantalon.findById(req.params.id);
        if (!pantalon) {
            return res.status(404).json({ mensaje: 'Pantalón no encontrado' });
        }
        res.json(pantalon);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.post('/', async (req, res) => {
    const pantalon = new Pantalon(req.body);
    try {
        const nuevoPantalon = await pantalon.save();
        res.status(201).json(nuevoPantalon);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ mensaje: 'ID de pantalón no válido' });
        }
        const pantalon = await Pantalon.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!pantalon) {
            return res.status(404).json({ mensaje: 'Pantalón no encontrado' });
        }
        res.json(pantalon);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ mensaje: 'ID de pantalón no válido' });
        }
        const pantalon = await Pantalon.findByIdAndDelete(req.params.id);
        if (!pantalon) {
            return res.status(404).json({ mensaje: 'Pantalón no encontrado' });
        }
        res.json({ mensaje: 'Pantalón eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.patch('/:id/stock', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ mensaje: 'ID de pantalón no válido' });
        }
        
        const { stock } = req.body;
        if (typeof stock !== 'number' || stock < 0) {
            return res.status(400).json({ mensaje: 'Stock no válido' });
        }

        const pantalon = await Pantalon.findByIdAndUpdate(
            req.params.id,
            { stock },
            { new: true }
        );

        if (!pantalon) {
            return res.status(404).json({ mensaje: 'Pantalón no encontrado' });
        }

        res.json(pantalon);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = router; 