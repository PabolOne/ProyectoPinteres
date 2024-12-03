const API_URL = 'http://localhost:3001/';
const URL_USUARIO = 'api/usuarios';
const URL_POST_IMAGEN = 'api/imagenes';

export class UsuarioService {
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
    
    static registrarUsuario(datosUsuario) {

    }
}

