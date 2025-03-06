const express = require('express');
const router = express.Router();

const camisetasRoutes = require('./camisetas');
const pantalonesRoutes = require('./pantalones');
const sudaderasRoutes = require('./sudaderas');
const usuariosRoutes = require('./usuarios');
const pedidosRoutes = require('./pedidos');

router.get('/', (req, res) => {
    res.json({ mensaje: 'API funcionando correctamente' });
});

router.use('/camisetas', camisetasRoutes);
router.use('/pantalones', pantalonesRoutes);
router.use('/sudaderas', sudaderasRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/pedidos', pedidosRoutes);

module.exports = router; 