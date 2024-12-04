import { PostMockup } from "../models/postMockup.js";
const API_URL = 'http://localhost:3001/';
const URL_USER = 'api/usuarios';

export class UserService {
    static getUsers() {
        return fetch(`${API_URL}${URL_USER}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                console.log("Datos obtenidos de getUsuarios:", data);
                return data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    static getUserById(userId) {
        return fetch(`${API_URL}${URL_USER}/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Token del usuario
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error al obtener usuario por ID:", error);
        });
    }

    static updateUser(userData) {
        return fetch(`${API_URL}${URL_USER}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Token para autenticación
            },
            body: JSON.stringify(userData) // Datos del usuario a actualizar
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
           
            return response.json();
        })
        .catch((error) => {
            console.error("Error al actualizar usuario:", error);
        });
    }
}