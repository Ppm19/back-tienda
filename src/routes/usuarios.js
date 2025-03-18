const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = require('../models/usuario');

router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find().populate('pedidos');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ mensaje: 'ID de usuario no válido' });
        }
        const usuario = await Usuario.findById(req.params.id).populate('pedidos');
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.post('/', async (req, res) => {
    const usuario = new Usuario(req.body);
    try {
        const nuevoUsuario = await usuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ mensaje: 'ID de usuario no válido' });
        }
        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ mensaje: 'ID de usuario no válido' });
        }
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json({ mensaje: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
        }

        if (usuario.password !== password) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
        }

        res.json({
            mensaje: 'Login exitoso',
            usuario: { id: usuario._id, correo: usuario.correo }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
});

module.exports = router; 