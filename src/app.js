const express = require('express');
const cors = require('cors');
const server = express();
const getPlacas = require('../src/routes/getPlacas');
const insertPlacas = require('../src/routes/insertPlacas');
const factura = require('../src/routes/getFacturas');
const updatePlaca = require('../src/routes/updatePlaca');
const deletePlaca = require('../src/routes/deletePlaca');
server.use(express.json());
server.use(cors());

server.use('/add', insertPlacas);
server.use('/placas', getPlacas);
server.use('/factura', factura);
server.use('/update', updatePlaca);
server.use('/delete', deletePlaca);

module.exports = server;