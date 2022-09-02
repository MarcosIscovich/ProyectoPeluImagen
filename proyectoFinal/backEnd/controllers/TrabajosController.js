const db = require('../database/models');

exports.getTrabajos = (req, res) => {

    console.log("FUNCIONANDO GET TRABAJOS");

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
        const { nombre, duracion, precio } = req.body;

        db.TrabajoModel.create({
            nombre,
            duracion,
            precio
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
        const { nombre, duracion, precio } = req.body;
        const { id } = req.params;

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
        const { id } = req.body;

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