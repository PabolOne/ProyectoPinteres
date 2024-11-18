const mongoose = require('mongoose');

const postContenidoSchema = new mongoose.Schema({
    contenido: [{
        type: String
    }]
});

module.exports = mongoose.model('PostContenido', postContenidoSchema);