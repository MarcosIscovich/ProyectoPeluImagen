const NewTurno = require('express').Router();
const NewTurnoController= require('../controllers/NewTurnoControler');
const verifyToken = require('../middlewares/verifyToken');

NewTurno.post('/create',  NewTurnoController.createNewTurno);

module.exports = NewTurno;

