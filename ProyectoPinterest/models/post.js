const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    
    idPostOriginal:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    idUsuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
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
    tags: [{
        type: String
    }],
    fechaHora:{
        type: Date,
        required: true
    },
    likes:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);