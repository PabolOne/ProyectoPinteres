const Producto = require('../models/producto');

class ProductoDAO{
    constructor(){

    }
    async crearProducto(producto)
    {
        try {
            const producto = new Producto(producto);
            return await producto.save;
        } catch (error) {
            throw error;
        }
        
    }
    async obtenerProductoPorId(id)
    {
        try {
            return await Producto.findById(id);
        } catch (error) {
            throw error;
        }
    }
    async obtenerProductos(limit = 10)
    {
        try {
            return await Producto.find().limit(limit);
        } catch (error) {
            throw error;
        }
    }

    async actualizarProductoPorId(id, productoData)
    {
        try {
            return await Producto.findByIdAndUpdate(id,productoData,{new:true});
        } catch (error) {
            throw error;
        }
    }
    async obtenerProductoPorId(id)
    {
        try {
            return await Producto.findByIdAndRemove(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductoDAO();