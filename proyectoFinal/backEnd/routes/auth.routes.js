const AuthRoutes = require('express').Router();
const AuthController = require('../controllers/AuthController');
const verifyToken = require('../middlewares/verifyToken');

AuthRoutes.post('/',  AuthController.login);


module.exports = AuthRoutes;