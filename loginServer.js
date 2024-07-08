const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000;

// Middleware para permitir solicitudes CORS
app.use(cors());


app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Sirve los archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));


// Ruta para manejar el envío del formulario
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Email: ${email}, Password: ${password}`)
    res.send(`Su email es ${email}`);
});


// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});
