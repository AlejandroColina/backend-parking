const express = require('express');
const cors = require('cors');
const router = express.Router();
const { db } = require('../db');
router.use(express.json());
router.use(cors());

const { Vehiculo } = db.models;

router.get('/', async (req, res) => {
    try {

        let consulta = await Vehiculo.findAll();
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

        let consulta = await Vehiculo.findAll({where:{placa:placa}});
        !consulta.length
            ? res.json({ msg: 'No hay registros.' })
            : res.json(consulta);

    } catch (error) {
        throw error
    }

});

module.exports = router;