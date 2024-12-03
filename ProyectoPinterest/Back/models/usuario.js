const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post'  
    }],
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsuarioAvatar',
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
