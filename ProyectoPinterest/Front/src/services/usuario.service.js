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
            method: 'GET'
        }).then(response => response.ok ? response.json() : []);
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
    static async guardarPostLikeado(idUsuario, idPost) {
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
            const listas = [];
            for (const listaId of usuario.listas) {
                const lista = await ListasService.getListaById(listaId);
                if (lista) {
                    listas.push({
                        id: lista._id,
                        nombre: lista.nombre,
                        descripcion: lista.descripcion || '',
                        posts: lista.posts || [],
                    });
                }
            }
    
            return listas;
        } catch (error) {
            console.error('Error al obtener listas del usuario:', error);
            throw error;
        }
    }
    
    static registrarUsuario(datosUsuario) {

    }

    static async actualizarUsuarioAvatar(id, avatarBase64) {
        try {
            const response = await fetch(`http://localhost:3001/api/usuarioAvatar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ avatar: avatarBase64 }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Usuario avatar actualizado:', data);
        } catch (error) {
            console.error('Error al actualizar el avatar del usuario:', error);
        }
    }

    static async actualizarUsuario(id, usernameActualizado, nombreActualizado, correoActualizado, avatarActualizado, passwordActualizado) {
        try {
            const response = await fetch(`http://localhost:3001/api/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: usernameActualizado, nombre: nombreActualizado, correo: correoActualizado, avatar: avatarActualizado, password: passwordActualizado}),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Usuario avatar actualizado:', data);
        } catch (error) {
            console.error('Error al actualizar el avatar del usuario:', error);
        }
    }


}

