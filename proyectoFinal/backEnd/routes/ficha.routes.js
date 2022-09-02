const FichaRouter = require('express').Router();
const FichaController = require('../controllers/FichaController');

FichaRouter.get('/all', FichaController.getFichas);
FichaRouter.post('/create', FichaController.createFicha);
FichaRouter.put('/update/:id', FichaController.updateFicha);
FichaRouter.delete('/delete', FichaController.deleteFicha);


module.exports = FichaRouter;