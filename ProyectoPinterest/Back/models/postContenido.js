const mongoose = require('mongoose');

const postContenidoSchema = new mongoose.Schema({
    contenido: {
        type: String
    }
});


const PostContenido = mongoose.model('PostContenido', postContenidoSchema);


module.exports = PostContenido;