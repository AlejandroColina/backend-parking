const { DataTypes } = require('sequelize');

module.exports = (db) => {
    Facturas: db.define('Facturas', {
        total: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE(),
            allowNull: false
        }
    })
}