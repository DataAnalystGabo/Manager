require('dotenv').config({ path: './.env' });
const express        = require('express');
const cors           = require('cors');
const authRoutes     = require('./routes/authRoutes.js');
const { connectDB }  = require('./config/db.js');
const path           = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ 
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST']
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Sirve los archivos estáticos

// Conexión a la base de datos
connectDB();

// Rutas
app.use('/api/auth', authRoutes);

// Manejo de errores (más específico)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});