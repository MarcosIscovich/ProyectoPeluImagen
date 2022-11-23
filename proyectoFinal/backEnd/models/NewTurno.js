module.exports = function (sequelize, DataTypes) {
    return sequelize.define('new_turno', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: true,
        tableName: 'new_turno'
    });
}