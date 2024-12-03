const Usuario = require('../models/usuario.js');  
const db = require('../config/db.js');              
const API_URL = 'http://localhost:3001/';
const URL_POST = 'api/posts';
const URL_USUARIO_AVATAR = 'api/usuarioAvatar';
const URL_USUARIO_IMAGEN = 'api/avatares';

class UsuarioService {
    static encontrarUsuarioPorId(id) {

    }

    static registrarUsuario(datosUsuario) {

    }

    static async createAvatarUsuario(avatar) {
        fetch(`${API_URL}${URL_USUARIO_AVATAR}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contenido })
        }).then(response => response.json())
            .then(data => {
                console.log(data._id);
                this.createPost(idUsuario, String(data._id), avatar);
                return data._id;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    static getImageById(id) {
        return `${API_URL}${URL_USUARIO_IMAGEN}/${id}.jpg`
    }
}



module.exports = UsuarioService;
