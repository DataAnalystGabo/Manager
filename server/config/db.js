const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

async function connectDB() {
    try {
      await pool.connect();
      console.log('Conexión exitosa a la base de datos PostgreSQL');
    } catch (err) {
      console.error('Error al conectar a la base de datos:', err);
      process.exit(1); // Salir del proceso en caso de error de conexión
    }
  }

module.exports = {
  pool,
  connectDB
}
