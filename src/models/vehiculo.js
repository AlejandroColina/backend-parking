const { DataTypes } = require('sequelize');

module.exports = (db) => {
    Vehiculo: db.define('Vehiculo', {
        placa: {
            type: DataTypes.STRING(6),
            allowNull: false
        }
    })
}

