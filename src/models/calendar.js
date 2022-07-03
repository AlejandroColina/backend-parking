const { DataTypes } = require('sequelize');

module.exports = (db) => {
    Calendar: db.define('Calendar', {
        horaE: {
            type: DataTypes.DATE(),
            allowNull: false
        },
        horaS: {
            type: DataTypes.DATE(),
            dafaultValue : null
        }
    })
}