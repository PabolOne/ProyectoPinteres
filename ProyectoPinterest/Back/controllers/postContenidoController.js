const PostContenidoDAO = require('../dataAccess/PostContenidoDAO');
const { AppError } = require('../utils/appError');
const path = require('path');
const fs = require('fs');
const { setHeapSnapshotNearHeapLimit } = require('v8');

class postContenidoController {
    static async crearPostContenido(req, res, next) {
        try {
            const { contenido } = req.body;

            if (!contenido) {
                next(new AppError('El campo contenido es requerido'))
            }

            const postContenidoData = { contenido }
            const postContenido = await PostContenidoDAO.crearPostContenido(postContenidoData);

            postContenidoController.crearImagenBack(contenido, postContenido._id);

            res.status(201).json(postContenido);

        } catch (error) {
            next(new AppError('Error al crear post contenido', 500))
        }
    }

    static async obtenerPostContenidoPorId(req, res, next) {
        try {
            const id = req.params.id;
            const postContenido = await PostContenidoDAO.obtenerPostContenidoPorId(id);

            if (!postContenido) {
                next(new AppError('Post contenido no encontrada', 404))
            }

            res.status(200).json(postContenido);
        } catch (error) {
            next(new AppError('Error al obtener el post contenido', 500))
        }
    }

    static async obtenerPostContenidos(req, res, next) {
        try {

            const limit = req.query.limit || 16;
            const postContenidos = await PostContenidoDAO.obtenerPostContenidos(limit);

            if (!postContenidos) {
                next(new AppError('Post contenidos no encontrados', 404))
            }

            res.status(200).json(postContenidos);
        } catch (error) {
            next(new AppError('Error al obtener los post contenido', 500))
        }
    }

    static async actualizarPostContenido(req, res, next) {
        try {
            const id = req.params.id;

            const postContenidoexists = await PostContenidoDAO.obtenerPostContenidoPorId(id);

            if (!postContenidoexists) {
                next(new AppError('Post contenido no encontrado', 404))
            }

            const postContenidoData = req.body;
            
            const postContenido = await PostContenidoDAO.actualizarPostContenidoPorId(id, postContenidoData)
            postContenidoController.crearImagenBack(postContenidoData.contenido, postContenido._id);
            if (!postContenido) {
                next(new AppError('Post contenido no encontrado', 404))
            }

            res.status(200).json(postContenido);
        } catch (error) {
            console.log("el error",error);
            next(new AppError('Error al actualizar el post contenido', 500))
        }
    }

    static async eliminarPostContenidoPorId(req, res, next) {
        try {
            const id = req.params.id;
    
            const postContenido = await PostContenidoDAO.obtenerPostContenidoPorId(id);
    
            if (!postContenido) {
                next(new AppError('No se encontró el post contenido', 404));
                return;
            }
    
            const dirPath = path.join(__dirname, '../img/PostContenido');
            const filePath = path.join(dirPath, `${id}.jpg`);
    
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log('Imagen eliminada con éxito:', filePath);
            } else {
                console.warn('No se encontró la imagen asociada para eliminar:', filePath);
            }
    
            await PostContenidoDAO.eliminarPostContenidoPorId(id);
    
            res.status(200).json({ mensaje: 'Post contenido eliminado correctamente' });
        } catch (error) {
            next(new AppError('Error al eliminar el post contenido', 500));
        }
    }
    
    static crearImagenBack(contenido, id) {
        
        const base64Image = contenido; 

        const buffer = Buffer.from(base64Image, 'base64');

        const dirPath = path.join(__dirname, '../img/PostContenido');

        if (!fs.existsSync(dirPath)) {
         fs.mkdirSync(dirPath, { recursive: true });
        }

        const nombreArchivo = `${id}.jpg`

        fs.writeFile(path.join(dirPath, nombreArchivo), buffer, (err) => {
            if (err) {
                console.error('Error al escribir la imagen:', err);
                return;
            }
            console.log('Imagen guardada con éxito:');
        });
    }

}

module.exports = postContenidoController;
