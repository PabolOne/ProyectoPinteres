const ListaDAO = require('../dataAccess/ListaDAO');
const { AppError } = require('../utils/appError');
const usuarioController = require('./usuarioController');
const mongoose = require('mongoose');


class ListaController {
    static async crearLista(req, res, next) {
        try {
            const { nombre, descripcion } = req.body;
    
            if (!nombre) {
                return next(new AppError('El campo nombre es requerido', 400));
            }
            if (!descripcion) {
                return next(new AppError('El campo descripcion es requerido', 400));
            }


            const nuevaLista = {
                posts: [],
                nombre,
                descripcion
            };
    
            const lista = await ListaDAO.crearLista(nuevaLista);
    
        


            res.status(201).json(lista);
        } catch (error) {
            next(new AppError('Error al crear lista', 500));
        }
    }
    

    static async obtenerListaPorId(req, res, next) {
        try {
            const id = req.params.id;

            const lista = await ListaDAO.obtenerListaPorId(id);

            if (!lista) {
                next(new AppError('Lista no encontrada', 404))
            }


            res.json(lista);
        } catch (error) {
            next(new AppError('Error al obtener la lista', error))
        }
    }

    static async obtenerListas(req, res, next) {
        try {

            const limit = req.query.limit || 10;
            const listas = await ListaDAO.obtenerListas(10);

            if (!listas) {
                next(new AppError('Listas no encontradas', 404))
            }

            res.status(200).json(listas);
        } catch (error) {
            console.log('Este es el error', error);

            next(new AppError('Error al obtener las listas', 500))
        }
    }

    static async actualizarLista(req, res, next) {
        try {
            const id = req.params.id;
    
            const listaData = req.body;
            if (!listaData.nombre || !listaData.descripcion) {
                return next(new AppError('El nombre y la descripción son obligatorios', 400));
            }
    
            const listaexists = await ListaDAO.obtenerListaPorId(id);
            if (!listaexists) {
                return next(new AppError('Lista no encontrada', 404));
            }
    
            const lista = await ListaDAO.actualizarListaPorId(id, listaData);
            if (!lista) {
                return next(new AppError('Error al actualizar la lista', 404));
            }
    
            res.status(200).json(lista);
        } catch (error) {

            next(new AppError(`Error al actualizar la lista con ID: ${req.params.id}`, 500));
        }
    }
    

    static async eliminarListaPorId(req, res, next) {
        try {
            const id = req.params.id;

            const lista = await ListaDAO.eliminarListaPorId(id);

            if (!lista) {
                next(new AppError('No se encontró la lista', 404));
            }

            res.status(200).json({ mensaje: 'Lista eliminada correctamente' });
        } catch (error) {
            next(new AppError('Error al eliminar la lista', 500))
        }
    }
    static async agregarPostLista(req, res, next) {
        try {
            const id = req.params.id;
            const idPost = req.params.idPost;
            const listaexists = await ListaDAO.obtenerListaPorId(id);

            if (!listaexists) {
                next(new AppError('Lista no encontrada', 404))
            }

            const listaData = listaexists;
            if (!listaData.posts.includes(idPost)) {
                listaData.posts.push(idPost); 
            } 
            const lista = await ListaDAO.actualizarListaPorId(id, listaData)

            if (!lista) {
                next(new AppError('Lista no encontrada', 404))
            }

            res.status(200).json(lista);
        } catch (error) {
            next(new AppError('Error al actualizar la lista', 500))
        }
    }
    static async obtenerListasPorUsuario(req, res, next) {
        try {
            const idUsuario = req.params.id;  

            const listas = await ListaDAO.obtenerListasPorUsuario(idUsuario);
    
            if (!listas || listas.length === 0) {
                return next(new AppError('No se encontraron listas para este usuario', 404));
            }
    
          
            res.status(200).json(listas);
        } catch (error) {
            next(new AppError('Error al obtener las listas del usuario', 500));
        }
    }

    static async obtenerPostsDeLista(req, res, next){
        const id = req.params.id;

        const listaexists = await ListaDAO.obtenerListaPorId(id);

        if (!listaexists) {
            next(new AppError('Lista no encontrada', 404))
        }

        
    }
    

}

module.exports = ListaController;
