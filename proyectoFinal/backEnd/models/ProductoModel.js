module.exports = function(sequelize, DataTypes) {
    return sequelize.define('productos', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: true,
        },
         
    }, {
        timestamps: true,
        tableName: 'productos'
    });
}