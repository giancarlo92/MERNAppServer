/* LIBRERIAS INICIALES
npm install -D nodemon
npm i express mongoose dotenv
npm run dev
npm i bcryptjs
npm i express-validator
npm i jsonwebtoken
npm i cors
*/
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear servidor
const app = express();

// conectar a la DB
conectarDB();

// habilitar cors
app.use(cors());

// habilitar express.json
app.use(express.json({extended: true}));

// puerto de la app
const PORT = process.env.PORT || 4000;

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


// Definir la pagina principal
// app.get('/', (req, res) => {
//     res.send('Hola mundo')
// })

// arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})