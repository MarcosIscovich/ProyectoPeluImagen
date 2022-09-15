const db = require('../database/models');

exports.getAllFichas = (req, res) => {

    db.fichaClienteModel.findAll({
        include: [
            {
                model: db.ClienteModel,
                as: 'cliente',
                attributes: ['nombre']
            },
        ]
    })
    .then(fichas => {
        res.status(200).json(fichas);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Error al obtener las fichas"
        });
    });
};

exports.getFichas = (req, res) => {
    const { id } = req.params;
    db.fichaClienteModel.findOne(
        {
            where: {
                id
            }
        }
    ).then(fichas => {
        res.status(200).json(fichas);
        })
        .catch(error => {
            res.json(error);
        })
}

exports.createFicha = (req, res) => {

    const { ocupacion, tipo_cabello, estado_cabello, formula , clienteId } = req.body;

    db.fichaClienteModel.create({
        ocupacion,
        tipo_cabello,
        estado_cabello,
        formula,
        clienteId
    })
        .then(ficha => {
            res.json(ficha);
        })
        .catch(error => {
            res.json(error);
        })
}

exports.updateFicha = (req, res) => {

    const { id, ocupacion, tipo_cabello, estado_cabello, formula, clienteId } = req.body;

    db.fichaClienteModel.update({
        ocupacion,
        tipo_cabello,
        estado_cabello,
        formula,
        clienteId
    }, {
        where: {
            id
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

    const { id } = req.params;

    db.fichaClienteModel.destroy({
        where: {
            id
        }
    })
        .then(ficha => {
            res.json(ficha);
        })
        .catch(error => {
            res.json(error);
        })
}
