const TurnoRoutes = require('express').Router();
const TurnoController = require('../controllers/TurnoController');

TurnoRoutes.get('/', TurnoController.getAllTurnos);
TurnoRoutes.get('/findTurnos/:id', TurnoController.getTurno);
TurnoRoutes.get('/findDispon/:fecha', TurnoController.getDisponibilidad);
TurnoRoutes.post('/turnosSelected', TurnoController.turnosSelected);
TurnoRoutes.post('/create', TurnoController.createTurno);
TurnoRoutes.put('/update', TurnoController.updateTurno);
TurnoRoutes.delete('/delete/:id', TurnoController.deleteTurno);

module.exports = TurnoRoutes;