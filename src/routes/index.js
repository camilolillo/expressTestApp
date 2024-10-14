// Requerir Router de Express
const { Router } = require('express'); 
// Importa la funcionalidad de enrutador de Express para definir rutas

// Crear una instancia de Router
const router = Router(); 
// Crea una instancia del enrutador para gestionar las rutas

// Importar las funciones del controlador
const { getUsers, createUser, updateUserById, deleteUserById, getUserById } = require('../controllers/index.controller'); 
// Importa las funciones necesarias desde el controlador correspondiente

// Definir la ruta para obtener todos los usuarios
router.get('/getUsers', getUsers); 
// Cuando se acceda a '/getUsers', se ejecuta la función getUsers que devuelve todos los usuarios de la base de datos

// Definir la ruta para obtener un usuario por su ID
router.get('/getUserById/:id', getUserById); 
// Cuando se acceda a '/getUserById/:id', se ejecuta la función getUserById para devolver el usuario correspondiente

// Definir la ruta para crear un nuevo usuario
router.post('/createUser', createUser); 
// Cuando se acceda a '/createUser', se ejecuta la función createUser para crear un nuevo usuario en la base de datos

// Definir la ruta para actualizar un usuario por su ID
router.put('/updateUserById/:id', updateUserById); 
// Cuando se acceda a '/updateUserById/:id', se ejecuta la función updateUserById para actualizar un usuario por su ID

// Definir la ruta para eliminar un usuario por su ID
router.delete('/deleteUserById/:id', deleteUserById); 
// Cuando se acceda a '/deleteUserById/:id', se ejecuta la función deleteUserById para eliminar un usuario por su ID

// Exportar el router para usarlo en otras partes de la aplicación
module.exports = router; 
// Exporta el enrutador para que pueda ser utilizado en el archivo principal del servidor (index.js)
