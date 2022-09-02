const ProdColRoutes = require('express').Router();
const ProdColocadoController = require('../controllers/ProdColocadoController');

ProdColRoutes.get('/', ProdColocadoController.getProdCol);

module.exports = ProdColRoutes;