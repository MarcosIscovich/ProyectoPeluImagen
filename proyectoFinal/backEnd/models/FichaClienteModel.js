module.exports = function (sequelize, DataTypes)  {
    return sequelize.define("fichas", {
        ocupacion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo_cabello: {
            type: DataTypes.STRING
        },
        estado_cabello: {
            type: DataTypes.STRING
        },
        formula: {
            type: DataTypes.STRING

        },
    },
        {
            timestamps: true,
            tableName: 'fichas'
        });
}