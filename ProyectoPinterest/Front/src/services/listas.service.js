import { PostMockup } from "../models/postMockup.js";
const API_URL = 'http://localhost:3001/';
const URL_LISTA = 'api/listas';
const URL_USUARIO = 'api/usuarios';
const URL_POST_CONTENIDO = 'api/postContenido';
const URL_POST_IMAGEN = 'api/imagenes';
import { PostService } from "./post.service.js";


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

    
    static async getListaById(id) {
        try {
            const response = await fetch(`${API_URL}${URL_LISTA}/${id}`, {
                method: 'GET',
                headers: this.getAuthHeaders()
            });
    
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Datos obtenidos de la lista:', data); // Inspeccionar estructura
            return data;
        } catch (error) {
            console.error('Error al obtener la lista por ID:', error);
            throw error;
        }
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

    static async guardarListaEnUsuario(idUsuario, idLista){

        try{
            const response = await fetch(`${API_URL}${URL_USUARIO}/${idUsuario}/listas/${idLista}`, {
                method: 'POST',
                headers: this.getAuthHeaders()           
             });
        
        if (!response.ok) {
            throw new Error('Error al obtener el ID de la lista.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al guardar una lista en el usuario:', error);
        return null;
    }
    }

    static async obtenerListasPorUsuario(idUsuario){
        return fetch(`${API_URL}${URL_LISTA}/${idUsuario}`, {
            method: 'GET',
            headers: this.getAuthHeaders()
        })
            .then(response => response.json())
            .then(data => {
                console.log("Datos obtenidos de obtenerListasPorUsuario:", data);
                return data;
            })
            .catch(error => {
                console.log(error);
            });
    }

    static async obtenerPostDeLista(idLista){
        const listaEncontrada = await this.getListaById(idLista);
        if(!listaEncontrada){
            console.error('Lista no encontrada');
            return [];
        }



        if (!Array.isArray(listaEncontrada.posts)) {
            console.error('Posts no es un array o está indefinido', listaEncontrada.posts);
            return [];
        }


        for(let post of listaEncontrada.posts){
            const postCompleto = await PostService.getPostById(post.id);  // Asegúrate de que 'id' sea el campo correcto en tu objeto
            postsCompletos.push(postCompleto);
        }

        return posts; 

        

    }

    


    
}