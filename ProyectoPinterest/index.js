const express = require('express');
const app = express();
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

// Conectar a la base de datos
db.conectar();

// Middlewares
app.use(express.json());
app.use(morgan('combined'));

// Definir las rutas
app.use('/api/listas', listaRouter);
app.use('/api/posts', postRouter);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/postContenido', postContenidoRouter);
app.use('/api/usuarioAvatar', usuarioAvatarRouter);

// Manejo de rutas no encontradas
app.all('*', (req, res, next) => {
    const error = new AppError(`No se pudo acceder a la ruta: ${req.originalUrl} en el servicio web`, 404);
    next(error);
});

// Middleware de manejo de errores global
app.use(globalErrorHandler);

// Configuración del puerto y arranque del servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
