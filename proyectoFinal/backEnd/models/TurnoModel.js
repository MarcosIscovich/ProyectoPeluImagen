module.exports = function (sequelize, Datatypes) {
    return sequelize.define('turnos', {

        fecha_concurrencia: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        precio: {
            type: Datatypes.INTEGER,
            allowNull: false,
        },
        hora_desde: {
            type: Datatypes.DATE,
            allowNull: false,
        },
        hora_hasta: {
            type: Datatypes.DATE,
            allowNull: false,
        },
        
    }, {
        timestamps: true,
        tableName: 'turnos'
    });
}