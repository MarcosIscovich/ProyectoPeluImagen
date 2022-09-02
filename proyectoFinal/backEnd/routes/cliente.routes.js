const ClienteRoutes = require('express').Router();
const ClienteController= require('../controllers/ClienteController');
const verifyToken = require('../middlewares/verifyToken');

ClienteRoutes.get('/:id', ClienteController.getClientes);
ClienteRoutes.get('/', ClienteController.getAllClientes);

ClienteRoutes.post('/create',  ClienteController.createCliente);
ClienteRoutes.put('/update/:id', ClienteController.uptadeCliente);
ClienteRoutes.delete('/delete/:id', ClienteController.deleteCliente);


module.exports = ClienteRoutes;