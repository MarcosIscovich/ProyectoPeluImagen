const ClienteRoutes = require('express').Router();
const ClienteController= require('../controllers/ClienteController');
const verifyToken = require('../middlewares/verifyToken');

ClienteRoutes.get('/:id', verifyToken , ClienteController.getClientes);
ClienteRoutes.get('/',verifyToken, ClienteController.getAllClientes);

ClienteRoutes.post('/create',  ClienteController.createCliente);
ClienteRoutes.put('/update', ClienteController.uptadeCliente);
ClienteRoutes.delete('/delete/:id', ClienteController.deleteCliente);


module.exports = ClienteRoutes;