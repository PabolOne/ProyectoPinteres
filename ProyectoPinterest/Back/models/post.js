const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    
    idPostOriginal:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    idUsuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post'  
    }],
    contenido: 
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'PostContenido'  
        }
    ,
    descripcion: {
        type: String
    },
    tags: [{
        type: String
    }],
    fechaHora:{
        type: Date,
        default: Date.now()
    },
    likes:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Post', postSchema);