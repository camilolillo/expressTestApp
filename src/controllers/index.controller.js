// Requerir Pool de 'pg' para manejar la conexión a PostgreSQL
const { Pool } = require('pg'); 
// Importa el objeto Pool del paquete 'pg' para interactuar con PostgreSQL

// Crear una nueva instancia de Pool para configurar la conexión a la base de datos
const pool = new Pool({
    host: 'host.docker.internal',
    user: 'postgres',
    password: '123',
    database: 'apitestdb',
    port: '5432'
});
// Configura los detalles de la conexión a la base de datos PostgreSQL (host, usuario, contraseña, base de datos, puerto)

// Definir la función getUsers
const getUsers = async (req, res) => {
    try {
        // Ejecutar una consulta SQL para obtener todos los usuarios de la tabla 'users'
        const result = await pool.query('SELECT * FROM users');
        // Responder con los resultados de la consulta en formato JSON
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        // En caso de error, mostrar el mensaje y enviar una respuesta de error al cliente
        res.status(500).send('Error en el servidor');
    }
};

// Definir la función getUserById para obtener un usuario por su ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        // Ejecutar una consulta SQL para obtener un usuario por su ID
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        // Si no se encuentra el usuario, devolver un error 404
        if (result.rows.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        // Responder con los datos del usuario encontrado
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        // En caso de error, mostrar el mensaje y enviar una respuesta de error al cliente
        res.status(500).send('Error en el servidor');
    }
};

// Definir la función createUser para insertar un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Validar que los datos existan
        if (!name || !email) {
            return res.status(400).send('Faltan datos: nombre y/o email');
        }

        // Verificar si el email ya existe en la base de datos
        const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            return res.status(400).send('El correo ya está registrado');
        }

        // Ejecutar una consulta SQL para insertar un nuevo usuario en la base de datos
        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', 
            [name, email]
        );

        // Responder con el usuario creado
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        // En caso de error, mostrar el mensaje y enviar una respuesta de error al cliente
        res.status(500).send('Error en el servidor');
    }
};

// Definir la función updateUserById para actualizar un usuario por su ID
const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        // Crear una consulta dinámica según los campos enviados
        let updateFields = [];
        let updateValues = [];
        let fieldIndex = 1;

        // Verificar qué campos están presentes en el body y agregarlos a la consulta
        if (name) {
            updateFields.push(`name = $${fieldIndex++}`);
            updateValues.push(name);
        }
        if (email) {
            updateFields.push(`email = $${fieldIndex++}`);
            updateValues.push(email);
        }

        // Si no se envió ni nombre ni email, retornar un error
        if (updateFields.length === 0) {
            return res.status(400).send('Debe proporcionar al menos un campo para actualizar');
        }

        // Agregar el ID como el último valor para la consulta
        updateValues.push(id);

        // Crear la consulta dinámica de actualización
        const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = $${fieldIndex} RETURNING *`;

        const result = await pool.query(updateQuery, updateValues);

        // Verificar si el usuario existe
        if (result.rows.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Responder con el usuario actualizado
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};

// Definir la función deleteUserById para eliminar un usuario por su ID
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        // Ejecutar una consulta SQL para eliminar un usuario por su ID
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

        // Verificar si el usuario existe
        if (result.rows.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Responder confirmando la eliminación del usuario
        res.send('Usuario eliminado');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};

// Exportar todas las funciones para usarlas en las rutas
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
};
