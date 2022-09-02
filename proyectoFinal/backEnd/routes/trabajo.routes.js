const TrabajoRoutes = require('express').Router();
const TrabajoController = require('../controllers/TrabajosController');

TrabajoRoutes.get('/all', TrabajoController.getTrabajos);
TrabajoRoutes.post('/create', TrabajoController.createTrabajo);
TrabajoRoutes.put('/update/:id', TrabajoController.updateTrabajo);
TrabajoRoutes.delete('/delete', TrabajoController.deleteTrabajo);

module.exports = TrabajoRoutes;

