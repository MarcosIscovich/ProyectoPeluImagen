const db = require('../database/models');

exports.getFichas = (req, res) => {
    db.fichaClienteModel.findAll()
        .then(fichas => {
            res.json(fichas);
        })
        .catch(error => {
            res.json(error);
        })
}

exports.createFicha = (req, res) => {

    const { ocupacion, tipo_cabello, estado_cabello, formula } = req.body;

    db.fichaClienteModel.create({
        ocupacion,
        tipo_cabello,
        estado_cabello,
        formula
    })
        .then(ficha => {
            res.json(ficha);
        })
        .catch(error => {
            res.json(error);
        })
}

exports.updateFicha = (req, res) => {

    const { ocupacion, tipo_cabello, estado_cabello, formula } = req.body;

    db.fichaClienteModel.update({
        ocupacion,
        tipo_cabello,
        estado_cabello,
        formula
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(ficha => {
            res.json(ficha);
        })
        .catch(error => {
            res.json(error);
        })
}

exports.deleteFicha = (req, res) => {
    db.fichaClienteModel.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(ficha => {
            res.json(ficha);
        })
        .catch(error => {
            res.json(error);
        })
}
