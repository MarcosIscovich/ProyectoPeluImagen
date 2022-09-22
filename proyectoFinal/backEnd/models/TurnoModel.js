module.exports = function (sequelize, Datatypes) {
    return sequelize.define('turnos', {

        fecha_concurrencia: {
            type: Datatypes.DATE,
            allowNull: false,
        },
        precio: {
            type: Datatypes.INTEGER,
            allowNull: false,
        },
        hora_desde: {
            type: Datatypes.TIME,
            allowNull: false,
        },
        hora_hasta: {
            type: Datatypes.TIME,
            allowNull: false,
        },
    }, {
        timestamps: true,
        tableName: 'turnos'
    });
}