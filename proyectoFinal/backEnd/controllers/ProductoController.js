const db = require ('../database/models');

exports.getProductos = (req, res) => {
    console.log("FUNCIONA GET PRODUCTOS");
    db.ProductoModel.findAll({
            
        }).then(productos => {
            res.status(200).send(productos);
        }).catch(error => {
            console.log(error);
            res.status(500).send(error);
        }
        );
    }

exports.createProducto = (req, res) => {
    try{
        const { nombre , stock } = req.body;
    db.ProductoModel.create({
        nombre,
        stock
    }).then(producto => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
}catch(error){
    res.sendStatus(500);
}
}

exports.updateProducto = (req, res) => {
    try{
        const { nombre , stock } = req.body;
        db.ProductoModel.update({
            nombre,
            stock
        }, {
            where: {
                id: req.params.id
            }
        }).then(producto => {
            res.sendStatus(200);
        }).catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
    }catch(error){
        res.sendStatus(500);
    }
}

exports.deleteProducto = (req, res) => {
    try{
        const { id } = req.body
        db.ProductoModel.destroy({
            where: {
                id
            }
        }).then(producto => {
            res.sendStatus(200);
        }).catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
    }catch(error){
        res.sendStatus(500);
    }
}