const express = require('express');
const cors = require('cors');
const router = express.Router();
const { db } = require('../db');
router.use(express.json());
router.use(cors());

const { Facturas, Vehiculo } = db.models;

router.get('/', async (req, res) => {
    try {

        let consulta = await Facturas.findAll();
        !consulta.length
            ? res.json({ msg: 'No hay registros.' })
            : res.json(consulta);

    } catch (error) {
        throw error
    }

});

router.get('/:placa', async (req, res) => {
    try {

        const { placa } = req.params;

        let vehiculo = await Vehiculo.findOne({ where: { placa: placa } });
        if (!vehiculo) return res.json({ msg: 'No hay registros.' });

        let consulta = await Facturas.findAll({
            where: { VehiculoId: vehiculo.dataValues.id }
        });

        return res.json(consulta);

    } catch (error) {
        throw error
    }

});

router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;

        let consulta = await Facturas.findAll({ where: { id: id } });
        !consulta.length
            ? res.json({ msg: 'No hay registros.' })
            : res.json(consulta);

    } catch (error) {
        throw error
    }

});


module.exports = router;