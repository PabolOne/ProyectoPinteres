import { PostMockup } from "../models/postMockup.js";
const API_URL = 'http://localhost:3001/';
const URL_LISTA = 'api/listas';
const URL_POST_CONTENIDO = 'api/postContenido';
const URL_POST_IMAGEN = 'api/imagenes';

export class ListasService{
    static getPosts(){
        const postList = [
            new PostMockup(1, "../src/assets/images/Cigarro.jpg"),
            new PostMockup(1, "../src/assets/images/Robin.jpg"),
            new PostMockup(1, "../src/assets/images/Pose-1.jpg")

        ];
        return postList;
    }
    static getAuthHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        };
    }
    static getListaById(id) {
        return fetch(`${API_URL}${URL_LISTA}/${id}`, {
            method: 'GET',
            headers: this.getAuthHeaders()
        }).then(response => response.json());
    }
    static async guardarPostEnLista(idPost, id) {
        try {
            const response = await fetch(`${API_URL}${URL_LISTA}/${id}/posts/${idPost}`, {
                method: 'POST',
                headers: this.getAuthHeaders()           
             });
    
            if (!response.ok) {
                throw new Error('Error al obtener el ID de la lista.');
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en el like:', error);
            return null;
        }
    }
}