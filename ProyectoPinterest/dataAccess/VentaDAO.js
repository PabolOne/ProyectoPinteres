const Venta = require('../models/venta');

class VentaDAO{
    constructor(){

    }
    async crearVenta(venta)
    {
        try {
            const venta = new Venta(venta);
            return await venta.save;
        } catch (error) {
            throw error;
        }
        
    }
    async agregarProductosAVenta(idVenta, productos){
        try {
            const venta = Venta.findById(idVenta);
            if(!venta)
            {
                throw new Error('No se encontro la venta');
            }
            venta.productosventa.push(...productos.map(producto =>({
                idProducto: producto.idProducto,
                descripcion: producto.nombre,
                precioVenta: producto.precioVenta,
                cantidad: producto.cantidad,
                subtotal: producto.precioVenta * producto.cantidad
            })));

            return await venta.save();
        } catch (error) {
            throw error;
        }
    }
    async obtenerVentaPorId(id)
    {
        try {
            return await Venta.findById(id);
        } catch (error) {
            throw error;
        }
    }
    async obtenerVenta(limit = 10)
    {
        try {
            return await Venta.find().limit(limit);
        } catch (error) {
            throw error;
        }
    }

    async actualizarVentaPorId(id, ventaData)
    {
        try {
            return await Venta.findByIdAndUpdate(id,ventaData,{new:true});
        } catch (error) {
            throw error;
        }
    }
    async obtenerVentaPorId(id)
    {
        try {
            return await Producto.findByIdAndRemove(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new VentaDAO();