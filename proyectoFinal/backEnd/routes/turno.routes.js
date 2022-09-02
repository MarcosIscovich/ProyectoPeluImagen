const TurnoRoutes = require('express').Router();
const TurnoController = require('../controllers/TurnoController');

TurnoRoutes.get('/all', TurnoController.getTurnos);

module.exports = TurnoRoutes;