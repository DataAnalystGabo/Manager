const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const bcrypt     = require('bcrypt');
const { Pool }   = require('pg');
const app        = express();
const PORT       = process.env.PORT || 3000;


// Middleware para permitir solicitudes CORS
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Sirve los archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));


//Establecemos la conexión a la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'manager',
    password: '78235514',
    port: 5432
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


// Ruta para manejar el envío del formulario de registro
app.post('/register', async(req, res) => {
    const { firstName, 
            lastName, 
            birthdate,
            age, 
            email, 
            password} = req.body;
    
    //Debug---
    //console.log(`Nombre: ${firstName}, Apellido: ${lastName}, Fecha de Nacimiento: ${birthdate}, Edad: ${age}, Email: ${email}, Password: ${password}, Repassword: ${rePassword}`);

    //Registrando los datos ingresados por el usuario en la tabla Profiles
    //y Users

    try{
        //Hashing de la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        //Registrando en la tabla Users
        const userResult = await pool.query(
            'INSERT INTO Users (email, password_hash) VALUES ($1, $2) RETURNING user_id',
            [email, passwordHash]
        );
        const userId = userResult.rows[0].user_id;

        //Registrandoen la tabla Profiles
        pool.query(
            'INSERT INTO Profiles (user_id, first_name, last_name, birthdate, age)VALUES ($1, $2, $3, $4, $5)',
            [userId, firstName, lastName, birthdate, age]
        );

        res.send('¡El registro fue exitoso!')

    } catch (error) {
        console.error('Error: ', error);
        res.status(500).send('Hubo un error al registrar el usuario')
    }
    
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor de registro corriendo en http://localhost:${PORT}`);
});
