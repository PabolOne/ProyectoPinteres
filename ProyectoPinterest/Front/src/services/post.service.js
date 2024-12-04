const API_URL = 'http://localhost:3001/';
const URL_POST = 'api/posts';
const URL_POST_CONTENIDO = 'api/postContenido';
const URL_POST_IMAGEN = 'api/imagenes';

export class PostService {
    static getAuthHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        };
    }
    static getPostById(id) {
        return fetch(`${API_URL}${URL_POST}/${id}`, {
            method: 'GET',
            headers: this.getAuthHeaders()
        }).then(response => response.json());
    }
    
    static getPosts() {
        return fetch(`${API_URL}${URL_POST}`, {
            method: 'GET',
            headers: this.getAuthHeaders()
        })
            .then(response => response.json())
            .then(data => {
                console.log("Datos obtenidos de getPosts:", data);
                return data;
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    static async agregarPost(idPostOriginal,idPost){
        try {
            const response = await fetch(`${API_URL}${URL_POST}/${idPostOriginal}/posts/${idPost}`, {
                method: 'POST',
                headers: this.getAuthHeaders()           
             });
    
            if (!response.ok) {
                throw new Error('Error al obtener el ID del post.');
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en el post:', error);
            return null;
        }
    }
    static getImageById(id) {
        return `${API_URL}${URL_POST_IMAGEN}/${id}.jpg`;
    }

    static getPostsContenido() {
        return fetch(`${API_URL}${URL_POST_CONTENIDO}`, {
            method: 'GET',
            headers: this.getAuthHeaders()
        })
            .then(response => response.json())
            .then(data => {
                console.log("Datos obtenidos de PostContenido:", data);
                return data;
            })
            .catch(error => {
                console.log(error);
            });
    }
    static async incrementarLikes(postId) {
        console.log(postId);
        return fetch(`${API_URL}${URL_POST}/${postId}/like`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al incrementar likes.");
                }
                return response.json(); 
            })
            .then(data => data.likes);
    }
    
    static async createPostContenido(contenido, idUsuario, descripcion, tags) {
        return fetch(`${API_URL}${URL_POST_CONTENIDO}`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify({ contenido })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data._id);
                this.createPost(idUsuario, String(data._id), descripcion, tags);
                return data._id;
            })
            .catch(error => {
                console.log(error);
            });
    }

    static async createPost(idUsuario, contenido, descripcion, tags) {
            
            return fetch(`${API_URL}${URL_POST}`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ idUsuario, contenido, descripcion, tags })
            })
                .then(response => response.json())
                .then(data => data)
                .catch(error => {
                    console.log(error);
                });
        
        
    }
}
