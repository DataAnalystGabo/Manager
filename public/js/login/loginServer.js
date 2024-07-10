require('dotenv').config({ path: '../.env'});
const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const { Pool }   = require('pg');
const bcrypt     = require('bcrypt');
const app        = express();
const PORT       = process.env.PORT || 3000;

// Middleware para permitir solicitudes CORS
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Sirve los archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));


//Establecemos la conexión a la base de datos
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});


//Prueba de conexión
pool.connect((err, client, release) => {
    if(err) {
        return console.error('Error')
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error 2');
        }
        console.log('Conexión Exitosa - ', result.rows);
    });
});


// Ruta para manejar el envío del formulario
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userCheck = await pool.query('SELECT password_hash FROM Users WHERE email = $1', [email]);

        if (userCheck.rows.length > 0) {

            const user          = userCheck.rows[0];
            const storedHash    = String(user.password_hash);
            const inputPassword = String(password);
            const match         = await bcrypt.compare(inputPassword, storedHash);

            //Si el email y el password son correctos
            if (match) {
                return res.status(201).send('¡Login Exitoso!');
            } else {
                return res.status(401).send('el email o la contraseña son incorrectas.');
            }

        } else {
            return res.status(409).send('el email o la contraseña son incorrectas.');
        }
        
    } catch (error) {
        console.error('Error en el servidor', error);
        res.status(500).send('Error interno del servidor');
    }
});


// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});
