const UserRoutes = require('express').Router();
const UserController = require('../controllers/UserController');

UserRoutes.get('/all', UserController.getUsers);
UserRoutes.post('/create', UserController.createUser);
UserRoutes.put('/update', UserController.updateUser);
UserRoutes.delete('/delete', UserController.deleteUser);

module.exports = UserRoutes;