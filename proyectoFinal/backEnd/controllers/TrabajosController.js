const db = require('../database/models');

exports.getAllTrabajos = (req, res) => {

    db.TrabajoModel.findAll({
        
    }).then(trabajos => {
        res.status(200).send(trabajos);
    }
    ).catch(error => {

        res.status(500).send(error);
    }
    );
}

exports.createTrabajo = (req, res) => {
    try {
        const { nombre, duracion, precio ,  tiposervicioId } = req.body;

        db.TrabajoModel.create({
            nombre,
            duracion,
            precio,            
            tiposervicioId
        }).then(trabajo => {
            res.status(200).send(trabajo);
        }
        ).catch(error => {
            res.status(500).send(error);
        }
        );
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.updateTrabajo = (req, res) => {
    try {
        const {id , nombre, duracion, precio } = req.body;
        

        db.TrabajoModel.update({
            nombre,
            duracion,
            precio
        }, {
            where: {
                id
            }
        }).then(trabajo => {
            res.status(200).send(trabajo);
        }
        ).catch(error => {
            res.status(500).send(error);
        }
        );
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteTrabajo = (req, res) => {
    try {
        const { id } = req.params;

        db.TrabajoModel.destroy({
            where: {
                id
            }
        }).then(trabajo => {
            res.sendStatus(200);
        }
        ).catch(error => {
            res.status(500).send(error);
        }
        );
    } catch (error) {
        res.status(500).send(error);
    }
}