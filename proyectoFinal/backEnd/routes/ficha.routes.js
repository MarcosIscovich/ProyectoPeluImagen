const FichaRouter = require('express').Router();
const FichaController = require('../controllers/FichaController');

FichaRouter.get('/:id', FichaController.getFichas);
FichaRouter.get('/', FichaController.getAllFichas);
FichaRouter.post('/create', FichaController.createFicha);
FichaRouter.put('/update', FichaController.updateFicha);
FichaRouter.delete('/delete/:id', FichaController.deleteFicha);


module.exports = FichaRouter;