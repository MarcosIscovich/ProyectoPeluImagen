const db = require('../database/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    db.UserModel.findOne({
        where: {
            username,
        },
        
    }).then(user => {

        console.log(user);

        if (!user) {
            return res.status(404).send('Credenciales incorrectas USER');
        }

        const passwordIsValid = bcrypt.compareSync(
            password,
            user.password
        );
        console.log("passwordIsValid",passwordIsValid);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Credenciales incorrectas PASS',
            });
        }
        console.log("user", process.env.SECRET);
        const token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}


        /* if (bcrypt.compareSync(password, user.password)) {
            
            const payload = {
                username: user.username,
                id: user.id,
            };
            console.log("PAYLOAD",payload);

          jwt.sign({ payload }, 'secretkey' , { expiresIn: '1h' } , (err, token) => {
            console.log("TOKEN",token);
            res.json({ token , payload })
        })  
        }else {
            res.status(400).json({ message: 'Contraseña incorrecta' })
        }  */       


