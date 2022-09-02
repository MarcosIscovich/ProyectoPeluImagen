const db = require('../database/models');
const bcrypt = require('bcrypt');

exports.getUsers = (req, res) => {

    console.log("FUNCIONA GET USERS");

    db.UserModel.findAll({
        atributes: ['username']
    }
    ).then(users => {

        res.status(200).send(users);

    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    }
    );
}

exports.createUser = async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    //const salt = await bcrypt.genSalt(10);
    const passcrypt = await bcrypt.hash(password, 10);

    db.UserModel.create({
        username,
        password: passcrypt,
    }
    ).then(user => {
        res.status(200).send(user);
    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    }
    );
}

exports.updateUser = (req, res) => {
    try {
        const { username, password } = req.body;
        db.UserModel.update({
            username,
            password
        }, {
            where: {
                id: req.body.id
            }
        }).then(user => {
            res.status(200).send(user);
        }).catch(error => {
            console.log(error);
            res.status(500).send(error);
        }
        );
    }
    catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteUser = (req, res) => {
    try {
        const { id } = req.body;
        db.UserModel.destroy({
            where: {
                id
            }
        }).then(user => {
            
            res.sendStatus(200);
        }).catch(error => {
            console.log(error);
            res.status(500).send(error);
        }
        );
    }
    catch (error) {
        res.status(500).send(error);
    }
}

