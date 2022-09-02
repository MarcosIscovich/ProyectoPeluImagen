const db = require('../database/models');

exports.getProdCol = (req, res) => {
    console.log("GET PRODUCTOS COLOCADOS FUNCIONANDO");
    db.ProdColocadoModel.findAll({
        
    }).then(prodCol => {
        res.status(200).send(prodCol);
    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    }
    );
}