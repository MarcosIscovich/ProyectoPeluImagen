module.exports = function (sequelize, DataTypes) {
    return sequelize.define('tiposervicios', {
        nombre_servicio: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'tiposervicios'
    });
}
