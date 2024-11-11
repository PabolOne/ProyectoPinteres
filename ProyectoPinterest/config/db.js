const mongoose = require('mongoose');
require('dotenv').config({path: './variables.env'});

const config = {
    url: process.env.URL_MONGO,
    options: {}
}

class db {

    static async conectar() {
        try {
            await mongoose.connect(config.url, config.options);
            console.log('Conectado a MongoDB');
        } catch (error) {
            console.error('Error al conectar a MongoDB:', error);
            throw new Error('No se pudo conectar a la base de datos.');
        }
    }

    static async desconectar() {
        try {
            await mongoose.disconnect();
            console.log('Desconectado de MongoDB');
        } catch (error) {
            console.error('Error al desconectar de MongoDB:', error);
            throw new Error('No se pudo desconectar de la base de datos.');
        }
    }

    static async query(model, operation, params = {}) {
        try {
            switch (operation) {
                case 'find':
                    return await model.find(params);  // Consulta con find
                case 'findOne':
                    return await model.findOne(params);  // Consulta un solo documento
                case 'create':
                    return await model.create(params);  // Crear un nuevo documento
                case 'updateOne':
                    return await model.updateOne(params.filter, params.update);  // Actualizar un documento
                case 'deleteOne':
                    return await model.deleteOne(params);  // Eliminar un documento
                default:
                    throw new Error('Operación no soportada');
            }
        } catch (error) {
            console.error('Error al ejecutar la operación de la base de datos:', error);
            throw new Error('Error en la operación de base de datos.');
        }
    }
}