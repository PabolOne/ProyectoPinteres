import { PostMockup } from "../models/postMockup.js";
const API_URL = 'http://localhost:3001/';
const URL_POST = 'api/posts';
const URL_POST_CONTENIDO = 'api/postContenido';
const URL_POST_IMAGEN = 'api/imagenes';

//import { Post } from "../models/post.js";
export class PostService {
    static getPosts() {
        return fetch(`${API_URL}${URL_POST}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                console.log("Datos obtenidos de getPosts:", data);
                return data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    static getImageById(id) {
        return `${API_URL}${URL_POST_IMAGEN}/${id}.jpg`
    }

    static getPostsContenido() {
        return fetch(`${API_URL}${URL_POST_CONTENIDO}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                console.log("Datos obtenidos de PostContenido:", data);
                return data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    static async createPostContenido(contenido, idUsuario, descripcion, tags) {
        fetch(`${API_URL}${URL_POST_CONTENIDO}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contenido })
        }).then(response => response.json())
            .then(data => {
                console.log(data._id);
                this.createPost(idUsuario, String(data._id), descripcion, tags);
                return data._id;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    static async createPost(idUsuario, contenido, descripcion, tags) {
        return fetch(`${API_URL}${URL_POST}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idUsuario, contenido, descripcion, tags })
        }).then(response => response.json())
            .then(data => data).catch((error) => {
                console.log(error);
            });
    }
}
