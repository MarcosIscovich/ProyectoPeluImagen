const TurnoRoutes = require('express').Router();
const TurnoController = require('../controllers/TurnoController');

TurnoRoutes.get('/all', TurnoController.getAllTurnos);
TurnoRoutes.get('/:id', TurnoController.getTurno);
TurnoRoutes.post('/create', TurnoController.createTurno);
TurnoRoutes.put('/update', TurnoController.updateTurno);
TurnoRoutes.delete('/delete/:id', TurnoController.deleteTurno);

module.exports = TurnoRoutes;