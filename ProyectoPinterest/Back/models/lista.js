const mongoose = require('mongoose');

const listaSchema = new mongoose.Schema({
    
    idUsuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post'  
    }]
    ,
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
});

module.exports = mongoose.model('Lista', listaSchema);