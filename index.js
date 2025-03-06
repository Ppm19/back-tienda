require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');
const cors = require('./src/middleware/cors');
const routes = require('./src/routes/rutas');

const app = express();

app.use(cors);
app.use(express.json());

app.use('/api', routes);

connectDB();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ mensaje: 'Algo salió mal!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});