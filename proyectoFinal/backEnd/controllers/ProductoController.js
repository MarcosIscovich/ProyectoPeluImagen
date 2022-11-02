const db = require ('../database/models');

exports.getAllProductos = (req, res) => {
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
        const { nombre , descripcion, stock , precio, imagen} = req.body;
        
    db.ProductoModel.create({
        nombre,
        descripcion,
        stock,
        precio,
        imagen
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
        const { id, nombre, descripcion, stock, precio, imagen } = req.body;
        console.log(req.body);
        db.ProductoModel.update({
            nombre,
            descripcion,
            stock,
            precio,
            imagen
        }, {
            where: {
                id
            }
        }).then(producto => {
            res.status(200).send(producto)
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
        const  id  = req.params.id
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