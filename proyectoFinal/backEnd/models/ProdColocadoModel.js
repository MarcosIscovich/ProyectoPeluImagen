module.exports = function(sequelize, Datatypes){
    return sequelize.define('prod_colocado', {

        orden: {
            type: Datatypes.INTEGER,
            allowNull: false,
        },
        cantidadProducto: {
            type: Datatypes.STRING,
            allowNull: false,
        },
    },{
        timestamps: true,
        tableName: 'prod_colocado'
    });
}