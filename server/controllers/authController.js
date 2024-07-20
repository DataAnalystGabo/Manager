const  bcrypt   = require('bcrypt');
const { pool }  = require('../config/db.js');

async function registerUser(req, res) {
  const { firstName, lastName, birthdate, age, email, password } = req.body;
  
  try {
    // Verificar si el email ya existe
    const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
        return res.status(409).json({success: false, message: `El email ${email} ya está registrado.`});
    } else {
        // Hashear la contraseña
        const passwordHash = await bcrypt.hash(password, 10);
        // Insertar usuario en la tabla users
        const userResult = await pool.query(
          'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING user_id',
          [email, passwordHash]
        );
        const userId = userResult.rows[0].user_id;
        // Insertar perfil en la tabla profiles
        await pool.query(
          'INSERT INTO profiles (user_id, first_name, last_name, birthdate, age) VALUES ($1, $2, $3, $4, $5)',
          [userId, firstName, lastName, birthdate, age]
        );
        return res.status(201).json({success: true, message: `¡El email ${email} se registró exitosamente!`});
    }
  } catch (error) {
    console.error('Error en el registro:', error);
    return res.status(500).json({success: false, message: 'Error interno del servidor'});
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length === 0) {
      return res.status(401).json({success: false, message:'El email o la contraseña son incorrectos.'});
    }

    const user = userCheck.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (match) {
      // Envia al cliente un JSON indicando éxito
      res.json({ success: true });
    } else {
      return res.status(401).json({success: false, message:'El email o la contraseña son incorrectos.'});
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = {
  registerUser,
  loginUser
};
