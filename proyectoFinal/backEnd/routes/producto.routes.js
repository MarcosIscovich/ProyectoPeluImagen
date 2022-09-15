const ProductoRoutes = require('express').Router();
const ProductoController = require('../controllers/ProductoController');

ProductoRoutes.get('/', ProductoController.getAllProductos);
ProductoRoutes.post('/create', ProductoController.createProducto);
ProductoRoutes.put('/update', ProductoController.updateProducto);
ProductoRoutes.delete('/delete/:id', ProductoController.deleteProducto);

module.exports = ProductoRoutes;