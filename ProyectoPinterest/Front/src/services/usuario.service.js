const API_URL = 'http://localhost:3001/';
const URL_USUARIO = 'api/usuarios';
const URL_POST_IMAGEN = 'api/avatares';
import { ListasService } from "./listas.service.js";

export class UsuarioService {
    static getImageById(id) {
        return `${API_URL}${URL_POST_IMAGEN}/${id}.jpg`;
    }
    static getAuthHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        };
    }
    static getUsuarioPorId(id) {
        return fetch(`${API_URL}${URL_USUARIO}/${id}`, {
            method: 'GET',
            headers: this.getAuthHeaders()
        }).then(response => response.json());
    }
    static async getIdPorToken(token) {
        try {
            const response = await fetch(`${API_URL}${URL_USUARIO}/token`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ token })
            });
    
            if (!response.ok) {
                throw new Error('Error al obtener el ID del usuario.');
            }
    
            const data = await response.json();
            return data.idUsuario; 
        } catch (error) {
            console.error('Error en getIdPorToken:', error);
            return null;
        }
    }
    static async guardarPostLikeado(idUsuario,idPost){
        try {
            const response = await fetch(`${API_URL}${URL_USUARIO}/${idUsuario}/posts/${idPost}`, {
                method: 'POST',
                headers: this.getAuthHeaders()           
             });
    
            if (!response.ok) {
                throw new Error('Error al obtener el ID del usuario.');
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en el like:', error);
            return null;
        }
    }
    
    static async getListasUsuario(idUsuario) {
        try {
            const usuario = await this.getUsuarioPorId(idUsuario);
            
            if (!usuario || !usuario.listas) {
                console.error('Usuario no encontrado o no tiene listas asociadas.');
                return [];
            }
    
            // Obtener todas las listas asociadas al usuario
            const listas = usuario.listas.map(lista => ({
                id: lista._id,
                nombre: lista.nombre,
                descripcion: lista.descripcion || '',
                posts: lista.posts || [],
            }));
    
            return listas;
        } catch (error) {
            console.error('Error al obtener listas del usuario:', error);
            throw error;
        }
    }
    
    
       
    
    
    
    static registrarUsuario(datosUsuario) {

    }
}

