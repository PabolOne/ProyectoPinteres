const express = require('express');
const app = express();
const morgan = require('morgan');
const { globalErrorHandler, AppError } = require('./utils/appError');
require('dotenv').config({ path: './variables.env' });
const db = require('./config/db');
const productorouter = require('./routes/productoRouter');
const ventarouter = require('./routes/VentaRouter')

db.conectar();

app.use(express.json());
app.use(morgan('combined'));

app.use('/api/productos', productorouter);
app.use('/api/ventas', ventarouter);

app.all('*', (req, res, next) => {
    const error = new AppError(`No se pudo acceder a la ruta: ${req.originalUrl} en el servicio web`);
    next(error)
});

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`servidor escuchando en el puerto ${port}`)
})


