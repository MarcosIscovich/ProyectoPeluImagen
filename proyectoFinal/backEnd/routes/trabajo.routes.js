const TrabajoRoutes = require('express').Router();
const TrabajoController = require('../controllers/TrabajosController');

TrabajoRoutes.get('/', TrabajoController.getAllTrabajos);
TrabajoRoutes.post('/create', TrabajoController.createTrabajo);
TrabajoRoutes.put('/update', TrabajoController.updateTrabajo);
TrabajoRoutes.delete('/delete/:id', TrabajoController.deleteTrabajo);

module.exports = TrabajoRoutes;

