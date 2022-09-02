const ProductoRoutes = require('express').Router();
const ProductoController = require('../controllers/ProductoController');

ProductoRoutes.get('/all', ProductoController.getProductos);
ProductoRoutes.post('/create', ProductoController.createProducto);
ProductoRoutes.put('/update/:id', ProductoController.updateProducto);
ProductoRoutes.delete('/delete', ProductoController.deleteProducto);

module.exports = ProductoRoutes;