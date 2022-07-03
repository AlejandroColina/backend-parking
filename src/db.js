require('dotenv').config();
const { DB_USER, DB_NAME, DB_PASS, DB_HOST } = process.env;
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

let config = {
    logging: false,
    native: false,
    define: {
        timestamps: false
    },
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // }
}

const db = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`, config);

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

modelDefiners.forEach(model => model(db));

const { Vehiculo, Facturas, Calendar } = db.models;

Vehiculo.hasMany(Calendar);
Calendar.belongsTo(Vehiculo);

Vehiculo.hasMany(Facturas);
Facturas.belongsTo(Vehiculo);

module.exports = { db };