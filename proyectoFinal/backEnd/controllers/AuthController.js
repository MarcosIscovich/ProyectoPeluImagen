const db = require('../database/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.UserModel.findOne({
        where: {
            username,
        },
        
    }).then(user => {

        console.log(user);
        if (bcrypt.compareSync(password, user.password)) {
            console.log(user.password)
            const payload = {
                username: user.username,
                id: user.id,
            };

          jwt.sign({ payload }, 'secretkey' , { expiresIn: '1h' } , (err, token) => {
            res.json({ token , payload })
        })  
        }else {
            res.status(400).json({ message: 'Contraseña incorrecta' })
        }        

    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
};

