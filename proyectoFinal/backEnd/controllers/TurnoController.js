const db = require('../database/models');

exports.getAllTurnos = (req, res) => {
    db.TurnoModel.findAll({

    }).then(turnos => {
        res.status(200).send(turnos);
    }).catch(error => {
        res.status(500).send(error);
    }
    );
}

exports.getTurno = (req, res) => {
    const id = req.params.id;
    db.TurnoModel.findOne(
        { where: { 
            id
         } }
    ).then(turno => {
        res.status(200).send(turno);
    }
    ).catch(error => {
        res.status(500).send(error);
    }
    );
}

exports.createTurno = (req, res) => {
    try {
       
        const { precio, hora_desde, hora_hasta , clienteId, trabajoId , fecha_concurrencia } = req.body;
        db.TurnoModel.create({
            precio,
            fecha_concurrencia,
            hora_desde,
            hora_hasta,
            clienteId,
            trabajoId
        }).then(turno => {
            res.status(200).send(turno);
        }
        ).catch(error => {
            res.status(500).send(error);
        }
        );
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.updateTurno = (req, res) => {
    try {
        console.log(req.body);
        /* const { id, precio, hora_desde, hora_hasta , clienteId, trabajoId , fecha_concurrencia } = req.body;
        db.TurnoModel.update({
            precio,
            fecha_concurrencia,
            hora_desde,
            hora_hasta,
            clienteId,
            trabajoId
        }, {
            where: {
                id
            }
        }).then(turno => {
            res.status(200).send(turno);
        }
        ).catch(error => {
            res.status(500).send(error);
        }
        ); */
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteTurno = (req, res) => {
    const id = req.params.id;
    db.TurnoModel.destroy({
        where: {
            id
        }
    }).then(turno => {
        res.status(200).send(turno);
    }
    ).catch(error => {
        res.status(500).send(error);
    }
    );
}