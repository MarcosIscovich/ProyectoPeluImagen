const db = require('../database/models');

exports.getTurnos = (req, res) => {
    console.log("FUNCIONA GET TURNOS");
    db.TurnoModel.findAll({}).then(turnos => {
        res.status(200).send(turnos);
    }).catch(error => {
        res.status(500).send(error);
    }
    );
}

