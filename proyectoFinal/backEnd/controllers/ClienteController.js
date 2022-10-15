const db = require('../database/models');
const bcrypt = require('bcrypt');

exports.getAllClientes = (req, res) => {
    console.log("FUNCIONA GET CLIENTES");
    db.ClienteModel.findAll({

    })
        .then(clientes => {
            res.status(200).json(clientes);
        })
        .catch(error => {
            res.status(500).json({
                message: error.message || 'Error al obtener los clientes'
            });
        });
}


exports.getClientes = (req, res) => {

    const id = req.params.id;

    db.ClienteModel.findAll({
        where: {
            id: id
        }
    })
        .then(cliente => {
            res.json(cliente);
        }).catch(error => {
            res.json(error);
        })
}

exports.createCliente = async (req, res) => {
    try {
        const { nombre, telefono, direccion, email, fecha_nacimiento, red_social
        } = req.body;

        // const passcrypt = await bcrypt.hash(password, 10);

        db.ClienteModel.create({
            nombre,
            telefono,
            direccion,
            email,
            fecha_nacimiento,
            red_social

        }).then(cliente => {

            console.log("cliente CREADO");
            res.status(200).send(cliente);
        }).catch(error => {
            console.log(error);
            res.status(500).send(error);
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.uptadeCliente = (req, res) => {
    try {
        const { id , nombre, telefono, direccion, email, fecha_nacimiento, red_social , ocupacion, tipo_cabello, estado_cabello, formula } = req.body;

        db.ClienteModel.update({
            nombre,
            telefono,
            direccion,
            email,
            fecha_nacimiento,
            red_social,
            ocupacion,
            tipo_cabello,
            estado_cabello,
            formula
        },
            {
                where: {
                    id
                }
            }).then(cliente => {
                res.status(200).send(cliente);
            }).catch(error => {
                console.log(error);
                res.status(500).send(error);
            }
            );

    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteCliente = (req, res) => {
    const id = req.params.id;
    try {
        db.ClienteModel.destroy({
            where: {
                id
            }
        }).then(cliente => {
            res.sendStatus(200, cliente);
        }).catch(error => {
            console.log(error);
            res.status(500).send(error);
        }
        );
    } catch (error) {
        res.status(500).send(error);
    }
}