// Requerir Express
const express = require('express'); 
// Importa el módulo de Express para poder crear el servidor web

// Crear la aplicación
const app = express(); 
// Inicializa una instancia de la aplicación de Express

// Middleware para procesar JSON
app.use(express.json()); 
// Permite que tu servidor procese cuerpos de solicitudes en formato JSON

// Middleware para datos codificados en URL
app.use(express.urlencoded({extended:false})); 
// Permite procesar datos codificados en formato URL (form-data). Cuando `extended` está en false, solo permite objetos de cadenas y matrices simples

// Rutas
app.use(require('./routes/index')); 
// Define las rutas de tu aplicación importadas desde './routes/index.js'

// Escuchar en un puerto
app.listen(3000); 
// Inicia el servidor en el puerto 3000 y escucha solicitudes entrantes

console.log('Server on port 3000'); 
// Muestra un mensaje en la consola para confirmar que el servidor está corriendo
