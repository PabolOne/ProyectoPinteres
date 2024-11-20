const express = require('express');
const cors = require('cors'); // Middleware para manejar CORS
const morgan = require('morgan');
const { globalErrorHandler, AppError } = require('./utils/appError');
require('dotenv').config({ path: './variables.env' });
const db = require('./config/db');
const listaRouter = require('./routes/listaRouter');
const postRouter = require('./routes/postRouter');
const usuarioRouter = require('./routes/usuarioRouter');
const postContenidoRouter = require('./routes/postContenidoRouter');
const usuarioAvatarRouter = require('./routes/usuarioAvatarRouter');
const fs = require('fs');
const path = require('path');




// Conectar a la base de datos
db.conectar();

// Crear la aplicación Express
const app = express();

// Configurar CORS
app.use(cors({
    origin: '*', // Permite cualquier origen. Para mayor seguridad, especifica los dominios permitidos.
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));

// Middlewares
app.use(express.json());
app.use(morgan('combined'));
app.use(cors({
    origin: 'http://127.0.0.1:5500', 
}));


// Definir las rutas
app.use('/api/listas', listaRouter);
app.use('/api/posts', postRouter);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/postContenido', postContenidoRouter);
app.use('/api/usuarioAvatar', usuarioAvatarRouter);
app.use('/api/imagenes', express.static(path.join(__dirname, './img/PostContenido')));

app.get('/', (req, res) => {
    res.send('Servidor de Backend');
});

// Manejo de rutas no encontradas
app.all('*', (req, res, next) => {
    const error = new AppError(`No se pudo acceder a la ruta: ${req.originalUrl} en el servicio web`, 404);
    next(error);
});

// Middleware de manejo de errores global
app.use(globalErrorHandler);

// Configuración del puerto y arranque del servidor
const port = 3001;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
