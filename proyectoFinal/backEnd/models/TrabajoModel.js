module.exports = function (sequelize, DataTypes) {
    return sequelize.define('trabajos', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duracion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantTrabajadores: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        timestamps: true,
        tableName: 'trabajos'

    });

}